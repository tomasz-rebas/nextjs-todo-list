export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

export type Filter = "All" | "Completed" | "Unfinished";
