import React from "react";
import "./App.css";

import {
  DataSearch,
  ReactiveBase,
  ReactiveList,
  SingleList,
  ToggleButton,
} from "@appbaseio/reactivesearch";
import DocumentTable from "./DocumentTable";
import IncludeFieldsSelector from "./IncludeFieldsSelector";

type IAppState = {
  includeFields: String[];
};

const SomeFields = ["includeFields"];

class DocumentTableResults extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      includeFields: ["uuid", "resourceType", "resourceTitleObject", "tag"],
    };
    this.setIncludeFields = this.setIncludeFields.bind(this);
  }

  setIncludeFields(fields: string[]) {
    this.setState({ includedFields: fields });
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
              componentId="resourceTypeToggle"
              dataField="resourceType"
              selectAllLabel="All"
              showSearch={false}
              showRadio={true}
              showFilter={false}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "66%",
              margin: "10px",
            }}
          >
            <DataSearch
              componentId="searchbox"
              dataField={["resourceTitleObject.default"]}
              placeholder="Search for datasets and maps..."
            />
            <IncludeFieldsSelector
              fields={this.state.includeFields}
              onChange={this.setIncludeFields}
              setQuery={null}
            />
            {this.state.includedFields}==
            <ReactiveList
              componentId="results"
              size={5}
              pagination={false}
              react={{
                and: [
                  "searchbox",
                  "resourceTypeToggle",
                  "resourceTypeToggleButton",
                  "includeFieldsSelector",
                ],
              }}
              //includeFields={this.state.includeFields}
              dataField={"resourceTitleObject.default"}
              render={({ data }) => (
                <div>
                  <DocumentTable
                    data={data}
                    includeFields={this.state.includeFields}
                  ></DocumentTable>
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
