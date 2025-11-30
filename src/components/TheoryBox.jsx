import React from "react";

export default function TheoryBox({ tab }) {
  const text = {
    ohm: "Ohm's Law states V = IR. It relates voltage, current, and resistance.",
    diode: "A diode follows Shockley’s equation I = Is (exp(V/nVt) − 1).",
    transistor: "A transistor amplifies current: Ic = β × Ib.",
    optics: "The lens formula: 1/f = 1/u + 1/v.",
  };

  return <div className="theory">{text[tab]}</div>;
}
