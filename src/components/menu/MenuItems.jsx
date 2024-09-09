import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItems = () => {
    return (
        <>
          <li>
            <a href="/">
              <FontAwesomeIcon icon="fa-solid fa-house" />
              Home
            </a>
          </li>
          <li>
            <details>
              <summary>
                <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
                Stock
              </summary>
              <ul className="p-0">
                <li>
                  <a href="/heatmaps">
                    <FontAwesomeIcon icon="fa-solid fa-border-all" />
                    Heatmaps
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                Screeners
              </summary>
              <ul className="p-0">
                <li>
                  <a href="/day-gainers">
                    <FontAwesomeIcon icon="fa-solid fa-crown" />
                    Daily Biggest Winners
                  </a>
                </li>
                <li>
                  <a href="/day-losers">
                    <FontAwesomeIcon icon="fa-solid fa-person-falling-burst" />
                    Daily Biggest Losers
                  </a>
                </li>
                <li>
                  <a href="/most-active">
                    <FontAwesomeIcon icon="fa-solid fa-chart-line" />
                    Most Active Today
                  </a>
                </li>
                <li>
                  <a href="/most-shorted-stocks">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" />
                    Most Shorted Stocks
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </>
      );
}

export default MenuItems