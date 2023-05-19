import {
    Box,
    Typography
} from '@mui/material';
import React from 'react';
const CardDesenvolvedortext = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: ' 20px' }}>
            <Box style={{
                fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "29px",
                fontWeight: "bold", color: "#325d87", textAlign: 'center'
            }}> Desenvolvedor</Box>
            <Box sx={{ color: "#325d87", borderBottom: '3px solid black', marginBottom: '10px' }}></Box>

            <Typography sx={{
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
    )
}

export default CardDesenvolvedortext