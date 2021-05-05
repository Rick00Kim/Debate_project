import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import InputForm from "./InputForm";
import axios from "axios";

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        root: {
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `space-between`,
          height: `95vh`,
        },
        header: {
          color: `#585858`,
        },
        list: {
          color: `#585858`,
          padding: 0,
          fontSize: 15,
          height: `100%`,
          overflow: `scroll`,
        },
        listItem: {
          padding: `5px 20px`,
          color: `#e9ecef`,
          textAlign: `left`,
          borderBottomStyle: `dotted`,
          borderBottomWidth: `thin`,
        },
        listItemRow: {
          padding: `10px 0`,
        },
      },
      targetTopic: props.targetEvent,
      debateList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/debates/" + this.state.targetTopic.idx)
      .then((res) => this.setState({ debateList: res.data }))
      .catch((err) => console.log(err));
  };

  renderDebateList = () => {
    return this.state.debateList.map((item) => (
      <ListGroup.Item bsPrefix style={this.state.styles.listItem}>
        <Row style={this.state.styles.listItemRow}>
          <Col sm={9}>{item.opinion}</Col>
          <Col sm={1}>{item.username}</Col>
          <Col sm={2}>2021/04/23 19:00</Col>
        </Row>
      </ListGroup.Item>
    ));
  };

  render() {
    return (
      <div style={this.state.styles.root}>
        <Jumbotron
          fluid
          style={{ paddingTop: `2rem`, marginBottom: 10, padding: `20px 0` }}
        >
          <Container style={this.state.styles.header}>
            <h1>{this.state.targetTopic.header}</h1>
            <p>{this.state.targetTopic.content}</p>
          </Container>
        </Jumbotron>
        <Container style={this.state.styles.list}>
          <ListGroup variant="flush">{this.renderDebateList()}</ListGroup>
        </Container>
        <Container style={{ fontSize: `15px`, padding: 0 }}>
          <hr style={{ borderTop: `1px solid #e9ecef` }} />
          <InputForm />
        </Container>
      </div>
    );
  }
}

export default TopicDetail;
