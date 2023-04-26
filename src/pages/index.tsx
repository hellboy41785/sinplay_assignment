/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Search from "@/Components/Search";
import { useGalleryStore } from "@/store/useStore";

import dynamic from 'next/dynamic'

const Gallery = dynamic(() => import('@/Components/Gallery'), {
  ssr:false
})

export default function Home() {
  const [page, setPage] = useState(1);
  const gallery = useGalleryStore((state) => state.gallery);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page]);

  
  const filterBy = search.length === 0 ? gallery.slice(page * 6 - 6, page * 6) : gallery

  const filterGallery = filterBy.filter((el) => {
    const words = search?.trim().split(/\s+/) || [];
    return words.every((word) =>
      el.title.toLowerCase().includes(word.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-3 py-6 mt-6">
      <Search setSearch={setSearch} />
      <Gallery gallery={filterGallery} />

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
          disabled={filterGallery.length !== 6 && true}
        >
          »
        </button>
      </div>
    </div>
  );
}
