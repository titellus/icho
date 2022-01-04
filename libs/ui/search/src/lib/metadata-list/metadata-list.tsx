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
  return (
    <List>
      <List.Item>
        <List.Content>
          <List.Header>{title}</List.Header>
          {value.map((element: any) => (
            <React.Fragment>
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
