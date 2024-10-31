/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getYahooQuoteSummary } from '../../../../services/stock'

import AnalystPriceTargets from "./components/AnalystPriceTargets"
import AnalystRec from "./components/AnalystRec"
import AnalystUpgradesDowngrades from "./components/AnalystUpgradesDowngrades"
import AnalystBuyConsensus from "./components/AnalystBuyConsensus "
import AnalystOverview from "./components/AnalystOverview"

const StockAnalystRating = ({ticker, stockQuote}) => {
    const [stockSummary, setStockSummary] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooQuoteSummary(ticker, ['financialData', 'recommendationTrend', 'upgradeDowngradeHistory'])
                setStockSummary(data)
                setIsLoading(false)
            } catch (error) {
                console.log("Stock getting quote error: ", error)
                return (
                    <div className="bg-base-950 border border-border rounded p-4 border-spacing-10 mt-7">
                        <p className="text-center text-text text-lg font-semibold">Analyst info is currently not available for {ticker}.</p>
                    </div>
                )
            }
        }

        fetchData()
    }, [ticker])

    if (isLoading) {
        return (
            <div className="w-full h-full skeleton-bg mt-4"></div>
        )
    }

    return (
        <div className="flex flex-col mt-7">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
                <AnalystBuyConsensus ticker={ticker} stockQuote={stockQuote} stockSummary={stockSummary} />
                <AnalystOverview ticker={ticker} stockQuote={stockQuote} stockSummary={stockSummary} />
                <AnalystPriceTargets stockQuote={stockQuote} stockSummary={stockSummary} />
                <AnalystRec stockSummary={stockSummary} />
            </div>
            <AnalystUpgradesDowngrades stockSummary={stockSummary} />
        </div>
    )
}

export default StockAnalystRating