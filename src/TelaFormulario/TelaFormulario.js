
import { CardActions, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
}

const listaTurnos = [
    'Manhã',
    'Tarde',
    'Noite',
];
const TelaFormulario = () => {
    const [objetosDosInputs, setobjetosDosInputs] = useState({
        nomeDaEscola: '',
        nomeDoDiretor: '',
        localizacaoDaEscola: '',
        turnos: [],

    })
    const [listaDaTabela, setlistaDaTabela] = useState([])
    const [loading, setloading] = useState(false)
    const [itemDoMap, setItemDoMap] = useState({})
    const [ordemAlfabeticaAscendente, setOrdemAlfabeticaAscendente] = useState([])
    const [NomeDobuttonEditar, setNomeDoButtonEditar] = useState(null)
    const [cadastroRealizadoComSucessoText, setCadastroRealizadoComSucessoText] = useState(false)
    const [itensQueVaoSerExcluidos, setItensQueVaoSerExcluidos] = useState([])
    const [buscarInformacoes, setBuscarInformacoes] = useState('')
    const [tabelaFiltradoComAPesquisa, setTabelaFiltradoComAPesquisa] = useState([])
    const [verificarPesquisa, setVerificarPesquisa] = useState(false)
    const [loadingPesquisa, setLoadingPesquisa] = useState(false)
    const errosCampos = {
        nomeDaEscola: { msg: 'Digite o nome da escola', error: false },
        localizacaoDaEscola: { msg: 'Informe a localização da escola', error: false },
        turnos: { msg: 'Informe o turno da escola ', error: false },
    }
    const [erros, setErros] = useState({ ...errosCampos })
    const concatListaDaTabela = (event) => {
        event.preventDefault()
        if (validacao()) {
            setBuscarInformacoes('')
            setVerificarPesquisa(false)
            setErros({ ...errosCampos })
            setloading(true)
            setTimeout(() => {

                setCadastroRealizadoComSucessoText(true)
                setTimeout(() => {
                    setCadastroRealizadoComSucessoText(false)
                }, 3000);
                let ExibirInformaçõesDosInputs = [...listaDaTabela]
                if (!objetosDosInputs.id) {
                    ExibirInformaçõesDosInputs = ExibirInformaçõesDosInputs.concat({ ...objetosDosInputs, id: Math.random() })
                } else {
                    ExibirInformaçõesDosInputs = ExibirInformaçõesDosInputs.map(item => {
                        if (objetosDosInputs.id === item.id) {
                            return objetosDosInputs

                        } return item
                    })
                }
                setlistaDaTabela(ExibirInformaçõesDosInputs)
                let listaSalva = localStorage.getItem('listaDaTabelaLocalstorage')
                if (listaSalva) {
                    listaSalva = JSON.parse(listaSalva);
                    ExibirInformaçõesDosInputs = [...ExibirInformaçõesDosInputs,];
                }
                localStorage.setItem('listaDaTabelaLocalstorage', JSON.stringify(ExibirInformaçõesDosInputs));
                setobjetosDosInputs({
                    nomeDaEscola: '',
                    nomeDoDiretor: '',
                    localizacaoDaEscola: '',
                    turnos: [],
                });
                setloading(false)
            }, 1000);
        }
        setNomeDoButtonEditar(false)
        return;
    }

    useEffect(() => {
        const listaSalva = localStorage.getItem('listaDaTabelaLocalstorage');
        if (listaSalva) {
            setloading(true)
            setTimeout(() => {

                setlistaDaTabela(JSON.parse(listaSalva));
                setloading(false)
            }, 1000);
        }
    }, []);
    const localStorageExibir = () => {
        let RecebendoInformacaoDocampoDoLocalStorage = localStorage.getItem('listaDaTabelaLocalstorage')
        if (RecebendoInformacaoDocampoDoLocalStorage === null) {
        }
        return JSON.parse(RecebendoInformacaoDocampoDoLocalStorage)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setobjetosDosInputs((objetosAntigos) => ({
            ...objetosAntigos,
            [name]: value,
        }))
    }
    const selectTurnos = (event) => {
        const { value } = event.target;
        setobjetosDosInputs((prev) => ({
            ...prev,
            turnos: value
        }))
    };
    const seleectLocalizacaoDaEscola = (event) => {
        setobjetosDosInputs({
            ...objetosDosInputs,
            localizacaoDaEscola: event.target.value,
        })
    }
    const validacao = () => {
        if (objetosDosInputs.nomeDaEscola.length === 0) {
            setErros({ ...erros, nomeDaEscola: { ...erros.nomeDaEscola, error: true, } })
            return false
        }
        if (objetosDosInputs.localizacaoDaEscola.length === 0) {
            setErros({ ...erros, localizacaoDaEscola: { ...erros.localizacaoDaEscola, error: true } })
            return false
        }
        if (objetosDosInputs.turnos.length === 0) {
            setErros({ ...erros, turnos: { ...erros.turnos, error: true, } })
            return false
        }
        return true
    }
    const excluirItemDaTabela = () => {
        let listaAposExclusao = listaDaTabela.filter((item) => item.id != itemDoMap.id)
        setItensQueVaoSerExcluidos(listaAposExclusao)
        setlistaDaTabela(listaAposExclusao)
        setTabelaFiltradoComAPesquisa(listaAposExclusao)
        localStorage.setItem('listaDaTabelaLocalstorage', JSON.stringify(listaAposExclusao))
    }
    const botaoParaPesquisarNaTabela = () => {

        const resultadoFiltro = listaDaTabela.filter((item) =>



            item.nomeDaEscola.toLowerCase().includes(buscarInformacoes.toLowerCase()) ||
            item.nomeDoDiretor.toLowerCase().includes(buscarInformacoes.toLowerCase())

        );
        setLoadingPesquisa(true)
        setTimeout(() => {
            setTabelaFiltradoComAPesquisa(resultadoFiltro)
            setVerificarPesquisa(true)
            setLoadingPesquisa(false)
        }, 1200);
        return resultadoFiltro;
    }
    const editarItemDaTabela = (campo) => {
        setobjetosDosInputs(campo)
        if (NomeDobuttonEditar) {

            setNomeDoButtonEditar(false)
        } setNomeDoButtonEditar(true)
    }
    const CancelarEdicao = () => {
        setobjetosDosInputs({
            nomeDaEscola: '',
            nomeDoDiretor: '',
            localizacaoDaEscola: '',
            turnos: [],
        })
        setNomeDoButtonEditar(false)

    }
    const ordenarOrdemAlfabetica = (atributoOrdenacao) => {
        const ordenacaoNomeDaEscola = [...listaDaTabela].sort((a, b) => {
            if (ordemAlfabeticaAscendente) {
                return a[atributoOrdenacao].localeCompare(b[atributoOrdenacao])
            } else {
                return b[atributoOrdenacao].localeCompare(a[atributoOrdenacao])
            }
        })
        setlistaDaTabela(ordenacaoNomeDaEscola)
        setOrdemAlfabeticaAscendente(!ordemAlfabeticaAscendente)
    }
    const arrowIcon = ordemAlfabeticaAscendente ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    const [open, setOpen] = useState(false);
    const handleClickOpen = (item) => {
        setOpen(true);
        setItemDoMap(item)
        setItensQueVaoSerExcluidos(item)
    }
    const handleCancel = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        setOpen(false);
        excluirItemDaTabela()
    }
    return (

        <>
            <Card>
                <Typography variant="p" style={{
                    fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                    fontWeight: "bold", color: "#325d87", marginLeft: '12px'
                }}> Formulário </Typography>
            </Card>
            <Container >

                <Card sx={{ marginTop: '12px', padding: '12px' }}>
                    <Box
                        onSubmit={concatListaDaTabela}
                        component="form"
                        sx={{ margin: 2 }}
                        noValidate
                        autoComplete="off"
                    >

                        <Typography variant="h8" component='h3' style={{
                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                            fontWeight: "bold", color: "#325d87", marginBottom: '26px'

                        }}> Preencha seus dados  </Typography>
                        <Grid container spacing={2} >
                            <Grid item lg={3} xs={12} md={3} sm={6}>
                                <TextField size="small" id="outlined-basic" label="Nome da escola" variant="outlined" fullWidth
                                    name="nomeDaEscola" value={objetosDosInputs.nomeDaEscola} onChange={handleChange}
                                />
                                {erros['nomeDaEscola'].error && <Typography sx={{ color: 'red' }}  >
                                    <WarningAmberIcon sx={{ fontSize: 'medium', marginInline: '5px' }} />
                                    {erros['nomeDaEscola'].msg}</Typography>}
                            </Grid>

                            <Grid item lg={3} xs={12} md={3} sm={6} >
                                <TextField size="small" id="outlined-basic" label="Nome do diretor" variant="outlined" fullWidth
                                    name="nomeDoDiretor" value={objetosDosInputs.nomeDoDiretor} onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={3} xs={12} md={3} sm={6} >
                                <FormControl fullWidth  >
                                    <InputLabel id="demo-multiple-checkbox-label"> Turnos</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        size="small"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={objetosDosInputs.turnos}
                                        onChange={selectTurnos}
                                        input={<OutlinedInput label="Turnos" />}
                                        renderValue={(selected) => selected.join(',')}
                                        MenuProps={MenuProps}
                                    >
                                        {listaTurnos.map((turnosMapeados) => (
                                            <MenuItem key={turnosMapeados} value={turnosMapeados}>
                                                <Checkbox checked={objetosDosInputs.turnos.indexOf(turnosMapeados) > -1} />
                                                <ListItemText primary={turnosMapeados} />
                                            </MenuItem>
                                        ))}

                                    </Select>
                                    {erros['turnos'].error && <Typography sx={{ color: 'red' }} ><WarningAmberIcon
                                        sx={{ fontSize: 'medium', marginInline: '5px' }} />{erros['turnos'].msg}</Typography>}
                                </FormControl>
                            </Grid>

                            <Grid item lg={3} xs={12} sm={6} md={3}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Localização</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        size="small"
                                        id="demo-simple-select"
                                        value={objetosDosInputs.localizacaoDaEscola}
                                        label="localizacaoDaEscola"
                                        onChange={seleectLocalizacaoDaEscola}
                                    >
                                        <MenuItem value={'urbana'}>Urbana</MenuItem>
                                        <MenuItem value={'rural'}>Rural</MenuItem>
                                    </Select>
                                    {erros['localizacaoDaEscola'].error && <Typography sx={{ color: 'red' }} ><WarningAmberIcon
                                        sx={{ fontSize: 'medium', marginInline: '5px' }} />{erros['localizacaoDaEscola'].msg}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item lg={4} xs={12} sm={6} md={4} >
                                <Button type="submit" variant="contained" sx={{ marginRight: '12px', marginBUtt: '12px' }}
                                    onClick={() => setNomeDoButtonEditar(!NomeDobuttonEditar)} >
                                    {objetosDosInputs.id ? 'editar' : 'cadastrar'}
                                </Button>
                                {NomeDobuttonEditar && (
                                    <Button type="submit" variant="contained" onClick={CancelarEdicao}> cancelar </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                {loading ? <Box><CircularProgress sx={{ marginLeft: '46%', marginTop: '14%' }} /></Box> :
                    (localStorageExibir() || []).length > 0 && (
                        <>
                            <Box sx={{ marginTop: '60px' }}>
                                <Card sx={{ overflow: 'auto' }}>
                                    <CardActions>
                                        <Typography variant="p" style={{
                                            fontFamily: "Roboto, Helvetica,Arial,sans-serif", fontSize: "20px",
                                            fontWeight: "bold", color: "#325d87"
                                        }}> Tabelas de escolas cadastradas </Typography>
                                    </CardActions>
                                    {cadastroRealizadoComSucessoText &&
                                        <Typography sx={{ color: 'green' }}>
                                            <CheckCircleIcon sx={{ fontSize: 'medium', marginInline: '5px' }} />
                                            Tabela atualizada com sucesso
                                        </Typography>}
                                    <Box>
                                        <TextField
                                            sx={{ marginTop: '10px', width: '80%', marginLeft: '8%' }}
                                            id="searchbar"

                                            type="text"
                                            name="search"
                                            placeholder="Procurar escola ou diretor..."
                                            value={buscarInformacoes}
                                            onChange={(e) => setBuscarInformacoes(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={botaoParaPesquisarNaTabela}>
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Box>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='left'>Nome da escola
                                                    <Button onClick={() => ordenarOrdemAlfabetica('nomeDaEscola')} endIcon={arrowIcon}></Button>
                                                </TableCell>
                                                <TableCell align='left'>Nome do diretor
                                                    <Button onClick={() => ordenarOrdemAlfabetica('nomeDoDiretor')} endIcon={arrowIcon}></Button>
                                                </TableCell>
                                                <TableCell align='left'>Turnos</TableCell>
                                                <TableCell align="left">Localização da escola</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ marginBottom: '12px' }}>
                                            {loadingPesquisa ?
                                                <TableRow>
                                                    <Box> <CircularProgress sx={{ marginLeft: '147%' }} /> </Box>
                                                </TableRow>
                                                :
                                                (verificarPesquisa ? tabelaFiltradoComAPesquisa : listaDaTabela).map((item, index) => (
                                                    <TableRow key={index}>

                                                        <TableCell>{item.nomeDaEscola}</TableCell>
                                                        <TableCell>{item.nomeDoDiretor.length > 0 ? item.nomeDoDiretor : <Typography>Não informado </Typography>
                                                        }</TableCell>
                                                        <TableCell>
                                                            {item.turnos.join(",")}
                                                        </TableCell>
                                                        <TableCell>{item.localizacaoDaEscola}</TableCell>
                                                        <Button onClick={() => handleClickOpen(item)}>
                                                            <DeleteForeverIcon />
                                                        </Button>
                                                        <Button onClick={() => editarItemDaTabela(item)}> <EditIcon /></Button>
                                                    </TableRow>
                                                ))
                                            }
                                            {verificarPesquisa && tabelaFiltradoComAPesquisa.length === 0 &&
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" style={{
                                                        fontFamily: "Roboto, Helvetica,Arial,sans-serif",
                                                        fontSize: "20px", fontWeight: "bold", color: "red", width: '100%'
                                                    }}>
                                                        Nenhum resultado encontrado
                                                    </TableCell>
                                                </TableRow>
                                            }
                                            <Dialog open={open} onClose={handleCancel}>
                                                <DialogTitle>Confirmar ação</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Essas informações estão prestes a ser excluidos:
                                                        {itensQueVaoSerExcluidos && (
                                                            <Box sx={{ marginTop: "10px" }}>
                                                                <Typography variant="h7">
                                                                    <p>Nome da escola: {itensQueVaoSerExcluidos.nomeDaEscola}</p>
                                                                    <p> nome do Diretor: {itensQueVaoSerExcluidos.nomeDoDiretor}</p>
                                                                    <p>Turno selecionado: {itensQueVaoSerExcluidos.turnos ? itensQueVaoSerExcluidos.turnos.join(",") : ""}</p>                                                                    <p> localização da escola : {itensQueVaoSerExcluidos.localizacaoDaEscola}</p>

                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCancel} color="primary">
                                                        Cancelar
                                                    </Button>
                                                    <Button onClick={handleConfirm} color="primary" autoFocus>
                                                        Confirmar
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableBody>
                                    </Table>
                                </Card>
                            </Box>

                        </>
                    )
                }
            </Container >
        </>
    )
}
export default TelaFormulario