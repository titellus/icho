import React from "react";

export default class IncludeFieldsSelector extends React.Component<
  { fields: string[]; onChange: any; setQuery: any },
  { columns: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      columns: this.props.fields.join(","),
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ columns: e.target.value });
    // this.props.onChange(e.target.value.split(','))
    //
    // if (this.props.setQuery) {
    //   this.props.setQuery({
    //     // options: {
    //     //   includeFields: this.state.fields
    //     // }
    //   });
    // }
  };
  onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.props.onChange(this.state.columns);
  };

  render() {
    return (
      <label>
        Columns:
        <input
          type="text"
          value={this.state.columns}
          onChange={this.onChange}
        />
        <button onClick={this.onClick}>Update</button>
      </label>
    );
  }
}
