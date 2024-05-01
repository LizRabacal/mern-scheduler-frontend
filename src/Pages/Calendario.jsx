import React, { useContext, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import pt, { ptBR } from "date-fns/locale/pt-BR";
import { useState } from 'react';
import moment from "moment";
import { useDisclosure, Button } from '@chakra-ui/react'
import EventsContext from '../Contexts/EventContext';
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventActions from "../Components/EventActions";
import Loader from "../Components/Loader";
import axios from "axios";



const locales = {
    ptBR: ptBR,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const messages = {
    allDay: 'Dia Inteiro',
    previous: '<',
    next: '>',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    showMore: (total) => `+ (${total}) Eventos`,
}







function Calendario() {


    const { events, setEvents } = useContext(EventsContext);
    const [date, setDate] = useState(null);
    const [end, setEnd] = useState(null);
    const [feriados, setFeriados] = useState([]);
    const [showInfo, setShowInfo] = useState(({
        title: '',
        start: new Date(),
        end: new Date(),
        tags: null,
        desc: ''
    }));
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
    const cancelRef = React.useRef()
    const cancelRef2 = React.useRef()
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);




    useEffect(() => {

        //Chamada de api para pegar os feriados nacionais
        const fetchData = async () => {
            try {
                const response = await axios.get('https://date.nager.at/api/v3/publicholidays/2024/BR');
                const holidaysData = response.data.map(element => ({
                    title: element.localName + " 🏖️",
                    start: moment(new Date(element.date)).add(1, "days").startOf('day').toDate(),
                    end: moment(new Date(element.date)).add(1, "days").endOf('day').toDate(),
                    isaholiday: true,
                    tags: "Feriado",
                    desc: "Feriado nacional"
                }));
                setFeriados(holidaysData);
            } catch (error) {
                console.error('Erro ao buscar feriados:', error);
            }
        };

        fetchData();
    }, []);



    const handleSelctSlot = (slotInfo) => {
        setUpdate(false);
        setDate(slotInfo.start);
        setEnd(slotInfo.end);
        onOpen();
    }

    const adicionartarefa = () =>{
        setUpdate(false);
        setDate(new Date());
        setEnd(new Date());
        onOpen();
    }



    const handleSelctEvent = (eventInfo) => {
        setShowInfo({
            title: eventInfo.title,
            start: eventInfo.start,
            end: eventInfo.end,
            tags: eventInfo.tags && eventInfo.tags.split(','),
            desc: eventInfo.desc,
            id: eventInfo.id,
            isaholiday: eventInfo.isaholiday
        });
        onOpen2();

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
        >

            <div className="adct" style={{width: "90%"}}>
                <Button colorScheme="purple" onClick={adicionartarefa}>Adicionar tarefa</Button>

            </div>

            {loading && <Loader />}

            <Calendar
                defaultDate={new Date()}
                defaultView="month"
                localizer={localizer}
                messages={messages}
                culture='ptBR'
                selectable={true}
                events={feriados.concat(events)}
                onSelectSlot={handleSelctSlot}
                onSelectEvent={handleSelctEvent}
                startAccessor="start"
                slotPropGetter={

                    (event, start, end, isSelected) => {
                        let newStyle = {
                            cursor: 'pointer !important',
                            borderRadius: "0px",
                            border: "none"
                        };


                        return {
                            className: "",
                            style: newStyle
                        };
                    }


                }
                eventPropGetter={(event) => {
                    const backgroundColor = event.isaholiday ? "transparent" : event.cor;
                    const color = event.isaholiday && "grey";
                    const textAlign = event.isaholiday && "center"
                    const width = '100%';
                    return { style: { backgroundColor, width, color, textAlign } }
                }}
                endAccessor="end"
                style={{ width: '90%', height: '730px', marginTop: '1%' }}

            />




            <EventActions
                update={update}
                setUpdate={setUpdate}
                setDate={setDate}
                date={date}
                setEnd={setEnd}
                end={end}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                isOpen2={isOpen2}
                onClose2={onClose2}
                onOpen2={onOpen2}
                cancelRef={cancelRef}
                cancelRef2={cancelRef2}
                loading={loading}
                setLoading={setLoading}

            />

        </div>



    )

}

export default Calendario