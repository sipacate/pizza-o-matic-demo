import React, { useState, useEffect } from 'react';
import './App.css';

import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Panel } from './components/Panel';

import ratingsJSON from './data/pizza-store-data.json';

const SELECTED_KEY = 'selected';

function App() {
  const [selected, setSelected] = useState(
    parseInt(localStorage.getItem(SELECTED_KEY), 10) || 0
  );

  const [isChartView, setChartView] = useState(true);

  const onTabSelect = ({ selected } = {}) => {
    setSelected(selected);
    localStorage.setItem(SELECTED_KEY, selected);
  };

  const [ratings] = useState(ratingsJSON);

  const [regions, setRegions] = useState([]);
  useEffect(() => {
      const nextRegions = ['All Regions', ...ratings.map((rating) => rating?.name)];
      setRegions(nextRegions);
  }, [ratings]);

  return (
    <>
      <h1>
        <span role="img" aria-label="">🍕</span>
        Pizza-o-matic
        <span role="img" aria-label="">🍕</span>
      </h1>

      <TabStrip
        selected={selected}
        onSelect={onTabSelect}
        tabPosition="left"
        animation={false}
      >
        {regions.map(region => (
          <TabStripTab title={region} key={region}>
            <Panel ratings={ratings} region={region} isChartView={isChartView} setChartView={setChartView} />
          </TabStripTab>
        ))}
      </TabStrip>
    </>
  );
}

export default App;
