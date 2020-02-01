import React, { Component } from "react";
import axios from "axios";

export default class Key extends Component {
  state = {
    show: false
  };

  onDeleteClick = merchantId => {
    axios.delete("/delete/"+merchantId)
        .then(res => window.location.reload());
  };

  render() {
    const { merchantId, key } = this.props.keySet;

    return (
      <div className="card card-body mb-3">
        <h4>
          {merchantId}{" "}
          <i
            onClick={() =>
              this.setState({
                show: !this.state.show
              })
            }
            className="fas fa-sort-down"
            style={{ cursor: "pointer" }}
          />
          <i
            className="fas fa-times"
            style={{ cursor: "pointer", float: "right", color: "red" }}
            onClick={this.onDeleteClick.bind(this, merchantId)}
          />
        </h4>
        {this.state.show ? <p>{key}</p> : null}
      </div>
    );
  }
}
