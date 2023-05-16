const DOMAIN = 'https://cors-anywhere.herokuapp.com/http://educacao.dadosabertosbr.com/api/'
export const GET_ESCOLAS_GLOBAIS = DOMAIN + 'escolas/buscaavancada?situacaoFuncionamento=1&energiaInexistente=on&aguaInexistente=on&esgotoInexistente=on&cozinha=on'
export const GET_CIDADES = DOMAIN + 'cidades/'
export const GET_ESCOLAS_BY_CIDADES = DOMAIN + 'escolas/buscaavancada?cidade='