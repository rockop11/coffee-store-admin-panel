"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { FormProps } from "@/types";
import bcrypt from "bcrypt"
import { User } from "@prisma/client";

export async function createUser(formData: FormProps) {

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