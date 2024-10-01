import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getYahooMostShortedStocks } from "../../../../../services/stock";
import { truncateText } from "../../../../../utils/textUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Skele = ({ t }) => {
  return (
    <div className="highlight-block">
      <div className="highlight-header">
        <h3>
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-down-short-wide"
            className="mr-2"
          />
          Top Shorted Today
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

const Shorteds = () => {
  const { t } = useTranslation();

  const [shorteds, setShorteds] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYahooMostShortedStocks(5);
        if (data) {
          setShorteds(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Getting daily actives: ", error);
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
            icon="fa-solid fa-arrow-down-short-wide"
            className="mr-2"
          />
          Top Shorted Today
        </h3>
        <button onClick={() => navigate(`/most-shorted-stocks`)}>
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
              <th>Volume</th>
              <th>Today</th>
            </tr>
          </thead>
          <tbody>
            {shorteds.map((shorted, idx) => (
              <tr
                onClick={() => navigate(`/stock/${shorted.title}`)}
                className="hover"
                key={`gainer-${idx}`}
              >
                <td className="symbol">{shorted.title}</td>
                <td className="name">{truncateText(shorted.name)}</td>
                <td>{shorted.volume}</td>
                <td>
                  <p className="price">{`$${Number(shorted.price).toFixed(
                    2
                  )}`}</p>
                  {shorted.percentChange.charAt(0) === "+" ? (
                    <p className="change text-up">
                      <FontAwesomeIcon icon="fa-solid fa-caret-up" />{" "}
                      {`${shorted.percentChange.substring(1)}`}
                    </p>
                  ) : (
                    <p className="change text-down">
                      <FontAwesomeIcon icon="fa-solid fa-caret-down" />{" "}
                      {`${shorted.percentChange.substring(1)}`}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shorteds;
