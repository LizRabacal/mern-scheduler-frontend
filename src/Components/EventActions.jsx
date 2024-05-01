import React, { useContext } from "react";
import { useState, useEffect } from 'react';
import moment from "moment";
import { Input, Button, Text, InputGroup } from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    useDisclosure,
    AlertDialogContent,
    FormControl,
    FormLabel,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
    Textarea
} from '@chakra-ui/react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import api from "../services/api";
import EventsContext from '../Contexts/EventContext';
import { TbCalendarClock } from "react-icons/tb";
import { FaClock } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import Functions from '../utils/Functions';
import "react-big-calendar/lib/css/react-big-calendar.css";



const EventActions = ({ update, setUpdate, onClose, isOpen, cancelRef, cancelRef2, onClose2, isOpen2, onOpen, onOpen2, showInfo, date, setDate, end, setEnd, loading, setLoading }) => {

    const [tags, setTags] = useState(null);
    const [tag, setTag] = useState([]);
    const [desc, setDesc] = useState(null)
    const [title, setTitle] = useState(null);
    const [dataCerta, setDataCerta] = useState(new Date())
    const { corAleatoria, formatarData } = Functions();
    const formattedDate = (date) => {
         return new Date(new Date(date).getTime() - 3 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16);
    }
 



    const createEvent = () => {

        if(!title){
         alert("Adicione um título!")
        }

        if (title && date && end) {
            setLoading(true)

            const newEvent = {
                title: title,
                start: date,
                end: end,
                isaholiday: false,
                tags: tags && tags.join(','),
                desc: desc,
                cor: corAleatoria()

            };

            //chamada de api
            if (update) {
                api.put(`/${showInfo.id}`, newEvent).then(function (response) {
                    setLoading(false)
                });;

            } else {
                api.post('/', newEvent).then(function (response) {
                    setLoading(false)
                });

            }
            setTitle(null);
            setTag(null);
            setDesc(null);
            setTags([]);
            onClose();
        }

    }


    const DelEvent = (id) => {
        if (showInfo) {



            if (showInfo.id) {


                Swal.fire({
                    title: "Deseja apagar o evento '" + showInfo.title + "'?",
                    text: "Você não poderá reverter isso!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim, pode deletar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        api.delete(`/${id}`).then(function (response) {
                        });
                        Swal.fire({
                            title: "Deletado!",
                            text: "O evento foi deletado.",
                            icon: "success"
                        });
                    }
                });
              
                onClose2()

            }
        }
    }


    useEffect(() => {
        if (!update) {
            setTitle(null);
            setTag(null);
            setTags([]);
            setDesc(null);
        }
    }, [isOpen])





    const addTag = () => {
        if (tag) {
            setTags([...tags, tag])
        }

    }


    const delTag = (id) => {
        if (id != null) {
            const array = [...tags];
            array.splice(id, 1);
            setTags(array);
        }
    }


    const handleDateChange = (e) => {
          const selectedDateString = e.target.value;
        const selectedDateObject = new Date(selectedDateString);
        selectedDateObject.setHours(selectedDateObject.getHours());

        setDate(selectedDateObject);
    };


    const handleEndChange = (e) => {
        const selectedDateString = e.target.value;
        const selectedDateObject = new Date(selectedDateString);
        selectedDateObject.setHours(selectedDateObject.getHours());

        setEnd(selectedDateObject);
    };


    const handleUpdateEvent = () => {
        setUpdate(true);
        setTitle(showInfo.title);
        setDate(showInfo.start);
        setEnd(showInfo.end);
        setDesc(showInfo.desc);
        setTags(showInfo.tags);
        onClose2();
        onOpen();

    }



    return (
        <>


            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                size='lg'

            >



                <AlertDialogOverlay />

                <AlertDialogContent >

                    <AlertDialogHeader> {!update ? 'Criar nova tarefa' : 'Editar tarefa'}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>

                        {

                            update ? (<>


                                <FormControl isRequired>
                                    <FormLabel>Título</FormLabel>
                                    <Input defaultValue={showInfo.title} onChange={(e) => setTitle(e.target.value)} />

                                </FormControl>

                                <FormControl marginTop={2} isRequired>
                                    <FormLabel>Descrição</FormLabel>
                                    <Textarea defaultValue={showInfo.desc} onChange={(e) => setDesc(e.target.value)} />

                                </FormControl>

                                <FormControl marginTop={2} isRequired>
                                    <FormLabel>Início</FormLabel>

                                    <Input placeholder='Selecione a data e hora iniciais' size='md' type='datetime-local' onChange={handleDateChange} defaultValue={formattedDate(showInfo.start)} />
                                </FormControl>

                                <FormControl marginTop={2}>
                                    <FormLabel>Fim</FormLabel>

                                    <Input placeholder='Selecione a data e hora finais' size='md' type='datetime-local' onChange={handleEndChange} defaultValue={formattedDate(showInfo.end)} />
                                </FormControl>



                                <FormControl marginTop={2}>

                                    <FormLabel>Tags</FormLabel>
                                    <Input placeholder='Insira uma tag' onChange={(e) => setTag(e.target.value)} />


                                    <div style={{ marginTop: '2%', display: 'flex' }}>


                                        {tags && tags.map((t, i) =>

                                        (

                                            <Tag
                                                key={i}
                                                size='md'
                                                variant='solid'
                                                marginRight={3}
                                            >
                                                <TagLabel>{t}</TagLabel>
                                                <TagCloseButton onClick={() => delTag(i)} />
                                            </Tag>


                                        )



                                        )}



                                    </div>

                                    <Button size='sm' marginTop={2} onClick={addTag} colorScheme="blue">Adicionar</Button>
                                </FormControl>




                            </>) : (<>

                                <FormControl isRequired>
                                    <FormLabel>Título</FormLabel>
                                    <Input placeholder='Insira um título' onChange={(e) => setTitle(e.target.value)} />

                                </FormControl>

                                <FormControl marginTop={2} isRequired>
                                    <FormLabel>Descrição</FormLabel>
                                    <Textarea placeholder='Insira uma descrição' onChange={(e) => setDesc(e.target.value)} />

                                </FormControl>

                                <FormControl marginTop={2}>
                                    <FormLabel>Início</FormLabel>

                                        <Input placeholder='Selecione a data e hora iniciais' size='md' type='datetime-local' onChange={handleDateChange} value={formattedDate(date)}  />
                                </FormControl>

                                <FormControl marginTop={2}>
                                    <FormLabel>Fim</FormLabel>

                                        <Input placeholder='Selecione a data e hora finais' size='md' type='datetime-local' onChange={handleEndChange} value={formattedDate(end)} />
                                </FormControl>



                                <FormControl marginTop={2}>

                                    <FormLabel>Tags</FormLabel>
                                    <Input placeholder='Insira uma tag' onChange={(e) => setTag(e.target.value)} />


                                    <div style={{ marginTop: '2%', display: 'flex' }}>




                                        {tags && tags.map((t, i) =>

                                        (

                                            <Tag
                                                key={i}
                                                size='md'
                                                variant='solid'
                                                marginRight={3}
                                            >
                                                <TagLabel>{t}</TagLabel>
                                                <TagCloseButton onClick={() => delTag(i)} />
                                            </Tag>


                                        )

                                        )}



                                    </div>

                                    <Button size='sm' marginTop={2} onClick={addTag} colorScheme="blue">Adicionar</Button>


                                </FormControl>

                            </>)




                        }


                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={createEvent} colorScheme="green">
                            Enviar
                        </Button>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>





            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef2}
                onClose={onClose2}
                isOpen={isOpen2}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader></AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>

                        <div className="infos">


                            <div className="tt">
                                <p>{showInfo.title && showInfo.title}</p>
                            </div>
                            <div className="info">
                                <TbCalendarClock size={30} /> <p style={{ width: '80%' }}> {showInfo.start && formatarData(showInfo.start, showInfo.end)}</p>




                            </div>
                            <div className="info">
                                <FaClock size={27} />
                                <p>{Math.round((showInfo.end - showInfo.start) / (1000 * 60 * 60)) + ' hora(s)'}</p>
                            </div>
                            <div className="info">
                                <MdDescription size={30} />
                                <p style={{ width: '80%' }}>{showInfo.desc && showInfo.desc}</p>
                            </div>
                            <div className="inf" style={{ marginTop: '4%' }}>
                                <p>{showInfo.tags && (showInfo.tags[0] !== '') ? showInfo.tags.map((t, i) => (

                                    (

                                        <Tag
                                            key={i}
                                            size='lg'
                                            variant='solid'
                                            marginRight={3}
                                            marginTop={3}
                                        >
                                            <TagLabel>{t}</TagLabel>
                                        </Tag>


                                    )


                                )) : ''}</p>

                            </div>

                        </div>

                    </AlertDialogBody>
                    <AlertDialogFooter>
                        {!showInfo.isaholiday && (
                            <>

                                <Button id="btn" leftIcon={<RiDeleteBin6Fill />} style={{ marginRight: '2%' }} onClick={() => DelEvent(showInfo.id)}>Excluir</Button>

                                <Button id="btn" leftIcon={<FaEdit />} onClick={handleUpdateEvent}>Editar</Button>



                            </>
                        )}

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>





















        </>
    )
}

export default EventActions