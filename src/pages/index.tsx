/* eslint-disable react-hooks/exhaustive-deps */
import Products from "@/Components/Products";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Search from "@/Components/Search";
import { useGalleryQuery } from "@/hooks/useGalleryQuery";
import Loader from "@/Loader/Loader";
import Error from "@/Error/Error";


export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const router = useRouter();
  const {data,isLoading,isError} = useGalleryQuery()
  
  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page]);

  if(isLoading) return <Loader/>
  if(isError) return <Error/>

  const filterProducts = data.slice((page * 6) - 6,page * 6).filter((el) => {
    const words = search?.trim().split(/\s+/) || [];
    return words.every((word) =>
      el.title.toLowerCase().includes(word.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-3 py-6 mt-6">
      <Search setSearch={setSearch} id={data.length}/>
      <Products gallery={filterProducts} />

      {/* Pagination */}
      <div className="fixed btn-group bottom-2">
        <button
          className="btn"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1 && true}
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          className="btn"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={filterProducts.length !== 6 && true}
        >
          »
        </button>
      </div>
    </div>
  );
}
