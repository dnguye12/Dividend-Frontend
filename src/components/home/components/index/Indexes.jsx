import Index from "./Index";

const Indexes = () => {
  return (
    <div>
      <h1 className="text-text">Markets today</h1>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 my-4">
        <Index name="S&P 500" ticker="^GSPC" />
        <Index name="Dow 30" ticker="^DJI" />
        <Index name="Nasdaq 100" ticker="^IXIC" />
        <Index name="Russell 2000" ticker="^RUT" />
      </div>
    </div>
  );
};

export default Indexes;
