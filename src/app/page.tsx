import { ToDoList } from "./components/ToDoList";
import { ToDo } from "./types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default async function Home() {
  let initialData: ToDo[] = [];
  let error: string | null = null;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data: ToDo[] = await response.json();
    initialData = data.map(({ userId, ...rest }) => rest);
  } catch (err) {
    console.error(err);
    error = "Failed to fetch the data.";
  }

  return <ToDoList initialData={initialData} error={error} />;
}
