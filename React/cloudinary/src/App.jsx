/** @format */

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Cloudinary from "./components/cloudinary/Cloudinary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Cloudinary />
      </div>
    </>
  );
}

export default App;
