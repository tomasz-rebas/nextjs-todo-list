"use client";

import { useQuery } from "@tanstack/react-query";
import { ToDo } from "./types";
import { ToDoElement } from "./components/ToDoElement";
import { useEffect, useState } from "react";

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

  const [toDos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    if (data) {
      setToDos(data.slice(190));
    }
  }, [data]);

  return (
    <div>
      <h1 className="text-4xl text-center my-8">ToDo List</h1>
      <div className="flex flex-col items-center">
        {toDos?.map((toDo) => (
          <ToDoElement key={toDo.id} toDo={toDo} setToDos={setToDos} />
        ))}
      </div>
    </div>
  );
}
