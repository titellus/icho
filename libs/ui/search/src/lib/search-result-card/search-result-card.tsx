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
import React, {Fragment} from "react";
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
  contactInfoIndex: string;
  contactInfoJsonPath: string;
  contactInfoHook:string;
}

interface Props {
  data: Array<Record<string, unknown>>;
  template: templateCard;
  landingPageUrlTemplate: string;
  itemsPerRow: SemanticWIDTHS | undefined;
  marginX: number | undefined;
  marginBottom: number | undefined;
  marginCardBottom: number | undefined;
  linkMDT: string;
  imageHeight: number | undefined;
}

interface InfoContentAttributes {
  as: string;
  href?: string;
}

export function SearchResultCard({
                                   data,
                                   template,
                                   landingPageUrlTemplate,
                                   itemsPerRow, marginX, marginBottom, marginCardBottom, linkMDT,imageHeight
                                 }: Props) {
  let style: any;
  let imgStyle: any;
  if (marginX) {
    let margin = marginX + "em";
    let spacing = 2 * marginX + "em";
    // @ts-ignore
    let elem = 'calc(' + (100 / itemsPerRow) + '% - ' + spacing + ')'
    if (marginCardBottom) {
      style = {marginLeft: margin, marginRight: margin, width: elem, marginBottom:marginCardBottom + "em"}
    } else {
      style = {marginLeft: margin, marginRight: margin, width: elem}
    }
  } else if (marginCardBottom) {
    style = {marginBottom:marginCardBottom + "em"}
  }
  if (imageHeight) {
    imgStyle = {maxHeight: imageHeight + "px", minHeight: imageHeight + "px", objectFit:"contain"}
  }
  return (
    <div>
      <Card.Group centered itemsPerRow={itemsPerRow} style={{marginBottom: marginBottom + "em"}}>
        {data.map((dataItem: any) => {
          return (
            <Card style={style} key={dataItem._id}>
              <div className={"image"} style={{ textAlign:"center"}}>
                {dataItem[template.linkIndex] ?
                  (
                    <a style={{color: "white"}} target="_blank"
                       href={template.linkJsonPath === '' ?
                         dataItem[template.linkIndex] : jp.query(dataItem[template.linkIndex], template.linkJsonPath).toString()
                       }>
                      {dataItem[template.imageIndex] ? (
                        <img style={imgStyle} src={template.imageJsonPath === '' ?
                          dataItem[template.imageIndex] : jp.query(dataItem[template.imageIndex], template.imageJsonPath)
                        }/>
                      ) : ("")}
                    </a>
                  ):
                  ( <React.Fragment>
                    {dataItem[template.imageIndex] ? (
                        <img style={imgStyle} src={template.imageJsonPath === '' ?
                          dataItem[template.imageIndex] : jp.query(dataItem[template.imageIndex], template.imageJsonPath)
                        }/>
                      ) : ("")}
                    </React.Fragment>
                  )
                }
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
                      <button style={{border:"none",background:"white",paddingLeft:0}}>
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
                    {dataItem[template.contactInfoIndex] ? (
                      <React.Fragment>
                        <br/>
                        <Icon name="mail"/>
                        {template.contactInfoJsonPath === "" ?
                          (<a href={'mailto:' + dataItem[template.contactInfoIndex]}> {template.contactInfoHook ?
                          (<span>{template.contactInfoHook}</span>) : (<span>{template.contactInfoJsonPath === '' ?
                          dataItem[template.contactInfoIndex] : jp.query(dataItem[template.contactInfoIndex], template.contactInfoJsonPath).toString()}</span>)
                        }</a>) :
                            (<a href={'mailto:' + jp.query(dataItem[template.contactInfoIndex], template.contactInfoJsonPath).toString()}> {template.contactInfoHook ?
                          (<span>{template.contactInfoHook}</span>) : (<span>{template.contactInfoJsonPath === '' ?
                          dataItem[template.contactInfoIndex] : jp.query(dataItem[template.contactInfoIndex], template.contactInfoJsonPath).toString()}</span>)
                        }</a>)}

                      </React.Fragment>
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
