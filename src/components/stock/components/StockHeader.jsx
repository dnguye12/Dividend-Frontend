/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { getStockLogo, getYahooQuoteSummary } from "../../../services/stock"
import { myToLocaleString, percentageDiff } from "../../../utils/numberUtils"
import { useTranslation } from "react-i18next"
import { currToSymbol } from "../../../utils/moneyUtils"

const StockHeader = ({ chartQuote, chartInterval, stockQuote, ticker }) => {
    const { t } = useTranslation()
    const [logoImg, setLogoImage] = useState('')
    const [incomeStatement, setIncomeStatement] = useState(null)
    const [loadIncomeStatement, setLoadIncomeStatement] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const logo = await getStockLogo(ticker)

                if (logo) {
                    setLogoImage(`data:image/png;base64,${logo}`)
                } else {
                    setLogoImage('');
                }
            } catch (error) {
                console.log("Error getting stock logo", error)
                setLogoImage('')
            }
        }
        fetchLogo()
    }, [ticker])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooQuoteSummary(ticker, ['incomeStatementHistory'])

                if (data) {
                    setIncomeStatement(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        setLoadIncomeStatement(false)
    }, [ticker])

    if (!stockQuote || !chartQuote || loadIncomeStatement) {
        return (
            <div>...Loading</div>
        )
    }

    let startValue, endValue
    if (chartQuote.length > 0) {
        startValue = chartQuote[0].value
        endValue = chartQuote[chartQuote.length - 1].value
    } else {
        startValue = stockQuote.regularMarketOpen
        endValue = stockQuote.regularMarketPrice
    }

    return (
        <div className="stock-header flex justify-center flex-col">
            <div className="flex items-center px-5">
                {
                    logoImg
                        ?
                        <div className="w-10 h-10 bg-avatar rounded-full avatar mr-2 flex justify-center items-center drop-shadow">
                            <div className="w-8 h-8">
                                <img src={logoImg} alt={ticker} />
                            </div>
                        </div>
                        :
                        <div className="w-10 h-10 bg-avatar rounded-full avatar mr-2 flex justify-center items-center drop-shadow">
                            <div className="w-8 h-8">
                            </div>
                        </div>
                }
                <div>
                    <p className="font-bold text-lg text-text">{stockQuote.longName} ({ticker})</p>
                    <p className="">{stockQuote.quoteSourceName} - {stockQuote.currency}</p>
                </div>
            </div>
            <div className="flex items-end px-5 mt-2">
                <p className=" font-bold text-4xl text-text mr-3">{currToSymbol(stockQuote.currency)} {myToLocaleString(stockQuote.regularMarketPrice)}</p>
                {
                    chartInterval === '1D'
                        ?
                        (
                            stockQuote.regularMarketChange < 0
                                ?
                                <p className="text-down text-xl font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stockQuote.regularMarketChange.toFixed(2).substring(1)} (<FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2).substring(1)}%)</p>
                                :
                                <p className="text-up text-xl font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stockQuote.regularMarketChange.toFixed(2)} (<FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{stockQuote.regularMarketChangePercent.toFixed(2)}%)</p>
                        )
                        :
                        (
                            endValue < startValue
                                ?
                                <p className="text-down text-xl font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{(startValue - endValue).toFixed(2)} (<FontAwesomeIcon icon="fa-solid fa-caret-down" className="mr-1" />{percentageDiff(startValue, endValue).toFixed(2).substring(1)}%)</p>
                                :
                                <p className="text-up text-xl font-semibold"><FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{(endValue - startValue).toFixed(2)} (<FontAwesomeIcon icon="fa-solid fa-caret-up" className="mr-1" />{percentageDiff(startValue, endValue).toFixed(2)}%)</p>
                        )
                }
            </div>
            <div className="divider my-3"></div>
            <div className="navbar flex-wrap 2xl:flex-nowrap">
                <Link to={`/stock/${ticker}`} className={`btn btn-ghost rounded ${location.pathname === `/stock/${ticker}` ? 'active' : ''}`}>
                    {t("Stock.Header.Overview")}
                </Link>
                <Link to={`/stock/${ticker}/news`} className={`btn btn-ghost rounded ${location.pathname === `/stock/${ticker}/news` ? 'active' : ''}`}>
                    {t("Stock.Header.News")}
                </Link>
                {incomeStatement && !loadIncomeStatement && (
                    <Link to={`/stock/${ticker}/financials`} className={`btn btn-ghost rounded ${location.pathname.includes(`/stock/${ticker}/financials`) ? 'active' : ''}`}>
                        {t("Stock.Header.Financials")}
                    </Link>
                )}
                <Link to={`/stock/${ticker}/statistics`} className={`btn btn-ghost rounded ${location.pathname.includes(`/stock/${ticker}/statistics`) ? 'active' : ''}`}>
                    {t("Stock.Header.Statistics")}
                </Link>
                <Link to={`/stock/${ticker}/options`} className={`btn btn-ghost rounded ${location.pathname.includes(`/stock/${ticker}/options`) ? 'active' : ''}`}>
                    {t("Stock.Header.Options")}
                </Link>
                <Link to={`/stock/${ticker}/analyst-ratings`} className={`btn btn-ghost rounded ${location.pathname === `/stock/${ticker}/analyst-ratings` ? 'active' : ''}`}>
                    {t("Stock.Header.AnalystRatings")}
                </Link>
                {(stockQuote.dividendDate && stockQuote.trailingAnnualDividendRate) && (
                    <Link to={`/stock/${ticker}/dividends`} className={`btn btn-ghost rounded ${location.pathname === `/stock/${ticker}/dividends` ? 'active' : ''}`}>
                        {t("Stock.Header.Dividends")}
                    </Link>
                )}
                <Link to={`/stock/${ticker}/holderinsider`} className={`btn btn-ghost rounded ${location.pathname === `/stock/${ticker}/holderinsider` ? 'active' : ''}`}>
                    {t("Stock.Header.HoldersInsiders")}
                </Link>
                <Link to={`/stock/${ticker}/profile`} className={`btn btn-ghost rounded ${location.pathname === `/stock/${ticker}/profile` ? 'active' : ''}`}>
                    {t("Stock.Header.Profile")}
                </Link>
            </div>
            <div className="divider mt-3 mb-0"></div>
        </div>
    )
}

export default StockHeader