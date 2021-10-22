import * as React from "react";
import { useState } from "react";
import DataGrid, { Column, Row, RowRendererProps } from "react-data-grid";
import { exportToCsv } from "./exportUtils";

function ExportButton({
  onExport,
  children,
}: {
  onExport: () => Promise<unknown>;
  children: React.ReactChild;
}) {
  const [exporting, setExporting] = useState(false);
  return (
    <button
      disabled={exporting}
      onClick={async () => {
        setExporting(true);
        await onExport();
        setExporting(false);
      }}
    >
      {exporting ? "Exporting" : children}
    </button>
  );
}

interface DataTableProps {
  data: any;
  includeFields?: string[];
}
export default class DataTable extends React.Component<DataTableProps, {}> {
  columns: Column<any>[] = [];
  excluded = ["highlight"];

  rowRenderer = (props: RowRendererProps<typeof Row>) => {
    return <Row {...props}>AAA</Row>;
  };

  render() {
    if (this.props.data.length > 0) {
      this.columns = [];
      let firstRow = this.props.data[0];
      let columnKeys =
        this.props.includeFields && this.props.includeFields.length > 0
          ? this.props.includeFields.filter((f) => firstRow[f] !== undefined)
          : Object.keys(this.props.data[0]).filter(
              (k) => !k.startsWith("_") && this.excluded.indexOf(k) === -1
            );

      columnKeys.map((k) => this.columns.push({ key: k, name: k }));

      for (var i = 0; i < this.props.data.length; i++) {
        Object.keys(this.props.data[i]).map((k) => {
          let value = this.props.data[i][k];
          if (Array.isArray(value)) {
            if (value[0] instanceof Object) {
              this.props.data[i][k] = value
                .filter(
                  (v) =>
                    (v.default && v.default.length > 0) || (v && v.length > 0)
                )
                .reduce((v) => {
                  return "";
                  // (v.default ? v.default
                  //   : JSON.stringify(v)) + ', '
                });
            } else {
              this.props.data[i][k] = value.join(", ");
            }
          } else if (value instanceof Object) {
            this.props.data[i][k] = value.default
              ? value.default
              : value.length > 0
              ? JSON.stringify(value)
              : "";
          } else {
            this.props.data[i][k] = value;
          }
        });
      }

      const gridElement = (
        <DataGrid
          rows={this.props.data}
          columns={this.columns}
          rowRenderer={this.rowRenderer}
        />
      );

      return (
        <div style={{ height: 400, width: "100%" }}>
          <ExportButton
            onExport={() => exportToCsv(gridElement, "records.csv")}
          >
            Export to CSV
          </ExportButton>
          {this.props.includeFields}==
          {gridElement}
        </div>
      );
    } else {
      return '<div id="emptygrid"/>';
    }
  }
}
