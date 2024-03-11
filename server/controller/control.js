import User from "../modals/user.js";
import Transaction from "../modals/transaction.js";
import {validationResult} from 'express-validator';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSecret = "Mynameissahilkhan";

export const addUser = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securePasswd = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phone: req.body.phone,
          email: req.body.email,
          password: securePasswd,
          city: req.body.city   
        });
  
        res.json({ success: true });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    } 

export const loginUser = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    let email = req.body.email;
    try {
      let userdata = await User.findOne({email});
      if (!userdata) {
        return res.status(400).json({ errors: "Try " });
      }

      const pwdCompare = await bcrypt.compare(req.body.password , userdata.password)
     

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Try " });
      }

      const data = {
        user:{
            id:userdata.id
        }

      }


      const authToken = jwt.sign(data,jwtSecret)

      return res.json({ success: true, authToken : authToken})
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }

}

export const addTransactions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const transactions = await new Transaction(req.body);
        transactions.save();

        res.status(200).json('Transaction saved successfully');
    } catch (error) {
        res.status(500).json(error.message);
    }
}


export const getTransactions = async (req, res) => {
    try {
        let transactions;
        transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


export const deleteTransactions = async (req, res) => {
  try {
    const id  = req.body.id; 
    await Transaction.deleteOne({ _id: id }); // Delete only the specific transaction
    res.status(200).json(`Transaction deleted successfully, ${id}`);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json(error.message);
  }
}

export const deleteAllTransactions = async (req, res) => {
  
  try {
    await Transaction.deleteMany({}); // Delete all transactions
    res.status(200).json('All transactions deleted successfully');
  } catch (error) {
    console.error('Error deleting transactions:', error);
  }
  }


export const summaryTransactions = async (req, res) => {
  // try{
  //   let transactions;
  //       transactions = await Transaction.find();
  //       let response = JSON.stringify(transactions);
       
  //      console.log(response);
  //   // res.status(200).json(transactions);
  //   // res.json({message: 'fetch to hua'});
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'gadjhg' });
  // }
    try {
      const  startDate =  req.body.startdate;
      const endDate  = req.body.enddate; // Extract query parameters for date range
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Missing required query parameters: startDate and endDate' });
      }
  
      const validStartDate = new Date(startDate); // Validate start date format
      const validEndDate = new Date(endDate);   // Validate end date format
  
      if (isNaN(validStartDate.getTime()) || isNaN(validEndDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
      }
      try{
        
        let matrix = [];
        for(let i = 0; i < 12; i++) {
            matrix.push([]);
        }
        let totalExpense = 0;
        let totalIncome = 0;
        let transactions;
        transactions = await Transaction.find();
        transactions.map ((item) => {
            if (item.date >= validStartDate && item.date <= validEndDate) {
                matrix[item.date.getMonth()].push(item);
            }
        })
        
        for (let i = 0; i < 12; i++) {
            if (matrix[i].length > 0) {
              totalIncome += matrix[0][0].income;
              for(let j = 0; j < matrix[i].length; j++) {
                totalExpense += matrix[i][j].expense;
              }
            }
        }
        let totalBalance = totalIncome - totalExpense;
        res.status(200).json({ summary: { totalIncome, totalExpense, totalBalance } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'andefr' });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

