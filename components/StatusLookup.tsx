
'use client'
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function StatusLookup() {
  const [bookingId, setBookingId] = useState('')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string>('')

  async function fetchStatus(e:any){
    e.preventDefault()
    setError('')
    setData(null)
    try {
      const snap = await getDoc(doc(db, 'bookings', bookingId.trim()))
      if (snap.exists()) setData({ id: snap.id, ...snap.data() })
      else setError('No booking found for that ID.')
    } catch (e:any) {
      setError(e.message || 'Failed to fetch')
    }
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Track Status</h2>
      <form onSubmit={fetchStatus} className="flex gap-2">
        <input placeholder="Enter Booking ID" value={bookingId} onChange={(e)=>setBookingId(e.target.value)} required/>
        <button className="btn btn-primary">Check</button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <div className="space-y-2">
          <p><b>Name:</b> {data.name} — <b>Phone:</b> {data.phone}</p>
          <p><b>Car:</b> {data.carMake} {data.carModel} — <b>Reg:</b> {data.regNo}</p>
          <p><b>Service:</b> {data.serviceType}</p>
          <p><b>Current State:</b> {data.state}</p>
          <div>
            <b>History:</b>
            <ol className="list-decimal pl-6">
              {data.history?.map((h:any, i:number)=> <li key={i}>{h.state} — {h.at?.toDate?.().toLocaleString?.() || ''}</li>)}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
