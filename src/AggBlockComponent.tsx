import React from "react";
import { SelectedFilters, SingleList } from "@appbaseio/reactivesearch";
import { Badge, Button, Card, Col, Row, Stack } from "react-bootstrap";

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
        <Row>
          {items.map((item: any) => (
            <Col
              key={item.value}
              md={item.count < average ? 2 : item.count === average ? 3 : 4}
            >
              <Card
                bg={this.props.value === item.value ? "primary" : "secondary"}
                text={this.props.value === item.value ? "dark" : "light"}
                className="mb-1 text-white"
              >
                {/*<Card.Img src="holder.js/100px270" alt="Card image" />*/}
                {/*<Card.ImgOverlay>*/}
                <Card.Header
                  className={
                    "text-wrap " +
                    (this.props.value === item.value ? "strong" : "")
                  }
                  onClick={() => this.handleChange(item.value)}
                >
                  <strong className={"fs-3"}>{item.count} </strong>
                  {item.value}
                </Card.Header>
                <Card.Text>
                  {item.sub &&
                    item.sub.buckets.map((item: any) => (
                      <Badge key={item.key} className="text-wrap">
                        {item.key} ({item.doc_count})
                      </Badge>
                    ))}
                </Card.Text>
                {/*</Card.ImgOverlay>*/}
              </Card>
            </Col>
          ))}
        </Row>
        <Button onClick={() => this.more()}>More</Button>
      </React.Fragment>
    );
  }
}

export default AggBlockComponent;
