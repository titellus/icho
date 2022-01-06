import './metadata-unique-element-list.module.scss';
import {List} from "semantic-ui-react";
import React from "react";

/* eslint-disable-next-line */
export interface MetadataUniqueElementListProps {}
interface Props {
  title: string;
  value: any;
}
export function MetadataUniqueElementList({title, value}: Props) {
  return (
    <List>
      <List.Item>
        <List.Content>
          <List.Header>{title}</List.Header>
          <List.Description>{value}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
}

export default MetadataUniqueElementList;
