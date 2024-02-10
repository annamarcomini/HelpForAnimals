import { React, useEffect } from "react"
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.svg"
import { FiPower, FiTrash2 } from "react-icons/fi"
import { useQuery, useMutation, useQueryClient } from "react-query"
import api from "../../services/api"
import "./styles.css"

export default function Profile() {
  const ongName = localStorage.getItem("ongName")
  const ongId = localStorage.getItem("ongId")
  const queryClient = useQueryClient()

  const { data: incidents } = useQuery(["incidents"], () => {
    return api
      .get("/profile", {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => response.data)
  })

  const deleteIncident = useMutation(
    (incidentId) =>
      api.delete(`/incidents/${incidentId}`, {
        headers: {
          Authorization: ongId,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["incidents"] })
      },
    }
  )

  const handleDelete = (incidentId) => {
    {
      deleteIncident.mutate(incidentId)
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={Logo} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/NewIncident">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents ? (
          incidents.map((incident) => (
            <li key={incident.id}>
              {/* key obrigatorio */}
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(incident.value)}
              </p>

              <button onClick={() => handleDelete(incident.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  )
}
