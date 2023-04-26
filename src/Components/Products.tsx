import React, { useRef,useState,useEffect } from "react";
import Image from "next/image";
import { IProducts } from "../../types/products";

interface IGalleryProps {
  gallery: IProducts[];
}

const Products: React.FC<IGalleryProps> = ({ gallery }) => {
  const [galleryItem, setGalleryItem] = useState(gallery)

  useEffect(()=>{
    setGalleryItem(gallery)
  },[gallery])
  const dragItem = useRef<number | null >();
  const dragOverItem = useRef<number | null >();

  const handleSort = () => {
    let _galleryItems = [...galleryItem];
    const draggedItemContent = _galleryItems.splice(dragItem.current || 0, 1)[0];
    _galleryItems.splice(dragOverItem.current || 0, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setGalleryItem(_galleryItems);
  };
  return (
    <div className="">
      {gallery.length === 0 ? (
        <h1 className="text-4xl font-bold h-[500px] flex items-center">
          No Result...{" "}
        </h1>
      ) : (
        <div className="grid items-center justify-center max-w-3xl grid-cols-2 gap-3 lg:grid-cols-3">
          {galleryItem.map((el, i) => (
            <div
             className="cursor-pointer "
              key={i}
              onDragStart={(e) => dragItem.current = i}
              onDragEnter={(e) => dragOverItem.current = i}
              onDragEnd={handleSort}
              onDragOver={(e)=>e.preventDefault()}
            >
              <label
                htmlFor={`my-modal-${el.id}`}
                className="w-full cursor-pointer "
              >
                <Image
                  className="w-full object-cover min-h-[100px] max-h-[100px] lg:min-h-[250px] lg:max-h-[250px] rounded"
                  src={el.thumbnail}
                  width={100}
                  height={100}
                  alt="product"
                  unoptimized
                />
              </label>
              <input
                type="checkbox"
                id={`my-modal-${el.id}`}
                className="w-full modal-toggle"
              />
              <label
                htmlFor={`my-modal-${el.id}`}
                className="w-full cursor-pointer modal"
              >
                <label
                  className="relative space-y-3 modal-box scrollbar scrollbar-w-0"
                  htmlFor=""
                >
                  <Image
                    className="w-full rounded-md"
                    src={el.thumbnail}
                    width={100}
                    height={100}
                    alt="product"
                    unoptimized
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold ">{el.title}</h2>
                    <p className="py-4">{el.description}</p>
                  </div>
                </label>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
