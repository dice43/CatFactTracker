import { useState } from 'react'

function CatFactForm({addedFact}) {
    const [fact, setFact] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!fact.trim()){
            setMessage("Fact can't be empty")
            return;
        }

        const formFact = FormFact();
        formFact.append("fact", fact)

        try {
            const response = await fetch("localhost:8000/catfacts", {
                method: "POST",
                body: formFact,
            });

            const data = await response.json();
            if(data.error){
                setMessage(data.error)
            }
            else{
                setMessage("Cat fact was added.")
                setFact("")
                addedFact();
            }
        }
        catch (error){
            setMessage("Insertion of cat fact failed.")
        }
    };


    return (
        <div>
            <h2>Submit a cat fact below</h2>
            {message}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={fact}
                    onChange={(e) => setFact(e.target.value)}
                    placeholder='Enter a cat fact here.'
                    required>
                </input>
                <button type='submit'>Enter</button>
            </form>
        </div>
    );
}

export default CatFactForm;