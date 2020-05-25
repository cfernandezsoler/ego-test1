import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { Footer } from "./components/Footer.js";
import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { ModelInfo } from "./components/ModelInfo.js";

const App = () => {
  let [modelInfo, setModelInfo] = useState(-1);
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  return (
    <div>
      <Header
        modelInfo={modelInfo}
        setModelInfo={setModelInfo}
        windowWidth={windowWidth}
      />

      {modelInfo == -1 ? (
        <Main setModelInfo={setModelInfo} windowWidth={windowWidth} />
      ) : (
        <ModelInfo modelID={modelInfo} windowWidth={windowWidth} />
      )}

      <Footer />
    </div>
  );
};

export default hot(module)(App);
