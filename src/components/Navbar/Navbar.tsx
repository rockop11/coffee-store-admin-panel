"use client"
import { deleteToken } from "@/actions"
import { useRouter } from "next/navigation"
import { Button } from "../ui"

export const Navbar = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await deleteToken()
        router.push("/login")
    }

    return (
        <nav className="border border-black flex justify-end">
            <ul>
                <Button onClick={handleLogout} value={"Cerrar sesión"}/>
            </ul>
        </nav>
    )
}