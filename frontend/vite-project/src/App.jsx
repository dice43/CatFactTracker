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
      <div class="min-h-screen flex flex-col text-black p-8 mt-25">
        <div class="max-w-3xl mx-auto p-4 flex flex-col justify-between font-outfit">
          <header class="">
            <h2 class="text-6xl font-outfit font-bold">Random <span class="text-purple-500">Cat Facts</span></h2>
            <h4 class="text-1xl font-outfit text-gray-600 font-bold">Here's the random <span class="text-purple-500">cat fact</span> of the day!</h4>
          </header>
          <div class="m-8 bg-gray-200 rounded-xl">
            <p>{randFact}</p>
          </div>

          <header>
            <h1 class="text-7xl font-outfit font-bold">Let's track some <span class="text-purple-500">Cat Facts</span></h1> 
          </header>
          <div class="w-full mt-12 bg-gray-200 rounded-xl">
            <div class="m-4 p-auto">
              <h1 class="text-2xl">All Cat Facts</h1>
            </div>
            <ul>
                <table class="table-auto w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="border-t border-gray-400"><label>ID</label></th>
                      <th class="border-t border-gray-400"><label>Fact</label></th>
                      <th class="border-t border-gray-400"><label>Created At</label></th>
                    </tr>
                  </thead>
        
                <tbody className="space-y-5">
                  {facts.map((fact) =>(
                    <tr key={fact.id}>
                      <td class="border-t border-gray-400">{fact.id}</td>
                      <td class="border-t border-gray-400">{fact.fact}</td>
                      <td class="border-t border-gray-400">{fact.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ul>
          </div>

          <div class="mt-12">
            <CatFactForm onFactAdded={fetchFacts}></CatFactForm>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
