import React from "react";
import { SingleList } from "@appbaseio/reactivesearch";
import { Button, Label, List, Statistic } from "semantic-ui-react";

class AggListItemComponent extends React.Component<{
  loading: boolean;
  error: any;
  data: any;
  value: string;
  handleChange: any;
}> {
  render() {
    if (this.props.loading) {
      return <div>...</div>;
    }
    if (this.props.error) {
      return (
        <div>
          Something went wrong! Error details {JSON.stringify(this.props.error)}
        </div>
      );
    }
    return (
      // icons='{"background": true, "items": {
      //   "dataset": "https://www.eea.europa.eu/themes/climate-change-adaptation/theme_image/image_preview",
      //   "series": "https://www.eea.europa.eu/themes/waste/theme_image/image_preview",
      //   "service": "https://www.eea.europa.eu/themes/landuse/theme_image/image_preview"}}'
      // icons='{"background": false, "items": {"vector": "class:multiline_chart", "grid": "class:grid_on", "textTable": "class:table_rows", "video": "class:video_camera_back"}}'
      <List>
        {this.props.data.map((item: any) => (
          <List.Item
            key={item.key}
            onClick={() => this.props.handleChange(item.key)}
            labelPosition="right"
            style={{ maxWidth: "100%" }}
          >
            <Label
              as="a"
              color="teal"
              active={item.key === this.props.value}
              className={""}
              title={item.key}
            >
              {item.key}
            </Label>
            <Label as="a" basic pointing="left">
              {item.doc_count}
            </Label>
          </List.Item>
        ))}
      </List>
    );
  }
}

export default AggListItemComponent;
