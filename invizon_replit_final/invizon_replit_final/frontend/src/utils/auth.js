export function saveToken(token){ localStorage.setItem('invizon_token', token); }
export function getToken(){ return localStorage.getItem('invizon_token'); }
export function logout(){ localStorage.removeItem('invizon_token'); localStorage.removeItem('invizon_user'); }
export function saveUser(u){ localStorage.setItem('invizon_user', JSON.stringify(u)); }
export function getUser(){ try { return JSON.parse(localStorage.getItem('invizon_user')); } catch(e){ return null } }
