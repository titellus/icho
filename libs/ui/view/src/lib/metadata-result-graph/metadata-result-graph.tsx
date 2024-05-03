import './metadata-result-graph.module.scss';
import {ReactiveBase, ReactiveList, SingleList} from "@appbaseio/reactivesearch";
import React from "react";
import {SearchResultsGraph, SearchResultsGraphProps} from "@catalogue/ui/search";
import styles from "../metadata-result/metadata-result.module.scss";
import {Button, Card, Checkbox, Container, Form, Grid, Header, Icon, Image, Label, List} from "semantic-ui-react";
import {AssociatedResources} from "../associated-resources/associated-resources";
import MetadataTimeLine from "../metadata-time-line/metadata-time-line";
import MetadataList from "../metadata-list/metadata-list";
import MetadataUniqueElementList from "../metadata-unique-element-list/metadata-unique-element-list";
import ReactECharts, {EChartsOption} from "echarts-for-react";
import {SearchApi} from "@catalogue/api/geonetwork";
import {GraphEdgeItemObject} from "echarts/types/src/util/types";
import {GraphEdgeItemOption} from "echarts/types/src/chart/graph/GraphSeries";

/* eslint-disable-next-line */
export interface MetadataResultGraphProps {}
export interface ResultGraphProps {
  data: any;
}

export function ResultGraph({data}: ResultGraphProps) {
 if (data.length > 0){
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

  const parentConfig = {
    style: {
      value: minEdgeLength,
      lineStyle: {
        type: "solid",
        width: 3,
        color: getColor("series"),
        curveness: 0,
        opacity:1
      }
    }
  };

  const minSymbolSize = 20, maxSymbolSize = 150, recordSymbolSize = 8;
  const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
    (value - x1) * (y2 - x2) / (y1 - x1) + x2;

  //const categoryField = Object.keys(aggregations)[0];

  function buildLegend() {
    let legend = []
    for (const [key, value] of Object.entries(colorsByType)) {
      legend.push("record-" + key)
    }
    return legend
  }

  function getColor(key: string, i: number = 0): string {
    return colorsByType[key] || colors[i % colors.length];
  }

  function buildCategories() {
    let legend = []
    for (const [key, value] of Object.entries(colorsByType)) {
      legend.push({
        name: "record-" + key,
        itemStyle: {
          color: getColor(key, 0),
          opacity: .8
        }
      })
    }
    // @ts-ignore
    return legend
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
    let datagraphtest = {
      id: h.uuid,
      name: h.resourceTitleObject?.default,
      category: "record-" + (h.cl_resourceScope ? h.cl_resourceScope[0].key : h.resourceType[0]),
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
    return datagraphtest
  }

  function buildData() {
    return [hitAsData(data[0])];
  }

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
          curveness: 0,
          opacity:1
        }
      }
    },
    associated: {
      style: {
        // value: minEdgeLength,
        lineStyle: {
          type: "dotted",
          color: getColor("datasets"),
          opacity:1
        }
      }
    },
    brothersAndSisters: {
      style: {
        // value: minEdgeLength,
        lineStyle: {
          type: "dashed",
          color: getColor("series"),
          opacity:1
        }
      }
    },
    siblings: {
      style: {
        // value: minEdgeLength,
        lineStyle: {
          type: "solid",
          color: getColor("series"),
          opacity:1
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
          curveness: 0,
          opacity:1
        }
      }
    },
    datasets: {
      style: {
        value: maxEdgeLength / 2,
        lineStyle: {
          type: "dotted",
          color: getColor("datasets"),
          opacity:1
        }
      }
    },
    sources: {
      style: {
        value: maxEdgeLength / 2,
        lineStyle: {
          type: "dotted",
          color: getColor("datasets"),
          opacity:1
        }
      }
    },
    hasfeaturecats: {}
  };

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
        data: buildData(),
        links: retrieveAssociated([data[0]._id]),
        edges: [],
      }
    ]
  };

  const eChartsRef = React.useRef(null as any);
  const nodesTracker: string[] =[]
  const nodesStyleTracker = {
    position:"right",
    fontWeight : "bolder",
    color: '#302f2f',
    backgroundColor: "#e0dcdc"
  }
  const events = {
    "click": function(params: any) {
      if (params.data?.category?.startsWith("record-")) {
        // @ts-ignore
        option.series[0].data = option.series[0].data.map((obj: { id: any; }) => {
          if (obj.id === params.data.id) {
            // @ts-ignore
            return {
              ...obj, label: nodesStyleTracker
            };
          }
          return obj
        })
        retrieveAssociated([params.data.id]);
        nodesTracker.push(params.data.id)
      }
    },
    "dblclick": function(params: any) {
      retrieveAssociated(option.series[0].data
        .filter((r: any) => r.id?.length > 0 && r.category.startsWith("record-"))
        .map((r: any) => r.id));
    }
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
              let linkExists = null;
              if (option.series[0].links){
                let linkExists = option.series[0].links
                  .some((l: GraphEdgeItemObject<any>) =>
                    (l.source === uuid
                      && l.target === element._id)
                    || l.target === uuid
                    && l.source === element._id);
              }
              if (!nodeExists) {
                let source: any = hitAsData(element._source);
                if (hiddenCategoriesExists) {
                  // @ts-ignore
                  source.itemStyle.opacity = 0
                }
                option.series[0].data.push(source);
              }

              if (!linkExists) {
                const linkType = element.properties?.associationType || type;
                const link: GraphEdgeItemObject<any> = {
                  source: uuids[0],
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
                if (hiddenCategoriesExists) {
                  // @ts-ignore
                  link.lineStyle["opacity"] = 0
                }
                option.series[0].edges.push(link);
              }
            }
          }
        })

        if (eChartsRef && eChartsRef.current) {
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
      for (var i = 0; i < option.series[0].edges.length; i++) {
        if (option.series[0].edges[i].label && option.series[0].edges[i].label.formatter && option.series[0].edges[i].label.formatter === items.name) {
          option.series[0].edges[i].lineStyle["opacity"] = 1
          for (var j = 0; j < option.series[0].data.length; j++) {
            if (option.series[0].data[j].id === option.series[0].edges[i].target || option.series[0].data[j].id === option.series[0].edges[i].source) {
              option.series[0].data[j].itemStyle["opacity"] = 1
            }
          }
        }
      }
    } else {
      let aliveNodes: any[] = []
      for (var i = 0; i < option.series[0].edges.length; i++)  {
        if (option.series[0].edges[i].label && option.series[0].edges[i].label.formatter && option.series[0].edges[i].label.formatter === items.name){
          option.series[0].edges[i].lineStyle["opacity"] = 0
        }
        else {
          if (aliveNodes.indexOf(option.series[0].edges[i].target) === -1 &&
            option.series[0].edges[i].lineStyle["opacity"] === 1) {
            aliveNodes.push(option.series[0].edges[i].target)
          }
          if (aliveNodes.indexOf(option.series[0].edges[i].source) === -1 &&
            option.series[0].edges[i].lineStyle["opacity"] === 1) {
            aliveNodes.push(option.series[0].edges[i].source)
          }
        }
      }
      for (var i = 0; i < option.series[0].data.length; i++)  {
        if (aliveNodes.indexOf(option.series[0].data[i].id) === -1 &&
          option.series[0].data[i].id !== data[0].uuid){
          option.series[0].data[i].itemStyle["opacity"] = 0
        }
      }
    }
    if (eChartsRef && eChartsRef.current) {;
      console.log("Set graph options after checkbox", option);
      eChartsRef.current?.getEchartsInstance().setOption(option);
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
 else {
   return <div></div>
 }
}

interface Props {
  uuid: string;
}

export function MetadataResultGraph({uuid}: Props) {
  let default_query = {
    query_string: {query: uuid, fields: ["_id", "uuid"]},
  };
  const api = process.env.NX_CATALOGUE_API_ENDPOINT;
  return (
    <ReactiveBase
      app="records"
      url={api + '/api/search/'}
      headers={{"Content-Type": 'application/json'}}
      enableAppbase={false}
    >
      <ReactiveList
        componentId="mtd"
        pagination={false}
        showResultStats={false}
        defaultQuery={() => ({
          query: default_query,
        })}
        dataField={'_id'}
        react={{}}
        render={({loading, error, data}) => {
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
          // @ts-ignore
          return (
            <div>
              <ResultGraph data={data}></ResultGraph>
            </div>
          );
        }}
      />
    </ReactiveBase>
  );
}



export default MetadataResultGraph;






