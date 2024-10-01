import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getYahooDailyGainers } from "../../../../../services/stock";
import { formatMarketCap } from "../../../../../utils/moneyUtils";
import { truncateText } from "../../../../../utils/textUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Skele = ({ t }) => {
  return (
    <div className="highlight-block">
      <div className="highlight-header">
        <h3>
          <FontAwesomeIcon icon="fa-solid fa-crown" className="mr-2" />
          Top <span className=" font-bold text-up">Gainers</span> Today
        </h3>
        <div className="btn border-none bg-base-950 hover:bg-base-950 cursor-default"></div>
      </div>
      <div className="highlight-body">
        <div className="skeleton-top"></div>
        <div className="skeleton-even"></div>
        <div className="skeleton-odd"></div>
        <div className="skeleton-even"></div>
        <div className="skeleton-odd"></div>
        <div className="skeleton-even"></div>
      </div>
    </div>
  );
};

const Gainers = () => {
  const { t } = useTranslation();

  const [gainers, setGainers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYahooDailyGainers(5);
        if (data && data.quotes) {
          setGainers(data.quotes);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Getting gainers: ", error);
        return <Skele t={t} />;
      }
    };

    fetchData();
  }, []);

  if (isLoading || !gainers) {
    return <Skele t={t} />;
  }

  return (
    <div className="highlight-block">
      <div className="highlight-header">
        <h3>
          <FontAwesomeIcon icon="fa-solid fa-crown" className="mr-2" />
          Top <span className=" font-bold text-up">Gainers</span> Today
        </h3>
        <button onClick={() => navigate(`/day-gainers`)}>
          {t("Home.Highlight.View-More")}{" "}
          <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
        </button>
      </div>
      <div className="highlight-body">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Market Cap</th>
              <th>Today</th>
            </tr>
          </thead>
          <tbody>
            {gainers.map((gainer, idx) => (
              <tr
                onClick={() => navigate(`/stock/${gainer.symbol}`)}
                className="hover"
                key={`gainer-${idx}`}
              >
                <td className="symbol">{gainer.symbol}</td>
                {gainer.displayName ? (
                  <td className="name">{truncateText(gainer.displayName)}</td>
                ) : (
                  <td className="name">{truncateText(gainer.shortName)}</td>
                )}
                <td>{formatMarketCap(gainer.marketCap)}</td>
                <td>
                  <p className="price">{`$${gainer.regularMarketPrice.toFixed(
                    2
                  )}`}</p>
                  <p className="change text-up">
                    <FontAwesomeIcon icon="fa-solid fa-caret-up" />{" "}
                    {`${gainer.regularMarketChangePercent.toFixed(2)}%`}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gainers;
