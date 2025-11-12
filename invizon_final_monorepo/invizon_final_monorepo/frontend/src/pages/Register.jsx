import React from 'react'
import axios from 'axios'
import { saveToken, saveUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
export default function Register(){
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [username,setUsername]=React.useState('')
  const nav = useNavigate()
  const submit=(e)=>{ e.preventDefault(); axios.post('/api/auth/register',{email,password,username}).then(r=>{ saveToken(r.data.token); saveUser(r.data.user); alert('Registered'); nav('/'); }).catch(err=>alert(err.response?.data?.error||'Register failed')) }
  return (<div className='max-w-md mx-auto'><h2 className='text-2xl font-semibold mb-4'>Register</h2><form onSubmit={submit} className='space-y-3'><input value={username} onChange={e=>setUsername(e.target.value)} placeholder='Username' className='w-full p-2 border rounded' /><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='w-full p-2 border rounded' /><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' className='w-full p-2 border rounded' /><div><button className='px-4 py-2 rounded bg-gradient-to-r from-invizon-500 to-invizon-600 text-white'>Register</button></div></form></div>)
}
