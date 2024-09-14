import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import { Routes, Route } from "react-router-dom";
import "./i18n.js";

import MenuSide from "./components/menu/MenuSide.jsx";
import MenuTop from "./components/menu/MenuTop.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen">
        <MenuTop />
        <div className="bg-base-900 h-full">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </div>
      </div>
      <MenuSide />
    </div>
  );
}

export default App;
