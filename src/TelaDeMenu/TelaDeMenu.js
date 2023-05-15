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
import CardDesenvolvedortext from './CardDesenvolvedortext';
import CardDifuculdades from './CardDifuculdades';
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
                <CardDesenvolvedortext/>
                <CardDifuculdades/>
           </Container>
        </>
    )
}

export default TelaDeMenu