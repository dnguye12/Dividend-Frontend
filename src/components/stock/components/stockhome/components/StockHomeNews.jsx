import { useEffect, useState } from "react"
import { useTranslation, Trans } from "react-i18next";
import { getYahooNews } from "../../../../../services/stock";
import moment from "moment"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

const StockHomeNewsSkeleton = () => {
    return (
        <div className="flex rounded border border-border p-3">
            <div className="w-full flex flex-col pr-2">
                <div className="skeleton w-full h-4 mb-1"></div>
                <div className="skeleton h-3 w-40"></div>
            </div>
            <div>
                <div className="skeleton w-24 h-24"></div>
            </div>
        </div>
    )
}

/* eslint-disable react/prop-types */
const StockHomeNews = ({ ticker }) => {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(true)
    const [news, setNews] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooNews(ticker)

                if (data) {
                    setNews(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log("Error getting news", error)
                setIsLoading(false)
            }
        }
        fetchData()
    }, [ticker])

    if (isLoading) {
        return (
            <div className="bg-base-950 border border-border rounded p-4 mt-4">
                <h2 className="text-text text-lg font-bold mb-3">Recent News: {ticker}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                    <StockHomeNewsSkeleton />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-base-950 border border-border rounded p-4 mt-4">
            <h2 className="text-text text-lg font-bold mb-3">
                <Trans i18nKey="Stock.Home.News.RecentNews" values={{
                    ticker: ticker.toUpperCase()
                }}></Trans></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {
                    news.news.sort((a, b) => new Date(b.providerPublishTime) - new Date(a.providerPublishTime)).map(n => (
                        <div key={n.uuid} className="flex rounded border border-border p-3">
                            <div className="w-full flex flex-col pr-2">
                                <a href={n.link} target="_blank" className="text-text font-semibold text-sm mb-1 hover:text-blue-500 transition duration-300">{n.title}</a>
                                <p className="text-sm">{n.publisher} - {moment(n.providerPublishTime).format('MMM Do, YYYY')}</p>
                            </div>
                            <div>
                                {n.thumbnail && n.thumbnail.resolutions
                                    ? n.thumbnail.resolutions[1]
                                        ? <img src={n.thumbnail.resolutions[1].url} className="rounded drop-shadow aspect-square max-w-28" />
                                        : <img src={n.thumbnail.resolutions[0].url} className="rounded drop-shadow aspect-square max-w-28" />
                                    : <div className="rounded drop-shadow border border-border w-28 h-28 flex justify-center items-center text-2xl"><FontAwesomeIcon icon="fa-regular fa-image" /></div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <Link className="my-btn w-full" to={`/stock/${ticker}/news`}><FontAwesomeIcon icon="fa-solid fa-newspaper" className="mr-1" />{t('Stock.Home.News.Load-More')}</Link>
        </div>
    )
}

export default StockHomeNews