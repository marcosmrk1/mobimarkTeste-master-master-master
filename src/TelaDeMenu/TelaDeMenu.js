import React from 'react'
import {
    Box, TextField, Margin, Container, Typography, Checkbox, Select,
    ListItemText, FormControl, MenuItem, InputLabel,
    OutlinedInput, Card, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery,
    CircularProgress,
    ImageList,

}
    from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import fotoDoMarcos from '../FotosGerais/marcosPaulo.png'
import EmailIcon from '@mui/icons-material/Email';
const TelaDeMenu = () => {
    return (
        <>
            <Card>
                <Typography variant="p" style={{
                    fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                    fontWeight: "bold", color: "#325d87", marginLeft: '12px'
                }}> sobre mim </Typography>
            </Card>
            <Container>
                <Card sx={{ marginTop: '12px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography sx={{
                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "29px",
                            fontWeight: "bold", color: "#325d87", textAlign: 'center'
                        }}> Sobre mim </Typography>
                        <Typography sx={{
                            marginTop: '20px', textAlign: 'left',
                            fontFamily: "sans-serif",
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}>
                            Meu nome é Marcos Paulo, tenho 19 anos e atualmente sou estagiário de front-end na Mobimark.
                            Sou apaixonado por programação e busco aprimorar minhas habilidades diariamente.
                            Estou cursando Análise e Desenvolvimento de Sistemas na faculdade e prevejo concluir o curso até o final de 2023.
                            Busco me tornar um profissional cada vez mais qualificado para agregar valor à equipe e ao mercado de trabalho.
                            Estou sempre aprendendo sobre os problemas reais e suas soluções,
                            praticando o uso de clean code e dominando cada vez mais a biblioteca React.
                            No futuro, vejo-me como um excelente programador,
                            ensinando outros desenvolvedores e trabalhando em grandes projetos, vivendo os sonhos de hoje.
                        </Typography>

                        <Box
                            component="img"
                            sx={{
                                height: 290,
                                width: 350,
                                marginTop: '20px',
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 180, md: 200, },
                            }}
                            alt='marcos.png'
                            src={fotoDoMarcos}
                        ></Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
                           <a href='https://github.com/marcosmrk1' target='_blank'> 
                           <GitHubIcon sx={{ margin: '12px', color: "#325d87" }} />
                           </a>
                            <a href='https://www.linkedin.com/in/marcosp-rsd-/'target="_blank" >
                                <LinkedInIcon sx={{ margin: '12px', color: "#325d87" }} />
                                </a>
                            <a href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#sent?compose=new' target='_blank'>
                                <EmailIcon sx={{ margin: '12px', color: "#325d87" }} /> 
                                </a>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                        <Accordion sx={{ width: '70%' }} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{
                                    fontFamily: "Roboto, Helvetica,Arial,sans-serif",
                                    fontSize: "20px",
                                    fontWeight: "bold", color: "#325d87",
                                    marginLeft: '12px'}}>1.O que foi utilizado</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{
                                    
                                }}>
                                    Nesse projeto em React, foi utilizado as  bibliotecas  para o visual<strong> material UI </strong>, para rotas <strong>React Rouder Dom</strong>.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{ width: '70%' }} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{
                                    fontFamily: "Roboto, Helvetica,Arial,sans-serif",
                                    fontSize: "20px",
                                    fontWeight: "bold", color: "#325d87",
                                    marginLeft: '12px'
                                }}>2.Dificuldades encontradas </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    As maiores dificuldades foram encontradas na tela de formulário,
                                    especialmente na parte de funções como pesquisa, aquisição da API, responsividade e rotas. Mas com a prática,
                                    tornou-se mais fácil a cada dia que passava. Entendia mais como funcionava e como pensar.
                                    Todas as dificuldades no fim serviram de grande ajuda para o aprimoramento de minhas habilidades.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{ width: '70%' }} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{
                                    fontFamily: "Roboto, Helvetica,Arial,sans-serif",
                                    fontSize: "20px",
                                    fontWeight: "bold", color: "#325d87",
                                    marginLeft: '12px'
                                }}>Sugestões</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{}} >
                                    Prolongar o tempo do teste para um iniciante. Colocar como "pedida"
                                    a simulação de um loading,
                                    pedir tbm para caso o filtro de busca nâo encontre nada colocar um "alert"
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </Box>


                </Card>
            </Container>
        </>
    )
}

export default TelaDeMenu