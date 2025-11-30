import React, { useState } from "react";

export default function OhmsLaw() {
  const [current, setCurrent] = useState(0);
  const [resistance, setResistance] = useState(0);
  const [voltage, setVoltage] = useState(0);

  const calculate = () => {
    setVoltage(current * resistance);
  };

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
    </div>
  );
}
