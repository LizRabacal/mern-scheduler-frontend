import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { EventsProvider } from "./Contexts/EventContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <EventsProvider>

  <React.StrictMode>
    <ChakraProvider>

    <App />
    </ChakraProvider>

  </React.StrictMode>
  </EventsProvider>

)
