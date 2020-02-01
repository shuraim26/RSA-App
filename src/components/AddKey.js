import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class AddKey extends Component {

  state = {
    merchantId: "",
    pvtKey: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { merchantId, pvtKey } = this.state;

    const newKey = {
      merchantId: merchantId,
      key: pvtKey
    };

    axios
      .post("/add-key", newKey)
      .then(res => this.props.history.push("/"))
      .catch(err => console.error(err));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">Add Key</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="merchantId">Merchant ID</label>
              <input
                type="text"
                name="merchantId"
                onChange={this.onChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pvtKey">RSA Private Key</label>
              <textarea
                rows="10"
                name="pvtKey"
                onChange={this.onChange}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={this.onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddKey);