import MenuItems from "./MenuItems";

const DesktopMenu = () => {
  return (
    <ul className="my-menu hidden xl:flex menu sticky h-screen top-16 left-0 w-64 bg-base-950 z-40 shadow border-r border-r-border px-5 py-4">
      <MenuItems />
    </ul>
  );
};

export default DesktopMenu;
