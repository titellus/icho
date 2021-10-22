import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  DataSearch,
  ReactiveBase,
  ReactiveComponent,
  ReactiveList,
  SelectedFilters,
  SingleList,
} from "@appbaseio/reactivesearch";
import DocumentTable from "./DocumentTable";
import AggBlockComponent from "./AggBlockComponent";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

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

  renderAsNav(
    loading: boolean,
    error: any,
    data: any,
    value: string,
    handleChange: any
  ) {
    if (loading) {
      return <div>...</div>;
    }
    if (error) {
      return (
        <div>Something went wrong! Error details {JSON.stringify(error)}</div>
      );
    }
    return (
      <Nav className="flex-column" variant="pills">
        {data.map((item: any) => (
          <Nav.Item key={item.key} style={{ maxWidth: "100%" }}>
            <Nav.Link
              active={item.key === value}
              className={"d-inline-block text-truncate"}
              style={{ maxWidth: "100%" }}
              title={item.key}
              onClick={() => handleChange(item.key)}
            >
              {item.key} ({item.doc_count})
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    );
  }

  render() {
    return (
      <ReactiveBase
        app="gn-records"
        url="http://localhost:3000/search"
        enableAppbase={false}
      >
        <Container fluid={"lg"}>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">MyOrg</Navbar.Brand>
              <Navbar.Toggle />

              <DataSearch
                componentId="searchbox"
                dataField={["resourceTitleObject.default"]}
                placeholder="Search for datasets and maps..."
              />

              <SelectedFilters />

              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text></Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Row>
            <Col sm={3}>
              <SingleList
                componentId="resourceTypeMenu"
                dataField="resourceType"
                title="Resource types"
                selectAllLabel="All"
                showSearch={false}
                showRadio={false}
                showFilter={false}
                render={({ loading, error, data, value, handleChange }) => {
                  return this.renderAsNav(
                    loading,
                    error,
                    data,
                    value,
                    handleChange
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
                  return this.renderAsNav(
                    loading,
                    error,
                    data,
                    value,
                    handleChange
                  );
                }}
              />

              {/*<DynamicRangeSlider componentId="DynamicRangeSensor"
                                  includeNullValues={false}
                                  dataField="creationYearForResource" />*/}
            </Col>
            <Col sm={9}>
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
            </Col>
          </Row>
        </Container>
      </ReactiveBase>
    );
  }
}

export default DocumentTableResults;
