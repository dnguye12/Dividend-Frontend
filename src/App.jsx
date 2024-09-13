import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import './i18n.js'

import MobileMenu from "./components/menu/MobileMenu";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen">
        <Menu />
      </div>
      <MobileMenu />
    </div>
  );
}

export default App;
