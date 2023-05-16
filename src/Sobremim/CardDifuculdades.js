import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Typography
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import React from 'react';
const CardDifuculdades = () => {
    return (
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
    )
}

export default CardDifuculdades