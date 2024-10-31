/* eslint-disable react/prop-types */
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { currToSymbol } from '../../../../../utils/moneyUtils';

const AnalystOverview = ({ ticker, stockQuote, stockSummary }) => {
    const { t, i18n } = useTranslation();
    if (!stockSummary) {
        return (
            <div>...Loading</div>
        )
    }

    const recommendationTrend = stockSummary.recommendationTrend.trend[0]
    const totalAnalyst = recommendationTrend.strongBuy + recommendationTrend.buy + recommendationTrend.hold + recommendationTrend.sell + recommendationTrend.strongSell
    const recommendationKey = stockSummary.financialData.recommendationKey

    const currentPrice = stockSummary.financialData.currentPrice
    const meanPrice = stockSummary.financialData.targetMeanPrice
    const upside = (meanPrice - currentPrice) / currentPrice * 100
    return (
        <div className="my-analystoverview bg-base-950 border border-border rounded p-4">
            <h3 className="font-semibold text-text mb-3">{t("Stock.Analyst-Ratings.Overview.Analysts Overview")}</h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-totalAnalyst').showModal()}><h4 className="detail-title">{t("Stock.Analyst-Ratings.Overview.Total Analyst")}<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className="detail-count text-text">{totalAnalyst}</p>
                    <dialog id="my-analystoverview-totalAnalyst" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("Stock.Analyst-Ratings.Overview.Total Analyst")}</h3>
                            <p className="py-4">{t("Stock.Analyst-Ratings.Overview.Total Analyst desc")}</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>

                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-consensusrating').showModal()}><h4 className="detail-title">{t("Stock.Analyst-Ratings.Overview.Consensus Rating")}<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className={`detail-count ${recommendationKey.toLowerCase().includes('buy') ? 'text-up' :
                        recommendationKey.toLowerCase().includes('sell') ? 'text-down' :
                            'text-hold'
                        }`}>
                        {recommendationKey.toUpperCase()}
                    </p>
                    <dialog id="my-analystoverview-consensusrating" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("Stock.Analyst-Ratings.Overview.Consensus Rating")}</h3>
                            <p className="py-4">
                                <Trans
                                    i18nKey="Stock.Analyst-Ratings.Overview.Consensus Rating desc"
                                    values={{ ticker }}
                                    components={{
                                        1: <span className="text-text" />,
                                        3: <span className="text-up" />,
                                        5: <span className="text-up" />,
                                        7: <span className="text-hold" />,
                                        9: <span className="text-down" />,
                                        11: <span className="text-down" />
                                    }}
                                />
                            </p>

                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-priceTarget').showModal()}><h4 className="detail-title">Price Target<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className="detail-count text-text">{currToSymbol(stockQuote.currency)}{stockSummary.financialData.targetMeanPrice}</p>
                    <dialog id="my-analystoverview-priceTarget" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("Stock.Analyst-Ratings.Overview.Price Target")}</h3>
                            <p className="py-4">{t("Stock.Analyst-Ratings.Overview.Price Target desc")}</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>



                <div className="detail">
                    <button onClick={() => document.getElementById('my-analystoverview-upside').showModal()}><h4 className="detail-title">Upside<FontAwesomeIcon icon="fa-regular fa-circle-question" className="ms-1 sm:ms-2" /></h4></button>
                    <p className={`detail-count ${upside > 0 ? 'text-up' : 'text-down'}`}>{upside.toFixed(2)}%</p>
                    <dialog id="my-analystoverview-upside" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">{t("Stock.Analyst-Ratings.Overview.Upside")}</h3>
                            <p className="py-4">{t("Stock.Analyst-Ratings.Overview.Upside desc")}</p>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    )
}

export default AnalystOverview