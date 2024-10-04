const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/financialDashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const financialDataSchema = new mongoose.Schema({
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    savings: { type: Number, required: true },
});
const FinancialData = mongoose.model('FinancialData', financialDataSchema);
app.post('/api/financial-data', async (req, res) => {
    const { income, expenses, savings } = req.body;
    const financialData = new FinancialData({ income, expenses, savings });
    await financialData.save();
    let advice = [];
    if (savings < 0.1 * income) {
        advice.push('Consider saving more, aim for at least 10% of your income.');
    }
    if (expenses > 0.8 * income) {
        advice.push('Try to cut down on discretionary spending.');
    }
    res.json({ message: 'Data saved successfully!', advice });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});