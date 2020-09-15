import React from 'react';
import './App.css';

import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Panel } from './components/Panel';

import ratings from './data/pizza-store-data.json';

const SELECTED_KEY = 'selected';

const pluck = (...keys) => (data) => {
  return keys.reduce((subData, key) => subData === undefined ? subData : subData[key], data);
};

const regions = ratings.reduce((acc, curr) => [...acc, pluck('name')(curr)], ['All Regions']);

function App() {
  const [selected, setSelected] = React.useState(
    parseInt(localStorage.getItem(SELECTED_KEY), 10) || 0
  );

  const [ isChartView, setChartView ] = React.useState(true);

  const onTabSelect = (e) => {
    setSelected(e.selected);
    localStorage.setItem(SELECTED_KEY, e.selected);
  }

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
