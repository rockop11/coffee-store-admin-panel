"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import { login } from "@/actions"
import { LoginFormProps } from "@/types"
import Link from "next/link"

export const LoginForm = () => {

  const router = useRouter()

  const [formValue, setFormValue] = useState<LoginFormProps>({
    email: "",
    password: ""
  })

  const formValueHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    const { status } = await login(formValue)

    if (status !== 401) {
      router.push("/dashboard")
    }
  }

  return (
    <>
      <h3>Ingresa</h3>
      <form
        className="flex flex-col justify-center items-center p-16 gap-8 rounded-md shadow-lg"
        onSubmit={handleSubmit}
        autoComplete="false"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-b-[1px] ml-2 outline-none"
          onChange={formValueHandler}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="border-b-[1px] ml-2 outline-none"
          onChange={formValueHandler}
        />

        <button
          className=" rounded bg-brown p-2 text-white"
        >
          Ingresar
        </button>

        <p>No tenés cuenta? <Link href="/register" className="text-brown">Registrate</Link></p>
      </form>
    </>
  )
}