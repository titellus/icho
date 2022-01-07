import './metadata-list.module.scss';
import {List} from "semantic-ui-react";
import React from "react";

/* eslint-disable-next-line */
export interface MetadataListProps {}

interface Props {
  title: string;
  value: any;
  field: string;
}
export function MetadataList({title, value, field}: Props) {
  if (value === '') {
    return null;
  }
  return (
    <List>
      <List.Item>
        <List.Content>
          <List.Header>{title}</List.Header>
          {value.map((element: any, index:number) => (
            <React.Fragment key={index}>
              {field != "" ? (
                <List.Description>{element[field]}</List.Description>):(
                    <List.Description>{element}</List.Description>
                  )}
              </React.Fragment>
          ))}
        </List.Content>
      </List.Item>
    </List>
  );
}

export default MetadataList;
