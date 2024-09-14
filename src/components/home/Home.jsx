import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Index from "./components/Index";

const IndexHolder = () => {
  return (
    <div className="skeleton w-full h-36 bg-base-950 rounded-lg shadow border border-border">
      Index Holder
    </div>
  );
};

const StockHomeNewsSkeleton = () => {
  return (
    <div className="flex rounded-lg border border-border bg-base-950 p-3">
      <div className="w-full flex flex-col pr-2">
        <div className="skeleton w-full h-4 mb-1"></div>
        <div className="skeleton h-3 w-40"></div>
      </div>
      <div>
        <div className="skeleton w-28 h-28"></div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />

      <div className="p-10">
        <Index />

        <div>
          <div className="grid grid-cols-4 gap-4 my-4">
            <IndexHolder />
            <IndexHolder />
            <IndexHolder />
            <IndexHolder />
          </div>
        </div>

        <div>
          <h2 className="text-text mb-2">Stock News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
            <StockHomeNewsSkeleton />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
