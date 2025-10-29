export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="p-4 bg-white shadow">User Header</header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
