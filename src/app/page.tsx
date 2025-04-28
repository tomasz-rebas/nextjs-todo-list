import { ToDo } from "./types";
import ToDoList from "./components/ToDoList";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default async function Home() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data: ToDo[] = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredData = data.map(({ userId, ...rest }) => rest);

    return <ToDoList data={filteredData} error={null} />;
  } catch (err) {
    console.error(err);
    return <ToDoList data={[]} error="Failed to fetch the data." />;
  }
}
