import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News  from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar title="NFU" home="Home" />
          <Routes>
            <Route
              exact path="/"
              element={<News key="general" pagesize={6} category="general" country="in" />}
            />
            <Route
              exact path="/science"
              element={<News key="science" pagesize={6} category="science" country="in" />}
            />
            <Route
              exact path="/business"
              element={<News key="business" pagesize={6} category="business" country="in" />}
            />
            <Route
              exact path="/sports"
              element={<News key="sports" pagesize={6} category="sports" country="in" />}
            />
            <Route
              exact path="/entertainment"
              element={
                <News key="entertainment"  pagesize={6} category="entertainment" country="in" />
              }
            />
            <Route
              exact path="/health"
              element={<News key="health" pagesize={6} category="health" country="in" />}
            />
            <Route
              exact path="/technology"
              element={<News key="technology" pagesize={6} category="technology" country="in" />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
