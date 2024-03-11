import { useState } from 'react';
import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';


const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
}



const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }`;


const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;


const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const CreateButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`

 const Compose = ({ openDialog, setOpenDialog }) => {
    const [data, setData] = useState({});

    function formatDate(date) {
        const newDate = new Date(date); // Create a new Date object
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Zero-pad month
        const day = String(newDate.getDate()).padStart(2, '0'); // Zero-pad day
      
        return `${year}-${month}-${day}`; // Return formatted date
      }
    
  
    const createTransaction = async (e) => {
        e.preventDefault();

        if(data.income === "" || data.expense === "" ){
            return alert("Please fill all the fields");
        }

        const payload = {
            firstname : data.firstname,
            lastname : data.lastname,
            email : data.email ,
            income : data.income,
            expense : data.expense,
            date: formatDate(data.date)
           
        }

        try {
            const response = await fetch('http://localhost:5000/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
        
            if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
            }
        
            const responseData = await response.json();
            console.log('Transaction saved:', responseData); // Log response for debugging
        
            setOpenDialog(false);
            setData({});
          } catch (error) {
            console.error('Error saving transaction:', error);
            // Display an error message to the user (optional)
          }
     }

     const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

   const closeCompose = (e) => {
        e.preventDefault();

        const payload = {
            firstname : data.firstname,
            lastname : data.lastname,
            email : data.email ,
            income : data.income,
            expense : data.expense,
            date: formatDate(data.date)
        }

     

       
    setOpenDialog(false);
    }

    return (
        <Dialog
            open={openDialog}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeCompose(e)} />
                
            </Header>
            <RecipientWrapper>

                <Box>
                <Typography variant="body2">First Name</Typography>
                <InputBase placeholder='First Name' name="firstname" onChange={(e) => onValueChange(e)} value={data.firstname} />
                </Box>

                <Box>
                <Typography variant="body2">Last Name</Typography>
                <InputBase placeholder='Last Name' name="lastname" onChange={(e) => onValueChange(e)} value={data.lastname} />
                </Box>
                <Box>
                <Typography variant="body2">Email</Typography>
                <InputBase placeholder='Email' name="email" onChange={(e) => onValueChange(e)} value={data.email} />
                </Box>

                <Box>
                    <Typography variant="body2">Income</Typography>
                    <InputBase placeholder='Income' name="income" onChange={(e) => onValueChange(e)} value={data.income} />
                </Box>

                <Box>
                    <Typography variant="body2">Expense</Typography>
                    <InputBase placeholder='Expense' name="expense" onChange={(e) => onValueChange(e)} value={data.expense} />
                </Box>

                <Box>
                    <Typography variant="body2">Date</Typography>
                    <InputBase placeholder='Date' name="date" onChange={(e) => onValueChange(e)} value={data.date} />
                </Box>
    
            </RecipientWrapper>
           
            <Footer>
                <CreateButton onClick={(e) => createTransaction(e)}>Create</CreateButton>
                <DeleteOutline onClick={() => setOpenDialog(false)} />
            </Footer>
        </Dialog>
    )
}

export default Compose;