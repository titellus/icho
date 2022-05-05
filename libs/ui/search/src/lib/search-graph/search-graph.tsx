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
import {RecordsApi} from "@catalogue/api/geonetwork";


/* eslint-disable-next-line */
export interface SearchResultsGraphProps {
  aggregations: any;
  data: any;
}

export interface Node {
  id: string;
  name: string;
  category: string;
  label: {
    normal: {
      show: true
    }
  },
}

export interface Link {
  source: string;
  target: string;
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

  const minSymbolSize = 20, maxSymbolSize = 150, recordSymbolSize = 8;
  const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
    (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  function buildLegend() {
    const categoryField = Object.keys(aggregations)[0];
    return aggregations[categoryField].buckets.map((b: any) => {
      return "agg-" + b.key;
    });
  }

  function buildCategories() {
    const categoryField = Object.keys(aggregations)[0];
    return aggregations[categoryField].buckets.map((b: any, i: number) => {
      return [{
        name: "agg-" + b.key,
        itemStyle: {
          color: colors[i % colors.length],
          opacity: .8
        }
      }, {
        name: "record-" + b.key,
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

    function getLabel(d: any) {
      return d.name;
    }

    function getTooltip(d: any) {
      var record = data.filter((r: any) => r.uuid === d.data.id).pop(),
        identifiers = record?.resourceIdentifier.map((c: any) => c.code).join(", ");
      return `<b>${d.name}</b><br />${identifiers}`;
    }

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
            width: 200,
            show: true,
            position: "right",
            formatter: getLabel
          },
          tooltip: {
            formatter: getTooltip
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
        links: buildLinks(),
        edges:buildLinks()
      }
    ]
  };
  const eChartsRef = React.useRef(null as any);


  console.log("Chart options:", option);
  const events = {
    "click": function(params: any) {
      retrieveAssociated(params)
    }
  };

  let model = {
    "categories": [
      {"name": "root", "keyword": {}, "base": "root"},
      {"name": "parent", "keyword": {}, "base": "parent"},
      {"name": "datasets", "keyword": {}, "base": "datasets"},
      {"name": "associated", "keyword": {}, "base": "associated"},
      {"name": "brothersAndSisters", "keyword": {}, "base": "brothersAndSisters"},
      {"name": "siblings", "keyword": {}, "base": "siblings"},
      {"name": "services", "keyword": {}, "base": "services"},
      {"name": "hassources", "keyword": {}, "base": "hassources"},
      {"name": "hasfeaturecats", "keyword": {}, "base": "hasfeaturecats"}
    ]
  }

  function retrieveAssociated(rootData:any){
    new RecordsApi().getAssociatedResources(rootData.data.id.split('_')[0])
      .then((response: { data: any; }) => {
        let associated = response.data
        console.log(associated)
        console.log(option.series[0].data)
        for (const { index, value } of model.categories.map((value: any, index: any) => ({ index, value }))) {
          if (associated && associated[value.name]) {
            for (var element of associated[value.name]) {
              const node: Node = {
                id: element._id + '_' +value.name,
                name: element._source.resourceTitleObject.default,
                category:'record-' + element._source.resourceType[0],
                label: {
                  normal: {
                    show: true
                  }
                },
              };
              const link: Link = {
                source: rootData.data.id,
                target: element._id + '_' +value.name
              };
              if (eChartsRef && eChartsRef.current) {
                const nodeExists = option.series[0].data.some((data: { id: string; }) => data.id === element._id + '_' +value.name);
                if(!nodeExists) {
                  option.series[0].data.push(node);
                }
                option.series[0].links.push(link);
                option.series[0].edges.push(link);
                eChartsRef.current?.getEchartsInstance().setOption(option);
                console.log(option.series[0].data)
            }
          }
        }
      }});
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
