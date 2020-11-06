import { Table } from "antd";
import axios from "axios";
import React from "react";

class InstallmentTable extends React.Component {
  /**
   *
   * Columns of the Installments Table
   *
   */
  columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      totalResults: 0,
      isFetching: true,
      transactionId: this.props.match.params.transactionId,
    };
  }

  /**
   *
   * Setting initial states of the component, while mounting.
   *
   */
  componentDidMount() {
    const transactionId = this.state.transactionId;
    const searchUrl = `http://localhost:8000/payments/transaction/${transactionId}`;
    axios.get(searchUrl).then((res) => {
      this.setState({
        results: res.data.hits,
        totalResults: res.data.totalHits,
        isFetching: false,
      });
    });
  }

  /**
   * Fetch the search results and update the state with the result.
   * Also cancels the previous query before making the new one.
   *
   */
  fetchSearchResults = () => {
    const transactionId = this.state.transactionId;
    const searchUrl = `http://localhost:8000/payments/transaction/${transactionId}`;

    axios.get(searchUrl).then((res) => {
      this.setState({
        results: res.data.hits,
        totalResults: res.data.totalHits,
        isFetching: false,
      });
    });
  };

  /**
   *
   * rendering the installments table
   *
   */
  render() {
    const { results, isFetching } = this.state;
    console.log(this.props.match.params.transactionId);
    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div className="container">
            <h2 className="heading">Installments</h2>
            <Table
              columns={this.columns}
              dataSource={results}
              pagination={false}
            />
          </div>
        )}
      </div>
    );
  }
}

export default InstallmentTable;
