import "./index-field-type-string.module.scss";
import { Icon, Rating } from "semantic-ui-react";
import React from "react";

/* eslint-disable-next-line */
export interface IndexFieldTypeStringProps {
  stringValue: string;
  stringKeyname: string;

}

export function IndexFieldTypeString(
  props: IndexFieldTypeStringProps
) {
  if (props.stringKeyname === "rating") {
    return (
      <Rating
        icon="star"
        defaultRating={props.stringValue}
        maxRating={5}
        disabled
      />
    );
  } else if (props.stringKeyname === "valid") {
    return (
      props.stringValue === "1" ? (
        <Icon name="checkmark" color="green" size="large" />
      ) : props.stringValue === "-1" ? (
        <Icon name="close" color="red" size="large" />
      ) : (
        <Icon name="minus" color="grey" size="large" />
      )
    );
  } else if (props.stringValue === "true" || props.stringValue === "false") {
    return (
      props.stringValue === "true" ? (
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

export default IndexFieldTypeString;
