import { useEffect, useState } from "react"

export default function Admin() {

  const [users, setUsers] = useState([])
  const [isloaded, setIsLoaded] = useState(false)
  const date = new Date()
  const year = date.getFullYear()

  useEffect(() => {
    fetch('http://localhost:8000/user/', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setUsers(res)
        setIsLoaded(true)
      })
  }, [])

  console.log(users);

  return (
    <div>
      <h1>Admin</h1>
      <ul>
        {isloaded && users.users.map((user, i) => {
          return <li key={i}>{user.firstName} {user.surName} {year - user.birthDate.year - 1} ans</li>
        })}

      </ul>

    </div>
  )
}