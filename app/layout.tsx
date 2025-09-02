
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Autocrest',
  description: 'Premium Car Workshop — Book, Track, and Pay',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="container py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">Autocrest</Link>
            <div className="flex gap-4">
              <Link href="/book" className="btn">Book Service</Link>
              <Link href="/status" className="btn">Track Status</Link>
              <Link href="/admin" className="btn">Admin</Link>
            </div>
          </nav>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-10 text-sm text-gray-500">© Autocrest {new Date().getFullYear()}</footer>
      </body>
    </html>
  )
}
