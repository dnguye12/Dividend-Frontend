import { formatMarketCap } from "../../../../../utils/moneyUtils"

/* eslint-disable react/prop-types */
const StatsTotalValuation = ({ defaultKeyStatistics, summaryDetail }) => {
    return (
        <div className="my-buyconsensus bg-base-950 border border-border rounded p-4 border-spacing-10 shadow">
            <h3 className="font-semibold text-text mb-3">Total Valuation</h3>

            <table className="table">
                <tbody>
                    <tr className="hover">
                        <th>Market Cap</th>
                        <td><span>{formatMarketCap(summaryDetail.marketCap)}</span></td>
                    </tr>
                    <tr className="hover">
                        <th>Enterprise Value</th>
                        <td><span>{formatMarketCap(defaultKeyStatistics.enterpriseValue)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsTotalValuation