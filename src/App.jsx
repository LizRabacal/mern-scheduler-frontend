import Calendario from "./Pages/Calendario"
import React, { Component, useContext, useEffect } from "react";
import NavBar from "./Components/Navbar"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import EventsContext from './Contexts/EventContext';
import axios from 'axios';
import moment from "moment";
import api from './services/api'
import fetchEvents from "./services/fetchEvents";
import Agenda from "./Pages/Agenda";
import Footer from "./Components/Footer";
import Sobre from "./Pages/Sobre";

function App() {
  const { events, setEvents } = useContext(EventsContext);
  const newEvents = [];


  useEffect(() => {



    //chamada de api para pegar os feriados nacionais e mandar para o back e para o banc0
   /*  axios.get('https://date.nager.at/api/v3/publicholidays/2024/BR')
      .then(function (response) {
        response.data.forEach(element => {
          const Feriado = {
            title: element.localName,
            start: moment(new Date(element.date)).add(1, "days").toDate(),
            end: moment(new Date(element.date)).add(1, "hours").toDate(),
            isaholiday: true,

          }
          api.post('/', Feriado)


        });

      })
      .catch(function (error) {
        console.log(error);
      }) */



    //chamada de api q pega os registros de evento no banco de dados 
  /*   axios.get('http://localhost:5000/event').then(function (response) {
      const eventos = response.data.map((res) =>
      ({
        title: res.title,
        start: new Date(res.start),
        end: new Date(res.end),
        desc: res.desc,
        tags: res.tags,
        id: res._id,
        isaholiday: res.isaholiday,
        cor: res.cor



      })
      )

      setEvents(eventos);

    }
    ).catch(function (error) {
      console.error(error);
    });
 */



    fetchEvents(setEvents);


  }, [])



  useEffect(() => {
    fetchEvents(setEvents);
  }, [events]);









  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path='/' element={<Calendario />} />
          <Route path='/Agenda' element={<Agenda />} />
        </Routes>
        

      </BrowserRouter>
      <Footer />


    </>
  )
}

export default App
