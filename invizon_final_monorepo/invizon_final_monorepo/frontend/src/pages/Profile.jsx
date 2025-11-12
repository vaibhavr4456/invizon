import React from 'react'
import axios from 'axios'
import { getToken } from '../utils/auth'
export default function Profile(){
  const [user,setUser]=React.useState(null)
  const [addresses,setAddresses]=React.useState([])
  const [form,setForm]=React.useState({name:'',street:'',city:'',state:'',zip:'',phone:''})
  const loadUser = ()=>{ const token = getToken(); if(!token) return; axios.get('/api/auth/me',{ headers:{ Authorization:'Bearer '+token } }).then(r=>setUser(r.data)).catch(()=>{}) }
  const loadAdd = ()=>{ const token=getToken(); if(!token) return; axios.get('/api/addresses',{ headers:{ Authorization:'Bearer '+token } }).then(r=>setAddresses(r.data)).catch(()=>{}) }
  React.useEffect(()=>{ loadUser(); loadAdd() },[])
  const submit = (e)=>{ e.preventDefault(); const token=getToken(); axios.post('/api/addresses', form, { headers:{ Authorization:'Bearer '+token } }).then(()=>{ setForm({name:'',street:'',city:'',state:'',zip:'',phone:''}); loadAdd() }) }
  return (<div><h2 className='text-2xl font-semibold mb-4'>Profile</h2><div>Email: {user?.email}</div><div className='mt-4'><h3 className='font-semibold'>Addresses</h3><form onSubmit={submit} className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-2'><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder='Name' className='p-2 border rounded' /><input value={form.street} onChange={e=>setForm({...form,street:e.target.value})} placeholder='Street' className='p-2 border rounded' /><input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder='City' className='p-2 border rounded' /><input value={form.state} onChange={e=>setForm({...form,state:e.target.value})} placeholder='State' className='p-2 border rounded' /><input value={form.zip} onChange={e=>setForm({...form,zip:e.target.value})} placeholder='ZIP' className='p-2 border rounded' /><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder='Phone' className='p-2 border rounded' /><div className='md:col-span-2'><button className='px-4 py-2 rounded bg-gradient-to-r from-invizon-500 to-invizon-600 text-white'>Add Address</button></div></form><div className='mt-4'>{addresses.map(a=> (<div key={a.id} className='p-3 border rounded mb-2'><div className='font-semibold'>{a.name} - {a.phone}</div><div className='text-sm'>{a.street}, {a.city}, {a.state} - {a.zip}</div></div>))}</div></div></div>)
}
