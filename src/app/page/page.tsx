"use client"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function () {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log({ session, status })
  }, [status, session])

  return (
    <div>
      
      test
    </div>
  )
}
