import './search-result-table.module.scss';
import { Table } from 'semantic-ui-react'
import {Dispatch, SetStateAction, useState} from "react";
import  SearchResultTableSort, { SortOption } from "../search-result-table-sort/search-result-table-sort";
import React from 'react';

interface Props {
  loading: any;
  error: any;
  data: any;
  mtdRoot:string;
  dataFields: Array<string>;
  dataFieldsName: Array<string>;
  handleChangeSortReactiveList: Dispatch<SetStateAction<SortOption>>;
  selected:any;
}

/* eslint-disable-next-line */
export interface SearchResultTableProps {}

export function SearchResultTable({ loading, error, data, dataFields, mtdRoot, dataFieldsName, handleChangeSortReactiveList, selected }: Props) {
  let newData :any;
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
  if (data.length > 0) {
    newData=[]
    for (let element in data){
      let newElement:any={};
      for (let key of dataFields){
        if(data[element][key])
          newElement[key] = data[element][key];
        else
          newElement[key] = '';
      }
      newData.push(newElement)
    }
  }
   return data > 0 ? null : (
     <div>
       {newData && <Table sortable celled fixed>
         <Table.Header>
           <Table.Row>
{/*             {data.map((field: any) => (
               <Table.HeaderCell>
                 {field}
                 <SearchResultTableSort onChange={handleChange} selectedSortSelector={sortSelector}
                                              field={field}/>
               </Table.HeaderCell>
             ))}*/}

             {Object.keys(newData[0]).map((keyname, i) => (
               <Table.HeaderCell key={i}>
                 {dataFieldsName[i]}
                 {(typeof(newData[0][keyname]) === "string" ? <SearchResultTableSort onChange={handleChange} selectedSortSelector={sortSelector}
                                                                                     field={keyname}/> : '')}
               </Table.HeaderCell>
             ))}

           </Table.Row>
         </Table.Header>
         <Table.Body>
           {newData.map((dataItem: any) => (
           <Table.Row>
             {Object.keys(dataItem).map((keyname, i) => (
               <Table.Cell key={i}>
                 {(dataItem[keyname] instanceof Object ? dataItem[keyname]?.default : '')}
                 {(typeof dataItem[keyname] === "string" && (keyname != "uuid" && keyname != "metadataIdentifier" && keyname != "_id") ? dataItem[keyname] : '')}
                 {(typeof dataItem[keyname] === "string" && (keyname === "uuid" || keyname === "metadataIdentifier" || keyname === "_id") ? <a href={mtdRoot +'/'+ dataItem[keyname]}>{dataItem[keyname]}</a>  : '')}
                 {(Array.isArray(dataItem[keyname]) ? <TableCellArray array={dataItem[keyname]}></TableCellArray> : '')}
               </Table.Cell>
             ))}
           </Table.Row>
           ))}
         </Table.Body>
       </Table>
       }
    </div>
  )
}

const TableCellArray = (props: any) => {
  return !props.array ? null : (
    <React.Fragment>
      {props.array.map((tag:any, index:any) => (
        <React.Fragment key={index}>
          {(tag?.default ? <span>{tag?.default}<br/></span> : '')}
          {(tag?.protocol === "ESRI:REST" && tag?.function === "browsing" ? <span><a href={tag?.url}>{tag?.name}</a><br/></span> : '')}
          {(tag?.protocol === "WWW:LINK" && tag?.function === "information" ? <span><a href={tag?.url}>{tag?.name}</a><br/></span> : '')}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default SearchResultTable;
