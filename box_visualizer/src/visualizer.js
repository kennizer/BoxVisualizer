import React from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './pages/home/home'
import Header from './pages/header/header'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Visualizer extends React.Component {
    render () {
        const homePath = (
            <Route path = "/">
                <Header/>
                <Home/> 
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
            <Router history={this.props.history}>
                <Switch>
                    {homePath}
                </Switch>
            </Router>
        )
    }
}