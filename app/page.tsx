
import Link from 'next/link'

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <section className="card">
        <h1 className="text-2xl font-semibold mb-2">Premium Multi‑Brand Service</h1>
        <p className="text-gray-600 mb-4">Book a slot, track your vehicle in real‑time, receive estimates, and pay securely. Built for Autocrest Gurgaon.</p>
        <div className="flex gap-3">
          <Link href="/book" className="btn btn-primary">Book Service</Link>
          <Link href="/status" className="btn">Track Status</Link>
        </div>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold mb-2">What’s inside</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Phone OTP Auth (Firebase) — optional, can start without</li>
          <li>Booking form → Firestore “bookings”</li>
          <li>Status timeline (Pending → In‑Progress → Ready)</li>
          <li>Admin page to update status</li>
          <li>PWA ready (installable, offline shell)</li>
        </ul>
      </section>
    </div>
  )
}
