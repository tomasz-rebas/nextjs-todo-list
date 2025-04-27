"use client";

import { useQuery } from "@tanstack/react-query";
import { Filter, ToDo } from "./types";
import { ToDoElement } from "./components/ToDoElement";
import { useEffect, useState } from "react";
import { Filtering } from "./components/Filtering";

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
  const [filter, setFilter] = useState<Filter>("ALL");

  useEffect(() => {
    if (data) {
      setToDos(data);
    }
  }, [data]);

  const filteredTodos = toDos.filter((element) => {
    if (filter === "COMPLETED") return element.completed;
    if (filter === "UNFINISHED") return !element.completed;
    return true;
  });

  return (
    <div>
      <header className="text-center">
        <h1 className="text-4xl my-8">ToDo List</h1>
      </header>
      <main className="flex justify-center">
        <div className="w-[500px]">
          <Filtering filter={filter} setFilter={setFilter} />
          <div className="flex flex-col items-start">
            {filteredTodos?.map((toDo) => (
              <ToDoElement key={toDo.id} toDo={toDo} setToDos={setToDos} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
