import styles from "./search-result-table.module.scss";
import {Container, Icon, Label, Sticky, Table, SemanticWIDTHS, Popup} from "semantic-ui-react";
import React, {createRef} from "react";
import SearchResultTableSort, {SortOption} from "../search-result-table-sort/search-result-table-sort";
import jp from "jsonpath";
import {FieldDescription} from "../search-result-table-wrapper/search-result-table-wrapper";
import {object} from "prop-types";

interface Props {
  data: Array<Record<string, unknown>>;
  landingPageUrlTemplate?: string;
  landingPageLink?: string;
  fields: Array<FieldDescription>
  handleSetSort: (newValue: SortOption) => void;
  currentSort: SortOption;
}

interface TableCell {
  columnName:string;
  columnWidth:SemanticWIDTHS | undefined;
}



interface CellContentAttributes {
  as: string;
  href?: string;
}

/* eslint-disable-next-line */
export interface SearchResultTableProps {
}

export function SearchResultTable({ data,
                                    landingPageUrlTemplate,
                                    landingPageLink,
                                    fields,
                                    handleSetSort,
                                    currentSort
                                  }: Props) {
  const tableData: Array<Record<string, unknown>> = [];

  function handleChange(newValue: SortOption) {
    handleSetSort(newValue);
  }

  let columnNameArray: Array<TableCell> = []
  for (const element of fields) {
    let cellInfo:TableCell = {
      'columnName':'',
      'columnWidth':undefined
    }
    cellInfo.columnName = element.columnName
    cellInfo.columnWidth = element?.columnWidth
    //columnNameArray.push(element.columnName)
    if(columnNameArray.some(elemArray => elemArray.columnName === element.columnName)){
    } else{
      columnNameArray.push(cellInfo)
    }
  }
  //Remove duplicated columnName
  //columnNameArray = [...new Set(columnNameArray)];


  let ref: React.RefObject<HTMLInputElement> = createRef();
  return (
    <Table ref={ref.current} fixed>
      {/*<Sticky context={ref.current} as={'thead'}>*/}
      {/*</Sticky>*/}
      <Table.Header>
        <Table.Row>
          {columnNameArray.map((tableCellInfo: TableCell, i) => (
            <Table.HeaderCell key={i} width={tableCellInfo.columnWidth}>
              {tableCellInfo.columnName}
              {fields.map((fieldsItem: any, k) => {
                let type = ""
                if (fieldsItem.columnJsonPath.endsWith('default')) {
                  type = '.keyword'
                }
                return (
                  (fieldsItem.columnName === tableCellInfo.columnName && (fieldsItem.columnJsonPath === "" || type != "")) ? (
                    <SearchResultTableSort
                      onChange={handleChange}
                      currentSort={currentSort}
                      key={fieldsItem.columnIndex + fieldsItem.columnJsonPath.replace('$', '') + type}
                      field={fieldsItem.columnIndex + fieldsItem.columnJsonPath.replace('$', '') + type}
                    />
                  ) : ("")
                )
              })}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((dataItem: any, index) => (
          <Table.Row key={index}>
            {columnNameArray.map((tableCellInfo: TableCell, j) => (
              <Table.Cell key={j}>
                {fields.map((fieldsItem: any, k) => {
                  let attributes: CellContentAttributes = {
                    as: landingPageLink === fieldsItem.columnIndex ? "a" : "div"
                  };
                  if (landingPageUrlTemplate && landingPageLink === fieldsItem.columnIndex) {
                    attributes.href = landingPageUrlTemplate.replace("{uuid}", dataItem["_id"]);
                  }
                  return (
                    <span key={k}>
                {fieldsItem.columnName === tableCellInfo.columnName? (
                  <Container {...attributes} fluid={true}>
                    {dataItem[fieldsItem.columnIndex] ? (
                      <HtmlType value={dataItem[fieldsItem.columnIndex]} indexName={fieldsItem.columnIndex} jsonPath={fieldsItem.columnJsonPath} landingPageUrlTemplate={landingPageUrlTemplate}
                                label={fieldsItem.columnLabel} ribon={fieldsItem.columnRibon} iconColor={fieldsItem.columnIconColor} popup={fieldsItem.columnPopup} valueCondition={fieldsItem.columnValue}
                                iconValue={fieldsItem.columnIcon} formatter={fieldsItem.columnFormatter}/>
                    ) : ""}
                    <br/>
                  </Container>
                ) : (
                  ""
                )}
              </span>
                  )
                })}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

interface HtmlTypeProps {
  jsonPath: string;
  value: Object;
  label?: undefined;
  iconValue?: undefined;
  ribon?: Object;
  iconColor?:undefined;
  popup?:undefined;
  valueCondition?:undefined;
  formatter?:string;
  landingPageUrlTemplate?:string;
  indexName?:string;
}

function HtmlType({
                    jsonPath,
                    value,
                    label,
                    ribon,
                    iconValue,
                    iconColor,
                    popup,
                    valueCondition,
                    formatter,
                    landingPageUrlTemplate,
                    indexName
                  }: HtmlTypeProps) {
  let linkStyle;
  let icon;
  let result;
  let related_link;

  /* TODO improve manage of the value (object and string) - console.log(typeof value, value) */


  if (iconValue) {
    if (typeof iconValue === "string") {
      if (iconColor && typeof iconColor === "string") {
        icon = <Icon style={{color: iconColor}} name={iconValue}/>
      } else if (iconColor && typeof iconColor != "string"){
        for (const [key, iconColorName] of Object.entries(iconColor)) {
          if (jp.query(value, jsonPath).toString() === key) {
            // @ts-ignore
            icon = <Icon style={{color: iconColorName}} name={iconValue}/>
          }
        }
      } else {
        icon = <Icon name={iconValue}/>
      }
    } else {
      for (const [key, iconName] of Object.entries(iconValue)) {
        if (jp.query(value, jsonPath).toString() === key) {
          if (iconColor && typeof iconColor === "string") {
            // @ts-ignore
            icon = <Icon style={{color: iconColor}} name={iconName}/>
          } else if (iconColor && typeof iconColor != "string") {
            if (iconColor[key]){
              // @ts-ignore
              icon = <Icon style={{color: iconColor[key]}} name={iconName}/>
            }
            else {
              // @ts-ignore
              icon = <Icon name={iconName}/>
            }
          } else {
            // @ts-ignore
            icon = <Icon name={iconName}/>
          }
        }
      }
    }
  }

  if(jsonPath === '' && value) {
    if (typeof value != "string") {
      linkStyle ='';
      // @ts-ignore
      for(let elem of value){
        let elemlinkStyle =null;
        if (elem.toString().match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
          elemlinkStyle = <React.Fragment><a href={elem.toString()} style={{wordBreak: "break-all"}}> {icon}
            {formatter === "withouttext" ?
              "":
              <>{elem}</>
            }</a><br/></React.Fragment>;
        } else {
          elemlinkStyle = <React.Fragment><span> {icon}
            {formatter === "withouttext" ?
              "":
              <><ResultValue data={elem} valueCondition={valueCondition} popup={popup}/> </>
            }</span><br/></React.Fragment>;
        }
        if(linkStyle===''){
          linkStyle = [linkStyle,elemlinkStyle]
        } else {
          linkStyle = [linkStyle,<br/>,elemlinkStyle]
        }
      }
      linkStyle = <React.Fragment>{linkStyle}</React.Fragment>
    }
    if (typeof value === "string") {
      if (value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
        linkStyle =<React.Fragment><a href={value.toString()} style={{wordBreak: "break-all"}}> {icon} {formatter === "withouttext" ? "":<>{value}</>}</a><br/></React.Fragment>;
      } else {
        linkStyle =<React.Fragment><span style={{wordBreak: "break-all"}}> {icon} {formatter === "withouttext" ? "":<><ResultValue data={value} valueCondition={valueCondition} popup={popup}/> </>}</span><br/></React.Fragment>;
      }
    }
  }
  else if (jsonPath.endsWith('url')) {
    let url = jp.query(value, jsonPath).toString()
    if (jp.query(value, jsonPath.replace('url', 'name')).length > 0) {
      linkStyle ='';
      for (let i in jp.query(value, jsonPath)){
        let elemlinkStyle =null;
        elemlinkStyle = <React.Fragment>
          {jp.query(value, jsonPath)[i].toString() ?
            <><a href={jp.query(value, jsonPath)[i].toString()}>
              {formatter === "withouttext" ?
                <React.Fragment>
                  {popup === "true" ?<Popup content={jp.query(value, jsonPath.replace('url', 'name'))[i]} trigger={icon} />:<>{icon}</>}
                </React.Fragment>
                :
                <>{icon} {jp.query(value, jsonPath.replace('url', 'name'))[i]}</>
              }
            </a><br/></> : ''}
        </React.Fragment>;
        if(linkStyle === ''){
          linkStyle = [linkStyle,elemlinkStyle]
        } else {
          linkStyle = [linkStyle,<br/>,elemlinkStyle]
        }
      }
      linkStyle = <React.Fragment>{linkStyle}</React.Fragment>;
    }
    else if (jp.query(value, jsonPath.replace('url', 'title')).length > 0) {
      //TODO to modify depending on the refactoring of the related section
      linkStyle ='';
      for (let i in jp.query(value, jsonPath)){
        let elemlinkStyle =null;
        elemlinkStyle = <React.Fragment>
          {jp.query(value, jsonPath+'.eng')[i] ?
            <><a href={jp.query(value, jsonPath+'.eng')[i].toString()}>
              {formatter === "withouttext" ?
                <React.Fragment>
                  {popup === "true" ?<Popup content={jp.query(value, jsonPath.replace('url', 'title.eng'))[i]} trigger={icon} />:<>{icon}</>}
                </React.Fragment>
                :
                <>{icon} {jp.query(value, jsonPath.replace('url', 'title.eng'))[i]}</>
              }
            </a><br/></>:''}
        </React.Fragment>;
        if(linkStyle === ''){
          linkStyle = [linkStyle,elemlinkStyle]
        } else {
          linkStyle = [linkStyle,<br/>,elemlinkStyle]
        }
      }
      linkStyle = <React.Fragment>{linkStyle}</React.Fragment>
    } else {
      if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(jp.query(value, jsonPath).toString())) {
        linkStyle = <img alt=""
                         src={jp.query(value, jsonPath).toString()}
                         className={styles.image}/>
      } else {
        linkStyle = <React.Fragment>
          {jp.query(value, jsonPath).toString() ?
            <a href={jp.query(value, jsonPath).toString()} style={{wordBreak: "break-all"}}>
              {formatter === "withouttext" ?
                <React.Fragment>
                  {popup === "true" ? <Popup content={jp.query(value, jsonPath)} trigger={icon} />:<>{icon}</>}
                </React.Fragment>
                : <>{icon} {jp.query(value, jsonPath)}</>}
            </a> : ''}
        </React.Fragment>;
      }
    }
  } else if (jsonPath.endsWith('url.fre') || jsonPath.endsWith('url.eng') ) {
    if (jp.query(value, jsonPath.replace('url', 'title')).length > 0) {
      linkStyle ='';
      for (let i in jp.query(value, jsonPath)){
        let elemlinkStyle =null;
        elemlinkStyle = <React.Fragment>
          {jp.query(value, jsonPath)[i].toString() ?
            <><a href={jp.query(value, jsonPath)[i].toString()}>
              {formatter === "withouttext" ?
                <React.Fragment>
                  {popup === "true" ? <Popup content={jp.query(value, jsonPath.replace('url', 'title'))[i]} trigger={icon} />:<>{icon}</>}
                </React.Fragment>
                :
                <>{icon} {jp.query(value, jsonPath.replace('url', 'title'))[i]}</>
              }
            </a><br/></> : ''}
        </React.Fragment>;
        if(linkStyle === ''){
          linkStyle = [linkStyle,elemlinkStyle]
        } else {
          linkStyle = [linkStyle,<br/>,elemlinkStyle]
        }
      }
      linkStyle = <React.Fragment>{linkStyle}</React.Fragment>;
    }
  }
  else {
    if (jp.query(value, jsonPath).toString() != '') {
      linkStyle ='';
      if (jp.query(value, jsonPath).toString().match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
        for (let i in jp.query(value, jsonPath)){
          let elemlinkStyle =null;
          elemlinkStyle = <React.Fragment><a href={jp.query(value, jsonPath)[i].toString()} style={{wordBreak: "break-all"}}> {icon}
            {formatter === "withouttext" ? "":<>{jp.query(value, jsonPath)[i]}</>} </a><br/></React.Fragment>;
          if(linkStyle === ''){
            linkStyle = [linkStyle,elemlinkStyle]
          } else {
            linkStyle = [linkStyle,<br/>,elemlinkStyle]
          }
        }
        linkStyle = <React.Fragment>{linkStyle}</React.Fragment>
      } else {
        for (let i in jp.query(value, jsonPath)){
          let elemlinkStyle =null;
          // @ts-ignore
          elemlinkStyle = <React.Fragment><span>{
            formatter === "withouttext" ?
              <React.Fragment>
                {popup === "true" ? <Popup content={jp.query(value, jsonPath)[i]} trigger={icon} /> :<>{icon}</>}
                <> <RelatedLink value={value}
                                i ={i}
                                indexName={indexName}
                                jsonPath={jsonPath}
                                landingPageUrlTemplate={landingPageUrlTemplate}/></>
              </React.Fragment>
              :
              <React.Fragment>
                <>{icon} <ResultValue data={jp.query(value, jsonPath)[i]} valueCondition={valueCondition} popup={popup}/></>
                <> <RelatedLink value={value}
                                indexName={indexName}
                                i ={i}
                                jsonPath={jsonPath}
                                landingPageUrlTemplate={landingPageUrlTemplate}/></>
              </React.Fragment>
          }</span><br/></React.Fragment>;
          if(linkStyle === ''){
            linkStyle = [linkStyle,elemlinkStyle]
          } else {
            linkStyle = [linkStyle,<br/>,elemlinkStyle]
          }
        }
        linkStyle = <React.Fragment>{linkStyle}</React.Fragment>
      }
    } else {
      linkStyle = ''
    }
  }

  if (ribon) {
    for (const [key, ribonColor] of Object.entries(ribon)) {
      if (jp.query(value, jsonPath).toString() === key) {
        result =
          <React.Fragment><br/><Label color={ribonColor.toString()} ribbon>{linkStyle}</Label><br/></React.Fragment>
      }
      else {
        result = <React.Fragment><br/>{linkStyle}<br/></React.Fragment>
      }
    }
  } else {
    if (label && linkStyle !='') {
      if (typeof label === "string") {
        result = <React.Fragment><Label color={label}>{linkStyle}</Label><br/></React.Fragment>
      }
      else {
        for (const [key, labelColor] of Object.entries(label)) {
          if (typeof value === 'string' && value === key) {
            // @ts-ignore
            result = <React.Fragment><Label color={labelColor.toString()}>{linkStyle}</Label><br/></React.Fragment>
          } else  if (typeof value === 'object'){
            if (jp.query(value, jsonPath).toString() === key) {
              // @ts-ignore
              result = <React.Fragment><Label color={labelColor.toString()}>{linkStyle}</Label><br/></React.Fragment>
            }
          }
        }
      }
    } else {
      result = linkStyle
    }
  }

  return (
    <span>
      {result}
    </span>
  );
}

interface ResultValueProps {
  data: string;
  valueCondition?:undefined;
  popup?:undefined;

}

function ResultValue({
                       data,
                       valueCondition,
                       popup
                     }: ResultValueProps) {
  let displayedResult;
  if (valueCondition && typeof valueCondition === "string") {
    if (popup === "true") {
      displayedResult = <Popup
        trigger={<span>{valueCondition}</span>} content={data}/>
    } else {
      displayedResult = <>{data}</>
    }
  } else if (valueCondition && typeof valueCondition != "string"){
    for (const [key, value ] of Object.entries(valueCondition)) {
      if (data.toString() === key) {
        if (popup === "true") {
          // @ts-ignore
          displayedResult = <Popup trigger={<span>{value}</span>} content={data}/>
        } else {
          displayedResult = <>{value}</>
        }
      }
    }
  } else {
    displayedResult = <>{data}</>
  }
  return (
    <span>
      {displayedResult}
    </span>
  );
}

interface RelatedLinkProps {
  jsonPath: string;
  value: Object;
  i: string;
  landingPageUrlTemplate?:string;
  indexName?:string;
}

function RelatedLink({
                       jsonPath,
                       value,
                       i,
                       landingPageUrlTemplate,
                       indexName
                     }: RelatedLinkProps) {
  let related_link =<></>
  if (indexName === 'related' && landingPageUrlTemplate) {
    let regex = "^([^.]*.){2}[^.]*"
    let related_uuid_path = jsonPath.match(regex)![0] + ".uuid"
    if (jp.query(value, jsonPath).length != 0) {
      // @ts-ignore
      let related_uuid = jp.query(value, related_uuid_path)[i].toString()
      related_link = <a href={landingPageUrlTemplate.replace("{uuid}", related_uuid).toString()}
                        style={{wordBreak: "break-all"}}><Icon name="linkify"/></a>
    }
  }
  return (
    <>
      {related_link}
    </>
  );
}

export default SearchResultTable;
