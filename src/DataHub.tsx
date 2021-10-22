import React from "react";
import "./App.css";

import {
  DataSearch,
  ReactiveBase,
  ReactiveComponent,
  ReactiveList,
  SingleList,
} from "@appbaseio/reactivesearch";
import DocumentTable from "./DocumentTable";
import AggBlockComponent from "./AggBlockComponent";

type IAppState = {
  includeFields: String[];
};

const SomeFields = ["includeFields"];

function ReactiveOpenStreetMap(props: {
  title: string;
  componentId: string;
  dataField: string;
}) {
  return null;
}

class DocumentTableResults extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      includeFields: [
        "uuid",
        "resourceType",
        "resourceTitleObject",
        "tag",
        "resourceType",
        "OrgForResource",
      ],
      bigBlockNumbers: 5,
    };
    this.setIncludeFields = this.setIncludeFields.bind(this);
    this.setBigBlocksNumber = this.setBigBlocksNumber.bind(this);
  }

  setIncludeFields(fields: string[]) {
    this.setState({ includedFields: fields });
  }

  setBigBlocksNumber(size: number) {
    this.setState({ bigBlockNumbers: this.state.bigBlockNumbers + 5 });
  }

  render() {
    return (
      <ReactiveBase
        app="gn-records"
        url="http://localhost:3000/search"
        enableAppbase={false}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "30%", margin: "10px" }}>
            <SingleList
              componentId="resourceTypeMenu"
              dataField="resourceType"
              title="Resource types"
              selectAllLabel="All"
              showSearch={false}
              showRadio={false}
              showFilter={false}
            />

            <SingleList
              componentId="publisherMenu"
              dataField="OrgForResource"
              title="Publisher"
              selectAllLabel="All"
              showSearch={false}
              showRadio={false}
              showFilter={false}
            />

            {/*<DynamicRangeSlider componentId="DynamicRangeSensor"
                                includeNullValues={false}
                                dataField="creationYearForResource" />*/}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "66%",
              margin: "10px",
            }}
          >
            <ReactiveComponent
              componentId="bigBlocks"
              showFilter
              react={{
                and: ["resourceTypeMenu", "publisherMenu"],
              }}
              defaultQuery={() => ({
                aggs: {
                  "th_Themes_geoportail_wallon_hierarchy.default": {
                    terms: {
                      field: "th_Themes_geoportail_wallon_hierarchy.default",
                      order: {
                        _count: "desc",
                      },
                      size: this.state.bigBlockNumbers,
                    },
                    aggs: {
                      format: {
                        terms: {
                          field: "format",
                        },
                      },
                    },
                  },
                },
                size: 0,
              })}
              render={(data) => {
                return (
                  <AggBlockComponent
                    dataField="th_Themes_geoportail_wallon_hierarchy.default"
                    dataSubField="format"
                    onMoreBlocks={this.setBigBlocksNumber}
                    {...data}
                  />
                );
              }}
            />

            <DataSearch
              componentId="searchbox"
              dataField={["resourceTitleObject.default"]}
              placeholder="Search for datasets and maps..."
            />

            <ReactiveList
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
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default DocumentTableResults;
