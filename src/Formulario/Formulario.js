import React, { useEffect, useState } from "react";
import { InputAdornment, Tooltip, FormControl, Select, MenuItem, InputLabel, Table, TableBody,  TableHead, TableCell, TableRow,IconButton, TextField,  Typography, CircularProgress,  Card,
  CardContent, Container, Box } from "@mui/material";

import Grid from '@mui/material/Grid';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { localStorageEstado } from "../localStorageGlobais/index"
import { estados } from '../utils/utils'
import {buscarCidades, buscarEscolasByCidade, buscarEscolasGlobais} from '../Api/Api'
import { Error } from "../erros/Error";

const Formulario = () => {

  const [buscaTexto, setBuscaTexto] = useState('')
  const [escolasFiltradas, setEscolasFiltradas] = useState([])
  const [cidades, setCidades] = useState([])
  const [cidadeSelecionada, setCidadeselecionada] = useState('')
  const [escolasDados, setEscolasDados] = useState({})
  // const [error, seterror] = useState(false)
  const localStorageSaveEstado = localStorage.getItem(localStorageEstado)
  const [estado, setestado] = useState((localStorageSaveEstado ? (
    localStorageSaveEstado
  ) : (
    ""
  )))
  console.log(cidades,escolasDados)
  useEffect(() => {
    buscarEscolasGlobais(handleSetEscolas)
    getCidades()
  }, []);

  useEffect(() => {
    BuscaTesteCidadeId()
  }, [cidadeSelecionada])
  const handleSetEscolas = (data) =>{
    if(data.dados){
      window.localStorage.setItem('listaApi', JSON.stringify(data.dados));
      setEscolasFiltradas(data.dados[1]);
    }
    if(data.error){// isso é porque a requisicao é fresca e tem que esperar 1 hora se fizer muitas requisições por isso pega o valor do localStorage se tiver
      let dadosLocalStorage = JSON.parse(window.localStorage.getItem('listaApi'))
      if(dadosLocalStorage){
        setEscolasFiltradas(dadosLocalStorage[1]);
        setEscolasDados({...data,dados:dadosLocalStorage, error:false});
        return
      }
    }
    setEscolasDados({...data});
  }

  const getCidades = ()=>{
    if (estado) {
      buscarCidades(estado, (data)=>{
        if(data.dados){
          window.localStorage.setItem(estado, JSON.stringify(data.dados));
        }
        if(data.error){
          let dadosLocalStorage = JSON.parse(window.localStorage.getItem(estado))
          if(dadosLocalStorage){
            setCidades({...data, dados: dadosLocalStorage, error:false});
            return
          }
        }
        setCidades({...data})
      })
    }
  }
  const BuscaTesteCidadeId = () => {
    const cidadeID = cidadeSelecionada.split(':')[0]
    if (cidadeID) {
      buscarEscolasByCidade(cidadeID, handleSetEscolas)
      // settesteLoading({ ...testeLoadingCidade, loading: true })
      // axios.get('https://cors-anywhere.herokuapp.com/http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?cidade=' + cidadeID + '')
      //   .then((resposta) => {
      //     settesteLoading({ ...testeLoadingCidade, dados: resposta })
      //     setEscolasFiltradas(resposta.data[1])
      //     setEscolasDados(resposta.data[1])
      //   })
      //   .catch((error) => {
      //     settesteLoading({ ...testeLoadingCidade, error: true })
      //     seterror(true)
      //   })
      //   .finally(() => {
      //     settesteLoading({ ...testeLoadingCidade, loading: false })
      //   })
    }
  }

  const pressionarbusca = () => {
    if(escolasDados.dados){
      setEscolasFiltradas(escolasDados.dados[1].filter((escolaTextoBusca) => {
        if (escolaTextoBusca.nome.toLowerCase().includes(buscaTexto.toLowerCase())) {
          return escolaTextoBusca
        }
      }))
    }
  }
  const handleChange = (e) => {
    setestado(e.target.value)
    localStorage.setItem(localStorageEstado, e.target.value)
  }
  return (

      <Box >
        <Card style={{ width: '100%', display: "flex", marginTop: '2px', }} >
          <Typography variant="p" style={{
            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
            fontWeight: "bold", color: "#325d87", marginLeft: '12px'
          }}> Tela listagem </Typography>
        </Card>
        <Box sx={{display:'flex', justifyContent:'center'}} >
        <Grid container spacing={2} style={{justifyContent: 'center', marginTop: "20px",width:'80%'}} >
        <Grid item lg={3} sm={4} xs={10} md={5} >

          <TextField  
          fullWidth
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
          </Grid>
            <Grid item xs={7} sm={4} md={3}  lg={2} >
          <FormControl fullWidth>
            <InputLabel  >Selecione um estado</InputLabel>
            <Select
            fullWidth
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
          </Grid>
          

        <Grid item xs={7} sm={4} md={3}lg={2}> 
          {
            cidades.dados && cidades.dados.length > 0 && <FormControl fullWidth >
              <InputLabel  >Selecione a cidade</InputLabel>
              <Select
              fullWidth
                label='selecione uma cidade'
                name='selecione'
                value={cidadeSelecionada}
                onChange={(event) => setCidadeselecionada(event.target.value)}
              >
                {cidades.dados.map((selectCidades, i) => (
                  <MenuItem key={i} value={selectCidades}>{selectCidades}</MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          </Grid>
          </Grid>
          </Box>
 

        <Box>

          {<Box style={{ widht: "100%" }}  >
            {(escolasDados.loading || cidades.loading) &&
              <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' ,marginTop:'80px'}}>
                <CircularProgress />
              </Box>}
              <Error obj={escolasDados} msgError='Error: ao carregar  nome das escolas : TENTE NOVAMENTE'/>
              <Error obj={cidades} msgError='Error: ao carregar  Conteúdo  de cidades: TENTE NOVAMENTE'/>
                
                  <CardContent style={{ height: "100%", width: '100%',  overflow: 'auto' }} >
                 
                        <Container >
                        {escolasDados && escolasDados.dados && <Card sx={{marginTop:'12px', overflowX: 'auto'}}>
                          <Typography variant="p" style={{
                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                            fontWeight: "bold", color: "#325d87" ,marginTop:'22px', marginLeft:'12px'
                          }}>Listagem de escolas </Typography>
                            <Grid container>
                          <Grid item xs={12}>
                          <Table sx={{marginTop:'12',}}>
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

      </Box>

  )
}



export default Formulario

