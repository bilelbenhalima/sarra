
import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { apiURL } from "../../Config/Config"

class Formulaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: "",
            Loading: true,
            Reponce: [],
            mail:""
        };
    }
     componentDidMount() {
        fetch(`${apiURL}/getFomulaireByID/${this.props.match.params.id}`, {
            method: "get",
        })
            .then((response) => {
                response.json().then((data) => {
                    console.log(data)
                    this.setState({
                        Data: data.formulaire,
                        Loading: false
                    })
                });
            })
            .catch();
    }
    listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;
    
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
    
            matrix[k].push(list[i]);
        }
    
        return matrix;
    }
    onChangeReponce=(index,value)=>{
        this.state.Reponce[index]=value
        this.setState({
            Reponce:this.state.Reponce
        })
    }
    showQuestion = () => {
        let aux =this.state.Data.fomulaire[0]
        let Question = aux.split(",")
        Question=this.listToMatrix(Question, 3)
        console.log(Question)
        let res = []
        if(this.state.Data!=""){
            for (let i = 0; i < Question.length; i++) {
                res.push(
                    <div style={{marginTop:"50px"}} >
                        <div style={{display:'flex'}} >
                            <div>
                            {Question[i][1]}
                            </div>
                            <div style={{color:"red"}} >
                            {Question[i][2] == "true" ? "*":""}
                            </div>
                        </div>
                        
                    </div>
                )
            }
        }
        return(res)
    }
    submit = ()=>{
        let formData = new FormData()
            formData.append('formulaireID', this.props.match.params.id)
            formData.append('reponces', this.state.Reponce)
            formData.append('mail', this.state.mail)
            fetch(`${apiURL}/SubmitReponces`, {
                method: "post",
                body: formData
            })
                .then((response) => {
                    response.json().then((data) => {
                       if (data.status==200){
                           window.location="/Thanks"
                       }
                    });
                })
                .catch();
    }
    onChangeMail=(value)=>{
        this.setState({
            mail:value
        })
    }
    render() {
        console.log(this.state.Reponce)
        return (
            <>
                <div style={{ backgroundColor: "green", height: "100vh" }} >
                    {!this.state.Loading ?
                        <div style={{ justifyContent: "center", alignContent: "center", display: "flex" }} >
                            <div style={{ backgroundColor: "white", width: "50%", height: "100vh" }} >
                                <div style={{ color: "red" }} >
                                    {this.state.Data.title}
                                </div>
                                <div style={{ color: "green" }} >
                                    {this.state.Data.description}
                                </div>
                                <div>
                                    <div style={{ display: "flex" }} >
                                        <div>
                                            Email
                                    </div>
                                        <div style={{ color: "red" }} >
                                            *
                                    </div>
                                        </div>
                                            <Form.Control
                                            className={"InpuLogin"}
                                            type={"text"}
                                            onChange={(e) => this.onChangeMail(e.target.value)}
                                            isInvalid={false}
                                            />
                                        </div>
                                        {
                                (this.showQuestion()).map((e,index)=>
                                    <div>
                                    {e}
                                    <Form.Control
                                    className={"InpuLogin"}
                                    type={"text"}
                                    onChange={(e) => this.onChangeReponce(index,e.target.value)}
                                    isInvalid={false}
                                    />
                                    </div>
                                    )
                            }
                            <Button
                                className={"btn_Cretae_Acompte"}
                                onClick={() => this.submit()}
                            >{"Submit"}
                            </Button>
                            </div>
                            

                        </div>
                        : null}
                        
                </div>
            </>
        );
    }
}

export default (Formulaire);




