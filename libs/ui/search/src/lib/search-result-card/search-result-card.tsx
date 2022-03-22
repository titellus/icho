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
  titleSize: string;
  titleJsonPath: string;
  subTitleIndex: string;
  subTitleJsonPath: string;
  textIndex: string;
  textJsonPath: string;
  linkIndex: string;
  linkJsonPath: string;
  linkIcon?: SemanticICONS | undefined;
  linkButtonColor?: SemanticCOLORS | undefined;
  infoIndex: string;
  infoJsonPath: string;
  linkHook: string;
  additionalInfoIndex: string;
  additionalInfoJsonPath: string;
}

interface Props {
  data: Array<Record<string, unknown>>;
  template: templateCard;
  landingPageUrlTemplate: string;
  itemsPerRow: SemanticWIDTHS | undefined;
  marginX: number | undefined;
  marginBottom: number | undefined;
  linkMDT: string;
}

interface InfoContentAttributes {
  as: string;
  href?: string;
}

export function SearchResultCard({
                                   data,
                                   template,
                                   landingPageUrlTemplate,
                                   itemsPerRow, marginX, marginBottom, linkMDT
                                 }: Props) {
  let style: any;
  if (marginX) {
    let margin = marginX + "em";
    let spacing = 2 * marginX + "em";
    // @ts-ignore
    let elem = 'calc(' + (100 / itemsPerRow) + '% - ' + spacing + ')'
    style = {marginLeft: margin, marginRight: margin, width: elem}
  }
  return (
    <div>
      <Card.Group centered itemsPerRow={itemsPerRow} style={{marginBottom: marginBottom + "em"}}>
        {data.map((dataItem: any) => {
          return (
            <Card style={style} key={dataItem._id}>
              <div className={"image"}>
                {dataItem[template.imageIndex] ? (
                  <img src={template.imageJsonPath === '' ?
                    dataItem[template.imageIndex] : jp.query(dataItem[template.imageIndex], template.imageJsonPath)
                  }/>
                ) : ("")}
              </div>
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
              {dataItem[template.infoIndex] || dataItem[template.additionalInfoIndex] === 'restricted' ||
              (dataItem[template.additionalInfoIndex] &&  template.additionalInfoJsonPath != '' &&
                jp.query(dataItem[template.additionalInfoIndex], template.additionalInfoJsonPath).toString() === 'restricted')
              || dataItem[template.linkIndex] ? (<Card.Content extra>
                <span className="right floated">
                  {dataItem[template.infoIndex] ? (
                    template.infoJsonPath === '' ?
                      (<span>{dataItem[template.infoIndex]}<br/></span>) :
                      (<span>{jp.query(dataItem[template.infoIndex], template.infoJsonPath)}<br/></span>)
                  ) : ""}
                  <span className="right floated">
                  {linkMDT === "true" ? (
                      <button style={{border:"none",background:"white"}}>
                        <a target="_blank" href={landingPageUrlTemplate.replace("{uuid}", dataItem["_id"])}>
                          <Icon name="info circle"/>Plus d'infos
                        </a>
                      </button>) : ''}
                  {dataItem[template.additionalInfoIndex] ? (
                    template.additionalInfoJsonPath === '' ?
                      (
                        dataItem[template.additionalInfoIndex] === 'restricted' ?
                          (<button className="ui circular disabled icon button"><i aria-hidden="true" className="lock icon"></i></button>) : ('')
                      ) :
                      (
                        jp.query(dataItem[template.additionalInfoIndex], template.additionalInfoJsonPath).toString() === 'restricted' ?
                          (<button className="ui circular disabled icon button"><i aria-hidden="true" className="lock icon"></i></button>) : ('')
                      )
                  ) : ""}
                    </span>

                </span>
                {dataItem[template.linkIndex] ? (
                  <Button style={{background: template.linkButtonColor}}>
                    <a style={{color: "white"}} target="_blank"
                       href={template.linkJsonPath === '' ?
                         dataItem[template.linkIndex] : jp.query(dataItem[template.linkIndex], template.linkJsonPath).toString()
                       }>
                      <Icon name={template.linkIcon}/>{template.linkHook}
                    </a>
                  </Button>) : ("")}
              </Card.Content>) : ("")}
            </Card>
          )
        })}
      </Card.Group>
    </div>
  );
}

export default SearchResultCard;
