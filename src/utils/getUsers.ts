"use server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getUsers() {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const usersList = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(usersList);
    return usersList;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
}