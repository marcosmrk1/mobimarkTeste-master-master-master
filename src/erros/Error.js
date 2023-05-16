import { Box, Button, Card, Container, Typography } from '@mui/material'
import React from 'react'

export const Error = ({ obj, msgError }) => {
    return (obj.error && <Container style={{ marginTop: "10px" }}>
        <Card >
            <Box style={{ display: "flex", alignItems: 'center', justifyContent: 'center', color: 'red', padding: '10px', flexDirection: 'column' }}>
                <Typography style={{ fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px", fontWeight: "bold", color: "red", width: '100%' }}>
                    {msgError}
                </Typography>
                <Button variant="contained" onClick={obj.action} style={{ marginTop: "10px", width: "50%" }} >reload</Button>
            </Box>
        </Card>
    </Container>
    )
}