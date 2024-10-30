import { useEffect, useState } from "react"
import { getYahooInsights } from "../../../../../services/stock";
import moment from 'moment';
import { Trans, useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const StockUpSell = ({ ticker }) => {
    const { t } = useTranslation()
    const [stockInsights, setStockInsights] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooInsights(ticker, 1000)
                if (data) {
                    setStockInsights(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [ticker])

    if (!stockInsights) {
        return (
            <div className="skeleton w-full h-96 rounded mt-4 bg-base-950 border border-b-border"></div>
        )
    }

    return (
        <div className="bg-base-950 border border-border rounded p-4 mt-4 shadow">
            <h2 className="text-text text-lg font-bold mb-3">{t("Stock.Home.UpSell.Title")}</h2>
            {(stockInsights && stockInsights.upsell && stockInsights.upsell.msBullishSummary)
                ?
                <>
                    <p className="text-sm mb-3">
                        <Trans i18nKey="Stock.Home.UpSell.Description" values={{
                            ticker: ticker
                        }}></Trans></p>
                    <p className="text-end italic text-sm mb-3">
                        <Trans i18nKey="Stock.Home.UpSell.UpdatedOn" values={{
                            date: moment(stockInsights.upsell.msBullishBearishSummariesPublishDate).format("MMM Do YYYY")
                        }}></Trans></p>
                    <ul className="w-full px-3 py-1 border-l-4 border-l-up mb-3">
                        {
                            stockInsights.upsell.msBullishSummary.map((sum, idx) => (
                                <li className="text-sm text-text font-medium mb-2" key={idx}>- {sum}</li>
                            ))
                        }
                    </ul>

                    <div className="w-full px-3 py-1 border-l-4 border-l-down">
                        {
                            stockInsights.upsell.msBearishSummary.map((sum, idx) => (
                                <p className="text-sm text-text font-medium mb-2" key={idx}>- {sum}</p>
                            ))
                        }
                    </div>
                </>
                :
                <>
                    <p className="text-base">
                        <Trans
                            i18nKey="Stock.Home.UpSell.NoData"
                            values={{
                                ticker: ticker
                            }}
                            components={[
                                <span className="text-text font-semibold" />
                            ]}
                        /></p>
                </>
            }
        </div>
    )
}

export default StockUpSell