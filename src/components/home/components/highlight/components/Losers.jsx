import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getYahooDailyLosers } from "../../../../../services/stock";
import { truncateText } from "../../../../../utils/textUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Skele = ({ t }) => {
  return (
    <div className="highlight-block">
      <div className="highlight-header">
        <h3>
          <FontAwesomeIcon
            icon="fa-solid fa-person-falling-burst"
            className="mr-2"
          />
          Top <span className=" font-bold text-down">Losers</span> Today
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

const Losers = () => {
  const { t } = useTranslation();

  const [losers, setLosers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYahooDailyLosers(5);
        if (data) {
          setLosers(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Getting gainers: ", error);
        return <Skele t={t} />;
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Skele t={t} />;
  }

  return (
    <div className="highlight-block">
      <div className="highlight-header">
        <h3>
          <FontAwesomeIcon
            icon="fa-solid fa-person-falling-burst"
            className="mr-2"
          />
          Top <span className=" font-bold text-down">Losers</span> Today
        </h3>
        <button onClick={() => navigate(`/day-losers`)}>
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
            {losers.map((loser, idx) => (
              <tr
                onClick={() => navigate(`/stock/${loser.title}`)}
                className="hover"
                key={`gainer-${idx}`}
              >
                <td className="symbol">{loser.title}</td>
                <td className="name">{truncateText(loser.name)}</td>
                <td>${loser.marketCap}</td>
                <td>
                  <p className="price">${loser.price}</p>
                  <p className="change text-down">
                    <FontAwesomeIcon icon="fa-solid fa-caret-down" />{" "}
                    {loser.percentChange.substring(1)}
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

export default Losers;
