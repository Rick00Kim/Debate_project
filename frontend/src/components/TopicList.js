import React, { Component } from "react";
import { Col, Row, Tab } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.css";
import TopicDetail from "./TopicDetail";
import axios from "axios";

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        mainStyle: {
          color: `#e9ecef`,
          width: `100vw`,
          height: `100vh`,
          padding: 20,
        },
        contentColStyle: {
          color: `#e8dbdb`,
          borderLeftStyle: `solid`,
          borderLeftWidth: `thin`,
        },
        listGroupItemStyle: {
          padding: `0.3rem 1rem`,
        },
      },
      topicList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/topics")
      .then((res) => this.setState({ topicList: res.data }))
      .catch((err) => console.log(err));
  };

  renderTopic = () => {
    return this.state.topicList.map((item) => (
      <ListGroup.Item
        style={this.state.styles.listGroupItemStyle}
        variant="light"
        action
        href={"#link" + item.idx}
        key={"topicIdx" + item.idx}
      >
        {item.title}
      </ListGroup.Item>
    ));
  };
  renderDebate = () => {
    return this.state.topicList.map((item) => (
      <Tab.Pane eventKey={"#link" + item.idx}>
        <TopicDetail targetEvent={item} key={"topicIdx" + item.idx} />
      </Tab.Pane>
    ));
  };

  render() {
    return (
      <div style={this.state.styles.mainStyle}>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={3}>
              <h3 style={{ paddingBottom: 20, margin: 0 }}>Choose Topic</h3>
              <ListGroup style={{ fontSize: `20px` }}>
                {this.renderTopic()}
              </ListGroup>
            </Col>

            <Col sm={9} style={this.state.styles.contentColStyle}>
              <Tab.Content>{this.renderDebate()}</Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default TopicList;
