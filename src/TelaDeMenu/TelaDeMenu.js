import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GetAppIcon from '@mui/icons-material/GetApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
    Box,
    Button,
    Card,
    Container, Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import React from 'react';
import fotoDoMarcos from '../Assets/Img/marcosPaulo.png';
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
                <Card sx={{ marginTop: '12px', marginBottom: '12px', padding: '12px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '0 20px' }}>
                        <Box style={{
                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "29px",
                            fontWeight: "bold", color: "#325d87", textAlign: 'center'
                        }}> Desenvolvedor</Box>
                        <Box sx={{ color: "#325d87", borderBottom: '3px solid black', marginBottom: '10px' }}></Box>

                        <Typography component={'div'} sx={{
                            marginTop: '28px', textAlign: 'left',
                            fontFamily: "sans-serif",
                            fontSize: "20px",
                            fontWeight: "bold",
                            width: '98.6%',
                            marginLeft: '9px'

                        }}>
                            Meu nome é Marcos Paulo, tenho 19 anos e atualmente sou estagiário de front-end na Mobimark.
                            Sou apaixonado por programação e busco aprimorar minhas habilidades diariamente.
                            Estou cursando Análise e Desenvolvimento de Sistemas na faculdade e prevejo concluir o curso até o final de 2023. <p>
                                Busco me tornar um profissional cada vez mais qualificado para agregar valor à equipe.
                                Estou sempre aprendendo sobre os problemas reais e suas soluções,
                                praticando o uso de clean code e dominando cada vez mais a biblioteca React.
                                No futuro, vejo-me como um excelente programador,
                                ensinando outros desenvolvedores e trabalhando em grandes projetos, vivendo os sonhos de hoje.
                            </p>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Box
                            component="img"
                            sx={{
                                height: 290,
                                width: 300,
                                marginTop: '28px',


                            }}
                            alt='marcos.png'
                            src={fotoDoMarcos}
                        ></Box>

                        <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '28px' }}>
                            <a href='https://github.com/marcosmrk1' target='_blank'>
                                <GitHubIcon sx={{ margin: '12px', color: "#325d87" }} />
                            </a>
                            <a href='https://www.linkedin.com/in/marcosp-rsd-/' target="_blank" >
                                <LinkedInIcon sx={{ margin: '12px', color: "#325d87" }} />
                            </a>
                            <a href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#sent?compose=new' target='_blank'>
                                <EmailIcon sx={{ margin: '12px', color: "#325d87" }} />
                            </a>
                        </Card>
                        <Box>
                            <a href='curriculo.pdf' download target='_blank'> <Button color='primary'
                                variant='contained' sx={{ marginTop: '35px' }}> <GetAppIcon />Dowload Do curriculo
                            </Button></a>
                        </Box>
                    </Box>

                    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', marginTop: '35px', marginBottom: '20px', }}>
                        <Grid item lg={4} xs={12} sm={4} md={4}>
                            <Accordion sx={{}} defaultExpanded={true} >
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
                                    }}>1.O que foi utilizado</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography
                                    >
                                        Nesse projeto em React, foi utilizado as  biblioteca para o visual o <strong> material UI </strong>, para as rotas
                                        <strong> React Rouder Dom</strong>.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid >
                        <Grid item lg={4} xs={12} sm={4} md={4} >
                            <Accordion sx={{}} defaultExpanded={true} >
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
                                        As maiores dificuldades foram encontradas<strong> na tela de formulário,
                                            especialmente na parte de funções como pesquisa, aquisição da API, responsividade e rotas.</strong> Mas com a prática,
                                        tornou-se mais fácil a cada dia que passava. Entendia mais como funcionava e como pensar.
                                        Todas as dificuldades no fim serviram de grande ajuda para o aprimoramento de minhas habilidades.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} lg={4} sm={4} md={4}>
                            <Accordion sx={{}} defaultExpanded={true}>
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
                                    }}>3.Sugestões</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ width: '100%', }}  >
                                        Prolongar o tempo do teste para um iniciante. Colocar como "pedida"
                                        a simulação de um loading,
                                        pedir tbm para caso o filtro de busca nâo encontre nada colocar um "alert"
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    )
}

export default TelaDeMenu