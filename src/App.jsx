import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DesktopMenu from "./components/menu/DesktopMenu";
import MobileMenu from "./components/menu/MobileMenu";

const toggleTheme = () => {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
};

function App() {
  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen">
        <div className="flex mx-auto h-full">
          <DesktopMenu />
          <label
            htmlFor="my-drawer-1"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <FontAwesomeIcon icon="fa-solid fa-bars" />
          </label>

          <button onClick={toggleTheme}>
            <FontAwesomeIcon icon="fa-solid fa-circle-half-stroke" />
          </button>
        </div>
      </div>
      <MobileMenu />
    </div>
  );
}

export default App;
