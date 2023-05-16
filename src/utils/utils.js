// import { useMediaQuery } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
// FORMULARIO
export const estados = [
  { "nome": "Acre", "sigla": "ac" },
  { "nome": "Alagoas", "sigla": "al" },
  { "nome": "Amapá", "sigla": "ap" },
  { "nome": "Amazonas", "sigla": "am" },
  { "nome": "Bahia", "sigla": "ba" },
  { "nome": "Ceará", "sigla": "ce" },
  { "nome": "Distrito Federal", "sigla": "df" },
  { "nome": "Espírito Santo", "sigla": "es" },
  { "nome": "Goiás", "sigla": "go" },
  { "nome": "Maranhão", "sigla": "ma" },
  { "nome": "Mato Grosso", "sigla": "mt" },
  { "nome": "Mato Grosso do Sul", "sigla": "ms" },
  { "nome": "Minas Gerais", "sigla": "mg" },
  { "nome": "Pará", "sigla": "pa" },
  { "nome": "Paraíba", "sigla": "pb" },
  { "nome": "Paraná", "sigla": "pr" },
  { "nome": "Pernambuco", "sigla": "pe" },
  { "nome": "Piauí", "sigla": "pi" },
  { "nome": "Rio de Janeiro", "sigla": "rj" },
  { "nome": "Rio Grande do Norte", "sigla": "rn" },
  { "nome": "Rio Grande do Sul", "sigla": "rs" },
  { "nome": "Rondônia", "sigla": "ro" },
  { "nome": "Roraima", "sigla": "rr" },
  { "nome": "Santa Catarina", "sigla": "sc" },
  { "nome": "São Paulo", "sigla": "sp" },
  { "nome": "Sergipe", "sigla": "se" },
  { "nome": "Tocantins", "sigla": "to" }
]

// Em Templates
// NavbarDesktop
export const listaMenu = [
  { picture: <FormatListBulletedIcon sx={{ fontSize: '16px', marginRight: '4px', }} />, path: '/telalistagem', label: 'Listagem' },
  { picture: <PersonIcon sx={{ fontSize: '16px', marginRight: '4px' }} />, path: '/sobremim', label: 'Sobre mim' },
  { picture: <EditIcon sx={{ fontSize: '16px', marginRight: '4px', }} />, path: '/TelaFormulario', label: 'Formulário ' },
]
