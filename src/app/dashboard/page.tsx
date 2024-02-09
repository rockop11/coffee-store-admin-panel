import { getToken, getUserData } from "@/actions"
import { redirect } from "next/navigation"

async function checkToken() {
    const response = await getToken()

    if (!response) {
        redirect("/login")
    } else {
        const userData = await getUserData()
        return userData
    }
}

const DashboardPage = async () => {
    const userData = await checkToken()

    return (
        <div>
            <h3>Hola {userData?.data?.fullName}</h3>
        </div>
    )
}

export default DashboardPage