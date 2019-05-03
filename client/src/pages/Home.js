import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import drone from "../images/telloDrone.png";
// import droneGirl from "../images/droneGirl.jpg";
import "./style.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col size="md-6">
              <div id="droneSection">
                <img src={drone} alt="drone" width="100%" />
              </div>
            </Col>
            <Col size="md-6">
              <div id="aboutSection">
                <h2>
                  Unlock the full potential of your DJI Tello drone with Take
                  Flight
                </h2>
                <p>Take Flight</p>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="parallax" />
      </div>
    );
  }
}

export default Home;
