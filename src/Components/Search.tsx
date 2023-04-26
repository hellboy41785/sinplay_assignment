
import { useGalleryStore } from "@/store/useStore";
import React, { useState } from "react";

interface ISearchProp {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  id: number;
}

const Search: React.FC<ISearchProp> = ({ setSearch, id }) => {
  const generateGuid = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };
  const [submit, setSubmit] = useState({
    id: "",
    title: "",
    description: "",
    thumbnail: "",
  });


  const handleSubmit = () => {
    useGalleryStore.setState((state) => ({
      gallery: [
        {
          id: generateGuid(),
          title: submit.title,
          description: submit.description,
          thumbnail: submit.thumbnail,
        },
        ...state.gallery,
      ],
    }));
    setSubmit({
      id: "",
      title: "",
      description: "",
      thumbnail: "",
    });
  };
  return (
    <div className="flex items-center justify-center w-full gap-2">
      <input
        type="text"
        placeholder="Search here"
        className="w-full max-w-3xl input input-bordered input-accent"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <label htmlFor="my-modal" className="btn">
          Upload
        </label>

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full input input-bordered"
                value={submit.title}
                onChange={(e) =>
                  setSubmit((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full input input-bordered"
                value={submit.description}
                onChange={(e) =>
                  setSubmit((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Image Url"
                className="w-full input input-bordered"
                value={submit.thumbnail}
                onChange={(e) =>
                  setSubmit((prev) => ({ ...prev, thumbnail: e.target.value }))
                }
              />
            </div>

            <div className="flex justify-between w-full modal-action">
              <label
                htmlFor="my-modal"
                className="btn"
                onClick={() =>
                  setSubmit({
                    id: "",
                    title: "",
                    description: "",
                    thumbnail: "",
                  })
                }
              >
                Close
              </label>
              <label
                htmlFor="my-modal"
                className="btn"
                onClick={() => handleSubmit()}
              >
                Submit
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
