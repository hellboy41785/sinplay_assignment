import { useQuery, useMutation, useQueryClient,UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IProducts } from "../../types/products";

const fetchGallery = async () => {
    const res = axios.get(`/api/post`)
    return (await res).data
}
const addItem = async ({ id,title,description,thumbnail, }: IProducts) => {
    await axios.post(`/api/post`, {
        id,
        title,
        description,
        thumbnail,
    });
}

export const useGalleryQuery = (): UseQueryResult<IProducts[]> => {
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