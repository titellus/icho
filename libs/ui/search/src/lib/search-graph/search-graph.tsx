import "./search-graph.module.scss";
import {
  Checkbox,
  Container,
  Grid,
  Ref,
  Sticky,
  Form
} from "semantic-ui-react";
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
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { SearchApi } from "@catalogue/api/geonetwork";
import { GraphEdgeItemOption, GraphNodeItemOption } from "echarts/types/src/chart/graph/GraphSeries";
import { GraphEdgeItemObject } from "echarts/types/src/util/types";


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

  const greyColor = "#A0A0A0";
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
    greyColor,
    "#FF1493",
    "#000000"];

  const colorsByType: Record<string, string> = {
    "series": colors[0],
    "dataset": colors[1],
    "service": colors[2],
    "application": colors[3]
  };

  const minEdgeLength = 20;
  const maxEdgeLength = 400; // edge with larger value will be shorter
  const aggLineStyle = {
    value: minEdgeLength,
    lineStyle: {
      color: greyColor,
      opacity: .2
    }
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

  function hitAsData(h: any): any {
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
      },
      itemStyle: {
        opacity: 1
      },
      tooltip: {
        formatter: '{b}'
      }
    };
  }

  function buildData() {
    const maxCount = aggregations[categoryField].buckets[0]?.doc_count;

    return aggregationsOnLoad[categoryField].buckets.map((b: any, i: number) => {
      return {
        id: b.key,
        name: `${b.key}`,
        value: b.doc_count.toLocaleString('fr'),
        category: "agg-" + b.key,
        label: {
          fontStyle: "bold"
        },
        symbol: "pin",
        symbolSize: 30,
        tooltip: {
          formatter: '<b>{b}</b>  ({c})'
        }
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
          target: h.uuid,
          ...aggLineStyle
        }];
      }
    ).flat();
  }

  let graphData = buildData();
  let option: EChartsOption = {
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
          edgeLength: [minEdgeLength, maxEdgeLength],
          repulsion: 200,
          initLayout: "circular",
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
          focus: "adjacency",
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



  const parentConfig = {
    style: {
      value: minEdgeLength,
      lineStyle: {
        type: "solid",
        width: 3,
        color: getColor("series"),
        curveness: 0
      }
    }
  };
  let associationTypes: Record<string, any> = {
    parent: parentConfig,
    partOfSeamlessDatabase: {
      virtual: true,
      ...parentConfig
    },
    children: {
      style: {
        value: maxEdgeLength,
        lineStyle: {
          type: "solid",
          width: 3,
          color: getColor("series"),
          curveness: 0
        }
      }
    },
    associated: {
      style: {
        // value: minEdgeLength,
        lineStyle: {
          type: "dotted",
          color: getColor("datasets")
        }
      }
    },
    brothersAndSisters: {
      style: {
        // value: minEdgeLength,
        lineStyle: {
          type: "dashed",
          color: getColor("series")
        }
      }
    },
    siblings: {
      style: {
        // value: minEdgeLength,
        lineStyle: {
          type: "solid",
          color: getColor("series")
        }
      }
    },
    services: {
      style: {
        value: maxEdgeLength,
        lineStyle: {
          type: "solid",
          width: 3,
          color: getColor("service"),
          curveness: 0
        }
      }
    },
    datasets: {
      style: {
        value: maxEdgeLength / 2,
        lineStyle: {
          type: "dotted",
          color: getColor("datasets")
        }
      }
    },
    sources: {
      style: {
        value: maxEdgeLength / 2,
        lineStyle: {
          type: "dotted",
          color: getColor("datasets")
        }
      }
    },
    hasfeaturecats: {}
  };

  let modelCategories = Object.keys(associationTypes)
  let hiddenCat: string[]=[]

  function retrieveAssociated(uuids: string[]) {
    // @ts-ignore
    new SearchApi().search("", Object.keys(associationTypes)
      .filter(t => !associationTypes[t].virtual), {
      query: {
        terms: { uuid: uuids }
      },
      _source: ["uuid"],
      size: uuids.length
    }).then(r => {
      let updated = false;

      // @ts-ignore
      r.data.hits.hits.map((record: any) => {
        const uuid = record._id;

        let associated = record.related;
        Object.keys(associationTypes).map((type: string) => {
          if (associated && associated[type]) {
            for (var element of associated[type]) {
              const hiddenCategoriesExists = hiddenCat
                .some((hidden: string) =>
                  hidden === type);
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
                let source: any = hitAsData(element._source);
                if (hiddenCategoriesExists) {
                  // @ts-ignore
                  source.itemStyle.opacity = 0
                }
                option.series[0].data.push(source);

                const link: GraphEdgeItemOption = {
                  source: source && source[categoryField] ? source[categoryField][0] : "",
                  target: element._id,
                  ...aggLineStyle
                };
                if (hiddenCategoriesExists) {
                  // @ts-ignore
                  link.lineStyle["opacity"] = 0
                }
                option.series[0].edges.push(link);
              }

              if (!linkExists) {
                const linkType = element.properties?.associationType || type;
                const link: GraphEdgeItemObject<any> = {
                  source: uuid,
                  target: element._id,
                  label: {
                    show: true,
                    formatter: linkType,
                    fontSize: 9
                  },
                  ...associationTypes[linkType]
                    ? associationTypes[linkType].style
                    : associationTypes[type].style
                };
                option.series[0].edges.push(link);
              }
            }
          }
        })

        if (updated && eChartsRef && eChartsRef.current) {
          console.log("Set graph options", option);
          eChartsRef.current?.getEchartsInstance().setOption(option, {
            notMerge: false,
            replaceMerge: "series",
            silent: true
          });
        }
      });
    });
  }

  const checkboxChangeHandler = (e:any, items:any) => {
    if (items.checked === false) {
      hiddenCat.push(items.name)
    }
    if (items.checked === true) {
      const catIndex = hiddenCat.indexOf(items.name)
      hiddenCat.splice(catIndex, 1);
    }
    for (var i = 0; i < option.series[0].edges.length; i++)  {
      if (option.series[0].edges[i].label && option.series[0].edges[i].label.formatter && option.series[0].edges[i].label.formatter === items.name){
        if (items.checked === true) {
          option.series[0].edges[i].lineStyle["opacity"] = 1
          for (var j = 0; j < option.series[0].data.length; j++)  {
            if ( option.series[0].data[j].id === option.series[0].edges[i].target ){
              option.series[0].data[j].itemStyle["opacity"] = 1
            }
          }
        } else {
          option.series[0].edges[i].lineStyle["opacity"] = 0
          for (var j = 0; j < option.series[0].data.length; j++)  {
            if ( option.series[0].data[j].id === option.series[0].edges[i].target ){
              option.series[0].data[j].itemStyle["opacity"] = 0
            }
          }
        }
      }
      if (eChartsRef && eChartsRef.current) {;
        eChartsRef.current?.getEchartsInstance().setOption(option);
      }
    }
  };

  return (
    <>
      <div style={{margin: "1em"}}>
        <Form>
          <Form.Group inline>
            <label>Association types: </label>
              {modelCategories.map((category:any) => (
                  <Checkbox style={{margin: "0.5em"}}
                            label={category}
                            name={category}
                            onChange={checkboxChangeHandler}
                            key={category}
                            defaultChecked/>
              ))}
          </Form.Group>
        </Form>
      </div>
      <ReactECharts option={option}
                    onEvents={events}
                    ref={eChartsRef}
                    style={{ minHeight: "800px", height: "100%", width: "100%" }} />
    </>
  );
}


/* eslint-disable-next-line */
export interface SearchGraphProps {
};

export function SearchGraph(props: SearchGraphProps) {
  const contextRef: any = createRef();
  const api = process.env.NX_CATALOGUE_API_ENDPOINT || "http://localhost:4200/geonetwork/srv";

  return (
    <ReactiveBase
      app="records"
      url={api + "/api/search/"}
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
                field: "resourceType",
                include: "series|dataset|service|application"
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
