import { useState } from "react";

function Register({
  onRegisterSuccess,
  onLoginClick
}) {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const registerUser = async () => {
try {
const response = await fetch(
"http://localhost:8081/api/auth/register",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
name,
email,
password,
}),
}
);

 const result = await response.text();

if (result === "Email Already Registered") {

  const goToLogin = window.confirm(
    "Email already exists.\n\nClick OK to Login."
  );

  if (goToLogin) {
    onRegisterSuccess();
  }

  return;
}

alert(result);

if (result.includes("Successfully")) {
  onRegisterSuccess();
}

} catch (error) {
  console.error(error);
  alert("Registration Failed");
}


};

return ( <div className="auth-card"> <h2>Create Account</h2>

  <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

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

  <button onClick={registerUser}>
    Register
  </button>

  <p
  style={{
    marginTop: "15px",
    textAlign: "center"
  }}
>
  Already have an account?{" "}
  <span
    onClick={onLoginClick}
    style={{
      color: "#4f8cff",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Login
  </span>
</p>
</div>


);
}

export default Register;
