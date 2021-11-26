import styles from './search-result-table.module.scss';
import {
  Button,
  Image,
  Header,
  Icon,
  Rating,
  Table,
  Label,
} from 'semantic-ui-react';
import { Dispatch, SetStateAction, useState } from 'react';
import SearchResultTableSort, {
  SortOption,
} from '../search-result-table-sort/search-result-table-sort';
import React from 'react';
import { CSVDownload, CSVLink } from 'react-csv';

interface Props {
  loading: boolean;
  error: Record<string,unknown>;
  data: Array<Record<string,unknown>>;
  mtdRoot: string;
  dataFields: Array<string>;
  dataFieldsName: Array<string>;
  handleChangeSortReactiveList: Dispatch<SetStateAction<SortOption>>;
  selected: SortOption;
}

/* eslint-disable-next-line */
export interface SearchResultTableProps {}

export function SearchResultTable({
  loading,
  error,
  data,
  dataFields,
  mtdRoot,
  dataFieldsName,
  handleChangeSortReactiveList,
  selected,
}: Props) {
  const newData: Array<Record<string,unknown>> =[];
  const [sortSelector, setSortSelector] = useState<SortOption>(selected);
  function handleChange(newValue: SortOption) {
    setSortSelector(newValue);
    handleChangeSortReactiveList(newValue);
  }
  if (loading) {
    return <div>...</div>;
  }
  if (error) {
    return (
      <div>Something went wrong! Error details {JSON.stringify(error)}</div>
    );
  }
  if (data.length > 0) {
    for (const element in data) {
      const newElement: Record<string,unknown> = {};
      newElement['_id'] = data[element]['_id'];
      for (const key of dataFields) {
        if (data[element][key]) newElement[key] = data[element][key];
        else newElement[key] = '';
      }
      newData.push(newElement);
    }
  }
  return data.length === 0 ? null : (
    <div>
      {typeof newData === 'object' && (
        <div>
          <CSVLink data={newData}>
            <Button icon>
              <Icon name="download" />
            </Button>
          </CSVLink>
          <Table color="blue">
            <Table.Header>
              <Table.Row>
                {Object.keys(newData[0])
                  .slice(1)
                  .map((keyname, i) => (
                    <Table.HeaderCell key={i}>
                      {dataFieldsName[i]}
                      {typeof newData[0][keyname] === 'string' ? (
                        <SearchResultTableSort
                          onChange={handleChange}
                          selectedSortSelector={sortSelector}
                          field={keyname}
                        />
                      ) : (
                        ''
                      )}
                    </Table.HeaderCell>
                  ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {newData.map((dataItem: Record<string,unknown>, i: number) => (
                <Table.Row key={i}>
                  {Object.keys(dataItem)
                    .slice(1)
                    .map((keyname, j) => (
                      <Table.Cell key={j}>
                        {dataItem[keyname] instanceof Object ? (
                          <TableCellObject
                            objectValue={dataItem[keyname]}
                            objectKeyname={keyname}
                            data={dataItem}
                            mtdRoot={mtdRoot}
                            styles={styles}
                          />
                        ) : (
                          ''
                        )}
                        {Array.isArray(dataItem[keyname]) ? (
                          <TableCellArray
                            arrayValue={dataItem[keyname]}
                            arrayKeyname={keyname}
                          />
                        ) : (
                          ''
                        )}
                        {typeof dataItem[keyname] === 'string' ? (
                          <TableCellString
                            stringValue={dataItem[keyname]}
                            stringKeyname={keyname}
                            mtdRoot={mtdRoot}
                          />
                        ) : (
                          ''
                        )}
                      </Table.Cell>
                    ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}

const TableCellObject = (props: any) => {
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
};

const TableCellArray = (props: any) => {
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
};

const TableCellString = (props: any) => {
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
};

export default SearchResultTable;
