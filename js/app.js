const BtnEmail = document.querySelector('#email');
const BtnAsunto = document.querySelector('#asunto');
const BtnMensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Eventos();
function Eventos(){
    document.addEventListener('DOMContentLoaded',inicioApp)
    BtnEmail.addEventListener('blur',ValidarCampo);
    BtnMensaje.addEventListener('blur',ValidarCampo);
    BtnAsunto.addEventListener('blur',ValidarCampo);
    btnEnviar.addEventListener('click',EnviarEmail);
    resetBtn.addEventListener('click',resetFormulario);
};

function EnviarEmail(e){
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    const enviado = document.createElement('p');
    enviado.textContent = 'Mensaje Enviado';
    enviado.classList.add('bg','text-center','bg-green-500','text-white','font-bold','uppercase','my-10','p-2');
    
    setTimeout(() => {
        spinner.style.display = 'none';
        formulario.insertBefore(enviado,spinner);
        setTimeout(() => {
            enviado.remove();
            resetFormulario(e);
            inicioApp();
        }, 4000);
    }, 3000);

}

function resetFormulario(e) {
    formulario.reset();
    BtnEmail.classList.remove('border', 'border-green-500');
    BtnAsunto.classList.remove('border', 'border-green-500');
    BtnMensaje.classList.remove('border', 'border-green-500');
    e.preventDefault();
}


function inicioApp() {
    // deshabilitar el envio
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function ValidarCampo(e){


    const type = e.target.type;
    if(e.target.value.length > 0){
        if(document.querySelector('p.error')){
            const error = document.querySelector('p.error');
            error.remove();
        }
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        MostrarError('Debes completar los campos')

    }
    if(type === 'email'){
        if(re.test(e.target.value)){
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-red-500');
            MostrarError('Email no válido')
        }
    }

    if(BtnAsunto.value.length>0 && BtnEmail.value.length > 0 && BtnMensaje.value.length > 0 && !document.querySelector('p.error')){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function MostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500','p-3','mt-5','text-center','error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }    
}

