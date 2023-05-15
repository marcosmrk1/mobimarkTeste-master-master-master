//tela de login funções 
//funções usada para validacao de email e senha na tela de login 
export function validarEmail(email) {

    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (validarEmail === true) {

    } return regex.test(email);
}

export function validarSenha(senha) {
    const LetrasMaisculas = /[A-Z]/;
    if (senha.length < 8) {

        return false;
    }
    if (!LetrasMaisculas.test(senha)) {
        return false;
    }
    return true;
}

//tela de login


//tela de formulario 
//login function 

// tela de formulario