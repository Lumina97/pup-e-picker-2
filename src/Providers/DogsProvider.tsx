import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";

type TDogsProvider = {
  isLoadingData: boolean;
  activeDogsList: Dog[];
  activeTab: TActiveTab;
  favoriteDogCount: number;
  nonFavoriteDogCount: number;
  setNewActiveTab: (newActiveTab: TActiveTab) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  deleteDog: (id: number) => Promise<void>;
  toggleFavorite: (id: number, isFavorite: boolean) => Promise<void>;
};

const DogsContext = createContext<TDogsProvider>({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TActiveTab>("all");

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unFavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const dogsList: Record<TActiveTab, Dog[]> = {
    all: allDogs,
    favorite: favoriteDogs,
    unFavorite: unFavoriteDogs,
    createDog: [],
  };

  const setNewActiveTab = (newTab: TActiveTab) => {
    const newValue = newTab === activeTab ? "all" : newTab;
    setActiveTab(newValue);
  };

  const deleteDog = (id: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== id));

    return Requests.deleteDogRequest(id).catch(() => setAllDogs(allDogs));
  };

  const toggleFavorite = (id: number, isFavorite: boolean) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === id ? { ...dog, isFavorite: isFavorite } : dog
      )
    );

    return Requests.patchFavoriteForDog(id, { isFavorite: isFavorite }).catch(
      () => setAllDogs(allDogs)
    );
  };

  //the reason I was not returning the promises is because I would have to always add
  //a .catch of void to the function when calling it. otherwise my compiler yells at me.
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoadingData(true);
    return Requests.postDog(dog)
      .then(() => getAllDogs())
      .catch((error) => {
        console.log(error);
        //Is this needed to tell functions that call this function that this failed? or is there another way to let the calling function know?
        throw new Error("Error creating dog!");
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };

  const getAllDogs = () => {
    return Requests.getAllDogs().then((dogs: Dog[]) => {
      setAllDogs(dogs);
    });
  };

  useEffect(() => {
    void getAllDogs();
  }, []);

  return (
    <DogsContext.Provider
      value={{
        isLoadingData,
        activeDogsList: dogsList[activeTab],
        activeTab,
        setNewActiveTab,
        deleteDog,
        favoriteDogCount: dogsList.favorite.length,
        nonFavoriteDogCount: dogsList.unFavorite.length,
        toggleFavorite,
        createDog,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
