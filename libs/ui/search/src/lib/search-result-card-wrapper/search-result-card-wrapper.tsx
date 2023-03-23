import './search-result-card-wrapper.module.scss';
import React, {useState} from "react";
//import {DEFAULT_SORT, SortOption, SortOrder} from "../search-result-table-sort/search-result-table-sort";
import {DataSearch, MultiDropdownList, ReactiveBase, ReactiveList} from "@appbaseio/reactivesearch";
import {Dropdown, Grid, Icon, Pagination, SemanticWIDTHS} from "semantic-ui-react";

import SearchResultTable from "../search-result-table/search-result-table";

import SearchResultCard from "../search-result-card/search-result-card";

/* eslint-disable-next-line */
export interface SearchResultCardWrapperProps {
}

interface Props {
  catalogueUrl: string;
  filter?: string;
  fields: string;
  search_placeholder?: string;
  filterField?: string;
  filterField_placeholder?: string;
  filterField_2?: string;
  filterField_2_placeholder?: string;
  fullTextFilter: Array<string>;
  size?: number;
  sortBy?: string;
  sortType?: string;
  sortByList?: string;
  itemsPerRow?: SemanticWIDTHS;
  marginX?: number;
  marginBottom?: number;
  marginCardBottom?: number;
  marginToolsBottom?: number;
  landingPageUrlTemplate: string;
  linkMDT: string;
  linkMDTHook?: string;
  imageHeight?: number;
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
                                          marginBottom,
                                          marginCardBottom,
                                          marginToolsBottom,
                                          landingPageUrlTemplate,
                                          linkMDT,
                                          linkMDTHook,
                                          imageHeight
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
  let styleTools: any;
  if (marginToolsBottom) {
    let marginBottom = marginToolsBottom + "em";
    styleTools = {marginBottom: marginBottom}
  }
  return (
    <ReactiveBase
      app="records"
      url={catalogueUrl}
      enableAppbase={false}
    >
      <div style={{margin: "1em"}}>
        <Grid style={styleTools}>
          <Grid.Row columns={4} style={{margin: "0.2em"}}>
            <Grid.Column floated='left'>
              {fullTextFilter && fullTextFilter.length > 0 ? <DataSearch
                componentId="cardFullTextFilter"
                showClear={true}
                placeholder={search_placeholder}
                autosuggest={false}
                debounce={200}
                customQuery={
                  function (value, props) {
                    if (value[0]) {
                      let value_escapeReservedCharacters = value.replace(
                        /(\+|-|&&|\|\||!|\{|\}|\[|\]|\^|\~|\?|:|\\{1}|\(|\)|\/)/g,
                        "\\$1"
                      );
                      let analyser: { [index: string]: any } = {}
                      if (fullTextFilter.length > 0 && fullTextFilter[0] != 'mw_default_query') {
                        let subquery = ''
                        for (var j = 0; j < fullTextFilter.length; j++) {
                          if (j == 0) {
                            subquery = '(' + fullTextFilter[j] + ':(' + value_escapeReservedCharacters + ')^2' + ' OR ' + fullTextFilter[j] + ':\"' + value_escapeReservedCharacters + '\"^6'
                          } else if (j > 0 && j < (fullTextFilter.length - 1)) {
                          } else if (j == (fullTextFilter.length - 1)) {
                            subquery = subquery + ' OR ' + fullTextFilter[j] + ':(' + value_escapeReservedCharacters + ')^2' + ' OR ' + fullTextFilter[j] + ':\"' + value_escapeReservedCharacters + '\"^6' + ')'
                          }
                        }
                        analyser["query"] = subquery
                      } else {
                        analyser["query"] = '(any.langfre:(' + value_escapeReservedCharacters + ') OR any.common:(' + value_escapeReservedCharacters + ') OR resourceTitleObject.langfre:(' + value_escapeReservedCharacters + ')^2 OR resourceTitleObject.\\*:\"' + value_escapeReservedCharacters + '\"^6)'
                      }
                      analyser["default_operator"] = 'AND'
                      let query: { [index: string]: any } = {
                        query: {}
                      }
                      query.query["query_string"] = analyser
                      return {query}
                    } else {
                      return {}
                    }
                  }
                }
              />:""}
            </Grid.Column>
            <Grid.Column floated='left'>
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
            <Grid.Column floated='left'>
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
            <Grid.Column floated='right'>
              {sortArrayOptions.length > 0 && (<Dropdown placeholder='Tri'
                        search
                        fluid
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
              />)}
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
          renderPagination={({ pages, totalPages, currentPage, setPage, fragmentName }) => {
            const onChange = (e: any, pageInfo: any) => {
              setPage(pageInfo.activePage-1)
            };
            return  <>
            {!isNaN(totalPages) ?
              <React.Fragment>{totalPages > 1 ? (
                <Grid columns={3}>
                  <Grid.Row >
                    <Grid.Column >
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                      <Pagination defaultActivePage={1}
                                  onPageChange={onChange}
                                  ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                  firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                  lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                  prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                  nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                  totalPages={totalPages} />
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                  </Grid.Row >
                </Grid>
              ):''}</React.Fragment>
                    :''}
            </>
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
                marginBottom={marginBottom}
                marginCardBottom={marginCardBottom}
                linkMDT={linkMDT}
                linkMDTHook={linkMDTHook}
                imageHeight={imageHeight}
              />
            );
          }}
        />
      </div>
    </ReactiveBase>
  );
}

export default SearchResultCardWrapper;
