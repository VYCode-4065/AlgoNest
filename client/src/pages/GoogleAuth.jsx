// src/components/GoogleSignIn.jsx
import React, { useEffect } from "react";
import { useLoginWithGoogleMutation } from "../store/api/authApi";

const GoogleAuth = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(document.getElementById("g_id_signin"), {
        theme: "outline",
        size: "large",
        text: "blue",
      });

      // optional: auto prompt (One Tap)
      // google.accounts.id.prompt();
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const [loginWithGoogle] = useLoginWithGoogleMutation();

  async function handleCredentialResponse(response) {
    // response.credential is the ID token (JWT)
    const idToken = response.credential;
    // send to backend for verification and app-session creation
    const res = await loginWithGoogle(idToken);
  }

  return (
    <div
      id="g_id_signin"
      className="flex items-center w-full justify-center"
    ></div>
  );
};

export default GoogleAuth;
