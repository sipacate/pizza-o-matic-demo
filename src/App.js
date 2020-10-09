import React, { useState } from 'react';
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import "hammerjs";
import './App.css';

const SELECTED_KEY = "selected";

const App = () => {
  
  const [ isChartView, setChartView ] = useState(true);

  const [ selected, setSelected ] = useState(
    parseInt(localStorage.getItem(SELECTED_KEY), 10) || 0
  );

  const onTabSelect = ({ selected } = {}) => {
    setSelected(selected);
    localStorage.setItem(SELECTED_KEY, selected);
  };

  return (
    <>
      <h1>
        <span role="img" aria-label="">
          🍕
        </span>
        Pizza-o-matic
        <span role="img" aria-label="">
          🍕
        </span>
      </h1>
      <TabStrip
        selected={selected}
        onSelect={onTabSelect}
        tabPosition="left"
        animation={false}
      >
        <TabStripTab title={"Tab 1"}>
          <div className="ratings-header">
            <h2>Company Ratings</h2>
            <span className="buttons-span">
              <img
                src="chart-bar.svg"
                alt="chart view"
                className={isChartView ? "active" : "inactive"}
                onClick={() => setChartView(true)}
              />
              <img
                src="table.svg"
                alt="cell view"
                className={isChartView ? "inactive" : "active"}
                onClick={() => setChartView(false)}
              />
            </span>
          </div>
          <div>{`Tab 1 ${isChartView ? "Chart" : "Table"} View`}</div>
        </TabStripTab>
        <TabStripTab title={"Tab 2"}>
          <div className="ratings-header">
            <h2>Company Ratings</h2>
            <span className="buttons-span">
              <img
                src="chart-bar.svg"
                alt="chart view"
                className={isChartView ? "active" : "inactive"}
                onClick={() => setChartView(true)}
              />
              <img
                src="table.svg"
                alt="cell view"
                className={isChartView ? "inactive" : "active"}
                onClick={() => setChartView(false)}
              />
            </span>
          </div>
          <div>{`Tab 2 ${isChartView ? "Chart" : "Table"} View`}</div>
        </TabStripTab>
      </TabStrip>
    </>
  );
};

export default App;
