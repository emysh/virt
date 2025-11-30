// src/components/OhmsLaw.jsx
import React, { useState } from "react";
import Graph from "./Graph";

export default function OhmsLaw() {
  const [current, setCurrent] = useState(0);
  const [resistance, setResistance] = useState(0);
  const [voltage, setVoltage] = useState(0);

  const calculate = () => {
    setVoltage(current * resistance);
  };

  // Graph data (fixed R = 100Ω)
  const R = 100;
  const x = [...Array(50)].map((_, i) => i * 0.02); // 0 to 1A
  const y = x.map((I) => I * R);

  return (
    <div className="card">
      <h2>Ohm’s Law Simulator</h2>

      <label>Current (A)</label>
      <input
        type="number"
        value={current}
        onChange={(e) => setCurrent(parseFloat(e.target.value))}
      />

      <label>Resistance (Ω)</label>
      <input
        type="number"
        value={resistance}
        onChange={(e) => setResistance(parseFloat(e.target.value))}
      />

      <button onClick={calculate}>Calculate Voltage</button>

      <p className="result">Voltage = {voltage.toFixed(2)} V</p>

      <h2>Voltage vs Current Graph</h2>
      <Graph
        xValues={x}
        yValues={y}
        title="Voltage (V) vs Current (I)"
      />
    </div>
  );
}
