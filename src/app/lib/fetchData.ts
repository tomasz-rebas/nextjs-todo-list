import { ToDo } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchData = async (): Promise<ToDo[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data: ToDo[] = await response.json();

  return data.map(({ userId, ...rest }) => rest);
};
