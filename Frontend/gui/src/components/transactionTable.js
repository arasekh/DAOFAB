import { Table } from "antd";
import axios from "axios";
import React from "react";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

class TransactionTable extends React.Component {
  /**
   *
   * Columns of the Transaction Table
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
      title: "Total Paid Amount",
      dataIndex: "totalPaidAmount",
      key: "totalPaidAmount",
      render: (text, row) => <Link to={`/${row.id}`}>{text}</Link>,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      totalResults: 0,
      totalPages: 0,
      currentPageNo: 1,
      isFetching: true,
    };
  }

  /**
   *
   * Setting initial states of the component, while mounting
   *
   */
  componentDidMount() {
    const currentPageNo = this.state.currentPageNo;
    const searchUrl = `http://localhost:8000/payments/transactions/${currentPageNo}`;
    axios.get(searchUrl).then((res) => {
      this.setState({
        results: res.data.hits,
        totalResults: res.data.totalHits,
        totalPages: res.data.total_page_count,
        isFetching: false,
      });
    });
  }

  /**
   * Fetch the search results and update the state with the result.
   *
   *
   * @param {int} updatedPageNo Updated Page No.
   *
   */
  fetchSearchResults = (updatedPageNo = "") => {
    const searchUrl = `http://localhost:8000/payments/transactions/${updatedPageNo}`;

    axios.get(searchUrl).then((res) => {
      this.setState({
        results: res.data.hits,
        totalResults: res.data.totalHits,
        totalPages: res.data.total_page_count,
        isFetching: false,
      });
    });
  };

  /**
   *
   * Handle click on the page navigation and change the page table
   * @param {int} value Updated Page No.
   *
   */
  handlePageClick = (value) => {
    this.state.currentPageNo = value;

    this.setState({ isFetching: true, currentPageNo: value }, () => {
      this.fetchSearchResults(value);
    });
  };

  /**
   *
   * rendering the transactions table
   *
   */
  render() {
    const { results, isFetching } = this.state;
    return (
      // if the results are not fetched yet, show message: Loading...
      // Otherwise show the fetched results
      <div>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div className="container">
            <h2 className="heading">Parent Transactions</h2>

            <Pagination
              defaultCurrent={1}
              total={this.state.totalResults}
              showSizeChanger={false}
              defaultPageSize={2}
              current={this.state.currentPageNo}
              onChange={this.handlePageClick}
            />

            <Table
              columns={this.columns}
              dataSource={results}
              pagination={false}
            />

            <Pagination
              defaultCurrent={1}
              total={this.state.totalResults}
              defaultPageSize={2}
              current={this.state.currentPageNo}
              showSizeChanger={false}
              onChange={this.handlePageClick}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TransactionTable;
