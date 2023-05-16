import EmailIcon from '@mui/icons-material/Email';
import GetAppIcon from '@mui/icons-material/GetApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
    Box,
    Button,
    Card,
    Typography
} from '@mui/material';
import React from 'react';
import fotoDoMarcos from '../Assets/Img/marcosPaulo.png';
const CardDesenvolvedortext = () => {
    return (
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
            </Typography>
        </Box>
    )
}

export default CardDesenvolvedortext