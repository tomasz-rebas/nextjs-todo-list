import { ToDoList } from "./components/ToDoList";
import { ToDo } from "./types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default async function Home() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data: ToDo[] = await response.json();
    const filteredData = data.map(({ userId, ...rest }) => rest);

    return <ToDoList data={filteredData} error={null} />;
  } catch (err) {
    console.error(err);
    return <ToDoList data={[]} error="Failed to fetch the data." />;
  }
}
