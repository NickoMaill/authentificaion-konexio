import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const history = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [dayBirth, setDayBirth] = useState(null);
  const [monthBirth, setMonthBirth] = useState("");
  const [yearBirth, setYearBirth] = useState(null);

  console.log(password);
  console.log(rePassword);

  const userRegister = (e) => {
    e.preventDefault();

    if (rePassword !== password) {
      return console.error("wrong match");
    }

    fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        surName,
        birthDate: {
          day: dayBirth,
          month: monthBirth,
          year: yearBirth,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        history.push("/login")
        console.log(res);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
        <span>email</span>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="exemple@mesmails.com"
        />
        <span>mot de passe</span>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="*****"
        />
        <span>confirmez mot de passe</span>
        <input
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
          type="password"
          placeholder="*****"
        />
        <span>Nom</span>
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="Doe"
        />
        <span>Prenom</span>
        <input
          onChange={(e) => {
            setSurName(e.target.value);
          }}
          type="text"
          placeholder="John"
        />
        <span>Date de naissance</span>
        <input
          onChange={(e) => {
            setDayBirth(parseInt(e.target.value));
          }}
          type="text"
          placeholder="jour"
        />
        <input
          onChange={(e) => {
            setMonthBirth(e.target.value);
          }}
          type="text"
          placeholder="mois"
        />
        <input
          onChange={(e) => {
            setYearBirth(parseInt(e.target.value));
          }}
          type="text"
          placeholder="année"
        />
        <button onClick={userRegister}>--- S'inscrire ---</button>
      </div>
    </div>
  );
}
