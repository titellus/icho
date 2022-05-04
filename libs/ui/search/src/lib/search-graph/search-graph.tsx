import "./search-graph.module.scss";
import { Container, Ref, Sticky } from "semantic-ui-react";
import { DataSearch, ReactiveBase, ReactiveComponent, SelectedFilters, SingleList } from "@appbaseio/reactivesearch";
import { DefaultQuery } from "@catalogue/utils/shared";
import React, { createRef } from "react";
import ReactECharts from "echarts-for-react";


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

export function SearchResultsGraph({ data, aggregations }: SearchResultsGraphProps) {
  if (aggregations == null) {
    return (<div />);
  }
  console.log("Build graph with : ", data, aggregations);

  const colors = ["#B03060",
    "#FE9A76",
    "#FFD700",
    "#32CD32",
    "#016936",
    "#008080",
    "#0E6EB8",
    "#EE82EE",
    "#B413EC",
    "#FF1493",
    "#A52A2A",
    "#A0A0A0",
    "#000000"];

  const minSymbolSize = 20, maxSymbolSize = 200, recordSymbolSize = 100;
  const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
    (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  function buildCategories() {
    const categoryField = Object.keys(aggregations)[0];
    return aggregations[categoryField].buckets.map((b: any, i: number) => {
      return [{
        name: "agg-" + b.key,
        itemStyle: {
          color: colors[i % colors.length]
        }
      }, {
        name: "record-" + b.key,
        symbol: "rect",
        symbolSize: recordSymbolSize,
        itemStyle: {
          color: colors[i % colors.length]
        }
      }];
    }).flat();
  }

  function buildData() {
    const categoryField = Object.keys(aggregations)[0];
    const maxCount = aggregations[categoryField].buckets[0]?.doc_count;
    return aggregations[categoryField].buckets.map((b: any, i: number) => {
      return {
        id: b.key,
        name: `${b.key} (${b.doc_count})`,
        category: "agg-" + b.key,
        label: {
          fontStyle: "bold"
        },
        // fixed: true,
        symbolSize: map(b.doc_count, 0, maxCount, minSymbolSize, maxSymbolSize)
      };
    }).concat(
      data.map((h: any) => {
        return {
          id: h.uuid,
          name: h.resourceTitleObject.default,
          category: "record-" + (h[categoryField] ? h[categoryField][0] : ""),
          label: {
            overflow: "truncate",
            width: recordSymbolSize
          }
        };
      })
    );
  }

  function buildLinks() {
    const categoryField = Object.keys(aggregations)[0];
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
    series: [
      {
        type: "graph",
        layout: "force",
        force: {
          repulsion: 300
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
        // emphasis: {
        //   focus: 'adjacency',
        //   lineStyle: {
        //     width: 10
        //   }
        // },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        categories: buildCategories(),
        data: graphData,
        // links: [],
        links: buildLinks()
      }
    ]
  };
  const eChartsRef = React.useRef(null as any);


  console.log("Chart options:", option);
  const events = {
    "click": function(params: any) {
      console.log(params);
      graphData = [];
      if (eChartsRef && eChartsRef.current) {
        option.series[0].data.push({
          id: 'test',
          name: 'test',
          category: "agg-test",
          label: {
            fontStyle: "bold"
          },
          symbolSize: 200
        });
        eChartsRef.current?.getEchartsInstance().setOption(option);
      }
    }
  };
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
        </Container>
      </Ref>

      <ReactiveComponent
        componentId="searchResultsGraph"
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
