import './search-result-table.module.scss';
import { Table } from 'semantic-ui-react'
import {Dispatch, SetStateAction, useState} from "react";
import  SearchResultTableSort, { SortOption } from "../search-result-table-sort/search-result-table-sort";
import React from 'react';

interface Props {
  loading: any;
  error: any;
  data: any;
  handleChangeSortReactiveList: Dispatch<SetStateAction<SortOption>>;
  selected:any;
}

/* eslint-disable-next-line */
export interface SearchResultTableProps {}

export function SearchResultTable({ loading, error, data, handleChangeSortReactiveList, selected }: Props) {
  const [sortSelector, setSortSelector] = useState<SortOption>(selected);
  function handleChange(newValue:any) {
    setSortSelector(newValue);
    handleChangeSortReactiveList(newValue);
  }
  if (loading) {
    return <div>...</div>;
  }
  if (error) {
    return (
      <div>
        Something went wrong! Error details {JSON.stringify(error)}
      </div>
    );
  }
  return data >0 ? null : (
    <div>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              uuid <SearchResultTableSort onChange={handleChange} selectedSortSelector={sortSelector} field="uuid" />
            </Table.HeaderCell>
            <Table.HeaderCell>title</Table.HeaderCell>
            <Table.HeaderCell>tag</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((res: any) => (
            <Table.Row key={res.uuid}>
              <Table.Cell>{res.uuid}</Table.Cell>
              <Table.Cell>{res.resourceTitleObject?.default}</Table.Cell>
              <Table.Cell><TagList tag={res.tag} /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const TagList = (props: any) => {
  return !props.tag ? null : (
    <React.Fragment>
      {props.tag.map((tag:any, index:any) => (
        <React.Fragment key={index}><span>{tag?.default}</span><br/></React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default SearchResultTable;
