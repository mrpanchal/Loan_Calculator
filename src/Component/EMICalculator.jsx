import "./EMICalculator.css";
import LoanJS from "loanjs";
import { useState } from "react";

const LoanCalculator = () => {
    const [values, setValues] = useState({
      "amount": 0,
      "term": 0,
      "interest": 0,
    });
    const [installments, setInstallments] = useState([]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({ ...values, [name]: value })
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    calculate(values["amount"], values["term"], values["interest"]);
  };

  const calculate = (amount, years, rate) => {
    const loan = new LoanJS.Loan(amount, years * 12, rate);

    setInstallments(loan.installments);
    console.log(installments);
  }; 

  const amountFormat = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR"
    }).format(amount);

  return (
    <div className="loan-calculator-container">
      <h1>Loan Calculator</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="amount">Loan Amount</label>
          <div className="form-input">
            <input
              type="number"
              name="amount"
              placeholder="0"
              value={values["amount"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="interest">Interest Rate</label>
          <div className="form-input">
            <input
              type="number"
              name="interest"
              placeholder="0"
              value={values["interest"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="term">Years</label>
          <div className="form-input">
            <input
              type="number"
              name="term"
              placeholder="0"
              value={values["term"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-action">
          <input
            type="submit"
            value="Calculate"
            className="calculate-button"
          ></input>
        </div>
      </form>

      {!!installments?.length && (
        
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>EMI Amount</th>
              <th>Interest</th>
              <th>Principal</th>
              <th>Balance Amount</th>
            </tr>
          </thead>

          <tbody>
            {installments.map((month, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{amountFormat(month.installment)}</td>
                <td>{amountFormat(month.interest)}</td>
                <td>{amountFormat(month.capital)}</td>
                <td>{amountFormat(month.remain)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LoanCalculator;