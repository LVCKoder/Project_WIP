export type Task = {
  id: string;
  name: string;
  description: string;
  status: "ToDo" | "InProgress" | "Finished";
  priority: "Low" | "Medium" | "High";
  comments?: string[];
};