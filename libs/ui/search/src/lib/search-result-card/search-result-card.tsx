import './search-result-card.module.scss';
import {Card, Icon, Image} from 'semantic-ui-react'
import {SortOption} from "../search-result-table-sort/search-result-table-sort";
import React from "react";
import jp from 'jsonpath';
import {string} from "prop-types";

/* eslint-disable-next-line */
export interface SearchResultCardProps {
}

export interface templateCard {
  image: string;
  imageJsonPath: string;
  title: string;
  titleJsonPath: string;
  subTitle: string;
  subTitleJsonPath: string;
  text: string;
  textJsonPath: string;
  link: string;
  linkJsonPath: string;
  info: string;
  infoJsonPath: string;
}

interface Props {
  data: Array<Record<string, unknown>>;
  template: templateCard
}

export function SearchResultCard({data, template}: Props) {
  console.log(data)
  return (
    <div>
      <Card.Group>
        {data.map((dataItem: any) => (
          <Card key={dataItem._id}>
            {dataItem[template.image] ? (
              <Image src={template.imageJsonPath === '' ?
                dataItem[template.image] : jp.query(dataItem[template.image], template.imageJsonPath)
              } ui={false} wrapped/>
            ) : ("")}
            <Card.Content>
              <Card.Header>
                {dataItem[template.title] ? (
                  template.titleJsonPath === '' ?
                    dataItem[template.title] : jp.query(dataItem[template.title], template.titleJsonPath)
                ) : ""}
              </Card.Header>
              <Card.Meta>
                  <span className='date'>
                    {dataItem[template.subTitle] ? (
                      template.subTitleJsonPath === '' ?
                        dataItem[template.subTitle] : jp.query(dataItem[template.subTitle], template.subTitleJsonPath)
                    ) : ""}
                  </span>
              </Card.Meta>
              <Card.Description>
                {dataItem[template.text] ? (
                  template.textJsonPath === '' ?
                    dataItem[template.text] : jp.query(dataItem[template.text], template.textJsonPath)
                ) : ""}
              </Card.Description>
            </Card.Content>
            {dataItem[template.info] || dataItem[template.link] ? (
              <Card.Content extra>
                <span className="right floated">
                  {dataItem[template.info] ? (
                    template.infoJsonPath === '' ?
                      dataItem[template.info] : jp.query(dataItem[template.info], template.infoJsonPath)
                  ) : ""}
                </span>
                {dataItem[template.link] ? (
                  <button className="ui icon button">
                    <a href={template.linkJsonPath === '' ?
                      dataItem[template.link] : jp.query(dataItem[template.link], template.linkJsonPath).toString()
                    }>
                      <i aria-hidden="true" className="world icon"></i>
                    </a>
                  </button>) : ("")}
              </Card.Content>
            ):""}
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default SearchResultCard;
