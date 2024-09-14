import MenuItems from "./components/MenuItems";

const MenuSide = () => {
  return (
    <div className="drawer-side z-40">
      <label
        htmlFor="my-drawer-1"
        aria-label="close sidebar"
        className="drawer-overlay z-30"
      ></label>
      <ul className="my-menu menu bg-base-950 min-h-full w-64 px-5 py-4 pt-8 shadow border-r border-r-border z-40 text-text">
        <MenuItems />
      </ul>
    </div>
  );
};

export default MenuSide;
