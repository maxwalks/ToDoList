"use server"
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore"
import { Task } from "@types"

export async function fetchTasks (userId: string) {
    try {
        const q = query(
            collection(db, "tasks"),
            where("userId", "==", userId)
        )
        const snapshot = await getDocs(q)
        const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Task[]

        return tasks
    } catch (error) {
        console.error(error)
        return {
            error: "An unexpected error occurred"
        }
    }
}