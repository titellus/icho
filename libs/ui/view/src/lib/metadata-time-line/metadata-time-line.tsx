import styles from './metadata-time-line.module.scss';
import {Icon, List} from 'semantic-ui-react'
import React from "react";

interface Props {
  timeValue: any;
}

export function MetadataTimeLine({timeValue}: Props) {
  if (timeValue === '') {
    return null;
  }
  timeValue.sort(function (a:any, b:any) {
    return Date.parse(a.date) - Date.parse(b.date);
  })
  return (
    <List divided relaxed>
      {timeValue.map((element: any, index:number) => (
      <List.Item key={index}>
        <List.Icon inverted color='blue' name='calendar times outline' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header >{element.type}</List.Header>
          <List.Description >{element.date}</List.Description>
        </List.Content>
      </List.Item>
        ))}
    </List>
  );
}

export default MetadataTimeLine;
