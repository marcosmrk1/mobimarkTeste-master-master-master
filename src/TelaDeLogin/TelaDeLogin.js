import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validarEmail, validarSenha } from '../UtilsFunction/UtilsFunction';
import { dadosDoEmaileSenha } from '../localStorageGlobais';
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
};
const TelaDeLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')
    const [textovalidacao, setTextovalidacao] = useState(false)
    const [textoValidacaoSenha, setTextoValidacaoSenha] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const rotarDentrada = () => {
        if (!validarEmail(email) || !validarSenha(senha)) {
            if (!validarEmail(email)) {
                setTextovalidacao(true);
            } else {
                setTextovalidacao(false);
            }
            if (!validarSenha(senha)) {
                setTextoValidacaoSenha(true);
            } else {
                setTextoValidacaoSenha(false);
            }
            setLoading(false);
        } else {
            window.localStorage.setItem(dadosDoEmaileSenha, email + "" + senha);
            setLoading(true);
            setTimeout(() => {
                navigate('/sobremim');
                setLoading(false);
            }, 3000);
        }
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

                    }}
                >
                    <Box sx={{
                        alignItems: 'center',
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography component="h4" variant="h4" >
                            Entrar
                            <Typography
                                component='h4' variant='h8'>  bem-vindo</Typography>
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
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
                        {textovalidacao ?
                            <Typography sx={{ color: 'red' }}> digite um e-mail válido.</Typography> : ''
                        }

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
                        {textoValidacaoSenha ?
                            <Typography sx={{ color: 'red' }}>  Digite senha com pelo menos 8 caracteres e uma letra maiscula.</Typography>
                            : ''}
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