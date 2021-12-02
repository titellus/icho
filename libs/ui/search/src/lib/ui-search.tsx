import "./ui-search.module.scss";
import { Container, Grid, Item, Label, Ref, Sticky } from "semantic-ui-react";
import {
  DataSearch,
  DynamicRangeSlider,
  MultiList,
  ReactiveBase,
  ReactiveComponent,
  ReactiveList,
  SelectedFilters,
  SingleList
} from "@appbaseio/reactivesearch";
import React, { createRef } from "react";
import AggCardComponent from "./AggCardComponent";
import PropTypes from "prop-types";
import "semantic-ui-css/semantic.min.css";
import { DefaultQuery, DefaultSource } from "@catalogue/utils/shared";
import { GroupsApi } from "@catalogue/api/geonetwork";
import { DEFAULT_UI_CONFIG } from "../../../../utils/shared/src/lib/ui-config";

interface AggregationPanelProps {
  aggregations: any
}

interface AggregationComponentTypes {
  [key: string]: React.ComponentClass<any>
};
const aggregationComponentTypes: AggregationComponentTypes = {
  "SingleList": SingleList,
  "MultiList": MultiList,
  "DynamicRangeSlider": DynamicRangeSlider
};

function AggregationPanel({ aggregations }: AggregationPanelProps) {
  const defaultConfig = {
    componentId: "resourceType",
    dataField: "resourceType",
    title: "Type",
    showSearch: false
  };
  let items = Object.keys(aggregations).map((key: any) => {
    return React.createElement(
      aggregationComponentTypes[aggregations[key].meta?.type || "SingleList"],
      {
        componentId: key,
        dataField: key,
        ...aggregations[key].meta?.props
      });
  });
  return (
    <>
      {items}
    </>
  );
}

export function UiSearch({ filter = "" }) {
  const contextRef: any = createRef();

  new GroupsApi().getGroups(true).then((r) => {
    console.log(r.data);
  });

  const api = process.env.NX_CATALOGUE_API_ENDPOINT;

  return (
    <ReactiveBase
      app="records"
      url={api + "/srv/api/search/"}
      enableAppbase={false}
    >
      <Ref innerRef={contextRef}>
        <Container>
          <Sticky context={contextRef}>
            <DataSearch
              componentId="searchbox"
              defaultQuery={() => {
                return DefaultQuery.IS_RECORD;
              }}
              dataField={["resourceTitleObject.default"]}
              placeholder="Search for datasets and maps..."
            />
            <SelectedFilters />
          </Sticky>

          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <AggregationPanel aggregations={DEFAULT_UI_CONFIG.search.aggregations} />
              </Grid.Column>
              <Grid.Column width={12}>
                <ReactiveComponent
                  componentId="bigBlocks"
                  showFilter
                  react={{
                    and: [Object.keys(DEFAULT_UI_CONFIG.search.aggregations)]
                  }}
                  defaultQuery={() => ({
                    aggs: {
                      "th_Themes_geoportail_wallon_hierarchy.default": {
                        terms: {
                          field: "th_Themes_geoportail_wallon_hierarchy.default",
                          order: {
                            _count: "desc"
                          },
                          size: 5
                        },
                        aggs: {
                          format: {
                            terms: {
                              field: "format"
                            }
                          }
                        }
                      }
                    },
                    size: 0
                  })}
                  render={(data) => {
                    return (
                      <AggCardComponent
                        dataField="th_Themes_geoportail_wallon_hierarchy.default"
                        dataSubField="format"
                        onMoreBlocks={5}
                        {...data}
                      />
                    );
                  }}
                />

                <ReactiveList
                  componentId="results"
                  size={DEFAULT_UI_CONFIG.search.size}
                  pagination={false}
                  showResultStats={false}
                  defaultQuery={() => {
                    return DefaultQuery.IS_RECORD;
                  }}
                  includeFields={DefaultSource.FOR_SEARCH}
                  dataField={"resourceTitleObject.default"}
                  react={{
                    and: [
                      "searchbox",
                      "bigBlocks",
                      ...Object.keys(DEFAULT_UI_CONFIG.search.aggregations)]
                  }}
                  render={({ loading, error, data }) => {
                    if (loading) {
                      return <div>Fetching Results.</div>;
                    }
                    if (error) {
                      return (
                        <div>
                          Something went wrong! Error details{" "}
                          {JSON.stringify(error)}
                        </div>
                      );
                    }
                    return (
                      <Item.Group>
                        {data.map((res: any) => (
                          <Item key={res.uuid}>
                            <Item.Image
                              size="tiny"
                              src={
                                res.overview && res.overview.length > 0
                                  ? res.overview[0].url
                                  : "https://react.semantic-ui.com/images/wireframe/image.png"
                              }
                            ></Item.Image>
                            <Item.Content>
                              <Item.Header as="a">
                                {res.resourceTitleObject?.default}
                              </Item.Header>
                              {/*<Item.Meta>{res.resourceAbstractObject?.default}</Item.Meta>*/}
                              <Item.Extra>
                                {res.tag?.map((t: any) => (
                                  <Label>{t.default}</Label>
                                ))}
                              </Item.Extra>
                            </Item.Content>
                          </Item>
                        ))}
                      </Item.Group>
                    );
                  }}
                />

                {/*<ReactiveList
                  componentId="results"
                  size={100}
                  pagination={false}
                  react={{
                    and: [
                      "searchbox",
                      "resourceTypeMenu",
                      "DynamicRangeSensor",
                      "publisherMenu",
                      "bigBlocks",
                    ],
                  }}
                  includeFields={this.state.includeFields}
                  dataField={"resourceTitleObject.default"}
                  render={({ data }) => (
                    <div>
                      <DocumentTable data={data}></DocumentTable>
                    </div>
                  )}
                  onQueryChange={function (prevQuery, nextQuery) {
                    // use the query with other js code
                    console.log("prevQuery", prevQuery);
                    console.log("nextQuery", nextQuery);
                  }}
                />*/}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Ref>
    </ReactiveBase>
  );
}

UiSearch.propTypes = {
  filter: PropTypes.string
};

export default UiSearch;
