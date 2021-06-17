import React from "react";
import {Router,Route,Switch} from 'react-router-dom'
import { Container,Row } from "react-bootstrap";
import Header from './pages/header/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './history'

import Home from './pages/home/home'
import BFS from './pages/bfs/bfs.js'
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
                </Switch>
            </Router>
        )
    }
}