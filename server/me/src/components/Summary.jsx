import React, { useEffect, useState  } from 'react'
import Header from './Header'
import Footer from './Footer'

import { Typography, Box, InputBase, Button } from '@mui/material'; 



export default function Summary() {
   
  const [credential, setCredential] = useState({});
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
    
  const onValueChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
}

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://expense-tracker-yn48.onrender.com/transactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          }
         
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      let startdate = "1/1/2024";
      let enddate = "12/12/2024";
      if (!startdate || !enddate) {
        // return res.status(400).json({ message: 'Missing required query parameters: startDate and endDate' });
        alert('Missing required query parameters: startDate and endDate');
      }
  
      const validStartDate = new Date(startdate); // Validate start date format
      const validEndDate = new Date(enddate);   // Validate end date format
  
      if (isNaN(validStartDate.getTime()) || isNaN(validEndDate.getTime())) {
        // return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
        alert('Invalid date format. Use YYYY-MM-DD');
      }
      try{
        
        let matrix = [];
        for(let i = 0; i < 12; i++) {
            matrix.push([]);
        }
        var Expense = 0;
        var Income = 0;
        // let transactions;
        // transactions = await Transaction.find();
        data.map ((item) => {
            if (item.date >= validStartDate && item.date <= validEndDate) {
                matrix[item.date.getMonth()].push(item);
            }
        }, this);
        
        for (let i = 0; i < 12; i++) {
            if (matrix[i].length > 0) {
              Income += matrix[0][0].income;
              for(let j = 0; j < matrix[i].length; j++) {
                 Expense += matrix[i][j].expense;
              }
            }
        }
     

        var Balance = Income - Expense;

        setTotalExpense(Expense);
        setTotalIncome(Income);
        setTotalBalance(Balance);
      
    } catch (error) {
      console.error("Error fetching transactions:", error);
      
    }







      
      
      
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };



  return (
    <>
       <Box>

       <Header/>

       </Box>
       

       
        <Box  sx = {{mt : 10, ml : 5}}>
        <Box>
                <Typography variant="body2">Start Date</Typography>
                <InputBase placeholder=' Start Date' name="startdate" onChange={(e) => onValueChange(e)} value={credential.startdate} />
                

                </Box>
                {console.log(credential.startdate)}
                <Box>
                <Typography variant="body2">End Date</Typography>
                <InputBase placeholder=' End Date' name="enddate" onChange={(e) => onValueChange(e)} value={credential.enddate} />
             
                </Box>

                <Box>
                <Button
                variant="contained"
                onClick={handleSubmit}
                >
                Submit
                </Button>

        </Box>
       
      </Box>
       
      <Box sx= {{p:2}}>
            <Typography variant="h4"> Summary </Typography>
            <hr></hr>

            <Typography variant="h6"> Total Expense:{setTotalExpense(totalExpense)} </Typography>
            <Typography variant="h6"> Total Income: {totalIncome} </Typography>
            <Typography variant="h6"> Total Saving: {totalBalance} </Typography>

        </Box>
 
       <Box sx= {{mt : 10, ml : 5}}>
       <Footer/>
       </Box>
</>

  )
}
