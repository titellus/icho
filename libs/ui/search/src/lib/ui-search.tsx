import "./ui-search.module.scss";
import { Container, Grid, Item, Label, Menu, Sticky } from "semantic-ui-react";
import {
  DataSearch,
  ReactiveBase,
  ReactiveComponent,
  ReactiveList,
  SelectedFilters,
  SingleList
} from "@appbaseio/reactivesearch";
import { GroupsApi } from "@catalogue/api/geonetwork";
import { DefaultQuery } from "./DefaultQuery";
import React from "react";
import AggListItemComponent from "./AggListItemComponent";
import AggCardComponent from "./AggCardComponent";
import { DefaultSource } from "./DefaultSource";
import PropTypes from "prop-types";
import "semantic-ui-css/semantic.min.css";

export function UiSearch({ filter= '' }) {
  // new GroupsApi().getGroups(true).then((r) => {
  //   console.log(r.data);
  // });
  return (

    <ReactiveBase
      app="gn-records"
      url="http://localhost:4200/search"
      enableAppbase={false}
    >


      <Container>
        <Sticky>
          <Menu secondary>
            <Menu.Item href="#home">Browse</Menu.Item>
            {filter}
            <DataSearch
              componentId="searchbox"
              defaultQuery={() => {
                return DefaultQuery.IS_RECORD;
              }}
              dataField={["resourceTitleObject.default"]}
              placeholder="Search for datasets and maps..."
            />

            <SelectedFilters />

            <Menu.Menu position="right">
              <Menu.Item name="Sign out"></Menu.Item>
            </Menu.Menu>
          </Menu>
        </Sticky>

        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <SingleList
                componentId="resourceTypeMenu"
                dataField="resourceType"
                title="Resource types"
                selectAllLabel="All"
                defaultQuery={() => {
                  return DefaultQuery.IS_RECORD;
                }}
                showSearch={false}
                showRadio={false}
                showFilter={false}
                render={({ loading, error, data, value, handleChange }) => {
                  return (
                    <AggListItemComponent
                      loading={loading}
                      error={error}
                      data={data}
                      value={value}
                      handleChange={handleChange}
                    ></AggListItemComponent>
                  );
                }}
              />
              <SingleList
                componentId="publisherMenu"
                dataField="OrgForResource"
                title="Publisher"
                selectAllLabel="All"
                showSearch={true}
                showRadio={false}
                showFilter={false}
                render={({ loading, error, data, value, handleChange }) => {
                  return (
                    <AggListItemComponent
                      loading={loading}
                      error={error}
                      data={data}
                      value={value}
                      handleChange={handleChange}
                    ></AggListItemComponent>
                  );
                }}
              />

              {/*<DynamicRangeSlider componentId="DynamicRangeSensor"
                                  includeNullValues={false}
                                  dataField="creationYearForResource" />*/}
            </Grid.Column>
            <Grid.Column width={12}>
              <ReactiveComponent
                componentId="bigBlocks"
                showFilter
                react={{
                  and: ["resourceTypeMenu", "publisherMenu"]
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
                size={100}
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
                    "resourceTypeMenu",
                    "DynamicRangeSensor",
                    "publisherMenu",
                    "bigBlocks"
                  ]
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
    </ReactiveBase>
  );
};

UiSearch.propTypes = {
  filter: PropTypes.string
};

export default UiSearch;
