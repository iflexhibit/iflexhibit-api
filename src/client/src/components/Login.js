import React from "react";

const Login = () => {
  return (
    <main className="login">
      <div className="content">
        <div className="section">
          <div className="logo">
            <a href="/">
              <img
                src="/assets/logos/lettermark.svg"
                alt="iflexhibit lettermark"
              />
            </a>
            <div>
              <b>Dashboard</b>
            </div>
          </div>
          <a href="/dashboard/auth/google">
            <img src="/assets/google/google_default.png" alt="google button" />
          </a>
        </div>
        <p>
          By continuing, you agree to iFlexhibit's{" "}
          <a
            href="https://iflexhibit.vercel.app/legal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Terms and Conditions
          </a>{" "}
          and acknowledge you've read our{" "}
          <a
            href="https://iflexhibit.vercel.app/legal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <div className="footer-partner">
        In partnership with <b>iACADEMY</b>
      </div>
    </main>
  );
};

export default Login;
