"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { FaUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa6";
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

    const [validations, setValidations] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const showPasswordHandler = () => {
        setShowPassword(!showPassword)
    }

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

        if (status === 200) {
            router.push("/dashboard")
        }

        if (status === 401) {
            setValidations("credenciales invalidas")
        }
    }

    return (
        <div className="
            flex flex-col justify-center items-center
            py-2 gap-4
            shadow-lg
            w-[85%]
            md:max-w-[400px]
        ">
            <h3>Ingresa</h3>

            <form
                className="
                    flex flex-col gap-8 p-2
                "
                onSubmit={handleSubmit}
            >
                <div className="flex items-center gap-4">
                    <FaUser className={`text-gray ${validations && "text-red"}`} />
                    <input
                        className={`border-b border-gray outline-none text-gray p-1 ${validations && "border-red"}`}
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formValueHandler}
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
                        onChange={formValueHandler}
                    />
                </div>

                {
                    validations && (
                        <div className="text-center">
                            <p className="text-red">credenciales invalidas</p>
                        </div>
                    )
                }

                <button className="bg-blue p-1 text-white">
                    Ingresar
                </button>

                <p className="text-gray">No tenés cuenta? <Link href="/register" className="text-blue">Registrate</Link></p>
            </form>
        </div>
    )
}