"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/utils/prisma";
import { RegisterFormProps, LoginFormProps, TokenResponse, UserData } from "@/types";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function createUser(formData: RegisterFormProps) {
    const { email, fullName, password, role } = formData

    if (!email.length ||
        !fullName.length ||
        !password.length ||
        !role.length
    ) {
        return {
            message: "error",
            status: 400
        }
    } else {
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email: formData.email,
                fullName: formData.fullName,
                password: hashedPassword,
                role: formData.role
            }
        })
        revalidatePath("/")

        return {
            status: 200,
            message: "user created"
        }
    }
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

export async function getToken() {
    const token = cookies().get("token")
    return token
}

export async function getUserData(): Promise<UserData> {
    const token = cookies().get("token")
    const decodedUser = jwt.decode(`${token?.value}`) as UserData
    return decodedUser
}

export async function deleteToken() {
    cookies().delete("token")
}
