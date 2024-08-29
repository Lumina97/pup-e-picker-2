import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";

//Im sure you'll let me know but im wondering if the amount of stuff I "provide" here is too much and if I should split this up
//but since it's all related to the same thing I don't see how I could.
type TDogsProvider = {
  isLoadingData: boolean;
  dogsList: Record<TActiveTab, Dog[]>;
  activeTab: TActiveTab;
  setActiveTab: (newActiveTab: TActiveTab) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  deleteDog: (id: number) => void;
  toggleFavorite: (id: number, isFavorite: boolean) => void;
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

  const deleteDog = (id: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== id));

    Requests.deleteDogRequest(id).catch(() => setAllDogs(allDogs));
  };

  const toggleFavorite = (id: number, isFavorite: boolean) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === id ? { ...dog, isFavorite: isFavorite } : dog
      )
    );

    Requests.patchFavoriteForDog(id, { isFavorite: isFavorite }).catch(() =>
      setAllDogs(allDogs)
    );
  };

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
    void Requests.getAllDogs().then((dogs: Dog[]) => {
      setAllDogs(dogs);
    });
  };

  useEffect(() => {
    getAllDogs();
  }, []);

  return (
    <DogsContext.Provider
      value={{
        isLoadingData,
        dogsList,
        activeTab,
        setActiveTab,
        deleteDog,
        toggleFavorite,
        createDog,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
