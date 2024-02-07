"use client"
import { deleteToken } from "@/actions"
import { useRouter } from "next/navigation"


const Logout = () => {

    const router = useRouter()

    const handleLogout = async () => {
        await deleteToken()
        router.push("/login")
    }

    return (
        <div>
            <button
                onClick={handleLogout}
                className="border border-brown rounded"
            >
                Cerrar Sesion
            </button>
        </div>
    )
}

export default Logout