import { useState } from "react";

function CatFactForm({ onFactAdded }) {
  const [fact, setFact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fact.trim()) {
      setMessage("Empty fact");
      return;
    }

    const formData = new FormData();
    formData.append("fact", fact);

    try {
      const response = await fetch("http://localhost:8000/catfacts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Fact was added!");
        setFact("");
        onFactAdded(); 
      } 
      else {
        console.error("Error: ", data);
        setMessage(data.detail || "Error");
      }
    } catch (error) {
      console.error("Error submitting fact:", error);
      setMessage("Error submitting fact");
    }
  };

  return (
    <div>
      <header>
        <h1 class="text-6xl font-outfit font-bold">Submit a <span class="text-purple-500">Cat Fact</span></h1> 
      </header>
      {message && <p>{message}</p>}
      <form class="flex gap-2 items-center justify-center"onSubmit={handleSubmit}>
        <input
          type="text"
          value={fact}
          onChange={(e) => setFact(e.target.value)}
          placeholder="Type your cat fact here..."
          required
          class="bg-gray-200 text-2xl"
        />
        <button class="bg-purple-500" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CatFactForm;