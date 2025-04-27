"use client";

import { useQuery } from "@tanstack/react-query";
import { ToDo } from "./types";
import { ToDoElement } from "./components/ToDoElement";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const fetchData = async (): Promise<ToDo[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data: ToDo[] = await response.json();

  return data.map(({ userId, ...rest }) => rest);
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });

  return (
    <div>
      <h1 className="text-4xl text-center my-8">ToDo List</h1>
      <div className="flex flex-col items-center">
        {data?.map((toDo) => (
          <ToDoElement key={toDo.id} toDo={toDo} />
        ))}
      </div>
    </div>
  );
}
