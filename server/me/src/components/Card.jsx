import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';

export default function Card(props) {

    const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true); // Set deleting state to provide visual feedback

    try {
      // Send DELETE request to API with card ID
      const response = await fetch('https://expense-tracker-yn48.onrender.com/delete', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: props.id
          })
      });

      if (response.ok) {
        // Successful deletion
        console.log('Card deleted successfully');
        // navigate('/'); 
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during deletion:', error);
      // Display error message to user (see below for implementation)
    } finally {
      setIsDeleting(false); // Reset deleting state
    }
  };

    // Function to format the date in YYYY-MM-DD format
function formatDate(date) {
    const newDate = new Date(date); // Create a new Date object
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Zero-pad month
    const day = String(newDate.getDate()).padStart(2, '0'); // Zero-pad day
  
    return `${year}-${month}-${day}`; // Return formatted date
  }

 
  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
    <div className="card-body">
      <h5 className="card-title">
        {props.firstname || 'Loading...'} {props.lastname || 'Loading...'} 
      </h5>
      <hr />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Email: {props.email || 'Loading...'}
        </li>
        {/* <li className="list-group-item">
          Last Name: {props.lastName || 'Loading...'}
        </li> */}
        <li className="list-group-item">
        Date: {props.date ? formatDate(props.date) : 'Loading...'}
        </li>
        <li className="list-group-item">
          Income: {props.income || 'Loading...'} Rs
        </li>
        <li className="list-group-item">
          Expense: {props.expense || 'Loading...'} Rs
        </li>
      </ul>
      <button
        className="btn btn-danger justify-center ms-2"
        disabled={isDeleting} // Disable button during deletion
        onClick={handleDelete}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    </div>
  </div>
  )
}