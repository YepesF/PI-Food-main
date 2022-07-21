import React from "react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <NavLink to={"/recipes"}>
        <button>Home</button>
      </NavLink>
    </div>
  );
}
