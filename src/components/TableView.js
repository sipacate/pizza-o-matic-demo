import React from 'react';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

const TableView = ({ name, data, exporterRef }) => {
  return (
    <ExcelExport data={data} fileName="pizza_data.xlsx" ref={exporterRef}>
      <Grid data={data}>
        <GridColumn field="name" title={name} />
        <GridColumn
          field="customer"
          title="Customer"
          filter="numeric"
          format="{0:n2}"
        />
        <GridColumn
          field="staff_satisfaction"
          title="Staff Satisfaction"
          filter="numeric"
          format="{0:n2}"
        />
        <GridColumn
          field="sales"
          title="Sales"
          filter="numeric"
          format="{0:n2}"
        />
        <GridColumn
          field="cleanliness"
          title="Cleanliness"
          filter="numeric"
          format="{0:n2}"
        />
      </Grid>
    </ExcelExport>
  );
};

export default TableView;
