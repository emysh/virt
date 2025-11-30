// src/components/OpticsSimulator.jsx
import React, { useState } from "react";
import Graph from "./Graph";

export default function OpticsSimulator() {
  const [u, setU] = useState(12);   // prevent divide-by-zero
  const [f, setF] = useState(10);
  const [v, setV] = useState(null);

  const calculate = () => {
    const result = 1 / f - 1 / u;
    setV(1 / result);
  };

  // Graph data
  const x = [...Array(50)].map((_, i) => i + 12);     // u values
  const y = x.map((U) => (U * f) / (U - f));          // v values

  return (
    <div className="card">
      <h2>Optics: Lens Formula</h2>

      <label>Object Distance u (cm)</label>
      <input
        type="number"
        value={u}
        onChange={(e) => setU(parseFloat(e.target.value))}
      />

      <label>Focal Length f (cm)</label>
      <input
        type="number"
        value={f}
        onChange={(e) => setF(parseFloat(e.target.value))}
      />

      <button onClick={calculate}>Calculate Image Distance</button>

      {v !== null && (
        <p className="result">Image Distance v = {v.toFixed(2)} cm</p>
      )}

      <h2>Lens Curve Simulation</h2>
      <Graph
        xValues={x}
        yValues={y}
        title="Image Distance v vs Object Distance u"
      />
    </div>
  );
}
