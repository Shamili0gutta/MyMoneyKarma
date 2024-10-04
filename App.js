import React, { useState } from 'react';
import axios from 'axios';
const App = () => {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [savings, setSavings] = useState('');
    const [advice, setAdvice] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/financial-data', {
                income: parseFloat(income),
                expenses: parseFloat(expenses),
                savings: parseFloat(savings),
            });
            setAdvice(response.data.advice.join(' '));
        } 
        catch (error) {
            console.error('Error saving data', error);
        }
    };
    return (
    <div>
        <h1>Financial Dashboard</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Income:</label>
            <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
                />
        </div>
        <div>
            <label>Expenses:</label>
            <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Savings:</label>
            <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                required
            />
        </div>
        <button type="submit">Submit</button>
        </form>
    {advice && <div><h2>Advice:</h2><p>{advice}</p></div>}
    </div>
  );
};
export default App;