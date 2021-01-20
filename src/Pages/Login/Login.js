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
    const [isInvalidEmail, onChangeIsInvalidEmail] = useState(false)
    const [isInvalidPassword, onChangeIsInvalidPassword] = useState(false)
    const [url, onChangeUrl] = useState(null)
    function Login() {
        var verif = true
        if (mail === "") {
            verif = false
            onChangeIsInvalidEmail(true)
        }
        else
            onChangeIsInvalidEmail(false)
        if (password === "") {
            verif = false
            onChangeIsInvalidPassword(true)
        }
        else
            onChangeIsInvalidPassword(false)
        if (verif === true) {
            const formData = new FormData()
            formData.append('email', mail)
            formData.append('password', password)
            fetch(`${apiURL}/login`, {
                method: "post",
                body: formData
            })
                .then((response) => {
                    response.json().then((data) => {
                        if (data.status === 200) {
                            dispatch({ type: 'SET_CURRENT_USER', value: { token: data.token, userId: data.userId, full_name: data.full_name } })
                            onChangeUrl("CreationDeFormulaire")
                        }
                        else {
                            onChangeIsInvalidPassword(true)
                            onChangeIsInvalidEmail(true)
                        }
                    });
                })
                .catch();
        }

    }
    if (url) return <Redirect to={url} />
    return (
        <>
            <div className="LoginTemplate_Container">
                <div className={"ContainerLogin"}>
                    <div className={"TemplateLogin"} >
                        <div className={"scale-in-center"} >
                            <p className={"Title_Login"} >
                                {"SIGN IN"}
                            </p>
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
                                onClick={() => Login()}
                            > {"LOGIN"}</Button>
                            <Button
                                className={"btn_Cretae_Acompte"}
                                onClick={() => onChangeUrl("signup")}
                            >{"SIGN UP"}
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


