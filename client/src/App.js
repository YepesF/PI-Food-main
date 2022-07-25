import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import DetailRecipe from "./Components/DetailRecipe";
import CreateRecipe from "./Components/CreateRecipe";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/recipes"} component={NavBar} />
      <Route exact path={"/recipes"} component={Home} />
      <Route path={"/recipes/detail/:id"} component={DetailRecipe} />
      <Route path={"/recipes/create"} component={CreateRecipe} />
    </div>
  );
}

export default App;
