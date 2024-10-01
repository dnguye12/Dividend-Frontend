import Active from "./components/Active";
import Gainers from "./components/Gainers";
import Losers from "./components/Losers";
import Shorteds from "./components/Shorteds";

const Highlight = () => {
  return (<div className="grid grid-cols-1 xl:grid-cols-2 mx-auto w-full gap-4">
    <Gainers />
    <Losers />
    <Active />
    <Shorteds />
  </div>)
};

export default Highlight;
