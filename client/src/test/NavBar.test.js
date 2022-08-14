import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavBar from "../Components/NavBar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let nav;

  beforeEach(() => {
    nav = shallow(<NavBar />);
  });

  it('Should render two <NavLink to="" />. The first one to go to "/recipes", and the second one to "/recipes/create"', () => {
    expect(nav.find(NavLink).length).toBeGreaterThanOrEqual(2);
    expect(nav.find(NavLink).at(0).prop("to")).toEqual("/recipes");
    expect(nav.find(NavLink).at(1).prop("to")).toEqual("/recipes/create");
  });

  it('Should have a NavLink with the text "Home" that changes the path to "/"', () => {
    expect(nav.find(NavLink).at(0).prop("to")).toEqual("/recipes");
    expect(nav.find(NavLink).at(0).text()).toEqual("HenryFood");
  });

  it('Should have a NavLink with the text "Crear Receta" that changes the path to "/recipes/create"', () => {
    expect(nav.find(NavLink).at(1).prop("to")).toEqual("/recipes/create");
    expect(nav.find(NavLink).at(1).text()).toEqual("Crear Receta");
  });
});
