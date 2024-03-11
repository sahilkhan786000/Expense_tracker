import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Typography, Box, InputBase, Button } from '@mui/material';

export default function Sum() {
    const [transactionItems, setTransactionItems] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const onValueChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startdate') {
            setStartDate(value);
        } else if (name === 'enddate') {
            setEndDate(value);
        }
    };
    console.log(startDate.type);
    console.log(endDate);
 
    function convertDate(dateString) {
        // Split the date string into components (month, day, year)
        const [month, day, year] = dateString.split('/');
        // Create a Date object with padded month and day (optional for some browsers)
        const paddedDate = new Date(year, month - 1, day.padStart(2, '0'));
        // Format the date in ISO 8601 format with time and timezone
        return paddedDate.toISOString();
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://expense-tracker-h2n5.onrender.com/transactions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch transactions: ${response.status}`);
            }

            const data = await response.json();
            setTransactionItems(data);

            const formattedStartDate = convertDate(startDate);
            const formattedEndDate = convertDate(endDate);

            let tempTotalIncome = 0;
            let tempTotalExpense = 0;

            data.forEach((item) => {
                const itemDate = new Date(item.date);
                if (itemDate >= new Date(formattedStartDate) && itemDate <= new Date(formattedEndDate)) {
                    tempTotalIncome += parseInt(item.income);
                    tempTotalExpense += parseInt(item.expense);
                }
            });

            

            const tempTotalBalance = tempTotalIncome - tempTotalExpense;

            setTotalIncome(tempTotalIncome);
            setTotalExpense(tempTotalExpense);
            setTotalBalance(tempTotalBalance);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            // Handle errors gracefully, e.g., display an error message to the user
        }
    };

    return (
        <>
            <Box>
                <Header />
            </Box>
        <Box sx={{ mt: 10, ml: 5, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box sx={{ mt: 10, ml: 5 }}>
                <Box>
                    <Typography variant="body2">Start Date</Typography>
                    <InputBase
                        placeholder="Start Date"
                        name="startdate"
                        onChange={(e) => onValueChange(e)}
                        value={startDate}
                    />
                </Box>

                <Box>
                    <Typography variant="body2">End Date</Typography>
                    <InputBase
                        placeholder="End Date"
                        name="enddate"
                        onChange={(e) => onValueChange(e)}
                        value={endDate}
                    />
                </Box>

                </Box>


                
                <Box sx={{ mt: 10, ml: 5 }}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
                

                </Box>

    <div className='container mt-5 d-flex justify-content-center align-items-center'>
    <div className="card mt-3" style={{ width: "25rem", maxHeight: "400px"  }}>
    <div className="card-body">
      <h5 className="card-title">
        {'SUMMARY'} 
      </h5>
      <hr />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Total Expense: {totalExpense} Rs 
        </li>
        <li className="list-group-item">
          Income: {totalIncome} Rs
        </li>
        <li className="list-group-item">
          Total Saving: {totalBalance} Rs
        </li>

        <li className="list-group-item ">
         start date: {startDate}
        </li>
        <li className="list-group-item">
        end date: {endDate}
        </li>
        
      </ul>
    </div>
  </div>
  </div>
                


            <Box sx={{ mt: 10, ml: 5 }}>
                <Footer />
            </Box>
        </>
    );
}
