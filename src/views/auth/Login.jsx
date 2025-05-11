
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const Login = props => {
    return (
        <div className="blog-details-root">
            <Container>
                <LoginForm />
            </Container>
        </div>
    );
};

export default Login;