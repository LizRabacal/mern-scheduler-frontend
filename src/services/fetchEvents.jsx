import EventsContext from '../Contexts/EventContext';
import React, { useContext } from "react";
import api from "./api";


const fetchEvents = (setEvents) => {

    api.get('/')
        .then(function (response) {
            const eventos = response.data.map((res) => ({
                title: res.title,
                start: new Date(res.start),
                end: new Date(res.end),
                desc: res.desc,
                tags: res.tags,
                id: res._id,
                isaholiday: res.isaholiday,
                cor: res.cor
            }));

            setEvents(eventos);
        })
        .catch(function (error) {
            console.error(error);
        });
};

export default fetchEvents;
