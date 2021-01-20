import React, { Component} from 'react';
import { Form, Button, Row, Col } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { apiURL } from "../../Config/Config"
import FormulaireLine from "./FormulaireLine"

class CreationDeFormulaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title:"",
            Description:"",
            Formulaire:[],
        };
    }
    onChangeTitle=(value)=>{
        this.setState({
            Title:value 
        })
    }
    onChangeDescription=(value)=>{
        this.setState({
            Description: value
        })
    }
    AddLine=()=>{
        this.state.Formulaire.push(
            [
            "Input",
            "",
            false]
        )
        this.setState({
            Formulaire:this.state.Formulaire
        })
    }
    onChangeQuestion=(id,value)=>{
        this.state.Formulaire[id][1]=value
        this.setState({
            Formulaire:this.state.Formulaire
        })
    }
    onChangeRequired=(id)=>{
        this.state.Formulaire[id][2]= !(this.state.Formulaire[id][2])
        this.setState({
            Formulaire:this.state.Formulaire
        })
    }
    submit = ()=>{
        let formData = new FormData()
            formData.append('title', this.state.Title)
            formData.append('description', this.state.Description)
            formData.append('fomulaire', this.state.Formulaire)
            fetch(`${apiURL}/AddFomulaire`, {
                method: "post",
                body: formData
            })
                .then((response) => {
                    response.json().then((data) => {
                       console.log(data)
                    });
                })
                .catch();
    }
    render() {
        return (
            <>
            <div>
                <Form.Control
                    className={"InpuLogin"}
                    type={"text"}
                    placeholder={"Title"}
                    onChange={(e) => this.onChangeTitle(e.target.value)}
                    isInvalid={false}
                />
                 <Form.Control
                    className={"InpuLogin"}
                    type={"text"}
                    placeholder={"Description"}
                    onChange={(e) => this.onChangeDescription(e.target.value)}
                    isInvalid={false}
                />
                {this.state.Formulaire.length!=0 ?
                this.state.Formulaire.map((e,index)=>
                <FormulaireLine 
                Data={e} 
                Id={index} 
                onChangeQuestion={this.onChangeQuestion}
                onChangeRequired={this.onChangeRequired}
                 />)
                :null
                }

                <Button
                                className={"btn_Cretae_Acompte"}
                                onClick={() => this.AddLine()}
                            >{"Add Line"}
                            </Button>
                            <Button
                                className={"btn_Cretae_Acompte"}
                                onClick={() => this.submit()}
                            >{"Submit"}
                            </Button>
                            
            </div>
        </>
        );
    }
}

export default (CreationDeFormulaire);


