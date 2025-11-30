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
  import Graph from "./Graph";

export default function OhmsLaw() {
  const x = [...Array(50).keys()].map(i => i / 10);  // 0 to 5
  const y = x.map(v => v * 2); // example simulation: I = 2V

  return (
    <div>
      <h2>Ohm's Law Simulation</h2>
      <Graph
        xValues={x}
        yValues={y}
        title="Voltage vs Current"
      />
    </div>
  );
}

}
