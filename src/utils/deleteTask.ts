import { db } from "@/lib/firebase"
import { deleteDoc, doc } from "firebase/firestore"

export async function deleteTask (taskId: string) {
    try {
        await deleteDoc(doc(db, "tasks", taskId))
    } catch (error) {
        console.error(error)
        return {
            error: "An unexpected error occurred"
        }
    }
}