"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";
import { RegisterFormProps, LoginFormProps, TokenResponse, Token, UserData } from "@/types";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";

export async function createUser(formData: RegisterFormProps) {
    const hashedPassword = await bcrypt.hash(formData.password, 10)

    await prisma.user.create({
        data: {
            email: formData.email,
            name: formData.fullName,
            password: hashedPassword,
            role: formData.role
        }
    })
    revalidatePath("/")
}

export async function login(formData: LoginFormProps): Promise<TokenResponse> {
    try {
        const userData = await prisma.user.findUnique({
            where: {
                email: formData.email,
            }
        })

        const matchPassword = await bcrypt.compare(formData.password, `${userData?.password}`)

        if (matchPassword) {
            const token = jwt.sign({
                data: userData
            }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });

            cookies().set("token", token)

            return {
                token: token,
                status: 200
            }
        } else {
            return {
                token: null,
                status: 401
            }
        }
    } catch (err) {
        return {
            token: null,
            status: 401
        }
    }
}

export async function getToken(): Promise<Token>  {
    const token = cookies().get("token")
    if (!token) redirect("/login")
    return token
}

export async function getUserData(): Promise<UserData>{
    const token = cookies().get("token")
    const decodedUser = jwt.decode(`${token?.value}`) as UserData
    return decodedUser
}
