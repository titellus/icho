import "./search-graph.module.scss";
import { Container, Grid, Ref, Sticky } from "semantic-ui-react";
import {
  DataSearch,
  MultiDropdownList,
  ReactiveBase,
  ReactiveComponent,
  SelectedFilters,
  SingleList
} from "@appbaseio/reactivesearch";
import { DefaultQuery } from "@catalogue/utils/shared";
import React, { createRef } from "react";
import ReactECharts from "echarts-for-react";
import { RecordsApi } from "@catalogue/api/geonetwork";
import { GraphNodeItemOption } from "echarts/types/src/chart/graph/GraphSeries";
import { GraphEdgeItemObject } from "echarts/types/src/util/types";
import axios from "axios";


/* eslint-disable-next-line */
export interface SearchResultsGraphProps {
  aggregations: any;
  data: any;
}

class SearchResultsGraphWrapper extends React.Component <{
  aggregations: any;
  data: any;
  setQuery?: any;
  dataField?: any;
  dataSubField?: any;
  value?: any;
  onMoreBlocks?: any;
}> {
  handleChange = (item: any) => {
    const { setQuery, dataField } = this.props;
    if (item) {
      // @ts-ignore
      const query = SingleList.defaultQuery(item, {
        queryFormat: "or",
        dataField
      });
      setQuery({
        query,
        value: item
      });
    } else {
      setQuery(null);
    }
  };

  render() {
    // if (this.props.aggregations?.length && this.props.data?.length) {
    if (true) {
      return (
        <SearchResultsGraph aggregations={this.props.aggregations}
                            data={this.props.data}></SearchResultsGraph>
      );
    } else {
      return (<div />);
    }
  };
};

let aggregationsOnLoad: any = null;

export function SearchResultsGraph({ data, aggregations }: SearchResultsGraphProps) {
  if (aggregations == null) {
    return (<div />);
  }
  console.log("Build graph with : ", data, aggregations);

  if (aggregationsOnLoad === null) {
    console.log("Set aggregations for all search.");
    aggregationsOnLoad = aggregations;
  }

  const colors = [
    "#32CD32",
    "#FFD700",
    "#0E6EB8",
    "#A52A2A",
    "#B413EC",
    "#FE9A76",
    "#016936",
    "#B03060",
    "#008080",
    "#EE82EE",
    "#A0A0A0",
    "#FF1493",
    "#000000"];

  const colorsByType: Record<string, string> = {
    "series": colors[0],
    "dataset": colors[1],
    "service": colors[2],
    "application": colors[3]
  };

  const minSymbolSize = 20, maxSymbolSize = 150, recordSymbolSize = 8;
  const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
    (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  const categoryField = Object.keys(aggregations)[0];

  function buildLegend() {
    return aggregations[categoryField].buckets.map((b: any) => {
      return "agg-" + b.key;
    });
  }

  function getColor(key: string, i: number = 0): string {
    return colorsByType[key] || colors[i % colors.length];
  }

  function buildCategories() {
    return aggregationsOnLoad[categoryField].buckets.map((b: any, i: number) => {
      return [{
        name: "agg-" + b.key,
        itemStyle: {
          color: getColor(b.key, i),
          opacity: .8
        }
      }, {
        name: "record-" + b.key,
        symbolSize: recordSymbolSize,
        itemStyle: {
          color: getColor(b.key, i)
        }
      }];
    }).flat();
  }

  function getLabel(d: any) {
    return d.name;
  }

  function getTooltip(d: any) {
    var record = data.filter((r: any) => r.uuid === d.data.id).pop(),
      identifiers = record?.resourceIdentifier.map((c: any) => c.code).join(", ");
    return `<b>${d.name}</b><br />${identifiers}`;
  }

  function hitAsData(h: any): GraphNodeItemOption {
    return {
      id: h.uuid,
      name: h.resourceTitleObject?.default,
      category: "record-" + (h[categoryField] ? h[categoryField][0] : ""),
      label: {
        overflow: "truncate",
        width: 200,
        show: true,
        position: "right",
        formatter: getLabel
      }
      // tooltip: {
      //   formatter: getTooltip
      // }
    };
  }

  function buildData() {
    const maxCount = aggregations[categoryField].buckets[0]?.doc_count;

    return aggregationsOnLoad[categoryField].buckets.map((b: any, i: number) => {
      return {
        id: b.key,
        name: `${b.key} (${b.doc_count})`,
        category: "agg-" + b.key,
        label: {
          fontStyle: "bold"
        },
        symbol: 'pin',
        symbolSize: 30
        // fixed: true,
        // symbolSize: map(b.doc_count, 0, maxCount, minSymbolSize, maxSymbolSize)
      };
    }).concat(
      data.map((h: any) => {
        return hitAsData(h);
      })
    );
  }

  function buildLinks() {
    return data.map((h: any) => {
        return [{
          source: h[categoryField] ? h[categoryField][0] : "",
          target: h.uuid
        }];
      }
    ).flat();
  }

  let graphData = buildData();
  let option: any = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    legend: {
      data: buildLegend()
    },
    series: [
      {
        type: "graph",
        layout: "force",
        force: {
          repulsion: 400,
          layoutAnimation: false
        },
        roam: true,
        draggable: true,
        label: {
          show: true
        },
        lineStyle: {
          color: "source",
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        categories: buildCategories(),
        data: graphData,
        links: buildLinks(),
        edges: buildLinks()
      }
    ]
  };
  const eChartsRef = React.useRef(null as any);
  const events = {
    "click": function(params: any) {
      if (params.data?.category?.startsWith("record-")) {
        retrieveAssociated([params.data.id]);
      }
    },
    "dblclick": function(params: any) {
      retrieveAssociated(option.series[0].data
        .filter((r: any) => r.id?.length > 0 && r.category.startsWith("record-"))
        .map((r: any) => r.id));
    }
  };

  let model = {
    "categories": [
      { "name": "root", "keyword": {}, "base": "root" },
      {
        "name": "parent", "keyword": {}, "base": "parent", style: {
          lineStyle: {
            type: "solid",
            width: 3,
            color: getColor("series"),
            curveness: 0
          }
        }
      },
      {
        "name": "children", "keyword": {}, "base": "children", style: {
          lineStyle: {
            type: "solid",
            width: 3,
            color: getColor("series"),
            curveness: 0
          }
        }
      },
      {
        "name": "datasets", "keyword": {}, "base": "datasets", style: {
          lineStyle: {
            type: "solid",
            color: getColor("datasets"),
            curveness: 0
          }
        }
      },
      {
        "name": "associated", "keyword": {}, "base": "associated", style: {
          lineStyle: {
            type: "dotted",
            color: getColor("datasets")
          }
        }
      },
      {
        "name": "brothersAndSisters", "keyword": {}, "base": "brothersAndSisters", style: {
          lineStyle: {
            type: "dashed",
            color: getColor("series")
          }
        }
      },
      {
        "name": "siblings", "keyword": {}, "base": "siblings", style: {
          lineStyle: {
            type: "solid",
            color: getColor("series")
          }
        }
      },
      {
        "name": "services", "keyword": {}, "base": "services", style: {
          lineStyle: {
            type: "solid",
            width: 3,
            color: getColor("service"),
            curveness: 0
          }
        }
      },
      {
        "name": "hassources", "keyword": {}, "base": "hassources", style: {
          lineStyle: {
            type: "dotted",
            color: getColor("datasets")
          }
        }
      },
      { "name": "hasfeaturecats", "keyword": {}, "base": "hasfeaturecats" }
    ]
  };


  function retrieveAssociated(uuids: string[]) {
    axios.all(uuids.map(uuid => new RecordsApi().getAssociatedResources(uuid)))
      .then(
        axios.spread((...responses) => {
          let updated = false;

          responses.map(response => {
            const uuid = response.config
              .url?.replace(/.*api\/records\/(.*)\/associated/, "$1");

            let associated = response.data;
            for (const { index, value } of model.categories
              .map((value: any, index: any) => ({ index, value }))) {
              if (associated && associated[value.name]) {
                for (var element of associated[value.name]) {

                  const nodeExists = option.series[0].data
                    .some((data: { id: string; }) =>
                      data.id === element._id);
                  const linkExists = option.series[0].links
                    .some((l: GraphEdgeItemObject<any>) =>
                      (l.source === uuid
                      && l.target === element._id)
                      || l.target === uuid
                      && l.source === element._id);
                  if (!nodeExists) {
                    updated = true;
                    const source: any = element._source;
                    option.series[0].data.push(hitAsData(source));
                    option.series[0].links.push({
                      source: source && source[categoryField] ? source[categoryField][0] : "",
                      target: element._id
                    });
                  }

                  if (!linkExists) {
                    const link: GraphEdgeItemObject<any> = {
                      source: uuid,
                      target: element._id,
                      label: {
                        show: true,
                        formatter: value.name,
                        fontSize: 9
                      },
                      ...value.style
                    };
                    option.series[0].links.push(link);
                    option.series[0].edges.push(link);
                  }
                }
              }
            }
          });

          if (updated && eChartsRef && eChartsRef.current) {
            console.log("Set graph options");
            eChartsRef.current?.getEchartsInstance().setOption(option);
          }
        }));
  }

  return (
    <ReactECharts option={option}
                  onEvents={events}
                  ref={eChartsRef}
                  style={{ minHeight: "800px", height: "100%", width: "100%" }} />
  );
}


/* eslint-disable-next-line */
export interface SearchGraphProps {
};

export function SearchGraph(props: SearchGraphProps) {
  const contextRef: any = createRef();
  const api = process.env.NX_CATALOGUE_API_ENDPOINT || "http://localhost:4200/geonetwork";

  return (
    <ReactiveBase
      app="records"
      url={api + "/srv/api/search/"}
      enableAppbase={false}
    >
      <Ref innerRef={contextRef}>
        <Container>
          <Sticky context={contextRef}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={12}>
                  <DataSearch
                    componentId="searchbox"
                    queryFormat="and"
                    debounce={1000}
                    defaultQuery={() => {
                      return DefaultQuery.IS_RECORD;
                    }}
                    dataField={["resourceTitleObject.default"]}
                    placeholder="Search for datasets and maps..."
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <MultiDropdownList
                    componentId="resourceType"
                    dataField="resourceType"
                    placeholder="Types" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <SelectedFilters />
          </Sticky>
        </Container>
      </Ref>

      <ReactiveComponent
        componentId="searchResultsGraph"
        react={{
          and: [
            "searchbox",
            "resourceType"
          ]
        }}
        defaultQuery={() => ({
          aggs: {
            resourceType: {
              terms: {
                field: "resourceType"
              }
            }
          },
          size: 30
        })}
        render={({ aggregations, setQuery, data }) => (
          <SearchResultsGraphWrapper aggregations={aggregations}
                                     data={data}
                                     setQuery={setQuery} />
        )}
      />
    </ReactiveBase>
  );
}

export default SearchGraph;
