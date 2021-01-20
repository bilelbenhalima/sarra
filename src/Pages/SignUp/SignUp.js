import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap"
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { apiURL } from "../../Config/Config"
export default function Login() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [mail, onChangeEmail] = useState("")
    const [password, onChangePassword] = useState("")
    const [name, onChangeName] = useState("")
    const [isInvalidEmail, onChangeIsInvalidEmail] = useState(false)
    const [isInvalidPassword, onChangeIsInvalidPassword] = useState(false)
    const [isInvalidName, onChangeIsInvalidName] = useState(false)
    const [url, onChangeUrl] = useState(null)
    function SignUp() {
        var verif = true
        if (mail === "") {
            verif = false
            onChangeIsInvalidEmail(true)
        }
        else
            onChangeIsInvalidEmail(false)
        if (password === ""||password.length < 8) {
            verif = false
            onChangeIsInvalidPassword(true)
        }
        else
            onChangeIsInvalidPassword(false)
        if (name === "" || name.length < 5) {
            verif = false
            onChangeIsInvalidName(true)
        }
        else
            onChangeIsInvalidName(false)
        if (verif === true) {
            const formData = new FormData()
            formData.append('email', mail)
            formData.append('password', password)
            formData.append('full_name', name)
            fetch(`${apiURL}/signup`, {
                // fetch(`localhost:8000/signup`, {
                method: "post",
                body: formData
            })
                .then((response) => {
                    response.json().then((data) => {
                        if (data.status === 200) {
                            onChangeUrl("Login")
                        }
                        else {
                            onChangeIsInvalidPassword(true)
                            onChangeIsInvalidEmail(true)
                            onChangeIsInvalidName(true)
                        }
                    });
                })
                .catch();
        }
    }
    if (url) return <Redirect to={url} />
    return (
        <div className="LoginTemplate_Container">
            <div className={"ContainerLogin"}>
                <div className={"TemplateLogin"} >
                    <div className={"scale-in-center"} >
                        <p className={"Title_Login"} >
                            {"SIGN UP"}
                        </p>
                        <Form.Control
                            className={"InpuLogin"}
                            type={"text"}
                            placeholder={"Full name "}
                            onChange={(e) => onChangeName(e.target.value)}
                            isInvalid={isInvalidName}
                        />
                        <Form.Control
                            className={"InpuLogin"}
                            type={"text"}
                            placeholder={"Email"}
                            onChange={(e) => onChangeEmail(e.target.value)}
                            isInvalid={isInvalidEmail}
                        />
                        <Form.Control
                            className={"InpuLogin"}
                            type={"password"}
                            placeholder={"Password"}
                            onChange={(e) => onChangePassword(e.target.value)}
                            isInvalid={isInvalidPassword}
                        />
                        <Button
                            className={"btn_Login"}
                            onClick={() => SignUp()}
                        >{"SIGN UP"}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}