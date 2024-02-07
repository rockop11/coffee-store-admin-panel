export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section
      className="
        w-[100%] h-[100vh] 
        flex flex-col justify-center items-center
      ">
      {children}
    </section>
  )
}