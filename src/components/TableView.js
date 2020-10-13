import React from "react";
import "hammerjs";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { toChartCategories, toGridData } from "../utils/dataSplitter";

export const TableView = ({ ratings, region, means, onDownload }) => {
  const chartCategories = toChartCategories(ratings);
  const locality = region === "All Regions" ? "region" : "restaurant";

  const heading = (
    <Column field={locality} title={locality} key={`first-col-${locality}`} />
  );
  const columns = chartCategories.map((category) => {
    const key = `table-column-${category}`;
    return <Column field={category} title={category} key={key} />;
  });

  const headedColumns = [heading, columns];
  const gridData = toGridData(locality, means);
  const fileName = `pizza_data_${region.replace(' ', '_')}.xlsx`;
  return (
    <ExcelExport
      data={gridData}
      fileName={fileName}
      ref={(exporter) => {
        onDownload.current = exporter;
      }}
    >
      <Grid data={gridData}>{headedColumns}</Grid>
    </ExcelExport>
  );
};