import React from "react";
import { SingleList } from "@appbaseio/reactivesearch";
import { Button, Label, Statistic } from "semantic-ui-react";

class AggCardComponent extends React.Component<{
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
    let items = [],
      average = 0;
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
      average =
        items.reduce((sum: number, o: any, _: number) => {
          return sum + o.count;
        }, 0) / items.length;
    }
    const selectedItem = items.find(
      (item: any) => item.value === this.props.value
    );
    return (
      <React.Fragment>
        <Statistic.Group>
          {items.map((item: any) => (
            <Statistic
              key={item.value}
              onClick={() => this.handleChange(item.value)}
              md={item.count < average ? 2 : item.count === average ? 3 : 4}
            >
              <Statistic.Value
                bg={this.props.value === item.value ? "primary" : "secondary"}
              >
                {item.count}
              </Statistic.Value>
              <Statistic.Label>{item.value}</Statistic.Label>

              {/*<FontAwesomeIcon icon={faCoffee}/>*/}
              {item.sub &&
                item.sub.buckets.map((item: any) => (
                  <Label key={item.key}>
                    {item.doc_count}
                    <Label.Detail>{item.key}</Label.Detail>
                  </Label>
                ))}
              {/*</Card.ImgOverlay>*/}
            </Statistic>
          ))}
        </Statistic.Group>
        <Button onClick={() => this.more()}>More</Button>
      </React.Fragment>
    );
  }
}

export default AggCardComponent;
