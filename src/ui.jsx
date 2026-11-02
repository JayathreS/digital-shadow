import {useNavigate} from 'react-router-dom'
import {ArrowLeft,Check} from 'lucide-react'
export const Logo=({size=34})=><span className="logo"><svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#6D28D9"/></linearGradient></defs><path d="M32 6 54 14v17c0 13-9 22-22 27C19 53 10 44 10 31V14z" fill="url(#lg)"/><path d="M32 6v52C19 53 10 44 10 31V14z" fill="#0B1020" opacity=".35"/><circle cx="32" cy="28" r="6" fill="#6EE7B7"/></svg>DIGITAL SHADOW</span>
export const Toast=({msg})=>msg?<div className="toast" role="status">{msg}</div>:null
export const Back=({title})=>{const n=useNavigate();return <div className="top"><button className="btn" onClick={()=>n(-1)} aria-label="Go back"><ArrowLeft size={20}/></button><h1 style={{margin:0}}>{title}</h1></div>}
export const Note=({children})=><div className="note">{children}</div>
export const Item=({on,onClick,children})=><button className={'chk'+(on?' on':'')} onClick={onClick} role="checkbox" aria-checked={on}><span className="box">{on&&<Check size={16}/>}</span><span>{children}</span></button>
export const Bar=({v})=><div className="bar" role="progressbar" aria-valuenow={v} aria-valuemin="0" aria-valuemax="100"><i style={{width:v+'%'}}/></div>
