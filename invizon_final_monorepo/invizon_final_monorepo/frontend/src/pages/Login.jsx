import React from 'react'
import axios from 'axios'
import { saveToken, saveUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const nav = useNavigate()
  const submit=(e)=>{ e.preventDefault(); axios.post('/api/auth/login',{email,password}).then(r=>{ saveToken(r.data.token); saveUser(r.data.user); alert('Logged in'); nav('/'); }).catch(err=>alert(err.response?.data?.error||'Login failed')) }
  return (<div className='max-w-md mx-auto'><h2 className='text-2xl font-semibold mb-4'>Login</h2><form onSubmit={submit} className='space-y-3'><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='w-full p-2 border rounded' /><input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' className='w-full p-2 border rounded' /><div><button className='px-4 py-2 rounded bg-gradient-to-r from-invizon-500 to-invizon-600 text-white'>Login</button></div></form></div>)
}
