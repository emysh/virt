import React, { useState } from "react";

export default function TransistorSimulator() {
  const [ib, setIb] = useState(0);
  const [beta, setBeta] = useState(150);
  const [ic, setIc] = useState(0);

  const calculate = () => {
    setIc(ib * beta);
  };

  return (
    <div className="card">
      <h2>Transistor β Amplification</h2>

      <label>Base Current I<sub>B</sub> (A)</label>
      <input
        type="number"
        value={ib}
        onChange={(e) => setIb(parseFloat(e.target.value))}
      />

      <label>Current Gain β</label>
      <input
        type="number"
        value={beta}
        onChange={(e) => setBeta(parseFloat(e.target.value))}
      />

      <button onClick={calculate}>Calculate Iₐ</button>

      <p className="result">Collector Current = {ic.toExponential(3)} A</p>
    </div>
  );
}
