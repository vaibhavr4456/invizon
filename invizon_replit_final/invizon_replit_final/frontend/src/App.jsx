import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import RedirectPage from './pages/RedirectPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Addresses from './pages/Addresses'
import Header from './components/Header'
export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/redirect/:cartItemId" element={<RedirectPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/addresses" element={<Addresses/>} />
        </Routes>
      </main>
      <footer className="bg-invizon-800 text-white py-4 text-center">Invizon • Prototype</footer>
    </div>
  )
}
