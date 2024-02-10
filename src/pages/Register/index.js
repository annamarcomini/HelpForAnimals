import React from "react"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import "./styles.css"
import api from "../../services/api"
import logo from "../../assets/logo.svg"

export default function Register() {
  const registerMutation = useMutation((newOngData) =>
    api.post("/ongs", newOngData)
  )
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const newOngData = Object.fromEntries(formData.entries())

    try {
      const response= await registerMutation.mutateAsync(newOngData)
      // Se a requisição for bem-sucedida, você pode redirecionar ou tomar outras ações
      alert(`Seu ID de acesso: ${response.data.id}`)
      navigate("/")
    } catch (error) {
      // Tratar erros, se necessário
      console.error(error)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="log" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            casos da sua ONG.
          </p>

          <Link className="back-link" to={"/"}>
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Nome da ONG" />
          <input name="email" type="email" placeholder="Seu E-mail" />
          <input name="whatsapp" placeholder="WhatsApp" />

          <div className="input-group">
            <input name="city" placeholder="Cidade" />
            <input name="uf" placeholder="UF" style={{ width: 80 }} />
          </div>

          <button
            className="button"
            type="submit"
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
