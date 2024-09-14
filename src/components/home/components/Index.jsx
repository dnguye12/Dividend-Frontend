const IndexHolder = () => {
  return (
    <div className="skeleton w-full h-36 bg-base-950 rounded-lg shadow border border-border">
      Index Holder
    </div>
  );
};

const Index = () => {
  return (
    <div>
      <h1 className="text-text">Markets today</h1>

      <div className="grid grid-cols-4 gap-4 my-4">
        <IndexHolder />
        <IndexHolder />
        <IndexHolder />
        <IndexHolder />
      </div>
    </div>
  );
};

export default Index;
