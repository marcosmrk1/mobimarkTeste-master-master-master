
import { setSelectionRange } from "@testing-library/user-event/dist/utils/edit/selectionRange";
import React, { useEffect, useState } from "react";
import {
  InputAdornment, Tooltip, Link, Button, FormControl, Select
  , MenuItem, InputLabel, Table, TableBody, TableContainer, TableHead, TableCell, TableRow,
  IconButton, SearchIcon, TextField, height, Typography, CircularProgress, Stack, Card,
  CardActions, CardContent, Container, useMediaQuery, Box
} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from "axios";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { localStorageEstado } from "../localStorageGlobais/index"
import { estados } from '../utils/utils'
// import {responvidadeMobileFitlroBusca} from '../utils/utils'

const Formulario = () => {
  
  const responvidadeMobileFitlroBusca = useMediaQuery('(max-width:600px)');
  let request_data = {
    loading: false,
    error: false,
    dados: null,
    action: () => { },
  }
  const [buscaTexto, setBuscaTexto] = useState('')
  const [escolasFiltradas, setEscolasFiltradas] = useState([])
  const [Cidades, setCidades] = useState([])
  const [cidadeSelecionada, setCidadeselecionada] = useState('')
  const [escolasDados, setEscolasDados] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(false)
  const [testeLoading, settesteLoading] = useState(null)
  const [testeLoadingCidade, settesteLoadingCidade] = useState([null])
  const [erroTextoBusca, seterroTextoBusca] = useState(false)
  const [loadingDvoltar, setLoadingDvoltar] = useState(false)
  const localStorageSaveEstado = localStorage.getItem(localStorageEstado)
  const [estado, setestado] = useState((localStorageSaveEstado ? (
    localStorageSaveEstado
  ) : (
    ""
  )))

  useEffect(() => {
    if (window.localStorage.getItem('listaApi') === null) {
      axios.get(' https://cors-anywhere.herokuapp.com/http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?situacaoFuncionamento=1&energiaInexistente=on&aguaInexistente=on&esgotoInexistente=on&cozinha=on')
        .then(Response => {
          window.localStorage.setItem('listaApi', JSON.stringify(Response.data));
          setEscolasDados(Response.data[1]);
          setEscolasFiltradas(Response.data[1]);
        })
        .catch(error => {
          console.error(error)
          setEscolasDados(JSON.parse(window.localStorage.getItem('listaApi'))[1]);
          setEscolasFiltradas(JSON.parse(window.localStorage.getItem('listaApi'))[1]);
          seterroTextoBusca(true)
        })
    } else {
      setEscolasDados(JSON.parse(window.localStorage.getItem('listaApi'))[1]);
      setEscolasFiltradas(JSON.parse(window.localStorage.getItem('listaApi'))[1]);
      seterroTextoBusca(true)
      buscaTeste()
    }
  }, []);
  useEffect(() => {
    if (estado) {
      if (window.localStorage.getItem(estado) === null) {
        axios.get(' https://cors-anywhere.herokuapp.com/http://educacao.dadosabertosbr.com/api/cidades/' + estado)
          .then(Response => {
            window.localStorage.setItem(estado, JSON.stringify(Response.data));
            setCidades(Response.data)
          })
          .catch(error => {
            setCidades(JSON.parse(window.localStorage.getItem(estado)));
            seterror(true)
          })
      } else {
        setCidades(JSON.parse(window.localStorage.getItem(estado)));
      }
    }
  },
  )
  useEffect(() => {
    BuscaTesteCidadeId()
  }, [cidadeSelecionada])
  const BuscaTesteCidadeId = () => {
    seterror(false)
    const cidadeID = cidadeSelecionada.split(':')[0]
    if (cidadeID) {
      settesteLoading({ ...testeLoadingCidade, loading: true })
      axios.get('https://cors-anywhere.herokuapp.com/http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?cidade=' + cidadeID + '')
        .then((resposta) => {
          settesteLoading({ ...testeLoadingCidade, dados: resposta })
          setEscolasFiltradas(resposta.data[1])
          setEscolasDados(resposta.data[1])
        })
        .catch((error) => {
          settesteLoading({ ...testeLoadingCidade, error: true })
          seterror(true)
        })
        .finally(() => {
          settesteLoading({ ...testeLoadingCidade, loading: false })
        })
    }
  }

  const buscaTeste = () => {
    seterroTextoBusca(false)
    settesteLoading({ ...testeLoading, loading: true })
    let funcaobuscateste = localStorage.getItem('listapi')
    if (funcaobuscateste) {
      setTimeout(
        settesteLoading({ ...testeLoading, dados: funcaobuscateste, loading: false, error: false })
        , 2000)
      return
    }
    axios.get(" https://cors-anywhere.herokuapp.com/http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?situacaoFuncionamento=1&energiaInexistente=on&aguaInexistente=on&esgotoInexistente=on&cozinha=on")
      .then((res) => {
        localStorage.setItem('listapi', JSON.stringify(res))
        settesteLoading({ ...testeLoading, dados: res })
      })
      .catch((error) => {
        settesteLoading({ ...testeLoading, error: true })
        seterroTextoBusca(true)
      })
      .finally(() => {
        setloading({ ...testeLoading, loading: false })
      })
  }
  const pressionarbusca = () => {
    setEscolasFiltradas(escolasDados.filter((escolaTextoBusca) => {
      if (escolaTextoBusca.nome.toLowerCase().includes(buscaTexto.toLowerCase())) {
        return escolaTextoBusca
      }
    }))
  }
  const reload = () => {
    if (error === true) {
      BuscaTesteCidadeId()
    }
  }
  const reloadDecidade = () => {
    if (erroTextoBusca === true) {
      buscaTeste()
    }
  }
  const handleChange = (e) => {
    setestado(e.target.value)
    localStorage.setItem(localStorageEstado, e.target.value)
  }
  console.log(responvidadeMobileFitlroBusca)
  return (
    loadingDvoltar ?
      <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box> :

      <Box>
        <Card style={{ width: '100%', display: "flex", marginTop: '2px', }} >
          <CardActions>
            <Typography variant="p" style={{
              fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
              fontWeight: "bold", color: "#325d87"
            }}> Formulario </Typography>
          </CardActions>
        </Card>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: "20px", marginLeft: '5px' }}>
          <Box direction="justifyContent" spacing={2}>
            <Box style={{ width: "200px", marginRight: "10px" }} >
              <TextField style={{
                display: 'flex', widht: '50%', marginRight: "10px",
              }}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="start" >
                      <IconButton onClick={pressionarbusca}>
                        <Tooltip title='clique aqui para pesquisar a escola desejada'>
                          <SearchRoundedIcon />
                        </Tooltip>
                      </IconButton>
                    </InputAdornment>,
                }}
                id="searchbar"
                type="text"
                name="search"
                placeholder="Procurar  Escola... "
                value={buscaTexto}
                onChange={(ev) => setBuscaTexto(ev.target.value)}
              />
              <FormControl style={{
                width: { responvidadeMobileFitlroBusca } ? '80%' : '72%',
                marginTop: { responvidadeMobileFitlroBusca } ? '12px' : '16px',
                marginRight: { responvidadeMobileFitlroBusca } ? '0' : '80px'
              }}>
                <InputLabel  >Selecione um estado</InputLabel>
                <Select
                  label='Selecione um turno'
                  name='selecione'
                  value={estado}
                  onChange={handleChange}
                >
                  {estados.map((selectEstados, i) => (
                    <MenuItem key={i} value={selectEstados["sigla"]}>{selectEstados["nome"]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box style={{
            width: "200px", justifyContent: 'center',
            marginTop: { responvidadeMobileFitlroBusca } ? '67px' : '70px',
            marginRight: { responvidadeMobileFitlroBusca } ? '0' : '12px',
          }}
          >
            {
              Cidades && Cidades.length > 0 && <FormControl style={{ width: '100%' }}>
                <InputLabel  >Selecione a cidade</InputLabel>
                <Select
                  label='selecione uma cidade'
                  name='selecione'
                  value={cidadeSelecionada}
                  // onClick={pressionarbusca}
                  onChange={(event) => setCidadeselecionada(event.target.value)}
                >
                  {Cidades.map((selectCidades, i) => (
                    <MenuItem key={i} value={selectCidades}>{selectCidades}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            }
          </Box>
        </Box>
        <Box>
          {testeLoading && <Box style={{ widht: "100%" }}  >
            {testeLoading.loading || testeLoadingCidade.loading ?
              <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box> :

              error ?
                <Container style={{ marginTop: "10px" }}>
                  <Card >
                    <Box style={{
                      display: "flex", alignItems: 'center', justifyContent: 'center', color: 'red', padding: '10px',
                      flexDirection: 'column'
                    }}>
                      <Typography style={{
                        fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                        fontWeight: "bold", color: "red", padding: '5px'
                      }}>  Error: ao carregar  Conteúdo  de cidades: TENTE NOVAMENTE  </Typography>
                      <Button variant="contained" onClick={reload} style={{ marginTop: "20px", width: "50%" }} >reload</Button>
                    </Box>
                  </Card>
                </Container>
                :

                erroTextoBusca ?
                  <Container style={{ marginTop: "10px" }}>
                    <Card >
                      <Box style={{ display: "flex", alignItems: 'center', justifyContent: 'center', color: 'red', padding: '10px', flexDirection: 'column' }}>
                        <Typography style={{
                          fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                          fontWeight: "bold", color: "red", width: '100%',
                        }}>
                          Error: ao carregar  nome das escolas : TENTE NOVAMENTE  </Typography>
                        <Button variant="contained" onClick={reloadDecidade} style={{ marginTop: "10px", width: "50%" }} >reload</Button>
                      </Box>
                    </Card>
                  </Container>
                  :
                  <CardContent style={{ height: "100%", width: '100%' }} >
                    <Container style={{
                      widht: '100%',
                      maxWidth: { responvidadeMobileFitlroBusca } ? '100%' : "100%",
                      overflowX: { responvidadeMobileFitlroBusca } ? "auto" : 'auto',
                    }}>
                      <Table>
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
                          {escolasFiltradas && escolasFiltradas.length > 0 ? escolasFiltradas.map((consume, k) => (
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
                                Nennhum resultado encontrado
                              </TableCell>
                            </TableRow>
                          }
                        </TableBody>
                      </Table>
                    </Container>
                  </CardContent>
            }
          </Box>
          }
        </Box>

      </Box>

  )
}



export default Formulario

