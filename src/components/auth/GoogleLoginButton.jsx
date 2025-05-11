import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { loginWithGoogle } from '../../utils/api';

export default function GoogleLoginButton({ onSuccess, onError }) {
    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                try {
                    const idToken = credentialResponse.credential;
                    const token = await loginWithGoogle(idToken);
                    onSuccess(token);
                } catch (err) {
                    onError(err.message);
                }
            }}
            onError={() => onError("Google login failed")}
        />
    );
}