
import marcos from '../FotosGerais/marcosPaulo.png';
import './Menu.css'
const TelaDeMenu = () => {
    
    return (
        <body>
            <div className="global">
                <main className="conteudo">
                    <section className="conteudo-principal">
                        <div className="conteudo-principal-escrito">
                            <h1 classname="conteudo-principal-escrito-titulo">Sobre mim</h1>                                                      
                            <h2 className="conteudo-principal-escrito-subtitulo">Meu nome é
                                Marcos Paulo tenho 19 anos, estudante de ánalise desenvolvimento de sistemas, possuo conhecimetos de
                                Python ,
                                javaScript, HTML e CSS , e sigo em busca conseguir essa oportunidade para aprimorar minhas
                                habilidades com programação e me tornar o profissional cada vez melhor para o time Mobimark </h2>
                            <img className="conteudo-principal-imagem" src={marcos} alt="Imagem do Marcos" />
                        </div>
                    </section>
                    <section className="conteudo-secundario">
                        <h3 className="conteudo-secundario-titulo">o que foi utilizado no Projeto/ Dificuldades econtradas / sugestões </h3>
                        <p className="conteudo-secundario-paragrafo">1. foi utilizado <strong>React , HTML e CSS</strong> </p>
                        <p className="conteudo-secundario-paragrafo">2. Dificulades encontradas talvez um pouco mais de tempo de estudo teria conseguido <strong> o linkamento de telas  e o consumo de api</strong></p>
                        <p class="conteudo-secundario-paragrafo">3.  <strong>Na Tela de Login é importante ter um comentario sobre como conseguir a matricula e a senha   </strong> </p>
                        <p class="conteudo-secundario-paragrafo">  <strong>Na Tela de cadastro é importante ter uma barra digitação para 'observações' não obrigatoria ao usuario   </strong> </p>
                    </section>
                </main>
            </div>
        </body>
    )
}
export default TelaDeMenu