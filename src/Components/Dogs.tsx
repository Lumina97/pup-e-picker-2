import { useDogs } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { activeTab, dogsList, deleteDog, toggleFavorite, isLoadingData } =
    useDogs();

  return (
    <>
      {dogsList[activeTab].map((dog) => {
        return (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            onHeartClick={() => {
              toggleFavorite(dog.id, false);
            }}
            onEmptyHeartClick={() => {
              toggleFavorite(dog.id, true);
            }}
            isLoading={isLoadingData}
          />
        );
      })}
    </>
  );
};
