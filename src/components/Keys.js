import React, { Component } from "react";
import axios from "axios";
import Key from "./Key";

export default class Keys extends Component {
  state = {
    keys: []
  };

  componentDidMount() {
    axios
      .get("/get-keys")
      .then(res => this.setState({ keys: res.data }))
      .catch(err => console.error(err.response));
  }

  render() {
    const { keys } = this.state;

    return keys.map(key => (
      <Key keySet={key} />
    ));
  }
}
