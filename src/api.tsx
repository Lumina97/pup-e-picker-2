import { Dog } from "./types";
export const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  return fetch(baseUrl + "/dogs").then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
    return response.json();
  });
};

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
    return response.json();
  });
};
const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
    return response.json();
  });
};

const patchFavoriteForDog = (id: number, part: { isFavorite: boolean }) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    body: JSON.stringify(part),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
    return response.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
