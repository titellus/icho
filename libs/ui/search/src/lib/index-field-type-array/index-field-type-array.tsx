import './index-field-type-array.module.scss';
import React from "react";
import {Icon, Label} from "semantic-ui-react";

/* eslint-disable-next-line */
export interface IndexFieldTypeArrayProps {
  arrayValue: Array<string|Record<string, unknown>>;
  arrayKeyname: string;
}

export function IndexFieldTypeArray(
  props: IndexFieldTypeArrayProps
) {
  return !props.arrayValue ? null : (
    <React.Fragment>
      {props.arrayValue.map((value: any, index: number) => (
        <React.Fragment key={index}>
          {value?.default && props.arrayKeyname === 'tag' ? (
            <span>
              <Label color="blue"> {value?.default} </Label>{' '}
            </span>
          ) : (
            <span>
              {value?.default} <br />
            </span>
          )}
          {value?.protocol === 'ESRI:REST' && value?.function === 'browsing' ? (
            <span>
              <Icon name="map" />
              <a href={value?.url}>{value?.name}</a>
              <br />
            </span>
          ) : (
            ''
          )}
          {value?.protocol === 'WWW:LINK' &&
          value?.function === 'information' ? (
            <span>
              <Icon name="info" />
              <a href={value?.url}>{value?.name}</a>
              <br />
            </span>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default IndexFieldTypeArray;
