// src/components/DiodeSimulator.jsx
import React, { useState } from "react";
import Graph from "./Graph";

export default function DiodeSimulator() {
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);

  const calculate = () => {
    const Is = 1e-12;
    const n = 1.8;
    const Vt = 0.025;
    const I = Is * (Math.exp(voltage / (n * Vt)) - 1);
    setCurrent(I);
  };

  // Graph data
  const Is = 1e-12;
  const n = 1.7;
  const VT = 0.025;

  const x = [...Array(80)].map((_, i) => i * 0.01);
  const y = x.map((V) => Is * (Math.exp(V / (n * VT)) - 1));

  return (
    <div className="card">
      <h2>Diode I–V Characteristics</h2>

      <label>Voltage (V)</label>
      <input
        type="number"
        value={voltage}
        onChange={(e) => setVoltage(parseFloat(e.target.value))}
      />

      <button onClick={calculate}>Calculate Current</button>

      <p className="result">Current = {current.toExponential(3)} A</p>

      <h2>Shockley Diode Curve</h2>
      <Graph
        xValues={x}
        yValues={y}
        title="Current (I) vs Voltage (V)"
      />
    </div>
  );
}
