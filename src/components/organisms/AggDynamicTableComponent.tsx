import React, {useReducer} from 'react';
import { Table } from 'semantic-ui-react'
import _ from 'lodash'

const reducer = (state: any, action:any) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }
      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

const AggDataTableLoaderComponent = (props:any) => {
  if (props.loading) {
    return <div>...</div>;
  }
  if (props.error) {
    return (
      <div>
        Something went wrong! Error details {JSON.stringify(props.error)}
      </div>
    );
  }
  return props.data >0 ? null : (
      <AggDynamicTableComponent data={props.data} />
  )
}

const AggDynamicTableComponent = (props:any) => {
  const [state, dispatch] = useReducer(reducer, {
    column: null,
    data: props.data,
    direction: null,
  })
  const { column, data, direction } = state
  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={column === 'uuid' ? direction : null}
                              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'uuid' })}>
            uuid</Table.HeaderCell>
          <Table.HeaderCell sorted={column === 'resourceTitleObject.default' ? direction : null}
                              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'resourceTitleObject.default' })}>
            title</Table.HeaderCell>
          <Table.HeaderCell>tag</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((res: any) => (
          <Table.Row key={res.uuid}>
            <Table.Cell>{res.uuid}</Table.Cell>
            <Table.Cell>{res.resourceTitleObject?.default}</Table.Cell>
            <Table.Cell><TagList tag={res.tag} /></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

const TagList = (props: any) => {
  return !props.tag ? null : (
    <React.Fragment>
      {props.tag.map((tag:any, index:any) => (
        <React.Fragment key={index}><span>{tag?.default}</span><br/></React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default AggDataTableLoaderComponent;
