import React, { useState } from "react";

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
    </div>
  );
 import Graph from "./Graph";

export default function DiodeSimulator() {
  const Is = 1e-12;   // saturation current
  const n = 1.7;      // ideality factor
  const VT = 0.025;   // thermal voltage at room temp

  // Voltage sweep: 0 → 0.8V
  const x = [...Array(80)].map((_, i) => i * 0.01);

  // Current using Shockley equation
  const y = x.map(V => Is * (Math.exp(V / (n * VT)) - 1));

  return (
    <div>
      <h2>Diode I-V Characteristics</h2>
      <Graph
        xValues={x}
        yValues={y}
        title="Current (I) vs Voltage (V)"
      />
    </div>
  );
}
}
