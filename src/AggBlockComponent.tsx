import React from "react";
import { SelectedFilters, SingleList } from "@appbaseio/reactivesearch";

// let defaultQuery = function (value: any, props: any) {
//   var query = null;
//   if (props.selectAllLabel && props.selectAllLabel === value) {
//     if (props.showMissing) {
//       query = { match_all: {} };
//     }
//     query = {
//       exists: {
//         field: props.dataField
//       }
//     };
//   } else if (value) {
//     type termType = {
//       [key: string]: any
//     }
//     let _term: termType = {}
//     query = {
//       term: (_term[props.dataField] = value, _term)
//     };
//     if (props.showMissing && props.missingLabel === value) {
//       query = {
//         bool: {
//           must_not: {
//             exists: { field: props.dataField }
//           }
//         }
//       };
//     }
//   }
//   console.log(query);
//   if (query && props.nestedField) {
//     return {
//       nested: {
//         path: props.nestedField,
//         query: query
//       }
//     };
//   }
//   return query;
// };

class AggBlockComponent extends React.Component<{
  setQuery: any;
  dataField: any;
  dataSubField?: any;
  aggregations: any;
  value: any;
  onMoreBlocks?: any;
}> {
  handleChange = (item: any) => {
    const { setQuery, dataField } = this.props;
    if (item) {
      // @ts-ignore
      const query = SingleList.defaultQuery(item, {
        queryFormat: "or",
        dataField,
      });
      setQuery({
        query,
        value: item,
      });
    } else {
      setQuery(null);
    }
  };

  more = () => {
    this.props.onMoreBlocks();
  };

  render() {
    const { dataField, dataSubField, aggregations } = this.props;
    let items = [];
    if (
      aggregations &&
      aggregations[dataField] &&
      aggregations[dataField].buckets.length
    ) {
      items = aggregations[dataField].buckets.map((o: any) => ({
        value: o.key,
        count: o.doc_count,
        sub: o[dataSubField],
      }));
    }
    const selectedItem = items.find(
      (item: any) => item.value === this.props.value
    );
    return (
      <React.Fragment>
        <div className="flex">
          {items.map((item: any) => (
            <div className="flex-grow" key={item.value}>
              <h4
                className={this.props.value === item.value ? "active" : ""}
                onClick={() => this.handleChange(item.value)}
              >
                {item.value}
              </h4>
              <ul>
                {item.sub &&
                  item.sub.buckets.map((item: any) => (
                    <li key={item.key}>
                      {item.key} ({item.doc_count})
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        {selectedItem && (
          <p>
            <i>
              {selectedItem.count} {selectedItem.value} records found
            </i>
          </p>
        )}

        <SelectedFilters onClear={() => this.handleChange(null)} />

        <button onClick={() => this.more()}>More</button>
      </React.Fragment>
    );
  }
}

export default AggBlockComponent;
