import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Compose from "../components/Compose";
import { Typography } from "@mui/material";
import {useNavigate } from "react-router-dom";
export default function Main() {
  const [search,setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const createTransaction = () => {
      setOpenDialog(true);
  }

  const navigate = useNavigate();
  const viewTransaction = () => {
    navigate("/view")
  }

  const viewSummary = () => {
    navigate("/sum")
  }

  return (
    <Box>
      <Box>
        <Header />
      </Box>
        

      <div className="m-1">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style = {{objectFit : "contain !important"}}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style = {{zIndex:"10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
               value = {search} onChange = {(e)=>{setSearch(e.target.value)}}/>
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900X700/?etherium"
              className="d-block w-100"
              style = {{filter : "brightness(30%"}}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900X700/?cryptocurrency"
              className="d-block w-100"
              style = {{filter : "brightness(30%"}}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900X700/?bitcoin"
              className="d-block w-100"
              style = {{filter : "brightness(30%"}}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      </div>
      {(!localStorage.getItem("authToken"))?
      <Box sx = {{display : "flex", justifyContent : "center", m : 8, p:2 , backgroundColor : "turquoise", borderRadius : "10px"}}>
        <Typography variant = "h3" sx={{  color : "white"}} > Welcome to Expense Tracker</Typography>
      </Box>
      :
      <Box sx= {{display : "flex", flexWrap : "wrap", justifyContent : "center" , m : 2, p : 2, gap : 5}}>
        <Button variant = "contained" sx = {{backgroundColor:"turquoise"}} onClick={() => createTransaction()}> Create Transaction</Button>
        <Compose openDialog = {openDialog} setOpenDialog = {setOpenDialog}/>

        <Button variant = "contained" sx = {{backgroundColor:"turquoise"}} onClick={() => viewTransaction()}> View Transaction</Button>

        <Button variant = "contained" sx = {{backgroundColor:"turquoise"}} onClick = {() => viewSummary()}> Summary </Button>
      </Box>
      }
      <Box>
        <Footer/>
      </Box>
    </Box>
  );
}