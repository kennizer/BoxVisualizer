import React from "react";
import {Router,Route,Switch} from 'react-router-dom'
import { Container,Row } from "react-bootstrap";
import Header from './pages/header/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './history'

import Home from './pages/home/home'
import BFS from './pages/bfs/bfs.js'
import DFS from './pages/dfs/dfs.js'
import SequenceAlignment from './pages/seq_alignment/seq_alignment'
import Manhattan from "./pages/manhattan/manhattan";

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history:history
        }
    }
    render () {
        const homePath = (
            <Route exact path = "/">
                <head>
                    <title>Box Visualizer</title>
                </head>
                <Container>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <Home/> 
                    </Row>
                </Container>
            </Route>
        )
        const bfsPath = (
            <Route exact path = "/bfs">
                    <title>Breadth First Search</title>
                <Container>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <BFS/>
                    </Row>
                </Container>
            </Route>
        )
        const dfsPath = (
            <Route exact path = "/dfs">
                    <title>Depth First Search</title>
                <Container>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <DFS/>
                    </Row>
                </Container>
            </Route>
        )
        const manhattanPath = (
            <Route exact path = "/manhattan">
                    <title>Manhattan Problem</title>
                <Container>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <Manhattan/>
                    </Row>
                </Container>
            </Route>
        )
        const sequenceAlignmentPath = (
            <Route exact path = "/sequenceAlignment">
                    <title>Sequence Alignment</title>
                <Container>
                    <Row>
                        <Header/>
                    </Row>
                    <Row>
                        <SequenceAlignment/>
                    </Row>
                </Container>
            </Route>
        )
        /*
        const bfsPath = (
            <Route path = "/bfs">
                <BFS/> 
            </Route>
        )
        const dfsPath = (
            <Route path = "/dfs">
                <DFS/> 
            </Route>
        )
        const manhattanPath = (
            <Route path = "/manhattan">
                <Manhattan/> 
            </Route>
        )
        const letterPath = (
            <Route path = "/letter">
                <Letter/> 
            </Route>
        )
        */
        return (
            <Router history={this.state.history}>
                <Switch>
                    {homePath}
                    {bfsPath}
                    {dfsPath}
                    {sequenceAlignmentPath}
                    {manhattanPath}
                </Switch>
            </Router>
        )
    }
}