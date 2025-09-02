
'use client'
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'

export default function AdminPanel() {
  const [id, setId] = useState('')
  const [state, setState] = useState('IN_PROGRESS')
  const [msg, setMsg] = useState('')

  async function updateState(e:any){
    e.preventDefault()
    try{
      const ref = doc(db, 'bookings', id.trim())
      const snap = await getDoc(ref)
      if(!snap.exists()){ setMsg('Booking not found'); return }
      await updateDoc(ref, {
        state,
        history: arrayUnion({ state, at: Timestamp.now() })
      })
      setMsg('Updated!')
    }catch(err:any){ setMsg(err.message || 'Failed') }
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Admin — Update Booking</h2>
      <form onSubmit={updateState} className="grid md:grid-cols-3 gap-3 items-end">
        <div><label>Booking ID</label><input value={id} onChange={e=>setId(e.target.value)} required/></div>
        <div>
          <label>New State</label>
          <select value={state} onChange={e=>setState(e.target.value)}>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="READY">READY</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
