import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import 'hammerjs';
import CompanyRatings from './CompanyRatings';
import RegionView from './RegionView';
import CompanyView from './CompanyView';

export const Panel = ({ regions, regionId }) => {
  const [isChartView, setChartView] = useState(true);
  const SeriesView = regionId ? RegionView : CompanyView;
  const exporterRef = useRef(null);
  const [canExport, setCanExport] = useState(false);
  useEffect(() => {
    setCanExport(!!exporterRef?.current?.save);
  });

  return (
    <>
      <header className="ratings-header">
        <h2>Company Ratings</h2>
        <CompanyRatings regions={regions} />
        <span className="actions-bar">
          <Button
            icon="chart-column-clustered"
            className="view-button"
            disabled={isChartView}
            onClick={() => setChartView(true)}
          />
          <Button
            icon="grid"
            className="view-button"
            disabled={!isChartView}
            onClick={() => setChartView(false)}
          />
          <Button
            className="download"
            icon="download"
            disabled={!canExport}
            onClick={() => exporterRef?.current?.save()}
          />
        </span>
      </header>
      <SeriesView
        regionId={regionId}
        regions={regions}
        isChartView={isChartView}
        exporterRef={exporterRef}
      />
    </>
  );
};

Panel.defaultProps = {
  regions: [],
};
