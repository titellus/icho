import './search-result-table-cell-string.module.scss';
import {Icon, Rating} from "semantic-ui-react";
import React from "react";

/* eslint-disable-next-line */
export interface SearchResultTableCellStringProps {
  stringValue: string;
  stringKeyname: string;
  mtdRoot:string;

}

export function SearchResultTableCellString(
  props: SearchResultTableCellStringProps
) {
  if (
    props.stringKeyname === 'uuid' ||
    props.stringKeyname === 'metadataIdentifier' ||
    props.stringKeyname === '_id'
  ) {
    return (
      <a href={props.mtdRoot + '/' + props.stringValue}>
        {props.stringValue}
      </a>
    );
  } else if (props.stringKeyname === 'rating') {
    return (
      <Rating
        icon="star"
        defaultRating={props.stringValue}
        maxRating={5}
        disabled
      />
    );
  } else if (props.stringKeyname === 'valid') {
    return (
      props.stringValue === '1' ? (
        <Icon name="checkmark" color="green" size="large" />
      ) : props.stringValue === '-1' ? (
        <Icon name="close" color="red" size="large" />
      ) : (
        <Icon name="minus" color="grey" size="large" />
      )
    );
  } else if (props.stringValue === 'true' || props.stringValue === 'false') {
    return (
      props.stringValue === 'true' ? (
        <Icon name="checkmark" color="green" size="large" />
      ) : (
        <Icon name="close" color="red" size="large" />
      )
    );
  } else {
    return (
      <span>{props.stringValue}</span>
    );
  }
}

export default SearchResultTableCellString;
