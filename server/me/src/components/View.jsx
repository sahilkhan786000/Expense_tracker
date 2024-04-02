import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Card from "./Card"
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
export default function View() {

    const deleteTransaction = async () => {
        try {
            const response = await fetch('https://expense-tracker-yn48.onrender.com/deleteAll', {
                method: "DELETE",       
            });

            if (!response.ok) {
                throw new Error(`Failed to delete transaction: ${response.status}`);


            }

            const data = await response.json();
            console.log(data);

            
        } catch (error) {
            
        }
        }
    


  const [transactionItems, setTransactionItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("https://expense-tracker-h2n5.onrender.com/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status}`);
      }

      const data = await response.json();
      setTransactionItems(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    loadData();
  }, [transactionItems]);


  return (
    <>
       <Box>
       <Header/>
       </Box>

        <Box sx = {{mt : 10, ml : 5}}>
        {transactionItems.length > 0 ? (
            <>
          <Box sx={{  display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {transactionItems.map((item) => (
              <Card id={item._id} firstname={item.firstname} lastname={item.lastname} email={item.email} income={item.income} expense={item.expense} date={item.date} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant = "contained" sx = {{backgroundColor:"turquoise"}} onClick={() => deleteTransaction()}> Delete All Transaction</Button>
          </Box>
          </>
        ) : (
          <p>No Transaction available.</p> 
        )}
      </Box>
           
      

 
       <Box sx= {{mt : 10, ml : 5}}>
       <Footer/>
       </Box>
    </>

  )
        }
