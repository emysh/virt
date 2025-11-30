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
}
