import React from "react"
import { useMutation } from "react-query"
import api from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import { FiLogIn } from "react-icons/fi"
import "./styles.css"
import heroes from "../../assets/heroes.png"
import logo from "../../assets/logo.svg"

export default function Login() {
  const registerMutation = useMutation((sessionData) =>
    api.post("/sessions", sessionData)
  )
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const sessionData = Object.fromEntries(formData.entries())
     console.log(sessionData)

    try {
      sessionData.ong_id = sessionData.id

      const response = await registerMutation.mutateAsync(sessionData)
      console.log(response)
      localStorage.setItem("ongId", response.data.id);
      localStorage.setItem("ongName", response.data.name)

  
      
      navigate("/profile")
    } catch (error) {
      // Tratar erros, se necessário
      console.error(error)
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="log" />

        <form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          {/* Adicione um campo de input para o ID */}
          <input name="id" placeholder="Sua ID" type="text" />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to={"/register"}>
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroes} alt="heroes" />
    </div>
  )
}
