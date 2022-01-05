import styles from './search-result-table.module.scss';
import {
  Button,
  Image,
  Header,
  Icon,
  Rating,
  Table,
  Label,
} from 'semantic-ui-react';
import { Dispatch, SetStateAction, useState } from 'react';
import SearchResultTableSort, {
  SortOption,
} from '../search-result-table-sort/search-result-table-sort';
import React from 'react';
import { CSVDownload, CSVLink } from 'react-csv';
import {SearchResultTableCellObject} from "../search-result-table-cell-object/search-result-table-cell-object";
import SearchResultTableCellArray from "../search-result-table-cell-array/search-result-table-cell-array";
import SearchResultTableCellString from "../search-result-table-cell-string/search-result-table-cell-string";

interface Props {
  loading: boolean;
  error: Record<string,unknown>;
  data: Array<Record<string,unknown>>;
  mtdRoot: string;
  dataFields: Array<string>;
  dataFieldsName: Array<string>;
  handleChangeSortReactiveList: (newValue: SortOption)=> void;
  selected: SortOption;
}

/* eslint-disable-next-line */
export interface SearchResultTableProps {}

export function SearchResultTable({
  loading,
  error,
  data,
  dataFields,
  mtdRoot,
  dataFieldsName,
  handleChangeSortReactiveList,
  selected,
}: Props) {
  const newData: Array<Record<string,unknown>> =[];
  const [sortSelector, setSortSelector] = useState<SortOption>(selected);
  function handleChange(newValue: SortOption) {
    setSortSelector(newValue);
    handleChangeSortReactiveList(newValue);
  }
  if (error) {
    return (
      <div>Something went wrong! Error details {JSON.stringify(error)}</div>
    );
  }
  if (data.length > 0) {
    for (const element in data) {
      const newElement: Record<string,unknown> = {};
      newElement['_id'] = data[element]['_id'];
      for (const key of dataFields) {
        if (data[element][key]) newElement[key] = data[element][key];
        else newElement[key] = '';
      }
      newData.push(newElement);
    }
  }
  return data.length === 0 ? null : (
    <div>
      {typeof newData === 'object' && (
        <div>
          <CSVLink data={newData}>
            <Button icon>
              <Icon name="download" />
            </Button>
          </CSVLink>
          <Table color="blue">
            <Table.Header>
              <Table.Row>
                {Object.keys(newData[0])
                  .slice(1)
                  .map((keyname, i) => (
                    <Table.HeaderCell key={i}>
                      {dataFieldsName[i]}
                      {typeof newData[0][keyname] === 'string' ? (
                        <SearchResultTableSort
                          onChange={handleChange}
                          selectedSortSelector={sortSelector}
                          field={keyname}
                        />
                      ) : (
                        ''
                      )}
                    </Table.HeaderCell>
                  ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {newData.map((dataItem: any, i: number) => (
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
                            mtdRoot={mtdRoot}
                            styles={styles}
                          />
                        ) : (
                          ''
                        )}
                        {Array.isArray(dataItem[keyname]) ? (
                          <SearchResultTableCellArray
                            arrayValue={dataItem[keyname]}
                            arrayKeyname={keyname}
                          />
                        ) : (
                          ''
                        )}
                        {typeof dataItem[keyname] === 'string' ? (
                          <SearchResultTableCellString
                            stringValue={dataItem[keyname]}
                            stringKeyname={keyname}
                            mtdRoot={mtdRoot}
                          />
                        ) : (
                          ''
                        )}
                      </Table.Cell>
                    ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}

export default SearchResultTable;
