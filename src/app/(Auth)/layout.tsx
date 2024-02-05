interface LayoutProps {
    children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center border border-green-500">
            <main>{children}</main>
        </div>
    )
}