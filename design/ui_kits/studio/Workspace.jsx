/* global React, Browser, Arrangement, Mixer */
const { useState } = React;

window.Workspace = function Workspace({ screen }) {
  if (screen === "mixer") {
    return (
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Browser />
        <Mixer />
      </div>
    );
  }
  // default = arrangement
  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <Browser />
      <Arrangement />
    </div>
  );
};
