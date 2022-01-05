import styles from "./search-result-table.module.scss";
import { Table } from "semantic-ui-react";
import React, { useState } from "react";
import SearchResultTableSort, { SortOption } from "../search-result-table-sort/search-result-table-sort";
import { SearchResultTableCellObject } from "../search-result-table-cell-object/search-result-table-cell-object";
import SearchResultTableCellArray from "../search-result-table-cell-array/search-result-table-cell-array";
import SearchResultTableCellString from "../search-result-table-cell-string/search-result-table-cell-string";

interface Props {
  data: Array<Record<string, unknown>>;
  landingPageUrlTemplate: string;
  columns: Array<string>;
  columnsName: Array<string>;
  handleSetSort: (newValue: SortOption) => void;
  currentSort: SortOption;
}

/* eslint-disable-next-line */
export interface SearchResultTableProps {
}

export function SearchResultTable({
                                    data,
                                    columns,
                                    landingPageUrlTemplate,
                                    columnsName,
                                    handleSetSort,
                                    currentSort
                                  }: Props) {
  const tableData: Array<Record<string, unknown>> = [];

  function handleChange(newValue: SortOption) {
    handleSetSort(newValue);
  }

  console.log("SearchResultTable", data);

  if (data.length > 0) {
    for (const element in data) {
      const newElement: Record<string, unknown> = {};
      newElement["_id"] = data[element]["_id"];
      for (const key of columns) {
        if (data[element][key]) newElement[key] = data[element][key];
        else newElement[key] = "";
      }
      tableData.push(newElement);
    }
  } else {
    return null;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {Object.keys(tableData[0])
            .slice(1)
            .map((keyname, i) => (
              <Table.HeaderCell key={i}>
                {columnsName[i]}
                {
                  typeof tableData[0][keyname] === "string" ? (
                    <SearchResultTableSort
                      onChange={handleChange}
                      currentSort={currentSort}
                      field={keyname}
                    />
                  ) : ("")
                }
              </Table.HeaderCell>
            ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          tableData.map((dataItem: any, i: number) => (
            <Table.Row key={i}>
              {Object.keys(dataItem)
                .slice(1)
                .map((keyname, j) => (
                  <Table.Cell key={j}>
                    {dataItem[keyname] instanceof Object ? (
                      <SearchResultTableCellObject
                        objectValue={dataItem[keyname]}
                        objectKeyname={keyname}
                        data={dataItem}
                        landingPageUrlTemplate={landingPageUrlTemplate}
                        styles={styles}
                      />
                    ) : (
                      ""
                    )}
                    {Array.isArray(dataItem[keyname]) ? (
                      <SearchResultTableCellArray
                        arrayValue={dataItem[keyname]}
                        arrayKeyname={keyname}
                      />
                    ) : (
                      ""
                    )}
                    {typeof dataItem[keyname] === "string" ? (
                      <SearchResultTableCellString
                        stringValue={dataItem[keyname]}
                        stringKeyname={keyname}
                        landingPageUrlTemplate={landingPageUrlTemplate}
                      />
                    ) : (
                      ""
                    )}
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}

export default SearchResultTable;
