import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, [])

  async function handleAddRepository() {
    const repo = {
      title: `Repositório ${Date.now()}`,
      url: "https://github.com/carlossantosdev",
      techs: ["NodeJS", "ReactJS"]
    }
    
    api.post('repositories', repo).then(response => setRepositories([...repositories, response.data]))
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      // O que está comentado funciona na aplicação mas não funciona para os testes.. porque ?
      // const repositoryIndex = repositories.findIndex(repository => repository.id === id)
      // repositories.splice(repositoryIndex, 1)
      // setRepositories(repositories)
      setRepositories(repositories.filter((repository) => repository.id !== id));
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
