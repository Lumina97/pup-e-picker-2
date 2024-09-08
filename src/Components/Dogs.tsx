import { useDogs } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { activeDogsList, deleteDog, toggleFavorite, isLoadingData } =
    useDogs();

  return (
    <>
      {activeDogsList.map((dog) => {
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
              void deleteDog(dog.id);
            }}
            onHeartClick={() => {
              void toggleFavorite(dog.id, false);
            }}
            onEmptyHeartClick={() => {
              void toggleFavorite(dog.id, true);
            }}
            isLoading={isLoadingData}
          />
        );
      })}
    </>
  );
};
