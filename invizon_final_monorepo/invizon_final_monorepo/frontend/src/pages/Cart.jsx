import React from 'react'
import axios from 'axios'
import { getToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
export default function Cart(){
  const [items,setItems]=React.useState([])
  const nav = useNavigate()
  const load = ()=>{ const token=getToken(); if(!token){ setItems([]); return } axios.get('/api/cart',{ headers:{ Authorization:'Bearer '+token } }).then(r=>setItems(r.data)).catch(()=>{}) }
  React.useEffect(()=>{ load() },[])
  const proceed = ()=>{ if(items.length===0) return alert('Cart empty'); const first = items[0]; // redirect to checkout_url if present else external_url
    const url = first.checkout_url || first.external_url; window.location.href = url; }
  return (<div><h2 className='text-2xl font-semibold mb-4'>Your Cart</h2>{items.length===0 ? <div>Your cart is empty (login required)</div> : (<div className='space-y-4'>{items.map(it=> (<div key={it.id} className='flex items-center gap-4 border p-3 rounded'><img src={it.images?.[0]||'/assets/placeholder.png'} alt='' className='w-20 h-20 object-contain' /><div className='flex-1'><div className='font-semibold'>{it.title}</div><div className='text-sm text-slate-600'>{it.store}</div></div><div className='font-bold'>₹{it.price*it.qty}</div></div>))}<div className='text-right font-bold'>Total: ₹{items.reduce((s,i)=>s+i.price*i.qty,0)}</div><div className='text-right mt-2'><button onClick={proceed} className='px-4 py-2 rounded bg-gradient-to-r from-invizon-500 to-invizon-600 text-white'>Proceed to Checkout</button></div></div>)}</div>)
}
