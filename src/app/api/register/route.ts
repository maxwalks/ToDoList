import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const docRef = await addDoc(collection(db, "users"), {
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
