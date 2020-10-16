import React, { useState } from 'react';

import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { Panel } from './Panel';

import ratingsJSON from '../data/pizza-store-data.json';

const SELECTED_KEY = 'selected';

const MainView = () => {
    const [selected, setSelected] = useState(localStorage.getItem(SELECTED_KEY));

    const onTabSelect = (e) => {
      const {
        target: {
          props: { title },
        },
      } = e;
      const selectedRegion = data.find((region) => region.name === title);
      const selected = selectedRegion?.id;
      setSelected(selected);
      if (selected) {
        localStorage.setItem(SELECTED_KEY, selected);
      } else {
        localStorage.removeItem(SELECTED_KEY);
      }
    };

    const [data] = useState(ratingsJSON);
  return (
    <section className="content">
      <PanelBar className="regions-menu" onSelect={onTabSelect}>
        {[
          <PanelBarItem
            title={'All Regions'}
            key={'ALL_REGIONS'}
            selected={!data?.[selected]}
          />,
          ...data.map((region) => {
            return (
              <PanelBarItem
                title={region.name}
                key={region.id}
                selected={selected === region.id}
              />
            );
          }),
        ]}
      </PanelBar>
      <main className="main-section">
        <Panel regions={data} regionId={selected} />
      </main>
    </section>
  );
};

export default MainView;
