/* eslint-disable react/prop-types */

import { currToSymbol } from "../../../../../utils/moneyUtils"

const StatsPrice = ({ price, summaryDetail }) => {
    return (
        <div className="my-buyconsensus bg-base-950 border border-border rounded p-4 border-spacing-10">
            <h3 className="font-semibold text-text mb-3">Stock Price Statistics</h3>

            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>Beta (5Y)</th>
                        <td><span>{summaryDetail.beta ? summaryDetail.beta.toFixed(2) : "-"}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Current Price</th>
                        <td><span>{price.regularMarketPrice ? currToSymbol(summaryDetail.currency) + price.regularMarketPrice : "-"}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>52-Week Price Range</th>
                        <td><span>{summaryDetail.fiftyTwoWeekLow && summaryDetail.fiftyTwoWeekHigh ? `${currToSymbol(summaryDetail.currency)}${summaryDetail.fiftyTwoWeekLow} - ${currToSymbol(summaryDetail.currency)}${summaryDetail.fiftyTwoWeekHigh}` : "-"}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>50-Day Moving Average</th>
                        <td><span>{summaryDetail.fiftyDayAverage ? currToSymbol(summaryDetail.currency) + summaryDetail.fiftyDayAverage.toFixed(2) : "-"}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>200-Day Moving Average</th>
                        <td><span>{summaryDetail.twoHundredDayAverage ? currToSymbol(summaryDetail.currency) + summaryDetail.twoHundredDayAverage.toFixed(2) : "-"}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Average Volume (10 Days)</th>
                        <td><span>{summaryDetail.averageVolume10days ? summaryDetail.averageVolume10days.toLocaleString() : "-"}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsPrice