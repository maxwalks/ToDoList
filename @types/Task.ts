interface Task {
  item: string;
  priority: "low" | "med" | "high";
  date: string;
}

export default Task