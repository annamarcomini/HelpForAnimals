import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import logo from "../../assets/logo.svg"
import { useMutation } from "react-query"
import api from "../../services/api"
import "./styles.css"

export default function NewIncident() {
  const ongId = localStorage.getItem("ongId")

  const registerMutation = useMutation(
  (newIncident) =>
    api.post("/incidents", newIncident, {
      headers: {
        Authorization: ongId,
      },
    }),
  {
    onSuccess: (data) => {
      console.log("Incident created:", data);
    },
    onError: (error) => {
      console.error("Error creating incident:", error);
    },
  }
);
  

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted');
  
  const formData = new FormData(e.target);
  const newIncident = Object.fromEntries(formData.entries());
  console.log('New incident data:', newIncident);
  
  try {
    const result = await registerMutation.mutateAsync(newIncident);
    console.log('Mutation result:', result);
    navigate("/profile");
  } catch (error) {
    console.error('Mutation error:', error);
  }
};

  return (
    <div className="new-incidents-container">
      <div className="content">
        <section>
          <img src={logo} alt="log" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso para encontar um herói para resolver isso.</p>

          <Link className="back-link" to={"/"}>
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Título do caso" />

          <textarea name="description" placeholder="Descrição detalhada" />
          <input name="value" placeholder="Valor em reais" />
          
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
