import { fetchData } from "./lib/fetchData";
import { ToDoList } from "./components/ToDoList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ToDo } from "./types";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["toDos"],
    queryFn: fetchData,
  });

  const initialData = queryClient.getQueryData<ToDo[]>(["toDos"]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToDoList initialData={initialData} />
    </HydrationBoundary>
  );
}
