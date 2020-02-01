import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  state = {
    merchantId: "",
    encrypted: "",
    string: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { merchantId, encrypted } = this.state;

    const data = {
      merchantId: merchantId,
      string: encrypted
    };

    axios
      .post("http://localhost:8000/decrypt", data)
      .then(res => {
        console.log(res);
        this.setState({ string: res.data.decryptedString });
      })
      .catch(err => console.error(err));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">RSA Decrypt</div>
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
              <label htmlFor="encrypted">Encrypted String</label>
              <textarea
                rows="10"
                name="encrypted"
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
          <br />
          <label htmlFor="plainText">Decrypted String</label>
          <textarea
            rows="10"
            name="plainText"
            className="form-control"
            value={this.state.string}
          />
        </div>
      </div>
    );
  }
}
