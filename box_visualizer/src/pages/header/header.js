import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import {Nav} from 'react-bootstrap'
import './header.css';
export default class Header extends React.Component {
    constructor (props) {
        super(props)
        this.state = {dark: true}
    }
    render () {
        return (
            <Navbar bg="dark" variant="dark" className="width">
                <Navbar.Brand href="/">Visualizer Box</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href='/bfs'>BFS</Nav.Link>
                    <Nav.Link href='/dfs'>DFS</Nav.Link>
                    <Nav.Link href='/manhattan'>Manhattan</Nav.Link>
                    <Nav.Link href='/sequenceAlignment'>Sequence Alignment</Nav.Link>
                    
                </Nav>
            </Navbar>
        )
    }
}