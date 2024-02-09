interface ButtonProps {
    onClick?: () => void,
    value: string,
    type?: "submit" | "button"
}

export const Button = ({ value, type, onClick }: ButtonProps) => {
    return (
        <button
            className="bg-blue p-1 text-white hover:bg-blueHover transition-colors"
            type={type}
            onClick={onClick}>
            {value}
        </button>
    )
}
