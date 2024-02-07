import Logout from "@/components/Logout/Logout"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="border border-black flex justify-between">
        <ul className="flex gap-4 ">
          <li>Pedidos</li>
          <li>Usuarios</li>
          <li>Menu</li>
        </ul>

        <ul>
          <Logout />
        </ul>
      </nav>
      {children}
    </section>
  )
}