import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ marginBottom: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Meal Planner</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/week-planner">Weekly Planner</Link>
      </nav>
    </header>
  );
}
