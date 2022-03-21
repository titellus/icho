import './search-result-card-wrapper.module.scss';
import React, {useState} from "react";
//import {DEFAULT_SORT, SortOption, SortOrder} from "../search-result-table-sort/search-result-table-sort";
import {DataSearch, MultiDropdownList, ReactiveBase, ReactiveList} from "@appbaseio/reactivesearch";
import {Dropdown, Grid, SemanticWIDTHS} from "semantic-ui-react";

import SearchResultTable from "../search-result-table/search-result-table";

import SearchResultCard from "../search-result-card/search-result-card";

/* eslint-disable-next-line */
export interface SearchResultCardWrapperProps {
}

interface Props {
  catalogueUrl: string;
  filter?: string;
  fields: string;
  search_placeholder?:string;
  filterField?: string;
  filterField_placeholder?:string;
  filterField_2?: string;
  filterField_2_placeholder?:string;
  fullTextFilter: Array<string>;
  size?: number;
  sortBy?: string;
  sortType?: string;
  sortByList?: string;
  itemsPerRow?: SemanticWIDTHS;
  marginX?:number;
  marginToolsBottom?:number;
  landingPageUrlTemplate: string;
}


export function SearchResultCardWrapper({
                                          catalogueUrl,
                                          filter,
                                          search_placeholder,
                                          filterField,
                                          filterField_placeholder,
                                          filterField_2,
                                          filterField_2_placeholder,
                                          fields,
                                          fullTextFilter,
                                          size,
                                          sortByList,
                                          sortType,
                                          sortBy,
                                          itemsPerRow,
                                          marginX,
                                          marginToolsBottom,
                                          landingPageUrlTemplate
                                        }: Props) {
  let default_query: Record<string, unknown>;
  if (filter) {
    default_query = {
      query_string: {query: filter}
    };
  }

  interface SortOption {
    field: string;
    order: string;
  }

  enum SortOrder {
    asc = "asc",
    desc = "desc"
  }

  const DEFAULT_SORT = {
    field: sortBy || "_score",
    order: sortType || SortOrder.asc,
  };

  interface sortElementTemplate {
    field: string;
    order: string;
    value: string;
    text: string;
    key: string;
    icon: string;
  }

  let EsFields = []
  let fieldsTs: { [key: string]: string } = JSON.parse(fields)
  for (const [key, value] of Object.entries(fieldsTs)) {
    if (key.endsWith('Index')) {
      EsFields.push(value)
    }
  }

  let cardTemplate = JSON.parse(fields)
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);

  //TODO refactor the sortArray, sortElementTemplate, sortArrayOptions mechanisms
  let sortArrayOptions: Array<sortElementTemplate> = []
  let sortElementTemplate: sortElementTemplate = {
    field: "",
    order: "",
    value: "",
    text: "",
    key: "",
    icon: "",
  }
  let resetSortElementTemplate = sortElementTemplate;

  if (sortByList) {
    // @ts-ignore
    let sortByListArray = []
    for (const element of sortByList.split("|")) {
      sortByListArray.push(JSON.parse(element))
    }
    for (let sortElement of sortByListArray) {
      let sortElementTemplate: sortElementTemplate = {
        field: "",
        order: "",
        value: "",
        text: "",
        key: "",
        icon: "",
      }
      sortElementTemplate['field'] = sortElement.sortIndexRef;
      sortElementTemplate['order'] = 'asc';
      sortElementTemplate['value'] = sortElement.sortIndexRef.toString() + '_asc';
      sortElementTemplate['text'] = sortElement.sortName.toString() + ' (asc)';
      sortElementTemplate['key'] = sortElement.sortIndexRef.toString() + '_asc';
      sortElementTemplate['icon'] = 'arrow up';
      sortArrayOptions.push(sortElementTemplate)
      sortElementTemplate = {
        field: "",
        order: "",
        value: "",
        text: "",
        key: "",
        icon: "",
      }
      sortElementTemplate['field'] = sortElement.sortIndexRef;
      sortElementTemplate['order'] = 'desc';
      sortElementTemplate['value'] = sortElement.sortIndexRef.toString() + '_desc';
      sortElementTemplate['text'] = sortElement.sortName.toString() + ' (desc)';
      sortElementTemplate['key'] = sortElement.sortIndexRef.toString() + '_desc';
      sortElementTemplate['icon'] = 'arrow down';
      sortArrayOptions.push(sortElementTemplate)
    }
  }
  let styleTools:any;
  if (marginToolsBottom){
    let marginBottom = marginToolsBottom +"em";
    styleTools = {marginBottom: marginBottom}
  }
  return (
    <ReactiveBase
      app="records"
      url={catalogueUrl}
      enableAppbase={false}
    >
      <div style={{margin:"1em"}}>
      <Grid columns={4} style={styleTools}>
        <Grid.Row>
          <Grid.Column width={3} floated='left'>
            {fullTextFilter.length > 0 ?
              <DataSearch
                componentId="cardFullTextFilter"
                dataField={fullTextFilter}
                showClear={true}
                placeholder={search_placeholder}
                autosuggest={false}
                debounce={200}
              /> : ""}
          </Grid.Column>
          <Grid.Column width={3} floated='left'>
            {filterField_2 && (
              <MultiDropdownList componentId="cardQuickFilter_2"
                                 dataField={filterField_2}
                                 defaultQuery={() => ({
                                   query: default_query
                                 })}
                                 placeholder={filterField_2_placeholder}
                                 react={{
                                   and: ["cardQuickFilter", "cardFullTextFilter"]
                                 }}/>
            )}
          </Grid.Column>
          <Grid.Column width={3} floated='left'>
            {filterField && (
              <MultiDropdownList componentId="cardQuickFilter"
                                 dataField={filterField}
                                 defaultQuery={() => ({
                                   query: default_query
                                 })}
                                 placeholder={filterField_placeholder}
                                 react={{
                                   and: ["cardQuickFilter_2", "cardFullTextFilter"]
                                 }}/>
            )}
          </Grid.Column>
          <Grid.Column width={3} floated='right'>
            <Dropdown placeholder='Tri'
                      search
                      selection
                      labeled
                      options={sortArrayOptions}
                      onChange={(e, data) => {
                        console.log(data.value)
                        // @ts-ignore
                        const fieldValue = data.value.toString().split('_')[0]
                        // @ts-ignore
                        const orderValue = data?.value.toString().split('_')[1]
                        const sort = {
                          field: fieldValue,
                          order: orderValue
                        }
                        setSort(sort)
                      }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ReactiveList
        componentId="reactiveListCard"
        size={size}
        pagination={true}
        showResultStats={false}
        defaultQuery={() => ({
          sort: [{[sort.field]: {order: sort.order}}],
          //query: { match: { isTemplate: "n" } }
          query: default_query
        })}
        includeFields={EsFields}
        dataField={"_id"}
        react={{
          and: ["cardQuickFilter", "cardFullTextFilter", "cardQuickFilter_2"]
        }}
        render={({loading, error, data}) => {
          if (loading) {
            return (
              <span>loading</span>
            );
          }
          if (error) {
            return (
              <div>Something went wrong! Error details {JSON.stringify(error)}</div>
            );
          }
          return (
            <SearchResultCard
              data={data}
              template={cardTemplate}
              landingPageUrlTemplate={landingPageUrlTemplate}
              itemsPerRow={itemsPerRow}
              marginX={marginX}
            />
          );
        }}
      />
      </div>
    </ReactiveBase>
  );
}

export default SearchResultCardWrapper;
