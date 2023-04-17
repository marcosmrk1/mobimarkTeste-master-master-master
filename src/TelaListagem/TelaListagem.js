
import React, { useEffect, useState } from "react";
import {
  Box, Card, CardActions,
  Container, Typography
  , TextField, TableRow, TableHead,
  TableCell, TableBody, Table, Select, InputLabel,
  MenuItem, FormControl, Button, useMediaQuery
} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CircularProgress from '@mui/material/CircularProgress';
import {arrayEscolas,Turnos} from '../ImportaçãoFunçõesVariveis/ImportaçãoFunçõesVariaveis'

const Formulario = () => {
  const responvidadeMobileFitlroBusca = useMediaQuery('(max-width:600px)');
 
  const [loading, setLoading] = useState(false)
  const [iniciofiltro, setiniciofiltro] = useState([])
  const [tabelaEscolas, settabelaEscolas] = useState('')
  const [busca, setBusca] = useState('')
  const escolasFiltradas = iniciofiltro.filter((FiltroDeBusca) => {
    let adicaoObjetosEscolasFiltradas = FiltroDeBusca.adicaoObjetosEscolasFiltradas
      + FiltroDeBusca.diretor + FiltroDeBusca.localizacao
    let funcaoDeBusca = adicaoObjetosEscolasFiltradas.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
    if (tabelaEscolas) {
      let selectTurnos = false
      let encontrou = FiltroDeBusca.turnos.find(turno => turno.includes(tabelaEscolas))
      if (encontrou) {
        selectTurnos = true
      }
      return funcaoDeBusca && selectTurnos
    }
    return funcaoDeBusca
  })
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setiniciofiltro([...arrayEscolas])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Box>
      <Card sx={{ width: '100%', display: "flex", marginTop: '2px', }}>
        <CardActions>
          <Typography variant="p" sx={{
            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
            fontWeight: "bold", color: "#325d87"
          }}> Listagem de escolas </Typography>
        </CardActions>
      </Card>
      <Container>
        <Box>
          <TextField sx={{ marginTop: '10px', width: '30%', marginLeft: "30%" }}
            id="searchbar" /* onKeyUp="search_animal" */ type="text"
            name="search" placeholder="Procurar  escola | diretor | localização ..."
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
          />
        </Box>
      </Container>
      <Container>
        <Box>
          <Box sx={{ width: "200px", marginBottom: "10px" }} >
            <FormControl fullWidth sx={{ marginTop: "10px" }} >
              <InputLabel  >Selecione um turno</InputLabel>
              <Select
                label='Selecione um turno'
                name='selecione'
                value={tabelaEscolas}
                onChange={(event) => settabelaEscolas(event.target.value)}
              >
                {Turnos.map((SelectTurnos,) => (
                  <MenuItem key={SelectTurnos} value={SelectTurnos} > {SelectTurnos}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
      {
        loading ?
          <Box sx={{ display: 'flex', marginLeft: "48%", marginTop: "10%" }}>
            <CircularProgress />
          </Box> :

          <Box>
            <Container style={{
              maxWidth: responvidadeMobileFitlroBusca ? '100%' : "100%",
              overflowX: responvidadeMobileFitlroBusca ? "auto" : 'auto',
            }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align='left'> Tabela escolar </TableCell>
                    <TableCell align="center"> Escola</TableCell>
                    <TableCell align="center"> Diretor</TableCell>
                    <TableCell align="center">Localizão da Escola</TableCell>
                    <TableCell align="center">Turnos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {escolasFiltradas.map(exibicaInformacoesTabela => (
                    <TableRow
                      key={exibicaInformacoesTabela.adicaoObjetosEscolasFiltradas}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, width: "40%" }}>
                      <TableCell component="th" scope="row">
                        {exibicaInformacoesTabela.adicaoObjetosEscolasFiltradas}
                      </TableCell>
                      <TableCell aling='center'>{exibicaInformacoesTabela.adicaoObjetosEscolasFiltradas}</TableCell>
                      <TableCell aling='center'>{exibicaInformacoesTabela.diretor}</TableCell>
                      <TableCell aling='center'>{exibicaInformacoesTabela.localizacao}</TableCell>
                      <TableCell aling='center'>{exibicaInformacoesTabela.turnos.join(',')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Container>
            <Box sx={{ marginTop: "1.8%", marginLeft: "50%", position: 'fixed' }}>
              <Button
                variant="contained">
                Confirmar
              </Button>
            </Box>
          </Box>
      }
    </Box >
  );
}
export default Formulario


