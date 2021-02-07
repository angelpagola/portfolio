const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const textareas = document.querySelectorAll('#form textarea');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    mensaje: /^[a-zA-ZÀ-ÿ\s\d_.+-\_\-]{1,500}$/
}
const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    mensaje: false
}

const validarform = (e) => {
    switch (e.target.name) { //Para identificar inputs
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
            break;
    }
}
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('form__group-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('form__group-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.remove('form__input-error-activo');
        campos[campo] = true;

    } else {
        document.getElementById(`grupo__${campo}`).classList.add('form__group-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('form__group-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.add('form__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarform); //Cuando levantas la tecla
    input.addEventListener('blur', validarform); //Cuando haces click en otro lugar
});

textareas.forEach((textarea) => {
    textarea.addEventListener('keyup', validarform); //Cuando levantas la tecla
    textarea.addEventListener('blur', validarform); //Cuando haces click en otro lugar
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); //
    const terminos = document.getElementById('terminos');
    if (campos.nombre && campos.correo && campos.telefono && campos.telefono && terminos.checked) {
        form.reset();
        document.getElementById('form__message-exito').classList.add('form__message-exito-activo');
        setTimeout(() => {
            document.getElementById('form__message-exito').classList.remove('form__message-exito-activo');
        }, 5000);
        document.querySelectorAll('.form__group-correcto').forEach((icono) => {
            icono.classList.remove('form__group-correcto');
        });
    } else {
        document.getElementById('form__message-error').classList.add('form__message-error-activo');
        setTimeout(() => {
            document.getElementById('form__message-error').classList.remove('form__message-error-activo');
        }, 5000);

    }
});