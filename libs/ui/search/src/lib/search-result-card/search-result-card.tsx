import './search-result-card.module.scss';
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  SemanticCOLORS,
  SemanticICONS,
  SemanticWIDTHS
} from 'semantic-ui-react'
import React from "react";
import jp from 'jsonpath';

/* eslint-disable-next-line */
export interface SearchResultCardProps {
}

export interface templateCard {
  imageIndex: string;
  imageJsonPath: string;
  titleIndex: string;
  titleSize:string;
  titleJsonPath: string;
  subTitleIndex: string;
  subTitleJsonPath: string;
  textIndex: string;
  textJsonPath: string;
  linkIndex: string;
  linkJsonPath: string;
  linkIcon?:SemanticICONS | undefined;
  linkButtonColor?:SemanticCOLORS | undefined;
  infoIndex: string;
  infoJsonPath: string;
  linkHook:string;
}

interface Props {
  data: Array<Record<string, unknown>>;
  template: templateCard;
  landingPageUrlTemplate: string;
  itemsPerRow:SemanticWIDTHS | undefined;
  marginX:number | undefined;
}

interface InfoContentAttributes {
  as: string;
  href?: string;
}

export function SearchResultCard({data,
                                   template,
                                   landingPageUrlTemplate,
                                   itemsPerRow,marginX}: Props) {
  let style:any;
  if (marginX){
    let margin = marginX +"em";
    let spacing = 2*marginX +"em";
    // @ts-ignore
    let elem = 'calc('+ (100/itemsPerRow) +'% - ' + spacing +')'
    style = {marginLeft: margin, marginRight: margin, width:elem}
  }
  return (
    <div>
      <Card.Group centered itemsPerRow={itemsPerRow}>
        {data.map((dataItem: any) => {
          return (
            <Card style={style} key={dataItem._id}>
              {dataItem[template.imageIndex] ? (
                <Image src={template.imageJsonPath === '' ?
                  dataItem[template.imageIndex] : jp.query(dataItem[template.imageIndex], template.imageJsonPath)
                } ui={false} wrapped/>
              ) : ("")}
              <Card.Content>
                <Card.Header>
                  <Header as={template.titleSize}>{dataItem[template.titleIndex] ? (
                    template.titleJsonPath === '' ?
                      dataItem[template.titleIndex] : jp.query(dataItem[template.titleIndex], template.titleJsonPath)
                  ) : ""}</Header>
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    {dataItem[template.subTitleIndex] ? (
                      template.subTitleJsonPath === '' ?
                        dataItem[template.subTitleIndex] : jp.query(dataItem[template.subTitleIndex], template.subTitleJsonPath)
                    ) : ""}
                  </span>
                </Card.Meta>
                <Card.Description>
                  {dataItem[template.textIndex] ? (
                    template.textJsonPath === '' ?
                      dataItem[template.textIndex] : jp.query(dataItem[template.textIndex], template.textJsonPath)
                  ) : ""}
                </Card.Description>
              </Card.Content>

                <Card.Content extra>
                <span className="right floated">
                  {dataItem[template.infoIndex] ? (
                    template.infoJsonPath === '' ?
                      (<span>{dataItem[template.infoIndex]}<br/></span>) :
                      (<span>{jp.query(dataItem[template.infoIndex], template.infoJsonPath)}<br/></span>)
                  ) : ""}
                  <a className="right floated" href={landingPageUrlTemplate.replace("{uuid}", dataItem["_id"])}>
                    <Icon name="info circle"/>Plus d'infos
                  </a>
                </span>
                  {dataItem[template.linkIndex] ? (
                    <Button color={template.linkButtonColor} >
                      <a style={{color: "white"}} href={template.linkJsonPath === '' ?
                        dataItem[template.linkIndex] : jp.query(dataItem[template.linkIndex], template.linkJsonPath).toString()
                      }>
                        <Icon name={template.linkIcon}/>{template.linkHook}
                      </a>
                    </Button>) : ("")}
                </Card.Content>

            </Card>
          )
        })}
      </Card.Group>
    </div>
  );
}

export default SearchResultCard;
