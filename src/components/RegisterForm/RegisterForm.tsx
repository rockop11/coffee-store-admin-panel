"use client"
import { FormEvent, useState, ChangeEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { createUser } from "@/actions"
import { RegisterFormProps } from "@/types"
import RegisterFormImage from "../../../public/images/register-form.jpeg"

export const RegisterForm = () => {

    const [formData, setFormData] = useState<RegisterFormProps>({
        email: "",
        fullName: "",
        password: "",
        role: ""
    })

    const formDataHandler = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await createUser(formData)
    }

    return (
        <div className="flex w-[750px] h-[500px] border border-slate-400 rounded-md">
            <form
                className="flex flex-col justify-center items-center p-4 gap-8 w-[50%]"
                onSubmit={handleSubmit}
            >

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border-b-[1px] ml-2 outline-none"
                    onChange={formDataHandler}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="border-b-[1px] ml-2 outline-none"
                    onChange={formDataHandler}
                />

                <input
                    type="text"
                    name="fullName"
                    placeholder="Nombre Completo"
                    className="border-b-[1px] ml-2 outline-none"
                    onChange={formDataHandler}
                />

                <select
                    name="role"
                    className="border-b-[1px] ml-2 outline-none"
                    onChange={formDataHandler}
                >
                    <option value="">Seleccione un rol</option>
                    <option value='User'>Usuario</option>
                    <option value="Admin">Admin</option>
                </select>

                <button
                    className=" rounded bg-brown p-2 text-white"
                >
                    Registrar
                </button>

                <p>Ya tenés cuenta? <Link href="/login" className="text-brown">Ingresá</Link></p>
            </form>

            <div className="relative w-[50%]">
                {/* <Image src={RegisterFormImage} alt="coffee" className="absolute brightness-50" fill priority sizes="100vw"/> */}
                <div className="relative z-10 top-[35%] flex flex-col">
                    <h2 className="text-center text-3xl text-white">Bienvenido</h2>
                    <p className="text-center text-white">completá el formulario para poder crear un usuario, y asi empezar a gestionar</p>
                </div>
            </div>
        </div>
    )
}


