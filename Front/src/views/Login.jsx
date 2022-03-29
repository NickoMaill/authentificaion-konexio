import { useState } from "react"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
        <span>email</span>
        <input onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="exemple@mesmails.com" />
        <span>Mot de passe</span>
        <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="****" />
        <button onClick={login}>Se connecter</button>
      </div>
    </div>
  )
}