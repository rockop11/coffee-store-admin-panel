export type RegisterFormProps = {
    email: string,
    fullName: string,
    password: string,
    role: string
}

export type LoginFormProps = {
    email: string,
    password: string
}

export type UserData = {
    data: {
        email: string,
        id: string,
        password: string,
        fullName: string,
        role: string,
    }
    createdAt: Date,
    updatedAt: Date
}

export type TokenResponse = {
    token: string | null,
    status: number
}

export type Token = {
    name: string,
    value: string
}