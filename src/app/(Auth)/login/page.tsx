import { LoginForm } from "@/components"
import { getToken } from "@/actions"
import { redirect } from "next/navigation"

async function checkToken () {
  const response = await getToken()
  // console.log(response)
  if(response?.value) redirect("/dashboard")
}

const LoginPage = async () => {
  await checkToken()
  
  return (
    <LoginForm />
  )
}

export default LoginPage