/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";

import { getTradingTime } from "../../../../utils/timeUtils";
import { Range1D } from "../../../../utils/timeUtils";

import { getYahooChart } from "../../../../services/stock";

import { myToLocaleString } from "../../../../utils/numberUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IndexHolder = () => {
  return (
    <div className="skeleton w-full h-36 bg-base-950 rounded-lg shadow border border-border">
      Index Holder
    </div>
  );
};

const IndexLogo = ({ ticker }) => {
  let logoColor = "";
  let number = "";

  switch (ticker) {
    case "^GSPC":
      logoColor = "#C52933";
      number = 500;
      break;
    case "^DJI":
      logoColor = "#13A3D7";
      number = 30;
      break;
    case "^IXIC":
      logoColor = "#1192C0";
      number = 100;
      break;
    case "^RUT":
      logoColor = "#541832";
      number = 2000;
      break;
    default:
      number = 0; // Fallback if ticker is unknown
      break;
  }

  return (
    <p
      className="text-base text-text font-semibold rounded-full p-1.5 mb-1.5 w-10 h-10 flex justify-center items-center shadow-md"
      style={{ backgroundColor: logoColor }}
    >
      {number}
    </p>
  );
};

const IndexChart = ({ data, prevClose }) => {
  const baseValue = prevClose;

  const chartContainerRef = useRef();
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: "rgba( 38, 166, 154, 0)",
        },
        textColor: "white",
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 140,
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: false,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      handleScale: false,
      handleScroll: false,
      crosshair: {
        mode: CrosshairMode.Hidden,
      },
    });

    chart.timeScale().fitContent();
    const mySeries = chart.addBaselineSeries({
      baseValue: { type: "price", price: baseValue },
      topLineColor: "rgba( 0, 169, 110, 1)",
      topFillColor1: "rgba( 0, 169, 110, 0.28)",
      topFillColor2: "rgba( 0, 169, 110, 0.05)",
      bottomLineColor: "rgba( 255, 88, 97, 1)",
      bottomFillColor1: "rgba( 255, 88, 97, 0.05)",
      bottomFillColor2: "rgba( 255, 88, 97, 0.28)",
      lastValueVisible: false,
      priceLineVisible: false,
      lineWidth: 1,
    });
    mySeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, baseValue]);
  return <div ref={chartContainerRef} />;
};

const Index = ({ name, ticker }) => {
  const [quotes, setQuotes] = useState();

  const { day, hour } = getTradingTime("US");

  //isTradingTime
  // Saturday: get Friday data
  // Sunday: get Friday data
  // Monday pre: get Friday data
  // else
  //          pre hour: get yesterday data
  //          post hour: get today to tomorrow data

  // US Market 9:30-16:00 EDT
  let { period1, period2 } = Range1D(day, hour);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYahooChart(ticker, period1, period2, "1m");
        setQuotes(data);
      } catch (error) {
        console.log("Index: ", error);
      }
    };

    fetchData();
  }, [ticker, period1, period2]);

  if (!quotes) {
    return <IndexHolder />;
  }

  const myData = [];
  if (quotes && quotes.quotes) {
    quotes.quotes.forEach((quote) => {
      if (quote.open) {
        myData.push({
          time: new Date(quote.date).getTime(),
          value: quote.open,
        });
      }
    });
  }

  let startValue, endValue;
  if (myData.length > 0) {
    startValue = quotes.meta.previousClose;
    endValue = quotes.quotes[quotes.quotes.length - 1].close;
  }

  return (
    <div
      className="h-36 flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer shadow bg-base-950 hover:bg-base-900 hover:scale-105"
      style={{ transition: "transform 350ms, background-color 350ms" }}
    >
      <div className="flex flex-col items-start justify-start">
        <IndexLogo ticker={ticker} />
        <p
          className=" whitespace-nowrap text-md font-semibold leading-tight text-text"
          to={`/index/${ticker}`}
        >
          {name}
        </p>
        <p className=" whitespace-nowrap text-md leading-tight my-1">
          ${myToLocaleString(quotes.meta.regularMarketPrice)}
        </p>
        {startValue &&
          endValue &&
          (startValue < endValue ? (
            <p className="text-sm font-semibold flex items-center text-up">
              <FontAwesomeIcon className="mr-2" icon="fa-solid fa-caret-up" />{" "}
              {(((endValue - startValue) / startValue) * 100).toFixed(2)}%
            </p>
          ) : (
            <p className="text-sm font-semibold flex items-center text-down">
              <FontAwesomeIcon className="mr-2" icon="fa-solid fa-caret-down" />{" "}
              {(((startValue - endValue) / startValue) * 100).toFixed(2)}%
            </p>
          ))}
      </div>
      <div className="w-full ps-3">
        <IndexChart data={myData} prevClose={startValue}></IndexChart>
      </div>
    </div>
  );
};

export default Index;
