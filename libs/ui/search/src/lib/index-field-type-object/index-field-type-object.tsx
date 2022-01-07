import './index-field-type-object.module.scss';
import React from "react";
import {Header, Image, Label} from "semantic-ui-react";
import {type} from "os";

/* eslint-disable-next-line */
export interface IndexFieldTypeObjectProps {
  objectKeyname: string;
  data:any;
  objectValue:any;
  styles:any;
}

export function IndexFieldTypeObject(
  props: IndexFieldTypeObjectProps
) {
  if (props.objectKeyname === 'resourceTitleObject') {
    return (
      <React.Fragment>
        {props.data['resourceType']?(<Label color="red" ribbon>
          {props.data['resourceType'][0]}
        </Label>):
            ('')}
        <Header as="h4" image>
          {props.data['overview']?(<img alt=''
               src={props.data['overview'][0].url}
               className={props.styles.image}
          />): ('')}
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
    return null;
  }
}

export default IndexFieldTypeObject;
