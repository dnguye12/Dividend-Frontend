/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { getYahooAltmanScore } from "../../../../../services/stock"

const ScoreAltmanZ = ({ score }) => {
    let textClass, text
    if (score > 2.99) {
        textClass = "text-up"
        text = "Safe zone, low bankruptcy risk."
    } else if (score < 1.81) {
        textClass = "text-down"
        text = "Distress zone, high risk of bankruptcy."
    } else {
        textClass = "text-hold"
        text = "Grey zone, moderate risk."
    }

    return (
        <>
            <tr className="hover">
                <th>Altman Z-Score</th>
                <td className={`font-semibold ${textClass}`}>{score}</td>
            </tr>
            <tr className="hover">
                <td className={`font-semibold ${textClass}`}>
                    {text}
                </td>
                <td></td>
            </tr>
        </>
    )
}

const ScorePiotroskiF = ({ score }) => {
    let textClass, text
    if (score >= 8) {
        textClass = "text-up"
        text = "Strong Financial Health."
    } else if (score >= 6) {
        textClass = "text-up"
        text = "Good Financial Health."
    } else if (score < 4) {
        textClass = "text-down"
        text = "Distress zone, high risk of bankruptcy."
    } else {
        textClass = "text-hold"
        text = "Grey zone, moderate risk."
    }
    return (
        <>
            <tr className="hover">
                <th>Piotroski F-Score</th>
                <td className={`font-semibold ${textClass}`}>{score}</td>
            </tr>
            <tr className="hover">
                <td className={`font-semibold ${textClass}`}>
                    {text}
                </td>
                <td></td>
            </tr>
        </>
    )
}

const StatsScores = ({ ticker }) => {
    const [scores, setScores] = useState(null)
    const [loadingScores, setLoadingScores] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getYahooAltmanScore(ticker)

                if (data) {
                    setScores(data)
                    setLoadingScores(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [ticker])

    if (loadingScores) {
        return (
            <div className="skeleton-bg"></div>
        )
    }

    return (
        <div className="my-buyconsensus bg-base-950 border border-border rounded p-4 border-spacing-10 shadow">
            <h3 className="font-semibold text-text mb-3">Scores</h3>

            <table className="table">
                <tbody>
                    <ScoreAltmanZ score={scores[0].value} />
                    <ScorePiotroskiF score={scores[1].value} />
                </tbody>
            </table>
        </div>
    )
}

export default StatsScores