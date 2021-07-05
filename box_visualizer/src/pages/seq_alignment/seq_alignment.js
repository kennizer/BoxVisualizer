import React from "react"
import { Container,Row,Col } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './seq_alignment.css'
export default class SequenceAlignment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            word1: "",
            word2: "",
            matrix: [],
            lockWords: false, 
            match: 1, 
            mismatch: -1, 
            gap: -5,
            lockPenalty: false,
            seq1: "",
            seq2: "", 
            path: [] 
        }
    }
    render () {
        let matrixRender = this.state.matrix.map((row,i)=>{
            let cols = row.map((col,j)=>{
                let lst= this.state.path
                let selected = lst.find(l=>l[0]===i && l[1]===j) !== undefined ? "selected" : ""
                if (i===0 || j===0) {
                    return (
                        <Col>
                        {col}
                        </Col>
                    )
                }
                else {
                    if (col==="-") {
                        return (
                            <Col className="border">
                            <br></br>
                            </Col>
                        )
                    }
                    else {
                        let colRender = (
                            <Row>
                                <Col xs={6}>
                                <Row>
                                    Left: {col.left}
                                </Row>
                                <Row>
                                    Top: {col.top}
                                </Row>
                                <Row>
                                    Diagonal: {col.diag}
                                </Row>
                                </Col>
                                <Col xs={6}>
                                Value: {col.value}
                                </Col>
                            </Row>
                        )
                        return (
                            <Col className={"border "+selected}>
                            {colRender}
                            </Col>
                        )
                    }
                        
                    
                }

            })
            return (
                <Row>
                    {cols}
                </Row>
            )
        })
        let formRender = this.renderForm() 
        return (<Container>
            <Row>
                {formRender}
            </Row>
            <Row>
                {matrixRender}
            </Row>
        </Container>)
    }
    word1 = (e) => {
        let word = e.target.value 
        this.formMatrix(word,this.state.word2)
        this.setState({word1:word})
    }
    word2 = (e) => {
        let word = e.target.value 
        this.formMatrix(this.state.word1, word)
        this.setState({word2:word})
    }
    mismatchPenalty = (e) => {
        this.setState({mismatch:e.target.value * -1})
    }
    gapPenalty = (e) => {
        this.setState({gap:e.target.value * -1})
    }
    matchIncentive = (e) => {
        this.setState({match:e.target.value * 1})
    }
    formMatrix = (word1,word2) => {
        let new_matrix = [] 
        let first_row = [" "]
        word1 = word1.length>0 ? "-"+word1 : word1
        word2 = word1.length>0 ? "-"+word2 : word2
        for (let j=0; j<word1.length; j++) {
            first_row.push(word1.charAt(j))
        }
        new_matrix.push(first_row)
        for (let i=0; i<word2.length; i++) {
            let new_row = [word2.charAt(i)]
            for (let j=0; j<word1.length; j++) {
                new_row.push("-")
            }
            new_matrix.push(new_row)
        }
        this.setState({matrix:new_matrix})
    }
    renderForm = () => {
        if (!this.state.lockWords) {
            return (
            <Row>
                <Form onSubmit={this.lockWords}>
                    <Row>
                        <Col>
                        <Form.Label>Word 1:</Form.Label>
                            <Form.Control onChange={this.word1} required placeholder="Enter in Word1"/>
                        </Col>
                        <Col>
                            <Form.Label>Word 2:</Form.Label>

                            <Form.Control onChange = {this.word2} required placeholder="Enter in Word2"/>
                        </Col>
                        <Col>
                            <Button variant = "info" type = "submit" className="padding-top-fix">Lock In?</Button>
                        </Col>
                    </Row>
                </Form>
                
            </Row>
            )
        }
        else if (!this.state.lockPenalty) {
            return (
                <Row>
                    <Form onSubmit={this.lockPenalty}>
                    <Row>
                    <Col xs={2}>
                        Word1: {this.state.word1}
                    </Col>
                    <Col xs={1}>
                        Word2: {this.state.word2}
                    </Col>
                    <Col>
                        <Form.Label>Mismatch Penalty:</Form.Label>
                        <Form.Control type="number" onChange={this.mismatchPenalty} placeholder="Mismatch Penalty"/>
                    </Col>
                    <Col>
                        <Form.Label>Match Incentive:</Form.Label>
                        <Form.Control type="number" onChange = {this.matchIncentive} placeholder="Match Incentive"/>
                    </Col>
                    <Col>
                        <Form.Label>Gap Penalty:</Form.Label>
                        <Form.Control type="number" onChange = {this.gapPenalty} placeholder="Gap Penalty"/>
                    </Col>
                    <Col>
                        <Button variant = "info" type="submit" className="padding-top-fix">Lock In?</Button>
                    </Col>
                    </Row>
                    </Form>
                </Row>
                )
        }
        else {
            return (
                <Row>
                    <Col className="border">
                        Word1: {this.state.word1}
                    </Col>
                    <Col className="border">
                        Word2: {this.state.word2}
                    </Col>
                    <Col className="border">
                        Match Incentive: {this.state.match}
                    </Col>
                    <Col className="border">
                        Mismatch Penalty: {this.state.mismatch}
                    </Col>
                    <Col className="border">
                        Gap Penalty: {this.state.gap}
                    </Col>
                    <Col className="border">
                        <Row>
                            Sequence 1: {this.state.seq1}
                        </Row>
                        <Row>
                            Sequence 2: {this.state.seq2}
                        </Row>
                    </Col>
                    <Col>
                        <Button onClick={()=>{this.reset()}}>Reset?</Button>
                    </Col>
                </Row>
            )
        }
    }
    lockWords = (e) => {
        e.preventDefault()
        this.setState({lockWords:true})
    }
    lockPenalty = (e) => {
        e.preventDefault()
        this.setState({lockPenalty:true})
        this.beginAnimation()
    }
    beginAnimation = () => {
        let index1 = 1
        let index2 = 1
        let gap = this.state.gap 
        let currentGap = 0 
        let matrix = this.state.matrix
        while (index1< this.state.word1.length + 2) {
            let value = {left: currentGap, diag: 0, top:0, value: currentGap} 
            currentGap+=gap 
            matrix[index2][index1] = value 
            index1 +=1
        }
        index1 = 1 
        currentGap = 0 
        while (index2< this.state.word2.length + 2) {
            let value = {left: 0, diag: 0, top:currentGap, value: currentGap} 
            currentGap+=gap 
            matrix[index2][index1] = value 
            index2 +=1
        }
        index1 = 2
        index2 = 2 
        while (index1< this.state.word1.length+2) {
            index2 = 2
            while (index2 < this.state.word2.length+2) {
                let match = this.state.word1.charAt(index1-2) === this.state.word2.charAt(index2-2) ? this.state.match : this.state.mismatch
                let diagonal = matrix[index2-1][index1-1].value + match
                let left = matrix[index2][index1-1].value + gap 
                let top = matrix[index2-1][index1].value + gap 
                let maxValue = Math.max(diagonal,left)
                maxValue = Math.max(maxValue,top)
                let value = {left: left, diag: diagonal, top:top, value: maxValue} 
                matrix[index2][index1]= value
                index2+=1
            }
            index1+=1
        }
        this.setState({matrix:matrix})
        this.backtrack() 
    }
    backtrack = () => {
        let matrix = this.state.matrix 
        let i = this.state.word1.length + 1 
        let j = this.state.word2.length + 1 
        let path = [] 
        let align1 = ""
        let align2 = ""
        while (i>=1 && j>=1) {
            let cell= matrix[j][i]
            path.push([j,i])
            if (cell.value === cell.diag) {
                align1 = this.state.word1.charAt(i-2) + align1
                align2 = this.state.word2.charAt(j-2) + align2
                j-=1
                i-=1
            }
            else if (cell.value === cell.top) {
                align1 = "-" + align1
                align2 = this.state.word2.charAt(j-2) + align2
                j-=1
            }
            else {
                align1 = this.state.word1.charAt(i-2) + align1
                align2 = "-" + align2
                i-=1
            }
        }
        console.log(align1)
        console.log(align2)
        console.log(path)
        this.setState({path: path, seq1: align1, seq2:align2})
    }
    reset = () => {
        this.setState({
            word1: "",
            word2: "",
            matrix: [],
            lockWords: false, 
            match: 1, 
            mismatch: -1, 
            gap: -5,
            lockPenalty: false,
            seq1: "",
            seq2: "", 
            path: [] 
        })
    }
}