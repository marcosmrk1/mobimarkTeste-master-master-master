import {
    Card,
    Container, Typography
} from '@mui/material';
import React from 'react';
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
                <CardDesenvolvedortext />
                <CardDifuculdades />
            </Container>
        </>
    )
}

export default TelaDeMenu