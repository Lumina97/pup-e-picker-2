import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";
import { useDogs } from "../Providers/DogsProvider";
import { Dog } from "../types";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { createDog, isLoadingData } = useDogs();

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>(dogPictures.BlueHeeler);

    const clearForm = () => {
      setName("");
      setDescription("");
      setImage(dogPictures.BlueHeeler);
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          const dog: Omit<Dog, "id"> = {
            name,
            description,
            image,
            isFavorite: false,
          };
          createDog(dog)
            .then(() => {
              toast.success("Created dog!");
              clearForm();
            })
            .catch(() => {
              toast.error("Create dog failed!");
            });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={isLoadingData}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          disabled={isLoadingData}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          disabled={isLoadingData}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input disabled={isLoadingData} type="submit" />
      </form>
    );
  };
