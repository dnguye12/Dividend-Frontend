/* eslint-disable react/prop-types */
const RangeButtons = ({ chartInterval, setChartInterval }) => {
    const intervals = ['1D', '1W', '1M', 'YTD', '1Y', '5Y', 'Max'];
    return (
        <div className="inline-flex rounded shadow overflow-hidden">
            {
                intervals.map(interval =>
                (
                    <button className={`btn bg-base-950 border-base-950 dark: rounded-none border-b-2 ${chartInterval === interval && "text-text border-b-text"}`} key={interval} onClick={() => setChartInterval(interval)}>{interval}</button>
                )
                )
            }
        </div>
    )
}

export default RangeButtons