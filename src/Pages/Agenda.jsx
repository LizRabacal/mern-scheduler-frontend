import { useContext, useState } from "react";
import Eventos from '../Components/Eventos'
import EventsContext from '../Contexts/EventContext';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BsFillSearchHeartFill } from "react-icons/bs";
import Footer from "../Components/Footer"
import { FaSearch } from "react-icons/fa";


const Agenda = () => {
  const { events, setEvents } = useContext(EventsContext);

  const [searchTerm, setSearchTerm] = useState('');



  const filteredEventos = events.filter((evento) =>

    evento.title.toLowerCase().includes(searchTerm.toLowerCase())
  );




  return (
    <>
      <div id="agenda" style={{ width: '100%' }}>

        <InputGroup width='90%' marginBottom={15}>
          <InputLeftElement pointerEvents='none'>
            <FaSearch size={25} color='#5885E0' />
          </InputLeftElement>
          <Input type='text' size='lg' border='4px solid #5885E0' variant='filled' onChange={(e) => setSearchTerm(e.target.value)} placeholder='Pesquisar tarefa' />
        </InputGroup>


        <div className="divage" style={{ width: '90%' }}>

          {filteredEventos && filteredEventos.map((e, i) => (

            <Eventos key={i} title={e.title} start={e.start} end={e.end} desc={e.desc} tags={e.tags} color={e.cor} id={e.id} />



          )

          )}



        </div>

      </div>

    </>
  )
}

export default Agenda