
'use client'
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

export default function BookingForm() {
  const [form, setForm] = useState({ name:'', phone:'', carMake:'', carModel:'', regNo:'', serviceType:'General Service', date:'', notes:'' })
  const [status, setStatus] = useState<'idle'|'saving'|'done'|'error'>('idle')
  const [id, setId] = useState<string>('')

  const onChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  async function submit(e: any) {
    e.preventDefault()
    try {
      setStatus('saving')
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...form,
        createdAt: Timestamp.now(),
        state: 'PENDING',
        history: [{ state: 'PENDING', at: Timestamp.now() }]
      })
      setId(docRef.id)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 card">
      <h2 className="text-xl font-semibold">Book a Service</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div><label>Name</label><input name="name" value={form.name} onChange={onChange} required/></div>
        <div><label>Phone</label><input name="phone" value={form.phone} onChange={onChange} required/></div>
        <div><label>Car Make</label><input name="carMake" value={form.carMake} onChange={onChange} placeholder="BMW / Audi / Maruti..."/></div>
        <div><label>Car Model</label><input name="carModel" value={form.carModel} onChange={onChange}/></div>
        <div><label>Registration No.</label><input name="regNo" value={form.regNo} onChange={onChange}/></div>
        <div>
          <label>Service Type</label>
          <select name="serviceType" value={form.serviceType} onChange={onChange}>
            <option>General Service</option>
            <option>Periodic Maintenance</option>
            <option>AC Repair</option>
            <option>Engine Diagnostics</option>
            <option>Body & Paint</option>
          </select>
        </div>
        <div><label>Preferred Date</label><input type="date" name="date" value={form.date} onChange={onChange}/></div>
        <div className="md:col-span-2"><label>Notes</label><textarea name="notes" value={form.notes} onChange={onChange} rows={3}/></div>
      </div>
      <button className="btn btn-primary" disabled={status==='saving'}>{status==='saving' ? 'Saving...' : 'Submit Booking'}</button>
      {status==='done' && <p className="text-green-600">Booking created! Save your ID: <b>{id}</b></p>}
      {status==='error' && <p className="text-red-600">Something went wrong. Check console & Firebase keys.</p>}
    </form>
  )
}
