import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Search,ShieldCheck,FileText,Flag,Copy,Download,Trash2,ExternalLink,Play,ChevronRight} from 'lucide-react'
import {Logo,Back,Note,Item,Bar} from './ui.jsx'
import {FEATURES,TYPES,SCENARIOS,RULES,STEPS,CHECK,EVID,DEMO} from './data.js'
const ICON={recognise:Search,protect:ShieldCheck,preserve:FileText,act:Flag}
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}}
const PRIV='Your information stays under your control. This prototype processes demo inputs locally and does not send them to external servers.'
const Features=()=><div className="grid">{FEATURES.map(([k,t,d])=>{const I=ICON[k];return <Link key={k} to={'/'+k} className="card" style={{color:'inherit',textDecoration:'none'}}><I color="#C4B5FD"/><h3>{t.toUpperCase()}</h3><p className="mu sm">{d}</p></Link>})}</div>

export function Welcome(){return <>
 <div className="hero"><Logo size={40}/><h1 style={{marginTop:18}}>From Online Threats to Informed Action.</h1>
 <p>Your digital safety companion. Recognise warning signs, protect your privacy, preserve important information, and discover your next steps.</p>
 <Link to="/home" className="btn mint full" style={{marginTop:10}}>START SAFETY CHECK</Link></div>
 <h2>Four stages</h2><Features/><Note>{PRIV}</Note>
 <Link to="/about" className="btn full">About Digital Shadow</Link></>}

export function HomePage({toast}){
 const [act,setAct]=useState(store.get('ds_activity',[]))
 const clear=()=>{['ds_check','ds_activity'].forEach(k=>localStorage.removeItem(k));setAct([]);toast('All local data cleared')}
 return <><Logo/><h1 style={{marginTop:14}}>Welcome back</h1><p className="mu">Choose where to start. You decide what to do at each step.</p>
 <div style={{display:'flex',gap:8,flexWrap:'wrap'}}><Link to="/recognise" className="btn pri">Start Safety Check</Link><Link to="/demo" className="btn"><Play size={18}/>Demo Mode</Link></div>
 <h2>Core features</h2><Features/>
 <h2>Recent demo activity</h2><div className="card">{act.length?<ul style={{margin:0}}>{act.map((a,i)=><li key={i}>{a}</li>)}</ul>:<p className="mu sm" style={{margin:0}}>Nothing yet. Run a safety check or the demo.</p>}</div>
 <Note>{PRIV}</Note><div className="card"><h3>About</h3><p className="mu sm">Digital Shadow is an early-stage concept prototype for SDG 5 Gender Equality.</p><Link to="/about">Read more</Link></div>
 <button className="btn full" onClick={clear}><Trash2 size={18}/>Clear All Local Data</button></>}

export function Recognise(){
 const [type,setType]=useState(TYPES[0]),[text,setText]=useState(''),[res,setRes]=useState(null),[err,setErr]=useState('')
 const run=()=>{if(!text.trim()){setErr('Enter or choose an example message first.');setRes(null);return}
  setErr('');const hit=RULES.filter(r=>r[3].test(text));const n=hit.length
  setRes({hit,lvl:n===0?0:n<3?1:2});const a=store.get('ds_activity',[]);store.set('ds_activity',[`Checked a ${type.toLowerCase()} (${n} warning sign${n===1?'':'s'})`,...a].slice(0,3))}
 const L=[['No obvious warning signs detected.','l0'],['Some warning signs detected.','l1'],['Multiple warning signs detected.','l2']]
 return <><Back title="Recognise"/><p className="mu">Check an example message for common online warning signs.</p>
 <Note>Do not paste passwords, OTPs, or sensitive personal information. Analysis runs on your device using simple rules. It is not AI and cannot confirm whether something is malicious.</Note>
 <label>What are you checking?</label><div className="chips">{TYPES.map(t=><button key={t} className={'chip'+(t===type?' on':'')} onClick={()=>setType(t)} aria-pressed={t===type}>{t}</button>)}</div>
 <label>Demo scenarios</label><div className="chips">{SCENARIOS.map(([n,s])=><button key={n} className="chip" onClick={()=>{setText(s);setRes(null);setErr('')}}>{n}</button>)}</div>
 <label htmlFor="m">Message text (shown as plain text only; links are never opened)</label><textarea id="m" rows="5" value={text} onChange={e=>setText(e.target.value)} placeholder="Paste an example message"/>
 {err&&<p className="err" role="alert">{err}</p>}
 <button className="btn pri" onClick={run}>Analyse</button> <button className="btn" onClick={()=>{setText('');setRes(null);setErr('')}}>CLEAR INPUT</button>
 {res&&<div className="card" aria-live="polite"><span className={'pill '+L[res.lvl][1]}>{L[res.lvl][0]}</span>
  {res.hit.map(r=><div key={r[0]} style={{marginTop:12}}><h3>{r[1]}</h3><p className="mu sm">{r[2]}</p></div>)}
  <h2>Suggested safety steps</h2><ul>{STEPS.map(s=><li key={s}>{s}</li>)}</ul>
  <Note>Limitations: rule-based checks can miss real threats (false negatives) and flag harmless messages (false positives). Use your own judgement and trusted verification.</Note></div>}</>}

export function Protect({toast}){
 const [d,setD]=useState(()=>store.get('ds_check',{}));const tot=CHECK.reduce((a,c)=>a+c[2].length,0),done=Object.values(d).filter(Boolean).length,pc=Math.round(done/tot*100)
 const tg=k=>{const n={...d,[k]:!d[k]};setD(n);store.set('ds_check',n)}
 return <><Back title="Protect"/><div className="card"><b>{pc}% complete</b> <span className="mu sm">({done} of {tot})</span><Bar v={pc}/></div>
 {CHECK.map(([t,e,items])=><div className="card" key={t}><h3>{t}</h3><p className="mu sm">{e}</p>{items.map(i=><Item key={i} on={!!d[t+i]} onClick={()=>tg(t+i)}>{i}</Item>)}</div>)}
 <p className="mu sm">Progress is saved only on this device.</p>
 <button className="btn" onClick={()=>{setD({});store.set('ds_check',{});toast('Checklist reset')}}>Reset Checklist</button></>}

export function Preserve({toast}){
 const empty={cat:'',date:'',time:'',plat:'',acc:'',desc:''},[f,setF]=useState(empty),[er,setEr]=useState({}),[sum,setSum]=useState(''),[c,setC]=useState({})
 const set=k=>e=>setF({...f,[k]:e.target.value})
 const gen=()=>{const x={};if(!f.cat)x.cat='Choose a category.';if(!f.date)x.date='Enter the date.';if(!f.plat.trim())x.plat='Enter the platform.';if(f.desc.trim().length<10)x.desc='Add a short description (at least 10 characters).'
  setEr(x);if(Object.keys(x).length)return
  setSum(`DIGITAL SHADOW - INCIDENT NOTES\nCategory: ${f.cat}\nDate: ${f.date}\nApproximate time: ${f.time||'Not recorded'}\nPlatform: ${f.plat}\nAccount identifier: ${f.acc||'Not recorded'}\nDescription: ${f.desc}\n\nNote: Personal documentation guidance only. Not a legally verified record. Created on this device.`);toast('Summary generated')}
 const copy=async()=>{try{await navigator.clipboard.writeText(sum);toast('Copied to clipboard')}catch{toast('Copy failed. Select the text manually.')}}
 const dl=()=>{const u=URL.createObjectURL(new Blob([sum],{type:'text/plain'})),a=document.createElement('a');a.href=u;a.download='digital-shadow-summary.txt';a.click();URL.revokeObjectURL(u);toast('Downloaded')}
 return <><Back title="Preserve"/><p className="mu">Document what happened without exposing more private information than needed.</p>
 <div className="card">{EVID.map(i=><Item key={i} on={!!c[i]} onClick={()=>setC({...c,[i]:!c[i]})}>{i}</Item>)}</div>
 <Note>This is documentation guidance, not a legal evidence verification system, and it does not claim legal admissibility. Do not enter intimate images or private media. Nothing is uploaded or saved.</Note>
 <h2>Incident notes</h2>
 <label htmlFor="c">Incident category</label><select id="c" value={f.cat} onChange={set('cat')}><option value="">Select</option>{TYPES.map(t=><option key={t}>{t}</option>)}</select>{er.cat&&<p className="err">{er.cat}</p>}
 <label htmlFor="d">Date</label><input id="d" type="date" value={f.date} onChange={set('date')}/>{er.date&&<p className="err">{er.date}</p>}
 <label htmlFor="t">Approximate time</label><input id="t" type="time" value={f.time} onChange={set('time')}/>
 <label htmlFor="p">Platform</label><input id="p" value={f.plat} onChange={set('plat')} placeholder="e.g. Instagram, WhatsApp"/>{er.plat&&<p className="err">{er.plat}</p>}
 <label htmlFor="a">Account identifier (optional)</label><input id="a" value={f.acc} onChange={set('acc')} placeholder="Username or handle"/>
 <label htmlFor="s">Short description</label><textarea id="s" rows="4" value={f.desc} onChange={set('desc')}/>{er.desc&&<p className="err">{er.desc}</p>}
 <button className="btn pri full" onClick={gen}>GENERATE EVIDENCE SUMMARY</button>
 {sum&&<><pre>{sum}</pre><button className="btn row" onClick={copy}><Copy size={18}/>Copy</button><button className="btn row" onClick={dl}><Download size={18}/>Download TXT</button></>}
 <button className="btn row" onClick={()=>{setF(empty);setSum('');setEr({});toast('Form cleared')}}>Clear form</button></>}

const S=({t,items})=><div className="card"><h3>{t}</h3><ul style={{margin:0}}>{items.map(i=><li key={i}>{i}</li>)}</ul></div>
export function Act(){
 return <><Back title="Act"/><p className="mu">You are in control. Every reporting decision is yours.</p>
 <S t="Platform reporting" items={['Report suspicious accounts or messages','Block or restrict unwanted accounts','Review platform safety settings']}/>
 <S t="Account recovery" items={['Use official account recovery pages','Change compromised credentials through official channels','Review active sessions']}/>
 <S t="Trusted support" items={['Speak with a trusted person where appropriate','Seek institutional or professional support','Contact emergency services if there is immediate danger']}/>
 <div className="card"><h3>India-specific resources</h3><a className="btn full" style={{margin:'6px 0'}} href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">National Cyber Crime Reporting Portal<ExternalLink size={16}/></a><p style={{margin:'10px 0 0'}}>Emergency response: <a href="tel:112"><b>112</b></a></p></div>
 <Note>External links open official websites outside this app and need internet. This guidance is general and is not legal advice.</Note></>}

export function Demo({toast}){
 const [s,setS]=useState(0),n=useNavigate(),[t,d,items]=DEMO[s]
 const fin=()=>{store.set('ds_activity',['Completed the demo walkthrough',...store.get('ds_activity',[])].slice(0,3));toast('Demo complete');n('/home')}
 return <><Back title="Demo Mode"/><Note>Fictional scenario. No real data is used.</Note>
 <div className="stages" aria-label={`Stage ${s+1} of 4`}>{DEMO.map((_,i)=><i key={i} className={i<=s?'d':''}/>)}</div>
 <div className="card"><span className="pill l0">Stage {s+1} of 4</span><h2 style={{marginTop:10}}>{t.toUpperCase()}</h2><p className="mu">{d}</p><ul>{items.map(i=><li key={i}>{i}</li>)}</ul></div>
 <div style={{display:'flex',gap:10}}><button className="btn" disabled={!s} onClick={()=>setS(s-1)} style={{opacity:s?1:.4}}>Back</button>
 {s<3?<button className="btn pri" style={{flex:1}} onClick={()=>setS(s+1)}>Next<ChevronRight size={18}/></button>:<button className="btn mint" style={{flex:1}} onClick={fin}>Finish Demo</button>}</div></>}

export function About(){return <><Back title="About"/><Logo/>
 <h2>The problem</h2><p>Women may experience online harassment, impersonation, suspicious messages, privacy violations, and uncertainty about what action to take.</p>
 <h2>The solution</h2><p>Digital Shadow brings together potential threat recognition, privacy protection, safe evidence documentation guidance, and reporting information in one user-controlled interface.</p>
 <h2>SDG alignment</h2><p>SDG 5: Gender Equality.</p>
 <h2>Expected impact</h2><ul><li>Improved digital safety awareness</li><li>Better understanding of online warning signs</li><li>More informed responses to online harassment</li><li>Improved access to reporting guidance</li><li>Privacy-conscious digital empowerment</li></ul>
 <Note>These are intended outcomes and have not been scientifically measured. Digital Shadow is an early-stage concept prototype: message analysis is simple rule matching, not AI, and cannot identify offenders or guarantee safety. Offline, the app shell, checklists and demo work after a first load; external links need internet.</Note></>}
