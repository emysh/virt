import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

function Quiz({ storageKey, questions = [], onSaved }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSaved(parsed);
        setScore(parsed.score);
      } catch {}
    }
  }, [storageKey]);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / Math.max(1, total)) * 100);

  const handleSelect = (qIdx, optIdx) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) s += 1;
    });
    const payload = { score: s, total, ts: Date.now() };
    localStorage.setItem(storageKey, JSON.stringify(payload));
    setScore(s);
    setSaved(payload);
    onSaved && onSaved(payload);
  };

  const perfect = score !== null && score === total && total > 0;

  return (
    <div style={{padding:10}}>
      <div style={{marginBottom:8}}>Progress: {progress}%</div>
      {questions.map((q, i) => {
        const selected = answers[i];
        const isCorrect = score !== null && selected === q.answer;
        const isWrong = score !== null && selected !== undefined && selected !== q.answer;
        return (
          <div key={i} style={{padding:10, borderRadius:8, border: '1px solid #eee', background: isCorrect ? '#ecfdf5' : isWrong ? '#fff1f2' : '#fff', marginBottom:10}}>
            <div style={{fontWeight:600}}>{i+1}. {q.question}</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, marginTop:8}}>
              {q.options.map((opt,j)=>(
                <label key={j} style={{display:'flex', alignItems:'center', gap:8, padding:8, borderRadius:6, border: selected===j ? '1px solid #7dd3fc' : '1px solid #eee', cursor:'pointer'}}>
                  <input type="radio" name={`q-${storageKey}-${i}`} checked={selected===j} onChange={()=>handleSelect(i,j)} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )
      })}
      <div style={{display:'flex', gap:10, alignItems:'center'}}>
        <button onClick={handleSubmit} style={{background:'#06b6d4', color:'#fff', padding:'8px 12px', borderRadius:8}}>Submit</button>
        {saved && <div>Last score: <strong>{saved.score}/{saved.total}</strong></div>}
      </div>
      {perfect && <div style={{marginTop:10, padding:10, background:'#ecfdf5', borderRadius:8}}>🎉 Perfect score! Badge unlocked.</div>}
    </div>
  );
}

function OhmsLawSimulator() {
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(10);
  const current = useMemo(()=> voltage / resistance, [voltage, resistance]);
  const data = useMemo(()=> Array.from({length:11},(_,i)=>({voltage:i, current: i / resistance})), [resistance]);

  return (
    <div style={{padding:10}}>
      <div style={{display:'flex', gap:10, marginBottom:12}}>
        <div style={{flex:1, padding:8, border:'1px solid #eee', borderRadius:8}}>
          <div>Voltage: {voltage} V</div>
          <input type="range" min="0" max="10" value={voltage} onChange={(e)=>setVoltage(+e.target.value)} />
        </div>
        <div style={{flex:1, padding:8, border:'1px solid #eee', borderRadius:8}}>
          <div>Resistance: {resistance} Ω</div>
          <input type="range" min="1" max="20" value={resistance} onChange={(e)=>setResistance(+e.target.value)} />
        </div>
        <div style={{flex:1, padding:8, border:'1px solid #fde68a', borderRadius:8}}>
          <div>Current</div>
          <div style={{fontSize:20, fontWeight:700}}>{current.toFixed(2)} A</div>
        </div>
      </div>
      <div style={{background:'#fff', padding:8, borderRadius:8}}>
        <LineChart width={520} height={240} data={data}>
          <CartesianGrid stroke="#f1f5f9" />
          <XAxis dataKey="voltage" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="current" stroke="#06b6d4" dot={false} />
        </LineChart>
      </div>
    </div>
  )
}

function RCCircuitSimulator() {
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(1000);
  const [capacitance, setCapacitance] = useState(0.001);
  const tau = useMemo(()=> resistance * capacitance, [resistance, capacitance]);
  const data = useMemo(()=> Array.from({length:40}, (_,i)=>{ const t = i * tau * 0.1; return {t, v: voltage * (1 - Math.exp(-t / tau)) } }), [tau, voltage]);

  return (
    <div style={{padding:10}}>
      <div style={{display:'flex', gap:10, marginBottom:12}}>
        <div style={{flex:1, padding:8, border:'1px solid #eee', borderRadius:8}}>
          <div>Voltage: {voltage} V</div>
          <input type="range" min="1" max="10" value={voltage} onChange={(e)=>setVoltage(+e.target.value)} />
        </div>
        <div style={{flex:1, padding:8, border:'1px solid #eee', borderRadius:8}}>
          <div>Resistance: {resistance} Ω</div>
          <input type="range" min="100" max="5000" step="100" value={resistance} onChange={(e)=>setResistance(+e.target.value)} />
        </div>
        <div style={{flex:1, padding:8, border:'1px solid #eee', borderRadius:8}}>
          <div>Capacitance: {capacitance} F</div>
          <input type="range" min="0.0001" max="0.01" step="0.0001" value={capacitance} onChange={(e)=>setCapacitance(+e.target.value)} />
        </div>
      </div>
      <div style={{marginBottom:12, padding:8, background:'#ecfeff', borderRadius:8}}>Time constant τ = {tau.toFixed(4)} s</div>
      <div style={{background:'#fff', padding:8, borderRadius:8}}>
        <LineChart width={520} height={240} data={data}>
          <CartesianGrid stroke="#f1f5f9" />
          <XAxis dataKey="t" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="v" stroke="#fb923c" dot={false} />
        </LineChart>
      </div>
    </div>
  )
}

export default function LandingPage(){
  const [showDemo, setShowDemo] = useState(false);
  const [tab, setTab] = useState("sim-ohm");
  const [ohmCompleted, setOhmCompleted] = useState(false);
  const [rcCompleted, setRcCompleted] = useState(false);

  useEffect(()=>{
    const ohm = localStorage.getItem("ohmslaw_quiz");
    const rc = localStorage.getItem("rc_quiz");
    if (ohm) { try { const p = JSON.parse(ohm); setOhmCompleted(p.score === p.total && p.total>0); } catch {} }
    if (rc) { try { const p = JSON.parse(rc); setRcCompleted(p.score === p.total && p.total>0); } catch {} }
  },[]);

  const ohmQuestions = [
    { question: "What is Ohm's Law?", options: ["V = IR","P = VI","E = mc²"], answer: 0 },
    { question: "If V = 10V and R = 5Ω, what is I?", options: ["0.5 A","2 A","50 A"], answer: 1 },
    { question: "Keeping R fixed, the V–I graph is:", options: ["Linear","Exponential","Parabolic"], answer: 0 }
  ];
  const rcQuestions = [
    { question: "The time constant of an RC circuit is:", options: ["R + C","RC","R/C"], answer: 1 },
    { question: "At t = τ during charging, Vc is about:", options: ["37% of V","63% of V","100% of V"], answer: 1 },
    { question: "VC(t) during discharging is:", options: ["V·e^{−t/τ}","V(1 − e^{−t/τ})","Constant"], answer: 0 }
  ];

  const onSavedOhm = (p) => setOhmCompleted(p.score === p.total && p.total > 0);
  const onSavedRC = (p) => setRcCompleted(p.score === p.total && p.total > 0);

  return (
    <div style={{padding:24}}>
      <header style={{textAlign:'center', marginBottom:20}}>
        <h1 style={{fontSize:32, color:'#075985'}}>Virtual Expeyes Lab</h1>
        <p style={{color:'#475569'}}>Interactive experiments, microlearning, and playful quizzes.</p>
        <button onClick={()=>setShowDemo(true)} style={{marginTop:12, padding:'10px 16px', background:'#075985', color:'#fff', borderRadius:10}}>Try Free Demo</button>
      </header>

      <section style={{maxWidth:920, margin:'0 auto 40px auto'}}>
        <h2 style={{fontSize:18, marginBottom:12}}>Featured Experiments</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
          <div style={{padding:12, borderRadius:12, background:'linear-gradient(90deg,#fffbeb,#fff7ed)', position:'relative'}}>
            {ohmCompleted && <div style={{position:'absolute', right:18, top:18, background:'#16a34a', color:'#fff', padding:'6px 10px', borderRadius:20}}>✅ Completed</div>}
            <h3 style={{margin:0}}>Ohm's Law</h3>
            <p style={{color:'#475569'}}>V–I plot, measure resistance</p>
            <div style={{height:80, background:'#fff', borderRadius:8, marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#cbd5e1'}}>Image</div>
            <button onClick={()=>{ setShowDemo(true); setTab('sim-ohm'); }} style={{marginTop:10, padding:'8px 12px', background:'#075985', color:'#fff', borderRadius:8}}>Open Demo</button>
          </div>

          <div style={{padding:12, borderRadius:12, background:'linear-gradient(90deg,#fff7ed,#fff1f2)', position:'relative'}}>
            {rcCompleted && <div style={{position:'absolute', right:18, top:18, background:'#16a34a', color:'#fff', padding:'6px 10px', borderRadius:20}}>✅ Completed</div>}
            <h3 style={{margin:0}}>RC Circuit</h3>
            <p style={{color:'#475569'}}>Charging/discharging, τ</p>
            <div style={{height:80, background:'#fff', borderRadius:8, marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#cbd5e1'}}>Image</div>
            <button onClick={()=>{ setShowDemo(true); setTab('sim-rc'); }} style={{marginTop:10, padding:'8px 12px', background:'#075985', color:'#fff', borderRadius:8}}>Open Demo</button>
          </div>
        </div>
      </section>

      {showDemo && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{position:'fixed', inset:0, background:'rgba(2,6,23,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50}}>
          <div style={{background:'#fff', width:'90%', maxWidth:980, borderRadius:14, padding:18, position:'relative'}}>
            <button onClick={()=>setShowDemo(false)} style={{position:'absolute', right:12, top:12, background:'#fff', border:'none', cursor:'pointer'}}>✕</button>
            <h2 style={{marginTop:0, color:'#075985'}}>Interactive Demos</h2>

            <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:12}}>
              <button onClick={()=>setTab('theory-ohm')} style={{padding:'8px 10px', borderRadius:8, background:tab==='theory-ohm' ? '#075985' : '#f1f5f9', color: tab==='theory-ohm' ? '#fff' : '#0f172a'}}>⚡ Ohm Theory</button>
              <button onClick={()=>setTab('sim-ohm')} style={{padding:'8px 10px', borderRadius:8, background:tab==='sim-ohm' ? '#075985' : '#f1f5f9', color: tab==='sim-ohm' ? '#fff' : '#0f172a'}}>🧪 Ohm Simulator</button>
              <button onClick={()=>setTab('quiz-ohm')} style={{padding:'8px 10px', borderRadius:8, background:tab==='quiz-ohm' ? '#075985' : '#f1f5f9', color: tab==='quiz-ohm' ? '#fff' : '#0f172a'}}>🧩 Ohm Quiz</button>

              <div style={{width:1, background:'#e6eef6', margin:'6px 8px'}} />

              <button onClick={()=>setTab('theory-rc')} style={{padding:'8px 10px', borderRadius:8, background:tab==='theory-rc' ? '#075985' : '#f1f5f9', color: tab==='theory-rc' ? '#fff' : '#0f172a'}}>🔋 RC Theory</button>
              <button onClick={()=>setTab('sim-rc')} style={{padding:'8px 10px', borderRadius:8, background:tab==='sim-rc' ? '#075985' : '#f1f5f9', color: tab==='sim-rc' ? '#fff' : '#0f172a'}}>🧪 RC Simulator</button>
              <button onClick={()=>setTab('quiz-rc')} style={{padding:'8px 10px', borderRadius:8, background:tab==='quiz-rc' ? '#075985' : '#f1f5f9', color: tab==='quiz-rc' ? '#fff' : '#0f172a'}}>🧩 RC Quiz</button>
            </div>

            <div style={{maxHeight:520, overflow:'auto'}}>
              {tab==='theory-ohm' && <div style={{padding:12, borderRadius:10, background:'#fff8e1'}}> <strong>Ohm’s Law (V = I·R)</strong><p>For a conductor at constant temperature, I ∝ V. The V vs I graph is linear and slope gives resistance.</p></div>}
              {tab==='sim-ohm' && <OhmsLawSimulator />}
              {tab==='quiz-ohm' && <Quiz storageKey="ohmslaw_quiz" questions={ohmQuestions} onSaved={onSavedOhm} />}

              {tab==='theory-rc' && <div style={{padding:12, borderRadius:10, background:'#eff6ff'}}> <strong>RC Circuits & Time Constant</strong><p>The time constant τ = R·C characterizes charging. Vc(t) = V(1 − e^{−t/τ}).</p></div>}
              {tab==='sim-rc' && <RCCircuitSimulator />}
              {tab==='quiz-rc' && <Quiz storageKey="rc_quiz" questions={rcQuestions} onSaved={onSavedRC} />}
            </div>

          </div>
        </motion.div>
      )}
    </div>
  )
}
