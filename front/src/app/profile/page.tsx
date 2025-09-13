"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/auth-client"
import Link from "next/link"

export default function ProfilePage() {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}