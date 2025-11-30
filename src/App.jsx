import React, { useState } from "react";
import OhmsLaw from "./components/OhmsLaw.jsx";
import DiodeSimulator from "./components/DiodeSimulator.jsx";
import TransistorSimulator from "./components/TransistorSimulator.jsx";
import OpticsSimulator from "./components/OpticsSimulator.jsx";
import TheoryBox from "./components/TheoryBox.jsx";

export default function App() {
  const [tab, setTab] = useState("ohm");

  return (
    <div className="container">
      <h1 className="title">⚡ Virtual Expeyes Physics Lab</h1>

      <div className="tabs">
        <button onClick={() => setTab("ohm")}>Ohm’s Law</button>
        <button onClick={() => setTab("diode")}>Diode I–V</button>
        <button onClick={() => setTab("transistor")}>Transistor</button>
        <button onClick={() => setTab("optics")}>Optics</button>
      </div>

      <TheoryBox tab={tab} />

      {tab === "ohm" && <OhmsLaw />}
      {tab === "diode" && <DiodeSimulator />}
      {tab === "transistor" && <TransistorSimulator />}
      {tab === "optics" && <OpticsSimulator />}
    </div>
  );
}
