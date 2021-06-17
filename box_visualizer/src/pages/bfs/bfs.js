import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import './bfs.css'
export default class BFS extends React.Component {
    constructor (props) {
        super(props)
        let max_rows = 24 
        let max_cols = 12 * 4 - 2
        var items = []
        for (let i=0; i<max_rows; i++) {
            let row = [] 
            for (let j=0; j<max_cols; j++) {
                row.push(0)
            }
            items.push(row)
        }
        this.state = {
            max_rows: max_rows, 
            max_cols: max_cols,
            cols: 0, 
            rows: 0, 
            start_x: -1, 
            start_y: -1, 
            end_x: -1, 
            end_y: -1,
            animation: [], 
            path: [],
            matrix: items,
            selected: false, 
            confirmed_select: false,
            confirmed_start: false, 
            confirmed_end: false,
            switchSelect: null
        }
        
    }
    render () {
        let matrixRender = this.state.matrix.map((item,i)=>{
            let cols = item.map((col,j)=>{
                    if (i===this.state.start_x && j===this.state.start_y) {
                        return (<Col key ={"Col"+j} onClick={()=>this.selectMatrix(i,j)} 
                        lg = "1"
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"bfs blue"}><br></br>
                        </Col>)
                    }
                    else if (i===this.state.end_x && j===this.state.end_y) {
                        return (<Col key ={"Col"+j} onClick={()=>this.selectMatrix(i,j)} 
                        lg = "1"
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"bfs red"}><br></br>
                        </Col>)
                    }
                    else if (i<=this.state.rows-1 && j<=this.state.cols-1) {
                        return (<Col key ={"Col"+j} onClick={()=>this.selectMatrix(i,j)} 
                        lg = "1"
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"bfs orange-border green"}><br></br>
                        </Col>)
                    }
                    else {
                        return (<Col key ={"Col"+j} 
                        lg= "1"
                        onClick={()=>this.selectMatrix(i,j)} 
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"bfs"}><br></br>
                        </Col>)
                    }
            })
            return (
                <Row key ={"Row"+i} className="max-width">
                    {cols}
                </Row>
            )
        })
        const notificationRender = this.loadNotification()
        return (
            <Container fluid>
                <Row>
                    <Col xs = {11}>
                        {matrixRender}
                    </Col>
                    <Col xs = {1}>
                        {notificationRender}
                    </Col>
                </Row>
            </Container>
        )
    }
    selectMatrix = (i,j)=> {
        if (!this.state.confirmed_select) {
            this.setState({selected:!this.state.selected})
        }
        else {
            if (this.state.switchSelect==null) {
                if (!this.state.switchSelect) {
                    this.setState({start_x: i, start_y:j})
                }
                else {
                    this.setState({end_x: i, end_y:j})
                }
            }
            
        }
        
    }
    hoverMatrix = (i,j)=> {
        if (!this.state.selected) {
            this.setState({rows:i+1, cols:j+1})
        }
        else if (!this.state.confirmed) {
            if (this.state.switchSelect!=null) {
                if (this.state.switchSelect) {
                    if (!this.state.confirmed_start && i<this.state.rows && j<this.state.cols) {
                        this.setState({start_x: i, start_y:j})
                    }
                }
                else {
                    if (!this.state.confirmed_end  && i<this.state.rows && j<this.state.cols) {
                        this.setState({end_x: i, end_y:j})
                    }
                }
            }
        }

    }
    loadNotification = () => {
        if (this.state.confirmed_select) {
            let buttonStart = this.buttonLock(this.state.start_x,this.state.start_y,true)
            let buttonEnd = this.buttonLock(this.state.end_x,this.state.end_y,false)
            return (
                <Container>
                    <Row>
                        <p>Pick one of the two buttons in order to select starting and ending points</p>
                    </Row>
                    <Container className="border_pretty">
                        <h1>Starting Point: </h1>
                        <p>Row: {this.state.start_x}</p>
                        <p>Col: {this.state.start_y}</p>
                        {buttonStart}
                    </Container>
                    <Container className="border_pretty">
                        <h1>Ending Point: </h1>
                        <p>Row: {this.state.end_x}</p>
                        <p>Col: {this.state.end_y}</p>
                        {buttonEnd}
                    </Container>
                </Container>
            )
        }
        else {
            if (this.state.selected) {
                return (<Container fluid>
                    <Row className = "border_pretty">
                        <p>Your Current Bounds</p>
                        <p> Row: {this.state.rows} Col: {this.state.cols}</p>
                    </Row>
                    <Row>
                        <Button variant="info" onClick = {()=>this.confirmSelection()}>Confirm Selection?</Button>
                    </Row>
                </Container>)
            }
            else {
                return (<Container>
                    <Row className="border_pretty">
                    <p>Pick your bounds</p>
                    <p>Row: {this.state.rows}</p>
                    <p>Col: {this.state.cols}</p>
                    </Row>
                </Container>)
            }
        }
    }
    confirmSelection = () => {
        this.setState({confirmed_select: true})
    }
    pointSelection = (select)=> {
        this.setState({switchSelect:select})
    }
    buttonLock (i,j,start) {
        if (start) {
            if (i<0 && j<0) {
                return (<Button variant="primary" onClick={()=>this.pointSelection(true)}>
                    Click Here To Select Starting Point</Button>)
            }
            else {
                if (!this.state.confirmed_start) {
                    return (<Button variant="primary" onClick={()=>this.lockInSelection(true)}>
                    Lock In Starting Point?</Button>)
                }
                else {
                    return (<Button variant="primary" >
                    Locked In?</Button>)
                }
            }
        }
        else {
            if (i<0 && j<0) {
                return (<Button variant="danger" onClick={()=>this.pointSelection(false)}>
                    ENding Point Selection</Button>)
            }
            else {
                if (!this.state.confirmed_end) {
                    return (<Button variant="danger" onClick={()=>this.lockInSelection(false)}>
                    Lock In Starting Point?</Button>)
                }
                else {
                    return (<Button variant="primary" >
                    Locked In?</Button>)
                }
            }
        }
    }
    lockInSelection = (start) => {
        if (start) {
            this.setState({confirmed_start:true})
        }
        else {
            this.setState({confirmed_end:true})
        }
    }
}