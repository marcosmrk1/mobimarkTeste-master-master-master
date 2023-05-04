import react, { useState } from 'react'
import { CircularProgress, Container, Typography, Grid, Box, Paper, Link, Checkbox, FormControlLabel, TextField, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {  useNavigate } from 'react-router-dom'
import { dadosDoEmaileSenha } from '../localStorageGlobais'
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
};
const TelaDeLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')
    const [textovalidacao, setTextovalidacao] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const rotarDentrada = () => {
        if (!validarEmail(email) || !validarSenha(senha)) {
            setLoading(false);
            setTextovalidacao(true)
        } else {            
            window.localStorage.setItem(dadosDoEmaileSenha, email + "" + senha)
            setLoading(true);
            setTimeout(() => {
                navigate('/sobremim')
                setLoading(false);
            }, 1000);
        }
    }    
    function validarEmail(email) {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }
    function validarSenha(senha) {
        const LetrasMaisculas = /[A-Z]/;
        if (senha.length < 8) {
            return false;
        }
        if (!LetrasMaisculas.test(senha)) {
            return false;
        }
        return true;
    }
    const dadosuser = () => {
        const teste = window.localStorage.getItem(dadosDoEmaileSenha)
    }
    return (
        loading ?
            <Box sx={{
                width: '100%'
                , display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> :

            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: '50%',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h4" variant="h4" >
                        Entrar
                        <Typography
                            component='h4' variant='h8'>  bem-vindo</Typography>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onSubmit={dadosuser}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={senha}
                            onChange={(e) => { setSenha(e.target.value) }}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {textovalidacao &&
                            <p style={{ color: 'red' }}> digite um e-mail válido
                                senha deve ter pelo menos 8 caracteres e pelo menos uma letra maiscula.</p>
                        }
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2.5, mb: 2 }}
                            onClick={rotarDentrada}
                        >
                            Entrar
                            <PersonIcon></PersonIcon>
                        </Button>
                       
                    </Box>
                </Box>
            </Container>
    );
}

export default TelaDeLogin