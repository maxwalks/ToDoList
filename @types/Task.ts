interface Task {
    id?: string,
    item: string,
    priority: "low" | "med" | "high",
    date: string,
    userId: string
}

export default Task