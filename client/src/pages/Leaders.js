import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import "./style.css";

class Leaders extends Component {
    render() {
        return(
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <h2>Leaderboard</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Leaders;