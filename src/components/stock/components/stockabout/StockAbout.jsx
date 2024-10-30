/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation, Trans } from "react-i18next";

import { getYahooQuoteSummary, getYahooRecommendationBySymbol } from "../../../../services/stock"
import { formatNumber, percentageDiff } from "../../../../utils/numberUtils"
import { formatMarketCap, currToSymbol } from "../../../../utils/moneyUtils"
import { capitalizeWord } from "../../../../utils/textUtils";

import AboutSimilar from "./components/AboutSimilar";

const StockAbout = ({ ticker, stockQuote }) => {
    const { t } = useTranslation();
    const [assetProfile, setAssetProfile] = useState(null)
    const [financialData, setFinancialData] = useState(null)
    const [recommendationTrend, setRecommendationTrend] = useState(null)
    const [similarStocks, setSimilarStocks] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchAssetProfile = await getYahooQuoteSummary(ticker, ['assetProfile', 'financialData', 'recommendationTrend'])
                setAssetProfile(fetchAssetProfile.assetProfile)
                setFinancialData(fetchAssetProfile.financialData)
                setRecommendationTrend(fetchAssetProfile.recommendationTrend)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [ticker])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooRecommendationBySymbol(ticker)
                setSimilarStocks(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [ticker])

    if (!similarStocks) {
        return (
            <div className="skeleton-bg w-full h-full rounded-lg"></div>
        )
    }

    let trend
    if (recommendationTrend && recommendationTrend.trend) {
        trend = recommendationTrend.trend[0]
    }
    let totalTrend
    if (trend) {
        totalTrend = trend.strongBuy + trend.buy + trend.hold + trend.sell + trend.strongSell
    }

    return (
        <div className=" w-full stock-about">
            <div className="bg-base-950 border border-border rounded p-4 border-spacing-10 mt-7 shadow">
                <h2 className="text-text text-lg font-bold mb-3">
                    <Trans i18nKey="Stock.About.Title" values={{
                        company: stockQuote.displayName
                    }}></Trans>
                </h2>

                <table className="table about-table">
                    <tr className="hidden 2xl:table-row">
                        <th>{t('Stock.About.CEO')}</th>
                        <td>{assetProfile && assetProfile.companyOfficers && assetProfile.companyOfficers.length > 0 ? assetProfile.companyOfficers[0].name : '-'}</td>
                        <th>{t('Stock.About.Industry')}</th>
                        <td>{assetProfile && (assetProfile.industry || '-')}</td>
                    </tr>
                    <tr className="hidden 2xl:table-row">
                        <th>{t('Stock.About.Country')}</th>
                        <td>{stockQuote.region || '-'}</td>
                        <th>{t('Stock.About.Sector')}</th>
                        <td>{assetProfile && (assetProfile.sector || '-')}</td>
                    </tr>
                    <tr className="hidden 2xl:table-row">
                        <th>{t('Stock.About.Employees')}</th>
                        <td>{assetProfile && (assetProfile.fullTimeEmployees ? formatNumber(assetProfile.fullTimeEmployees) : '-')}</td>
                        <th>{t('Stock.About.Exchange')}</th>
                        <td>{stockQuote.fullExchangeName || '-'}</td>
                    </tr>
                    <tr className="hidden 2xl:table-row">
                        <th>{t('Stock.About.Market-Cap')}</th>
                        <td>{stockQuote.marketCap ? formatMarketCap(stockQuote.marketCap, stockQuote.currency) : '-'}</td>
                        <th>{t('Stock.About.Avg-Volume')}</th>
                        <td>{stockQuote.regularMarketVolume ? formatMarketCap(stockQuote.regularMarketVolume, stockQuote.currency) : '-'}</td>
                    </tr>


                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.CEO')}</th>
                        <td>{assetProfile && assetProfile.companyOfficers && assetProfile.companyOfficers.length > 0 ? assetProfile.companyOfficers[0].name : '-'}</td>
                    </tr>
                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.Country')}</th>
                        <td>{stockQuote.region || '-'}</td>
                    </tr>
                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.Exchange')}</th>
                        <td>{stockQuote.fullExchangeName || '-'}</td>
                    </tr>
                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.Industry')}</th>
                        <td>{assetProfile && (assetProfile.industry || '-')}</td>
                    </tr>
                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.Sector')}</th>
                        <td>{assetProfile && (assetProfile.sector || '-')}</td>
                    </tr>
                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.Employees')}</th>
                        <td>{assetProfile && (assetProfile.fullTimeEmployees ? formatNumber(assetProfile.fullTimeEmployees) : '-')}</td>
                    </tr>
                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.Market-Cap')}</th>
                        <td>{stockQuote.marketCap ? formatMarketCap(stockQuote.marketCap, stockQuote.currency) : '-'}</td>
                    </tr>
                    <tr className="table-col 2xl:hidden">
                        <th>{t('Stock.About.Avg-Volume')}</th>
                        <td>{stockQuote.regularMarketVolume ? formatMarketCap(stockQuote.regularMarketVolume, stockQuote.currency) : '-'}</td>
                    </tr>
                </table>
                <div className="divider mt-0 mb-3"></div>
                <h3 className="font-bold text-text text-lg my-3">{t('Stock.About.Description')}</h3>
                <p className="line-clamp-3 text-sm">
                    {assetProfile && assetProfile.longBusinessSummary ? assetProfile.longBusinessSummary : t('Stock.About.Description-Error', { ticker })}
                </p>
                <div className="flex justify-between items-center mt-5">
                    <Link className="my-btn" to={`/stock/${ticker}/profile`}>{t('Stock.About.Show-More')}</Link>
                    {
                        assetProfile && assetProfile.website && <a href={assetProfile.website} target="_blank" className="my-btn">
                            {t('Stock.About.Website')} <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
                        </a>
                    }
                </div>
            </div>

            {financialData && trend ?
                <div className="bg-base-950 border border-border rounded p-4 mt-4 shadow">
                    <h2 className="text-text text-lg font-bold mb-4">{t('Stock.About.AnalystRating.Title')}</h2>
                    <div className="flex justify-between my-4">
                        <div>
                            <p className="font-semibold mb-1">{t('Stock.About.AnalystRating.Signal')}</p>
                            <p className={`font-semibold text-base ${financialData.recommendationKey.toLowerCase().includes('buy') ? 'text-up' : financialData.recommendationKey.toLowerCase().includes('sell') ? 'text-down' : 'text-hold'}`}>{capitalizeWord(financialData.recommendationKey)}</p>
                        </div>
                        <div className="text-end">
                            <p className="font-semibold mb-1">{t('Stock.About.AnalystRating.PriceTarget')}</p>
                            <p className="text-text text-base font-semibold">{currToSymbol(stockQuote.currency)}{financialData.targetMeanPrice}</p>
                        </div>
                    </div>
                    {
                        financialData.currentPrice <= financialData.targetMeanPrice ? (
                            <p>
                                <Trans
                                    i18nKey="Stock.About.AnalystRating.Upside"
                                    values={{
                                        upside: percentageDiff(
                                            financialData.currentPrice,
                                            financialData.targetMeanPrice
                                        ).toFixed(2),
                                        analysts: financialData.numberOfAnalystOpinions,
                                    }}
                                    components={[
                                        <span className="font-semibold text-up" />,
                                        <span className="font-semibold text-text" />,
                                    ]}
                                />
                            </p>
                        ) : (
                            <p>
                                <Trans
                                    i18nKey="Stock.About.AnalystRating.Downside"
                                    values={{
                                        downside: percentageDiff(
                                            financialData.targetMeanPrice,
                                            financialData.currentPrice
                                        ).toFixed(2),
                                        analysts: financialData.numberOfAnalystOpinions,
                                    }}
                                    components={[
                                        <span className="font-semibold text-down" />,
                                        <span className="font-semibold text-text" />,
                                    ]}
                                />
                            </p>
                        )
                    }

                    <div className="my-4">
                        <div className="flex flex-col mb-3">
                            <div className="flex justify-between mb-2">
                                <p className="font-semibold text-text">{t('Stock.About.AnalystRating.Buy')}</p>
                                <p className="font-semibold text-text">{(trend.strongBuy && trend.buy) ? ((trend.strongBuy + trend.buy) / totalTrend * 100).toFixed(2) + '%' : "-"}</p>
                            </div>
                            <progress className="progress progress-success w-full" value={(trend.strongBuy + trend.buy)} max={totalTrend}></progress>
                        </div>
                        <div className="flex flex-col mb-3">
                            <div className="flex justify-between mb-2">
                                <p className="font-semibold text-text">{t('Stock.About.AnalystRating.Hold')}</p>
                                <p className="font-semibold text-text">{trend.hold ? ((trend.hold) / totalTrend * 100).toFixed(2) + '%' : "-"}</p>
                            </div>
                            <progress className="progress progress-warning w-full" value={(trend.hold)} max={totalTrend}></progress>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between mb-2">
                                <p className="font-semibold text-text">{t('Stock.About.AnalystRating.Sell')}</p>
                                <p className="font-semibold text-text">{(trend.strongSell && trend.sell) ? ((trend.strongSell + trend.sell) / totalTrend * 100).toFixed(2) + '%' : "-"}</p>
                            </div>
                            <progress className="progress progress-error w-full" value={(trend.strongSell + trend.sell)} max={totalTrend}></progress>
                        </div>
                    </div>
                    <Link className="my-btn w-full mt-4" to={`/stock/${ticker}/analyst-ratings`}>{t('Stock.About.AnalystRating.AnalystRatings')}</Link>
                </div>
                :
                <div className="bg-base-950 border border-border rounded p-4 mt-4">
                    <h2 className="text-text text-lg font-bold mb-3">{t('Stock.About.AnalystRating.AnalystRatings')}</h2>
                    <p className=" line-clamp-3 text-sm">{t('Stock.About.AnalystRating.Error', { ticker })}</p>
                </div>
            }

            <div className="bg-base-950 border border-border rounded p-4 mt-4 shadow">
                <h2 className="text-text text-lg font-bold mb-3">{t('Stock.About.SimilarStocks.Title')}</h2>
                <table className="table similar-table">
                    <thead>
                        <tr>
                            <th className="border border-x-base-950 border-t-base-950 border-b-border">{t('Stock.About.SimilarStocks.Company')}</th>
                            <th className="border border-x-base-950 border-t-base-950 border-b-border">{t('Stock.About.SimilarStocks.Price')}</th>
                            <th className="border border-x-base-950 border-t-base-950 border-b-border">{t('Stock.About.SimilarStocks.Change')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            similarStocks.recommendedSymbols.map((stock, idx) => (
                                <AboutSimilar key={idx} ticker={stock.symbol} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StockAbout