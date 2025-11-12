import React from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
export default function Home(){
  const [items,setItems]=React.useState([])
  React.useEffect(()=>{ axios.get('/api/products').then(r=>setItems(r.data)).catch(()=>{}) },[])
  return (
    <div>
      <div className='rounded-lg p-6 mb-6 bg-gradient-to-r from-invizon-50 to-white'>
        <h1 className='text-3xl font-bold text-invizon-700'>Shop everything, everywhere — Invizon</h1>
        <p className='text-slate-600 mt-2'>Aggregated demo of multiple stores.</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {items.map(p=> <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
