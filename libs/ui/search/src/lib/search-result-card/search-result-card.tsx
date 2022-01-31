import './search-result-card.module.scss';
import {Card, Icon, Image} from 'semantic-ui-react'
import {SortOption} from "../search-result-table-sort/search-result-table-sort";
import React from "react";

/* eslint-disable-next-line */
export interface SearchResultCardProps {
}

interface Props {
  data: Array<Record<string, unknown>>;
}

export function SearchResultCard({data}: Props) {
  console.log(data)
  return (
    <div>
      <Card.Group>
        {data.map((dataItem: any) => (
          <Card key={dataItem._id}>
            {dataItem.overview ? (
              <Image src={dataItem.overview[0].url} ui={false} wrapped/>
            ) : ("")}
            <Card.Content>
              <Card.Header>{dataItem.resourceTitleObject.default}</Card.Header>
              <Card.Meta>
                <span className='date'>{dataItem.custodianOrgForResource}</span>
              </Card.Meta>
              <Card.Description>
                {dataItem.resourceTitleHookObject?.default}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <span className="right floated">
                last update: {dataItem.revisionDateForResource}
              </span>
              <button className="ui icon button">
                <i aria-hidden="true" className="world icon"></i>
              </button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default SearchResultCard;
