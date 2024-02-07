import { getToken, getUserData } from "@/actions"
import { UserData } from "@/types"
import { redirect } from "next/navigation"
// import Logout from "@/components/Logout/Logout"

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
            <h3>Hola {userData?.data?.name}</h3>
        </div>
    )
}

export default DashboardPage