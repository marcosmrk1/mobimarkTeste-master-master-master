import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Table, TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Grid';
import { default as React, } from 'react';
import { Error } from "../erros/Error";
const CardListagem = ({ escolasDados, cidades, escolasFiltradas }) => {
    return (
        <Box>
            {<Box style={{ widht: "100%" }}  >
                {(escolasDados.loading || cidades.loading) &&
                    <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
                        <CircularProgress />
                    </Box>}
                <Error obj={escolasDados} msgError='Error: ao carregar  nome das escolas : TENTE NOVAMENTE' />
                <Error obj={cidades} msgError='Error: ao carregar  Conteúdo  de cidades: TENTE NOVAMENTE' />

                <CardContent style={{ height: "100%", width: '100%', overflow: 'auto' }} >

                    <Container >
                        {escolasDados && escolasDados.dados && <Card sx={{ marginTop: '12px', overflowX: 'auto' }}>
                            <Typography variant="p" style={{
                                fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                                fontWeight: "bold", color: "#325d87", marginTop: '22px', marginLeft: '12px'
                            }}>Listagem de escolas </Typography>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Table sx={{ marginTop: '12', }}>
                                        <TableHead>
                                            <TableRow >
                                                <TableCell align='left'> Nome da Escola </TableCell>
                                                <TableCell align="center">Cidade</TableCell>
                                                <TableCell align="center">Cod.cidade</TableCell>
                                                <TableCell align="center">Estadual</TableCell>
                                                <TableCell align="center">Região</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {escolasFiltradas.length > 0 ? escolasFiltradas.map((consume, k) => (
                                                <TableRow key={k}>

                                                    <TableCell align="left"> {consume.nome}</TableCell>
                                                    <TableCell align="center">{consume.cidade}</TableCell>
                                                    <TableCell align="center">{consume.codCidade}</TableCell>
                                                    <TableCell align="center">{consume.dependenciaAdministrativaTxt}</TableCell>
                                                    <TableCell align="center">{consume.regiao}</TableCell>
                                                </TableRow>
                                            )) :
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" style={{
                                                        fontFamily: "Roboto, Helvetica,Arial,sans-serif",
                                                        fontSize: "20px", fontWeight: "bold", color: "red", width: '100%'
                                                    }}>
                                                        Nenhum resultado encontrado
                                                    </TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Card>}
                    </Container>
                </CardContent>

            </Box>
            }
        </Box>

    )
}

export default CardListagem