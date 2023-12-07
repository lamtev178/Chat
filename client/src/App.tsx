import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./components/Router";

function App() {
  return (
    <>
      <div className="Container">
        <Header />
        <Router />
      </div>
      <Footer />
    </>
  );
}

export default App;
