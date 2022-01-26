import "./index-field-type-object.module.scss";
import React from "react";
import { Header, Label } from "semantic-ui-react";

/* eslint-disable-next-line */
export interface IndexFieldTypeObjectProps {
  objectKeyname: string;
  data: any;
  objectValue: any;
  styles: any;
}

export const RESOURCE_TYPE_COLORS = new Map<string, string>([
  ["series", "teal"],
  ["dataset", "blue"],
  ["application", "green"],
  ["service", "green"]
]);

export const DEFAULT_RESOURCE_TYPE_COLOR = "grey";

export function IndexFieldTypeObject(
  props: IndexFieldTypeObjectProps
) {
  let resourceTypeColor: any =
    props.data["resourceType"]
      ? RESOURCE_TYPE_COLORS.get(props.data["resourceType"][0])
      : DEFAULT_RESOURCE_TYPE_COLOR;

  if (props.objectKeyname === "resourceTitleObject") {
    return (
      <React.Fragment>
        {props.data["resourceType"] ? (<Label color={resourceTypeColor} ribbon>
            {props.data["resourceType"][0]}
          </Label>) :
          ("")}
        <Header as="h4" image>
          {props.data["overview"] ? (<img alt=""
                                          src={props.data["overview"][0].url}
                                          className={props.styles.image}
          />) : ("")}
          <Header.Content>
            {props.objectValue.default}
            <Header.Subheader></Header.Subheader>
          </Header.Content>
        </Header>
      </React.Fragment>
    );
  } else if (props.objectValue.default) {
    return (
      <span>{props.objectValue.default}</span>
    );
  } else {
    return <span/>;
    // TODO array of objects
    // TODO objects
    // return (
    //   <ul>{Object.keys(props.objectValue).map((keyname) => {
    //     <li>
    //       {keyname}: {props.objectValue[keyname]}
    //     </li>;
    //   })}
    //   </ul>);
  }
};

export default IndexFieldTypeObject;
