import { useEffect, useState } from 'react'
import './App.css'
import CatFactForm from './CatFactForm.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [facts, setFacts] = useState([])
  const [randFact, setRandomFact] = useState(null)

  const fetchFacts = () => {
    fetch("http://localhost:8000/catfacts")
      .then((res) => res.json())
      .then((data) => setFacts(data.facts))
      .catch((error) => console.error("Error fetching facts", error));
  }

  const fetchRandomFact = () => {
    fetch("http://localhost:8000/catfacts/random")
      .then((res) => res.json())
      .then((data) => setRandomFact(data.fact))
      .catch((error) => console.error("Error fetching random fact", error));
  }

  useEffect(() => {
    fetchFacts();
    fetchRandomFact();
  }, []);

  return (
    <>
      <h1>All Cat Facts</h1>
      <ul>
        <table>
          <thead>
            <tr>
              <th><label>ID</label></th>
              <th><label>Fact</label></th>
              <th><label>Created At</label></th>
            </tr>
          </thead>
        
          <tbody>
            {facts.map((fact) =>(
              <tr key={fact.id}>
                <td>{fact.id}</td>
                <td>{fact.fact}</td>
                <td>{fact.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
      <CatFactForm onFactAdded={fetchFacts}></CatFactForm>
      <h2>Here's a Random Cat Fact</h2>
      <p>{randFact}</p>
    </>
  )
}

export default App
