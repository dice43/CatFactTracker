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
      <h2>Submit a Cat Fact</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fact}
          onChange={(e) => setFact(e.target.value)}
          placeholder="Type your cat fact here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CatFactForm;