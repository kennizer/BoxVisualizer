import React from "react";
import './home.css'
import {Container, Row} from 'react-bootstrap'
export default class Home extends React.Component { 
    render () {
        let paragraph = "This is my personal project thats aimed to visualize different algorithms that I have learned in the past!"
        return <Container flex>
            <Row>
                <h1>Box Visualizer</h1>
                <p>
                    {paragraph}
                </p>
            </Row>
        </Container>
    }
}
