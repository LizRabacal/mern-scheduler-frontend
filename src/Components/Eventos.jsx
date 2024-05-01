import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Tag
} from '@chakra-ui/react'
import { TbCalendarClock } from "react-icons/tb";
import { FaClock } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import Functions from '../utils/Functions';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import api from '../services/api';



const Eventos = ({ title, start, end, desc, tags, color, id }) => {
    const { corAleatoria, formatarData } = Functions();

    const DeleteEvent = (id) =>{

        Swal.fire({
            title: "Deseja apagar o evento '" + title + "'?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, pode deletar!"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/${id}`);

                Swal.fire({
                    title: "Deletado!",
                    text: "O evento foi deletado.",
                    icon: "success"
                });
            }
        });


    }

    const tagss = tags && tags.split(',');
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}}>

            <Accordion allowMultiple width='100%'  >
                <AccordionItem id='acc' style={{ background: `${color}`, color: "white"}}  borderRadius={5} marginBottom={2} color='black'>
                    <h2>
                        <AccordionButton>
                            <Box as='span' style={{fontWeight: 'bold'}} flex='1' textAlign='left'>
                                {title}
                            </Box>
                            <Box as='span' flex='1' textAlign='left'>
                                {tagss && tagss.map((t, i) => (

                                    <Tag key={i} size='lg' marginRight={5} marginBottom={2} colorScheme='teal'>{t}</Tag>


                                )

                                )}
                            </Box>

                     
                            <AccordionIcon />
                        </AccordionButton>
                      
                    </h2>
                    <AccordionPanel pb={4}>
                        <div className="div" style={{ display: 'flex' }}>

                            {desc}
                        </div>

                        <div className="div" style={{ display: 'flex' }}>
                            <TbCalendarClock size={25} style={{ marginRight: '0.6%' }} />
                            {formatarData(start, end)}

                        </div>


                    </AccordionPanel>
                </AccordionItem>


            </Accordion>
            <Box as='span' display='flex' gap={2} >
                <button id='btn2' style={{background: '#a6a6a6', borderRadius: '90%', padding: '33%'}} onClick={() => DeleteEvent(id)}>
                    <RiDeleteBin6Fill color='white' size={24} />
                </button>
            </Box>


        </div>
    )
}

export default Eventos