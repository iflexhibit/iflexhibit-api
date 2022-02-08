import React from "react";

<<<<<<< HEAD
const Layout = () => {
=======
const Login = () => {
>>>>>>> main
  return (
    <main className="login">
      <div className="content">
        <div className="section">
          <div className="logo">
            <img
              src="/assets/logos/lettermark.svg"
              alt="iflexhibit lettermark"
            />
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
            href="https://iflexhibit.com/legal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Terms and Conditions
          </a>{" "}
          and acknowledge you've read our{" "}
          <a
            href="https://iflexhibit.com/legal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
};

<<<<<<< HEAD
export default Layout;
=======
export default Login;
>>>>>>> main
