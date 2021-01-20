
import React, { Component} from 'react';
import { Form, Button, Row, Col } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { apiURL } from "../../Config/Config"

class FormulaireLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }


    render() {
        return (
            <>
            <div style={{display:"flex"}} >
                <Form.Control
                    className={"InpuLogin"}
                    type={"text"}
                    placeholder={"Input"}
                    disabled={true}
                    isInvalid={false}
                />
                 <Form.Control
                    className={"InpuLogin"}
                    type={"text"}
                    placeholder={"Question"}
                     onChange={(e) => this.props.onChangeQuestion(this.props.Id,e.target.value)}
                    isInvalid={false}
                />
                <Form.Check
                    label="Required"
                    id={this.props.Id}
                    onClick={() => this.props.onChangeRequired(this.props.Id)}
                    checked={this.props.Data.Required}
                />
            </div>
        </>
        );
    }
}

export default (FormulaireLine);




