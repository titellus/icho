import './search-result-table-cell-object.module.scss';
import React from "react";
import {Header, Image, Label} from "semantic-ui-react";
import {type} from "os";

/* eslint-disable-next-line */
export interface SearchResultTableCellObjectProps {
  objectKeyname: string;
  data:any;
  mtdRoot: string;
  objectValue:any;
  styles:any;
}

export function SearchResultTableCellObject(
  props: SearchResultTableCellObjectProps
) {
  console.log(props.data)
  console.log(typeof props.data)

  if (
    props.objectKeyname === 'resourceTitleObject' &&
    props.data['resourceType'] &&
    props.data['overview']
  ) {
    return (
      <React.Fragment>
        <Label as="a" color="red" ribbon>
          {props.data['resourceType'][0]}
        </Label>
        <Header as="h4" image>
          <img alt=''
               src={props.data['overview'][0].url}
               className={props.styles.image}
          />
          <Header.Content>
            <a href={props.mtdRoot + '/' + props.data['_id']}>
              {props.objectValue.default}
            </a>
            <Header.Subheader></Header.Subheader>
          </Header.Content>
        </Header>
      </React.Fragment>
    );
  } else if (
    props.objectKeyname === 'resourceTitleObject' &&
    props.data['resourceType']
  ) {
    return (
      <Header as="h4">
        <Header.Content>
          <a href={props.mtdRoot + '/' + props.data['_id']}>
            {props.objectValue.default}
          </a>
          <Header.Subheader>{props.data['resourceType'][0]}</Header.Subheader>
        </Header.Content>
      </Header>
    );
  } else if (
    props.objectKeyname === 'resourceTitleObject' &&
    props.data['overview']
  ) {
    return (
      <Header as="h4" image>
        <Image src={props.data['overview'][0].url} rounded size="mini" />
        <Header.Content>
          <a href={props.mtdRoot + '/' + props.data['_id']}>
            {props.objectValue.default}
          </a>
        </Header.Content>
      </Header>
    );
  } else if (props.objectValue.default) {
    return (
      <span>{props.objectValue.default}</span>
    );
  } else {
    return null;
  }
}

export default SearchResultTableCellObject;
