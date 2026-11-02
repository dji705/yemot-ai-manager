"use client";
import { useEffect, useMemo, useState } from "react";
type Branch = { id:string; name:string; type:string; description:string; children?:Branch[] };
const initial:Branch[] = [
 {id:"1",name:"תפריט ראשי",type:"תפריט",description:"שלוחת הכניסה הראשית",children:[
  {id:"1/1",name:"מידע ושירותים",type:"תפריט",description:"ריכוז שירותי המידע",children:[
   {id:"1/1/1",name:"שעות פעילות",type:"השמעת קובץ",description:"מידע על שעות הפעילות"},
   {id:"1/1/2",name:"כתובת ודרכי הגעה",type:"השמעת קובץ",description:"פרטי הגעה ויצירת קשר"}]},
  {id:"1/2",name:"השארת הודעה",type:"הקלטה",description:"הקלטת הודעה למערכת"},
  {id:"1/3",name:"מעבר לנציג",type:"העברה",description:"העברת השיחה לנציג"}]},
 {id:"2",name:"עדכונים",type:"תפריט",description:"שלוחת עדכונים והודעות",children:[
  {id:"2/1",name:"עדכונים אחרונים",type:"השמעת קובץ",description:"הודעות ועדכונים אחרונים"}]}
];
function BranchRow({b,selected,onSelect,depth=0}:{b:Branch;selected:string;onSelect:(b:Branch)=>void;depth?:number}) {
 const [open,setOpen]=useState(true); const has=Boolean(b.children?.length);
 return <div><div className={"tree-row "+(selected===b.id?"selected":"")} style={{paddingRight:12+depth*18}}>
  <button className="tree-toggle" onClick={()=>has&&setOpen(!open)}>{has?(open?"⌄":"›"):"·"}</button>
  <button className="branch-select" onClick={()=>onSelect(b)}><span className="branch-number">{b.id}</span><span className="branch-name">{b.name}</span></button><span className="type-tag">{b.type}</span>
 </div>{has&&open&&b.children!.map(c=><BranchRow key={c.id} b={c} selected={selected} onSelect={onSelect} depth={depth+1}/>)}</div>;
}
export default function Home(){
 const [tree,setTree]=useState(initial);const [selected,setSelected]=useState(initial[0]);const [query,setQuery]=useState("");const [prompt,setPrompt]=useState("");
 const [messages,setMessages]=useState([{role:"assistant",text:"שלום! כאן אפשר לכתוב בעברית מה תרצה לשנות במערכת. זהו ממשק ראשוני; פעולות אמיתיות יופעלו לאחר חיבור מאומת ל-API."}]);
 const [status,setStatus]=useState("בודק חיבור…");const [configured,setConfigured]=useState(false);
 useEffect(()=>{fetch("/api/status").then(r=>r.json()).then(d=>{setConfigured(d.configured);setStatus(d.message)}).catch(()=>setStatus("לא ניתן לבדוק את מצב החיבור"));},[]);
 const filtered=useMemo(()=>{const q=query.trim().toLowerCase();if(!q)return tree;const prune=(xs:Branch[]):Branch[]=>xs.flatMap(b=>{const children=b.children?prune(b.children):[];return b.name.toLowerCase().includes(q)||b.id.includes(q)||children.length?[{...b,children}]:[]});return prune(tree)},[query,tree]);
 function send(){if(!prompt.trim())return;setMessages(m=>[...m,{role:"user",text:prompt.trim()},{role:"assistant",text:"קיבלתי. כדי לבצע שינוי אמיתי בשלוחה צריך להשלים תחילה את חיבור ה-API הרשמי. שום שינוי לא נשלח כרגע לימות המשיח."}]);setPrompt("")}
 function add(){const id=window.prompt("מספר השלוחה החדשה (לדוגמה 3 או 1/4):");if(!id?.trim())return;const name=window.prompt("שם השלוחה:");if(!name?.trim())return;const b={id:id.trim(),name:name.trim(),type:"שלוחה חדשה",description:"שלוחה שנוספה בממשק המקומי"};setTree(t=>[...t,b]);setSelected(b)}
 return <main className="app-shell">
 <header className="topbar"><div className="brand"><div className="brand-mark">י</div><div><div className="brand-title">Yemot Manager</div><div className="brand-sub">ניהול חכם למערכת ימות המשיח</div></div></div><div className="top-actions"><span className={"connection "+(configured?"ready":"")}><i/>{configured?"פרטי גישה הוגדרו":"לא מחובר"}</span><button className="avatar">מ</button></div></header>
 <section className="welcome"><div><div className="eyebrow">מרכז הבקרה</div><h1>ניהול השלוחות שלך, פשוט יותר.</h1><p>כל מבנה המערכת במקום אחד — עם אפשרות לנהל ולערוך בשפה טבעית.</p></div><div className="welcome-icon">⌘</div></section>
 <div className="status-strip"><span className="status-dot"/>{status}<span className="status-note">• סביבת פיתוח ראשונית</span></div>
 <div className="workspace">
 <section className="panel"><div className="panel-heading"><div><h2>מבנה השלוחות</h2><p>עץ השלוחות במערכת</p></div><button className="primary small" onClick={add}>＋ שלוחה חדשה</button></div>
 <label className="search-box"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="חיפוש לפי שם או מספר שלוחה..."/></label>
 <div className="tree-list">{filtered.length?filtered.map(b=><BranchRow key={b.id} b={b} selected={selected.id} onSelect={setSelected}/>):<div className="empty">לא נמצאו שלוחות מתאימות</div>}</div><div className="tree-footer"><span className="legend-dot"/> נתוני הדגמה — עדיין לא נטענו מימות</div></section>
 <section className="panel"><div className="panel-heading"><div><h2>פרטי שלוחה</h2><p>מידע והגדרות השלוחה שנבחרה</p></div><span className="detail-icon">▤</span></div>
 <div className="detail-card"><div className="detail-label">שלוחה נבחרת</div><div className="detail-title">{selected.name}</div><div className="detail-meta"><span>שלוחה {selected.id}</span><span className="type-tag">{selected.type}</span></div></div>
 <div className="info-grid"><div className="info-box"><span>מספר שלוחה</span><strong>{selected.id}</strong></div><div className="info-box"><span>סוג שלוחה</span><strong>{selected.type}</strong></div></div>
 <div className="description-box"><div className="detail-label">תיאור</div><p>{selected.description}</p></div><div className="notice"><span>ⓘ</span><p>עריכת הגדרות, קבצים והעברות תופעל לאחר חיבור מאומת ל-API.</p></div>
 <button className="secondary full" onClick={()=>setMessages(m=>[...m,{role:"assistant",text:"השלוחה שנבחרה: "+selected.id+" — "+selected.name+". אפשר לכתוב בצ'אט מה תרצה לעשות בה."}])}>הצג פרטים בצ׳אט</button></section>
 <section className="panel assistant-panel"><div className="panel-heading"><div><h2>העוזר החכם</h2><p>מגדירים ומשנים באמצעות שיחה</p></div><div className="ai-badge">AI</div></div>
 <div className="chat-messages">{messages.map((m,i)=><div key={i} className={"message "+m.role}><div className="message-avatar">{m.role==="assistant"?"✦":"מ"}</div><div className="bubble">{m.text}</div></div>)}</div>
 <div className="suggestions"><button onClick={()=>setPrompt("הצג לי את כל השלוחות במערכת")}>הצג את כל השלוחות</button><button onClick={()=>setPrompt("אני רוצה ליצור שלוחה חדשה")}>יצירת שלוחה חדשה</button></div>
 <form className="chat-input" onSubmit={e=>{e.preventDefault();send()}}><input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="כתוב מה תרצה לבצע במערכת..."/><button type="submit" disabled={!prompt.trim()}>↑</button></form><div className="chat-foot">העוזר לא יבצע שינויים ללא אישורך</div></section>
 </div><footer>Yemot Manager <span>•</span> נבנה לניהול פשוט, ברור ובטוח</footer></main>;
}
