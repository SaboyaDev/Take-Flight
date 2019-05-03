import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import "./style.css";

class Guide extends Component {
    render() {
        return(
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <h2>User Guide</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Guide;