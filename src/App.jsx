import {Routes,Route,NavLink,useLocation,Navigate} from 'react-router-dom'
import {useState,useCallback} from 'react'
import {Home as HomeI,Search,ShieldCheck,FileText,Flag} from 'lucide-react'
import {Welcome,HomePage,Recognise,Protect,Preserve,Act,Demo,About} from './pages.jsx'
import {Toast} from './ui.jsx'
const NAV=[['/home','Home',HomeI],['/recognise','Recognise',Search],['/protect','Protect',ShieldCheck],['/preserve','Preserve',FileText],['/act','Act',Flag]]
export default function App(){
 const [msg,setMsg]=useState(''),{pathname}=useLocation()
 const toast=useCallback(m=>{setMsg(m);setTimeout(()=>setMsg(''),2200)},[])
 return <>
  <main key={pathname}><Routes>
   <Route path="/" element={<Welcome/>}/><Route path="/home" element={<HomePage toast={toast}/>}/>
   <Route path="/recognise" element={<Recognise/>}/><Route path="/protect" element={<Protect toast={toast}/>}/>
   <Route path="/preserve" element={<Preserve toast={toast}/>}/><Route path="/act" element={<Act/>}/>
   <Route path="/demo" element={<Demo toast={toast}/>}/><Route path="/about" element={<About/>}/><Route path="*" element={<Navigate to="/"/>}/>
  </Routes>
  <footer>Digital Shadow | Privacy First. User in Control.</footer></main>
  <Toast msg={msg}/>
  {pathname!=='/'&&<nav className="bot" aria-label="Main">{NAV.map(([to,l,I])=><NavLink key={to} to={to}><I size={22}/>{l}</NavLink>)}</nav>}
 </>}
