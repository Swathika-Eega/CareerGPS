import { useState } from "react";

function Login({ onLoginSuccess }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const loginUser = async () => {
try {
const response = await fetch(
"http://localhost:8081/api/auth/login",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
email,
password,
}),
}
);


  const result = await response.text();

  if (result.includes("Successful")) {
    alert("Login Successful");

    localStorage.setItem(
  "userName",
  email
);

localStorage.setItem(
  "userEmail",
  email
);

onLoginSuccess();
  } else {
    alert(result);
  }
} catch (error) {
  console.error(error);
  alert("Login Failed");
}


};

return ( <div className="auth-card"> <h2>Login</h2>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button onClick={loginUser}>
    Login
  </button>
</div>

);
}

export default Login;
