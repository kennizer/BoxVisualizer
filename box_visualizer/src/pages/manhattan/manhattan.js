import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './manhattan.css'

export default class Manhattan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0, 
            height: 0,
            matrix: [], 
            path: [], 
            calculatedMatrix: [],
            confirmSize: false, 
            confirmedNumbers: false, 
            totalValue: -1
        }
    }
    render () {
        let matrixRender = this.renderMatrix()
        let formRender = this.renderForm() 
        let calculatedMatrixRender = this.renderCalculatedMatrix() 
        return (
            <Container>
                <Row>
                    {formRender}
                </Row>
                <Row>
                    {matrixRender}
                </Row>
                {calculatedMatrixRender}
            </Container>
        )
    }
    changeCell = (e,i,j) => {
        let matrix = this.state.matrix; 
        matrix[i][j] = e.target.value * 1 
        this.setState({matrix:matrix})
    }

    formMatrix = (width, height) => {
        let matrix = [] 
        for (let i =0; i<height; i++) {
            let row = []
            for (let j = 0; j<width; j++) {
                row.push(0)
            }
            matrix.push(row)
        }
        this.setState({matrix:matrix})
    }
    changeWidth = (e)=> {
        let value = e.target.value * 1
        this.formMatrix(value, this.state.height)
        this.setState({width: value})
    }
    changeHeight = (e) => {
        let value = e.target.value * 1
        this.formMatrix(this.state.width, value)
        this.setState({height: value})
    }
    submitSize = () => {
        this.setState({confirmSize: true})
    }
    submitNumbers = () => {
        if (!this.state.confirmedNumbers) {
            console.log(this.state.confirmedNumbers)
            this.animatePath()
        }
        else {
            this.setState({path:[], calculatedMatrix: []})
        }

        this.setState({confirmedNumbers: !(this.state.confirmedNumbers)})
        
    }
    copyMatrix = (matrix) => {
        let lst = [] 
        for (let i = 0; i<matrix.length; i++) {
            let row = [] 
            for (let j =0; j<matrix[i].length; j++) {
                row.push(matrix[i][j])
            }
            lst.push(row)
        }
        return lst 
    }
    animatePath = () => {
        let matrix = this.copyMatrix(this.state.matrix) 
        let width = this.state.width 
        let height = this.state.height
        for (let i =0; i<height; i++) {
            for (let j =0; j<width; j++) {
                let upper = i-1 >= 0 ? matrix[i-1][j] : "N/A"
                let left = j-1 >=0 ? matrix[i][j-1]: "N/A" 
                let currentValue = matrix[i][j]
                if (upper==="N/A" && left==="N/A") {
                    matrix[i][j] = currentValue
                }
                else if (upper==="N/A") {
                    matrix[i][j] = left+currentValue
                } 
                else if (left==="N/A") {
                    matrix[i][j] = upper+currentValue
                }
                else {
                    let value = upper>left ? upper : left 
                    matrix[i][j] = value+currentValue
                }
            }
        }
        console.log(matrix)
        this.backtrack(matrix) 
        this.setState({totalValue:matrix[height-1][width-1], calculatedMatrix: matrix})
    }
    backtrack = (matrix) => {
        let width = this.state.width 
        let height = this.state.height 
        let bigMatrix = this.state.matrix
        let i = height-1 
        let j = width-1
        let path = [] 
        while (i>=0 &&j>=0) {
            let current = matrix[i][j] - bigMatrix[i][j]
            path.push([i,j])
            let upper = i-1 >= 0 ? matrix[i-1][j] : "N/A"
            let left = j-1 >=0 ? matrix[i][j-1]: "N/A" 
            if (upper==="N/A" && left==="N/A") {
                break; 
            }
            else if (upper==="N/A") {
                j-=1 
            } 
            else if (left==="N/A") {
                i-=1
            }
            else {
                if (current===left) {
                    j-=1
                }
                else {
                    i-=1
                }
            }
        }
        console.log(path)
        this.setState({path:path})
    }
    reset = () => {
        this.setState({
            width: 0, 
            height: 0,
            matrix: [], 
            path: [], 
            confirmSize: false, 
            confirmedNumbers: false
        })
    }
    renderCalculatedMatrix = () => {
        if (this.state.confirmedNumbers && this.state.confirmSize) {
            let matrix = this.state.calculatedMatrix 
            let matrixRender = matrix.map((row,i)=>{
               
                let cols = row.map((col,j)=>{
                    let classes = this.state.path.find((lst)=>{
                        return lst[0] === i && lst[1] === j
                    }) !== undefined ? "border path" : "border"
                    return (
                        <Col key={"calculatedcol"+i+j} className={classes}>
                            {col}
                        </Col>
                    )
                })
                return (
                    <Row key={"calculatedrow"+i}>
                        {cols}
                    </Row>
                )
            })
            return (
                <Row>
                    <Row>
                        <p className="center">
                            Calculated Matrix
                        </p>
                    </Row>
                    <Row>
                        {matrixRender}
                    </Row>
                </Row>
            )
        }
       else {
           return (
               <Row>
               </Row>
           )
       }
        
    }
    renderForm = () => {
        if (!this.state.confirmSize) {
            return (
                <Row>
                    <Form onSubmit={this.submitSize}>
                        <Row>
                        <Col>
                        <Form.Label>Width: </Form.Label>
                            <Form.Control type="number" onChange={(e)=> this.changeWidth(e)}/> 
                        </Col>
                        <Col>
                        <Form.Label>Height: </Form.Label>
                            <Form.Control type="number" onChange={(e)=> this.changeHeight(e)}/> 
                        </Col>
                        <Col>
                            <Button type="submit">
                                Confirm Size? 
                            </Button>
                        </Col>
                        </Row>
                        
                      
                    </Form>
                </Row>
            )
        }
        else {
            if (!this.state.confirmedNumbers) {
                return (
                    <Row>
                    <p>
                        Change numbers on the grid. 
                    </p>
                    <Button onClick={this.submitNumbers}>Submit Numbers And Show Changes</Button>
                    
                </Row>
                )
            }
            else {
                return (
                    <Row>
                        <Col>
                        Total Value: {this.state.totalValue}
                        </Col>
                        <Col>
                            <Button onClick={this.submitNumbers}>Go Back To Change Numbers?</Button>
                        </Col>
                        <Col>
                            <Button onClick={this.reset}>Reset?</Button>
                        </Col>
                    </Row>
                )
            }
        }
    }
    renderMatrix = () => {
        if (!this.state.confirmedNumbers && this.state.confirmSize) {
            return this.state.matrix.map ((row,i)=> {
                let columns = row.map((col,j)=>{
                    return (
                        <Col className="border" key={"col"+i+" "+j}>
                            <Form.Control type="number" onChange= {(e)=>this.changeCell(e,i,j)}/>
                        </Col>
                    )
                })
                return (
                    <Row key={"row"+i}>
                        {columns}
                    </Row>
                )
            })
        }
        else {
            return this.state.matrix.map ((row,i)=> {
                let columns = row.map((col,j)=>{
                    return (
                        <Col key={"col"+i+" "+j}>
                            <Form.Control type="number" disabled/>
                        </Col>
                    )
                   
                })
                return (
                    <Row key={"row"+i}>
                        {columns}
                    </Row>
                )
            })
        }
        
    }
}