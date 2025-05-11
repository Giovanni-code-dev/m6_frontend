
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = props => {
    return (
        <div className="blog-details-root">
            <Container>
                <RegisterForm />
            </Container>
        </div>
    );
};

export default Register;