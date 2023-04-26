import { useQuery, useMutation, useQueryClient,UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IGallery } from "../../types/gallery";

const fetchGallery = async () => {
    const res = axios.get(`/api/post`)
    return (await res).data
}
const addItem = async ({ id,title,description,thumbnail, }: IGallery) => {
    await axios.post(`/api/post`, {
        id,
        title,
        description,
        thumbnail,
    });
}

export const useGalleryQuery = (): UseQueryResult<IGallery[]> => {
    return useQuery({
        queryKey: ['gallery'],
        queryFn: () => fetchGallery(),
        staleTime: Infinity,
    })
}

export const useAddItemQuery=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addItem,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["gallery"] });
        },
    })
}