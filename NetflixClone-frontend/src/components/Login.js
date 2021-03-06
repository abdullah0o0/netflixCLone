import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import baseUrl from'../baseUrl'

export default function Login() {
  const { user, setUser, setIsLogin, userEmail } = useContext(MyContext);
  console.log(user);
  const loginForm = (e) => {
    e.preventDefault();
    let user = {
      email: e.target.elements["email"].value,
      password: e.target.elements["password"].value,
    };

    // sending post request on /users/login
    fetch(baseUrl+"/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        let token = res.headers.get("x-auth");
        localStorage.setItem("x-auth", token);

        return res.json();
      })
      .then((result) => {
        if (result.success) {
          console.log(result.data);
          setUser(result.data);
          setIsLogin(true);
          window.location.replace("/movies");
        } else {
          console.log(result.message);
        }
      });
  };
  return (
    <div className="page">
      <div className="formSection">
        <h2 className="signupHeader">Log in!</h2>
        <form onSubmit={loginForm} className="signupForm">
          <input
            className="signupInput"
            defaultValue={userEmail}
            type="email"
            name="email"
            placeholder="Enter Email"
          />

          <input
            className="signupInput"
            type="password"
            name="password"
            placeholder="Enter Password"
          />

          <button type="submit" className="signupBtn">
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}
