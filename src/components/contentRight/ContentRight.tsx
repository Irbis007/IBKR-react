import { useEffect } from "react";
import { getMarketChartData } from "../../api/getTableData";
import useTableStore from "../../zustand/store";
import BarChart from "../chart/BarChart.jsx";
import LineChart from "../chart/LineChart.jsx";
import TradingViewChart from "../chart/TradingViewChart.jsx";
import ChartTab from "../ChartTab/ChartTab";
import News from "../news/News.jsx";
import RightHeader from "../rightHeader/RightHeader";

const ContentRight = () => {

	const {
    marketChartData,
    setMarketChartData,
    performanceChartData,
    setPerformanceChartData,
    basisChartData,
    setBasisChartData,
    chartType,
		activeTableRow
  } = useTableStore();
	



	const findMinMax = (data, ticker: string) => {
		if(data != undefined){
    if ( data.length < 1) {
      return [0, 0];
    }

		let min = data[0][ticker];
		let max = data[0][ticker];


    for (let i = 0; i < data.length; i++) {
      if (min > data[i][ticker]) {
        min = data[i][ticker];
      }
      if (max < data[i][ticker]) {
        max = data[i][ticker];
      }
    }

    return [min, max];}
  };



	const getChartData = () => {
    getMarketChartData("Portfolio Value").then((res) => {
      setMarketChartData(res);
      setPerformanceChartData(res);
    });
    getMarketChartData("Transactions").then((res) => {
      setBasisChartData(res);
    });
  };

	useEffect(() => {
    getChartData();
  }, []);


  return (
    <div className="content">
      <RightHeader />
      <div className="" style={{ aspectRatio: "1.9/1", width: "100%" }}>
        <ChartTab
          tabData={[
            {
              title: "Market Value",
              content:
                chartType == "cumulative" ? (
                  <LineChart
                    min={marketChartData != undefined ? findMinMax(marketChartData, activeTableRow == 'top-portfolio'? 'total' : "balance")[0] : 0}
                    max={marketChartData != undefined ? findMinMax(marketChartData, activeTableRow == 'top-portfolio'? 'total' : "balance")[1] : 10}
                    chartDataProp={marketChartData}
                    yKey={activeTableRow == 'top-portfolio'? 'total' : "balance"}
										events={false}
                  />
                ) : (
                  <BarChart
                    chartDataProp={marketChartData}
                    yKey={activeTableRow == 'top-portfolio'? 'total' : "balance"}
										events={false}
                  />
                ),
            },
            {
              title: "Performance",
              content:
                chartType == "cumulative" ? (
                  <LineChart
                    min={
                      performanceChartData != undefined ? findMinMax(performanceChartData, "total performance")[0] : 0
                    }
                    max={
                      performanceChartData != undefined ? findMinMax(performanceChartData, "total performance")[1] : 10
                    }
                    chartDataProp={performanceChartData}
                    yKey={"total performance"}
										events={false}
                  />
                ) : (
                  <BarChart
                    chartDataProp={performanceChartData}
                    yKey={"total performance"}
										events={false}
                  />
                ),
            },
            {
              title: "Cost Basis",
              content:
                chartType == "cumulative" ? (
                  <LineChart
                    min={basisChartData != undefined ? findMinMax(basisChartData, "total cost basis")[0] : 0}
                    max={basisChartData != undefined ? findMinMax(basisChartData, "total cost basis")[1] : 10}
                    chartDataProp={basisChartData}
                    yKey={"total cost basis"}
                    events={true}
                  />
                ) : (
                  <BarChart
                    chartDataProp={basisChartData}
                    yKey={"total cost basis"}
										events={false}
                  />
                ),
            },
            {
              title: "Quote Detail",
              content: <TradingViewChart />,
            },
          ]}
        />
      </div>
      <News />
      <div className=""></div>
    </div>
  );
};

export default ContentRight;
