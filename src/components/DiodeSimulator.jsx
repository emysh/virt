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

export default function OhmsLaw() {
  const x = [...Array(50).keys()].map(i => i / 10);  // 0 to 5
  const y = x.map(v => v * 2); // example simulation: I = Is (exp(V/nVt) − 1)

  return (
    <div>
      <h2>DiodeSimulator Simulation</h2>
      <Graph
        xValues={x}
        yValues={y}
        title="Voltage vs Current"
      />
    </div>
  );
}

}
