import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const usersRef = collection(db, "users")
    const q = query(usersRef, where("username", "==", username))
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot.empty)

    if (!querySnapshot.empty) {
      return NextResponse.json({
        error: "Username already exists"
      }, { status: 400 })
    }

    const docRef = await addDoc(usersRef, {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}