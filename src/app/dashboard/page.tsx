import { getToken, getUserData } from "@/actions"

const DashboardPage = async () => {
    await getToken()
    const { data } = await getUserData();

    return (
        <div>
            <h3>Hola {data?.name}</h3>
        </div>
    )
}

export default DashboardPage