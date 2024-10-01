/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getYahooDailyActives } from "../../../../../services/stock";
import { truncateText } from "../../../../../utils/textUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Skele = ({ t }) => {
  return (
    <div className="highlight-block">
      <div className="highlight-header">
        <h3>
          <FontAwesomeIcon icon="fa-solid fa-chart-line" className="mr-2" />
          {t("Home.Highlight.Active-title")}
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

const Active = () => {
  const { t } = useTranslation();

  const [actives, setActives] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYahooDailyActives(5);
        if (data) {
          setActives(data);
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
          <FontAwesomeIcon icon="fa-solid fa-chart-line" className="mr-2" />
          {t("Home.Highlight.Active-title")}
        </h3>
        <button onClick={() => navigate(`/most-shorted-stocks`)}>
          {t('Home.Highlight.View-More')} <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
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
            {actives.map((active, idx) => (
              <tr
                onClick={() => navigate(`/stock/${active.title}`)}
                key={`gainer-${idx}`}
                className="hover"
              >
                <td className="symbol">{active.title}</td>
                <td className="name">{truncateText(active.name)}</td>
                <td>{active.volume}</td>
                <td>
                  <p className="price">{`$${Number(active.price).toFixed(
                    2
                  )}`}</p>
                  {active.percentChange.charAt(0) === "+" ? (
                    <p className="change text-up">
                      <FontAwesomeIcon icon="fa-solid fa-caret-up" />{" "}
                      {`${active.percentChange.substring(1)}`}
                    </p>
                  ) : (
                    <p className="change text-down">
                      <FontAwesomeIcon icon="fa-solid fa-caret-down" />{" "}
                      {`${active.percentChange.substring(1)}`}
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

export default Active;
