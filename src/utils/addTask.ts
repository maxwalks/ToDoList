import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { Task } from "@types"

export async function addTask (task : Task) {
    try {
        const { item, priority, date, userId } = task
        await addDoc(collection(db, "tasks"), {
            item,
            priority,
            date,
            userId
        })
    } catch (error) {
        console.error(error)
        return {
            error: "An unexpected error occurred."
        }
    }
}