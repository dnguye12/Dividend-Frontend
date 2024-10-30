const StockNewsSkeleton = () => {
    return (
        <div className="flex rounded border border-neutral-700 p-3">
            <div className="w-full flex flex-col pr-2">
                <div className="skeleton w-full h-4 mb-1"></div>
                <div className="skeleton h-3 w-40"></div>
            </div>
            <div>
                <div className="skeleton w-28 h-28"></div>
            </div>
        </div>
    )
}

export default StockNewsSkeleton