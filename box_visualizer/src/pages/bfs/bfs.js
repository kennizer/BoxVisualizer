import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './bfs.css'
export default class BFS extends React.Component {
    constructor (props) {
        super(props)
        let max_rows = 24 
        let max_cols = 12 * 4 
        var items = [
          ];
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
            matrix: items,
            selected: false
        }
        
    }
    render () {
        let matrixRender = this.state.matrix.map((item,i)=>{
            let cols = item.map((col,j)=>{
                if (i<=this.state.rows-1 && j<=this.state.cols-1) {
                    return (<Col key ={"Col"+j} onClick={()=>this.selectMatrix(i,j)} 
                    lg = "1"
                    onMouseOver={()=>this.hoverMatrix(i,j)}
                    className={"bfs orange"}><br></br>
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
                <Row key ={"Row"+i} className="max-width" xs={10}>
                    {cols}
                </Row>
            )
        })
        return (
            <Container fluid>
                {matrixRender}
            </Container>
        )
    }
    selectMatrix = (i,j)=> {
        this.setState({selected:!this.state.selected})
    }
    hoverMatrix = (i,j)=> {
        if (!this.state.selected) {
            this.setState({rows:i+1, cols:j+1})
        }

    }
}