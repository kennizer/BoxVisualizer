import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import './dfs.css'
export default class DFS extends React.Component {
    constructor (props) {
        super(props)
        let max_rows = 24 
        let max_cols = 12 * 3
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
            confirmed_selected: false,
            start_selected: false, 
            end_selected: false, 
            confirmed_select: false,
            confirmed_start: false, 
            confirmed_end: false,
            switchSelect: null,
            animated: false
        }
        
    }
    render () {
        let matrixRender = this.state.matrix.map((item,i)=>{
            let cols = item.map((col,j)=>{
                    if (i===this.state.start_x && j===this.state.start_y) {
                        return (<Col key ={"Col"+j} onClick={()=>this.selectMatrix()} 
                        lg = "1"
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"dfs start"}><br></br>
                        </Col>)
                    }
                    else if (i===this.state.end_x && j===this.state.end_y) {
                        return (<Col key ={"Col"+j} onClick={()=>this.selectMatrix()} 
                        lg = "1"
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"dfs end"}><br></br>
                        </Col>)
                    }
                    else if (i<=this.state.rows-1 && j<=this.state.cols-1) {
                        if (this.state.animated) {
                            let spreadIndex = this.state.animation.indexOf(
                            this.state.animation.find((lst)=>{
                                return lst[0]===i && lst[1] === j 
                            })
                            )
                            let pathIndex = this.state.path.indexOf(
                            this.state.path.find((lst)=>{
                                return lst[0]===i && lst[1] === j
                            }))
                            let style = {
                            }
                            if (spreadIndex!==-1) {
                                if (pathIndex!==-1) {
                                    style = {
                                        animation: spreadIndex * 100 +"ms spread forwards,"+ (this.state.animation.length*100 +1000) +"ms path forwards"
                                    }
                                }
                                else {
                                    style = {
                                        animation: spreadIndex * 100 +"ms spread forwards"
                                    }
                                }
                            }
                            return (<Col key ={"Col"+j} style = {style} onClick={()=>this.selectMatrix()} 
                        lg = "1"
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"dfs selected-border other"}><br></br>
                        </Col>)
                        }
                        else {
                            return (<Col key ={"Col"+j} onClick={()=>this.selectMatrix()} 
                        lg = "1"
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"dfs selected-border other"}><br></br>
                        </Col>)

                        }
                        
                    }
                    else {
                        return (<Col key ={"Col"+j} 
                        lg= "1"
                        onClick={()=>this.selectMatrix()} 
                        onMouseOver={()=>this.hoverMatrix(i,j)}
                        className={"dfs"}><br></br>
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
            <Container>
                <Row>
                    <Col xs = {10}>
                        {matrixRender}
                    </Col>
                    <Col xs = {2}>
                        {notificationRender}
                    </Col>
                </Row>
            </Container>
        )
    }
    selectMatrix = ()=> {
        if (!this.state.confirmed_select) {
            this.setState({selected:!this.state.selected})
        }
        else {
            if (this.state.switchSelect!=null) {
                if (this.state.switchSelect) {
                    this.setState({start_selected:this.state.confirmed_start || !this.state.start_selected})
                }
                else {
                    this.setState({end_selected: this.state.confirmed_end || !this.state.end_selected})
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
                    if (!this.state.start_selected && i<this.state.rows && j<this.state.cols) {
                        this.setState({start_x: i, start_y:j})
                    }
                }
                else {
                    if (!this.state.end_selected  && i<this.state.rows && j<this.state.cols) {
                        this.setState({end_x: i, end_y:j})
                    }
                }
            }
        }

    }
    loadNotification = () => {
        if (this.state.confirmed_start && this.state.confirmed_end) {
            if (!this.state.animated) {
                return (
                    <Container>
                            <Row className="border_pretty">
                                <h4 className="text-center">Start Point</h4>
                                <p>Row: {this.state.start_x}</p>
                                <p>Col: {this.state.start_y}</p>
                            </Row>
                            <Row className="border_pretty">
                                <h4 className="text-center">Ending Point</h4>
                                <p>Row: {this.state.end_x}</p>
                                <p>Col: {this.state.end_y}</p>
                            </Row>
                            <Row className="border_pretty">
                                <Button onClick={() => this.animate()}>Animate dfs?</Button>
                            </Row>
                        </Container>
                )
            }
            else {
                return (
                    <Container>
                            <Row className="border_pretty">
                                <h4 className="text-center">Start Point</h4>
                                <p>Row: {this.state.start_x}</p>
                                <p>Col: {this.state.start_y}</p>
                            </Row>
                            <Row className="border_pretty">
                                <h4 className="text-center">Ending Point</h4>
                                <p>Row: {this.state.end_x}</p>
                                <p>Col: {this.state.end_y}</p>
                            </Row>
                            <Row className="border_pretty">
                                <Button onClick={() => this.animate()}>Animate dfs?</Button>
                                <Button onClick={() => this.reset()}>Reset dfs?</Button>
                            </Row>
                        </Container>
                )
            }
        }
        else {
            if (this.state.confirmed_select) {
                let selectingFor = this.currentSelect()
                let buttonStart = this.buttonLock(this.state.start_x,this.state.start_y,true)
                let buttonEnd = this.buttonLock(this.state.end_x,this.state.end_y,false)
                return (
                    <Container>
                        <Row className="border_pretty">
                            <p>Click On Coloend Box To Select Starting/Ending Point</p>
                            {selectingFor}
                        </Row>
    
                        <Row className="border_pretty">
                            <h4 className = "text-center">Start Point</h4>
                            <p>Row: {this.state.start_x}</p>
                            <p>Col: {this.state.start_y}</p>
                            {buttonStart}
                        </Row>
                        <Row className="border_pretty">
                            <h4 className="text-center">Ending Point</h4>
                            <p>Row: {this.state.end_x}</p>
                            <p>Col: {this.state.end_y}</p>
                            {buttonEnd}
                        </Row>
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
                    if (this.state.start_selected) {
                        return (<Button variant="primary" onClick={()=>this.lockInSelection(true)}>
                        Lock In Starting Point?</Button>)
                    }
                    else {
                        return (<Button variant="primary" onClick={()=>this.pointSelection(true)}>
                    Select Starting Point?</Button>)
                    }
                    
                }
                else {
                    return (<Button variant="primary" >
                    Locked In</Button>)
                }
            }
        }
        else {
            if (i<0 && j<0) {
                return (<Button variant="danger" onClick={()=>this.pointSelection(false)}>
                    Click Here To Select Ending Point</Button>)
            }
            else {
                if (!this.state.confirmed_end) {
                    if (this.state.end_selected) {
                        return (<Button variant="danger" onClick={()=>this.lockInSelection(false)}>
                        Lock In Ending Point?</Button>)
                    }
                    else {
                        return (<Button variant="danger" onClick={()=>this.lockInSelection(false)}>
                        Select Ending Point</Button>)
                    }
                   
                }
                else {
                    return (<Button variant="danger" >
                    Locked In</Button>)
                }
            }
        }
    }
    currentSelect = () =>{
        if (this.state.switchSelect==null) {
            return (
                <Container>
                    <Row>
                    <Col>
                        Selecting for None
                    </Col>
                    <Col className="dfs neutral-color" onClick={()=>this.pointSelection(true)}>
                        <br></br>
                    </Col>
                    </Row>
                </Container>
            )
        }
        else {
            if (this.state.switchSelect) {
                return (
                    <Container>
                        <Row>
                        <Col>
                            Selecting for Start Point
                        </Col>
                        <Col className="dfs start" onClick={()=>this.pointSelection(false)}>
                            <br></br>
                        </Col>
                        </Row>
                    </Container>
                )
            }
            else {
                return (
                    <Container>
                        <Row>
                        <Col>
                            Selecting for End Point
                        </Col>
                        <Col className="dfs end" onClick={()=>this.pointSelection(true)}>
                            <br></br>
                        </Col>
                        </Row>
                    </Container>
                )
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
    animate = () => {
        this.setState({animated:!this.state.animated})
        
        let start_x = this.state.start_x 
        let start_y = this.state.start_y 
        let end_x = this.state.end_x 
        let end_y = this.state.end_y
        let rows = this.state.rows 
        let cols = this.state.cols
        let queue = [[start_x,start_y]] 
        let visited = [] 
        let dfsTracker = new Map() 
        let found = false; 

        dfsTracker.set(start_x+" "+start_y, null)
        while (queue.length>0 && !found) {
            let cord = queue[0]
            visited.push(cord)
            let candidates = [
                [
                    cord[0]-1, cord[1]
                ],
                [
                    cord[0]+1, cord[1]
                ],
                [
                    cord[0], cord[1]-1
                ],
                [
                    cord[0]-1, cord[1]-1
                ],
                [
                    cord[0]+1, cord[1]-1
                ],
                [
                    cord[0]+1, cord[1]+1
                ],
                [
                    cord[0]-1, cord[1]+1
                ]
            ]
            candidates = candidates.filter((coord)=>{
                return coord[0]>=0 && coord[0]<rows && 
                coord[1]>=0 && coord[1]<cols && 
                dfsTracker.get(coord[0]+" "+ coord[1])===undefined
            })
            if (candidates.length>0) {
                let candidateCord = candidates[Math.floor(Math.random()*candidates.length)]
                let s = candidateCord[0]+" "+candidateCord[1]
                dfsTracker.set(s,[cord[0],cord[1]])
                queue.unshift(candidateCord);
            }
            else {
                queue.shift()
            }
            found = cord[0]===end_x && cord[1]===end_y
        }
        console.log(found)
        console.log(dfsTracker)
        this.backtrack(dfsTracker, [end_x,end_y])
        this.setState({animation:visited})
    }
    backtrack = (dfsTracker, coord) => {
        let coord_x = coord[0]
        let coord_y = coord[1]
        let path = [[coord_x,coord_y]] 
        let item = dfsTracker.get(coord_x+" "+coord_y)
        console.log(coord)
        while (item!==null) {
            console.log(item)
            path.push([item[0], item[1]])
            let s = item[0]+ " "+ item[1]
            item = dfsTracker.get(s)
        }
        path = path.reverse() 
        console.log(path)
        this.setState({path:path})
    }
    reset = () => {
        let items = []
        for (let i=0; i<this.state.max_rows; i++) {
            let row = [] 
            for (let j=0; j<this.state.max_cols; j++) {
                row.push(0)
            }
            items.push(row)
        }
        this.setState({
            cols: -1, 
            rows: -1, 
            start_x: -1, 
            start_y: -1, 
            end_x: -1, 
            end_y: -1,
            animation: [], 
            path: [],
            matrix: items,
            selected: false,
            confirmed_selected: false,
            start_selected: false, 
            end_selected: false, 
            confirmed_select: false,
            confirmed_start: false, 
            confirmed_end: false,
            switchSelect: null,
            animated: false
        })
    }
}