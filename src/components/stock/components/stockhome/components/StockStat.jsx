/* eslint-disable react/prop-types */
import moment from "moment"

import { formatNumber } from "../../../../../utils/numberUtils"
import { formatMarketCap } from "../../../../../utils/moneyUtils"
import { useTranslation } from "react-i18next"

const StockStat = ({ stockQuote, stockSummary }) => {
    const {t} = useTranslation()
    return (
        <div className="bg-base-950 border border-border rounded shadow p-4 grid grid-cols-2 g:grid-cols-4 gap-x-5 text-xs mt-5">
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.PreviousClose")}</p>
                <p className="font-semibold text-text">{stockQuote.regularMarketPreviousClose || '-'}</p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.DaysRange")}</p>
                {(stockQuote.regularMarketDayLow && stockQuote.regularMarketDayHigh)
                    ? <p className="font-semibold text-text">{stockQuote.regularMarketDayLow} - {stockQuote.regularMarketDayHigh}</p>
                    : <p className="font-semibold text-text">-</p>
                }
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.Open")}</p>
                <p className="font-semibold text-text">{stockQuote.regularMarketOpen || '-'}</p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.FiftyTwoWeekRange")}</p>
                {(stockQuote.fiftyTwoWeekLow && stockQuote.fiftyTwoWeekHigh)
                    ? <p className="font-semibold text-text">{stockQuote.fiftyTwoWeekLow.toFixed(2)} - {stockQuote.fiftyTwoWeekHigh.toFixed(2)}</p>
                    : <p className="font-semibold text-text">-</p>
                }
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.ForwardDividendAndYield")}</p>
                <p className="font-semibold text-text">
                    {stockQuote.trailingAnnualDividendRate ? stockQuote.trailingAnnualDividendRate.toFixed(2) : '-'}
                    ({stockQuote.trailingAnnualDividendRate && (stockQuote.trailingAnnualDividendYield * 100).toFixed(2)}%)
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.DividendDate")}</p>
                <p className="font-semibold text-text">
                    {stockQuote.dividendDate ? moment(stockQuote.dividendDate).format('MMM Do, yyyy') : "-"}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.Volume")}</p>
                <p className="font-semibold text-text">
                    {stockSummary && (stockSummary.summaryDetail.volume ? formatNumber(stockSummary.summaryDetail.volume) : "-")}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.AvgVolume")}</p>
                <p className="font-semibold text-text">
                    {stockQuote.averageDailyVolume3Month ? formatNumber(stockQuote.averageDailyVolume3Month) : "-"}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.PERatioTTM")}</p>
                <p className="font-semibold text-text">
                    {stockQuote.trailingPE ? stockQuote.trailingPE.toFixed(2) : "-"}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.MarketCap")}</p>
                <p className="font-semibold text-text">
                    {stockQuote.marketCap ? formatMarketCap(stockQuote.marketCap, stockQuote.currency) : "-"}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.EarningsDate")}</p>
                <p className="font-semibold text-text">
                    {stockQuote.earningsTimestamp ? moment(stockQuote.earningsTimestamp).format('MMM Do, yyyy') : "-"}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.Beta5YMonthly")}</p>
                <p className="font-semibold text-text">
                    {stockSummary && (stockSummary.summaryDetail.beta ? stockSummary.summaryDetail.beta.toFixed(2) : "-")}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.Bid")}</p>
                {(stockQuote.bid && stockQuote.bidSize)
                    ? <p className="font-semibold text-text">{stockQuote.bid} x {stockQuote.bidSize * 100}</p>
                    : <p className="font-semibold text-text">-</p>
                }
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.Ask")}</p>
                {(stockQuote.ask && stockQuote.askSize)
                    ? <p className="font-semibold text-text">{stockQuote.ask} x {stockQuote.askSize * 100}</p>
                    : <p className="font-semibold text-text">-</p>
                }
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.EPSTTM")}</p>
                <p className="font-semibold text-text">
                    {stockQuote.epsTrailingTwelveMonths ? stockQuote.epsTrailingTwelveMonths.toFixed(2) : "-"}
                </p>
            </div>
            <div className="flex justify-between border-b border-b-border py-2">
                <p>{t("Stock.Home.Stats.OneYearTargetEst")}</p>
                <p className="font-semibold text-text">
                    {stockSummary && (stockSummary.financialData.targetMeanPrice || '-')}
                </p>
            </div>
        </div>
    )
}

export default StockStat