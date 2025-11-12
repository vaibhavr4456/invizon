import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Header(){
  const [q,setQ] = React.useState('')
  const navigate = useNavigate()
  const onSearch = (e)=>{ e.preventDefault(); navigate('/?search='+encodeURIComponent(q)); }
  return (
    <header className='sticky top-0 z-50 bg-gradient-to-r from-invizon-200 to-invizon-50 shadow p-4'>
      <div className='container mx-auto flex items-center gap-4'>
        <Link to='/' className='text-2xl font-bold text-invizon-700'>Invizon</Link>
        <form onSubmit={onSearch} className='flex-1'>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search products, stores, categories' className='w-full p-2 rounded' />
        </form>
        <nav className='flex gap-2'>
          <Link to='/profile' className='px-3 py-2 rounded bg-white text-invizon-700'>Profile</Link>
          <Link to='/cart' className='px-3 py-2 rounded bg-white text-invizon-700'>Cart</Link>
        </nav>
      </div>
    </header>
  )
}
