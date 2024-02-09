"use client"
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { MdAlternateEmail } from "react-icons/md";
import { FaLock, FaEyeSlash, FaEye, FaUser, } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";
import { createUser } from "@/actions"
import { RegisterFormProps } from "@/types"
import toast, { Toaster } from 'react-hot-toast';


export const RegisterForm = () => {
    const router = useRouter()

    const [formData, setFormData] = useState<RegisterFormProps>({
        email: "",
        fullName: "",
        password: "",
        role: ""
    })

    const [validations, setValidations] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)


    const showPasswordHandler = () => {
        setShowPassword(!showPassword)
    }

    const formDataHandler = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const { status } = await createUser(formData)

        if (status === 400) {
            console.log(status)
            setValidations(!validations)
            toast.error("Hubo un error")
        }

        if (status === 200) {
            toast.success('Se ha creado el usuario')
            setTimeout(() => {
                router.push("/login")
            }, 2000)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center
            py-2 gap-4
            shadow-lg
            w-[85%]
            md:max-w-[400px]
        ">
            <Toaster />
            <h3>Registro</h3>
            <form
                className="flex flex-col gap-8 p-2"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center gap-4">
                    <MdAlternateEmail className={`text-gray ${validations && "text-red"}`} />
                    <input
                        className={`border-b border-gray outline-none text-gray p-1 ${validations && "border-red"}`}
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formDataHandler}
                        autoComplete="off"
                    />
                </div>

                <div className="flex items-center gap-4 relative">
                    <FaLock size={16} className={`text-gray ${validations && "text-red"}`} />
                    <div className="absolute right-2">
                        {
                            showPassword
                                ? <FaEyeSlash size={16} className="text-gray" onClick={showPasswordHandler} />
                                : <FaEye size={16} className="text-gray" onClick={showPasswordHandler} />
                        }

                    </div>
                    <input
                        className={`border-b border-gray outline-none text-gray p-1 ${validations && "border-red"}`}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        onChange={formDataHandler}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <FaUser className={`text-gray ${validations && "text-red"}`} />
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Nombre Completo"
                        className={`border-b border-gray outline-none text-gray p-1 ${validations && "border-red"}`}
                        onChange={formDataHandler}
                    />
                </div>


                <div className="flex items-center gap-4">
                    <FaUserShield className={`text-gray ${validations && "text-red"}`} />
                    <select
                        name="role"
                        className={`border-b border-gray outline-none text-gray p-1 w-[100%] ${validations && "border-red"}`}
                        onChange={formDataHandler}
                    >
                        <option value="">Seleccione un rol</option>
                        <option value='User'>Usuario</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                {
                    validations && (
                        <div className="text-center">
                            <p className="text-red text-sm">Debes completar todos los campos</p>
                        </div>
                    )
                }

                <button type="submit" className="bg-blue p-1 text-white hover:bg-blueHover transition-colors">
                    Registrarse
                </button>

                <p className="text-center">Ya tenés cuenta? <Link href="/login" className="text-blue">Ingresá</Link></p>
            </form>
        </div>
    )
}


