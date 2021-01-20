
import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { apiURL } from "../../Config/Config"

class Thanks extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
 
    render() {
        console.log(this.state.Reponce)
        return (
            <>
            <div>Thanks</div>
                
            </>
        );
    }
}

export default (Thanks);




