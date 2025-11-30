import React, { useState } from "react";

export default function OpticsSimulator() {
  const [u, setU] = useState(0);
  const [f, setF] = useState(10);
  const [v, setV] = useState(0);

  const calculate = () => {
    const result = 1 / f - 1 / u;
    setV(1 / result);
  };

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

      <p className="result">Image Distance v = {v.toFixed(2)} cm</p>
    </div>
  );
}
