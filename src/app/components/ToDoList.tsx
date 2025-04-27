"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, ToDo } from "../types";
import { ToDoElement } from "./ToDoElement";
import { Filtering } from "./Filtering";
import { fetchData } from "../lib/fetchData";

interface Props {
  initialData?: ToDo[];
}

export const ToDoList = ({ initialData }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["toDos"],
    queryFn: fetchData,
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    if (data) {
      setToDos(data);
    }
  }, [data]);

  const filteredTodos = toDos.filter((element) => {
    if (filter === "Completed") return element.completed;
    if (filter === "Unfinished") return !element.completed;
    return true;
  });

  if (isLoading) {
    return <div>Fetching data...</div>;
  }

  if (error) {
    return (
      <div className="text-red-800 font-bold">Failed to fetch the data.</div>
    );
  }

  return (
    <>
      <Filtering filter={filter} setFilter={setFilter} />
      <div className="flex flex-col items-start pb-12">
        {filteredTodos?.map((toDo) => (
          <ToDoElement key={toDo.id} toDo={toDo} setToDos={setToDos} />
        ))}
      </div>
    </>
  );
};
