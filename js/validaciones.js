export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "el campo de nombre no puede estar vacio"
    },
    email: {
        valueMissing: "el campo de correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "el campo de password no puede estar vacio",
        patternMismatch:"Minimum six and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    },
    nacimiento: {
        valueMissing: "este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años",
    },

    numero: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch:"El formato requerido es xxxxxxxxxx 10 NUMEROS",
    },
    direccion: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch:"La direccion debe contener entre 10 y 40 caraacteres",
    },
    ciudad: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch:"La cuidad debe contener entre 10 y 40 caraacteres",
    },
   estado: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch:"El estado debe contener entre 10 y 40 caraacteres",
    },
}


const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes ser mayor de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
          
    );
    return(diferenciaFechas <= fechaActual);
} 