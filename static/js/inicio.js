// Variables generales
let respuesta = document.getElementById('respuesta')
let btnCopiar = document.getElementById('copy')
let opcTipoMsje = document.getElementById('opciones')
let linkWhatsapp= document.getElementById('whatsapp')

let tipoMensaje=['Seleccione','Campaña','Excepción','Recordatorio','Extra Judicial']
let campañas=['Seleccione','Caja Arequipa','Caja Andes','Financiera Confianza','Banco Falabella']
crearListEtiquetaOption(tipoMensaje,'.tipo_mensaje')
crearListEtiquetaOption(campañas,'.cartera')

function crearListEtiquetaOption(options,clase){
    let select=document.querySelector(clase)
    for(let i=0; i<options.length;i++){
        let option=document.createElement('option')
        option.innerText=options[i];
        select.appendChild(option)
    }
}


btnGenerar.addEventListener('click', function () {
    let form = document.querySelector(".form_container")
    let cliente = crearObjeto(form)
    let listaErrores = validarObjeto(cliente)

    if (listaErrores.length > 0) {
        exibirMensajeError(listaErrores)
        return
    } else {
        generaMensaje(cliente)
        form.reset()
        var errores = document.querySelector(".mensaje_error")
        errores.innerHTML = ""
    }
})

function crearObjeto(form) {
    let cliente = {
        carteras: form.carteras.value,
        opciones: form.opciones.value,
        nombre: form.nombre.value,
        dni: form.dni.value,
        monto: form.monto.value,
        telefono: form.telefono.value,
        fecha: form.fecha.value
    }
    return cliente;
}

function validarObjeto(cliente) {
    let listaErrores = []
    let opc = cliente.opciones.toLowerCase()

    if (cliente.carteras.length != 0 && cliente.carteras.toLowerCase()=='seleccione') {
        listaErrores.push('Seleccione la cartera')
    }
    if (opc == 'extra judicial') {
        if (cliente.dni == 0) {
            listaErrores.push('Ingrese el nro de dni')
        }
    } else {
        if (cliente.monto.length == 0) {
            listaErrores.push('Ingrese el monto')
        }

    }
    if (cliente.opciones.length != 0 && cliente.opciones.toLowerCase()=='seleccione') {
        listaErrores.push('Seleccione el tipo de mensaje')
    }
    if (cliente.nombre.length == 0) {
        listaErrores.push('Ingrese los nombres y apellidos')
    }
    if (cliente.fecha.length == 0) listaErrores.push('Ingrese la fecha')
    if (cliente.telefono.length == 0) {
        listaErrores.push('Ingrese el telefono celular')
    }
    return listaErrores
}

function exibirMensajeError(listaErrores) {
    let ul = document.getElementById('lista_errores')
    ul.innerHTML = ""
    listaErrores.forEach(error => {
        var li = document.createElement('li')
        li.classList.add('mensaje_error')
        li.textContent = error
        ul.appendChild(li)

    });
}

function generaMensaje(cliente) {
    let textArea = document.getElementById('mensaje')
    let mensaje = ""
    let opc = cliente.opciones.toLowerCase()
    let nombre = cliente.nombre.toUpperCase()
    let cartera = cliente.carteras.toUpperCase()
    let fecha = cliente.fecha
    let monto = cliente.monto
    let dni = cliente.dni

    switch (opc) {
        case 'campaña':
            mensaje = nombre + ', *'+cartera+'*, tienes un SUPER Dscto *APROBADO*, cancela tu Deuda con *S/.'+
                monto+'*, *ACTIVALO* comunicándote por este medio.\n\n Tramite su *CONSTANCIA DE NO ADEUDO* y Evite seguir mantendiendo un reporte negativo en las centrales de riesgo.Dscto válido hasta: *'+fecha+'*'
            break;
        case 'excepción':
            mensaje = nombre + ', *'+cartera+'* tiene un Dscto Especial *PRE_APROBADO*, cancela tu Deuda con *S/.'+
                monto+'* , Previa evaluación, *ACTIVALO* comunicándote por este medio.\n\n Tramite su *CONSTANCIA DE NO ADEUDO* y Evite seguir manteniendo un reporte negativo en las centrales de riesgo.Dscto válido hasta: *'+fecha+'*'
            break
        case 'recordatorio':
            mensaje = 'Que tal Sr(a): *'+nombre+'* , '+cartera +' le recuerda que tiene un compromiso pendiente para el *'+fecha+'* , por el importe de *S/.'+
                monto+'*, evite el recálculo de su deuda pagando en la fecha establecida. \n\nCualquier inconveniente con su pago me informa para poder ayudarle. Saludos Cordiales.'
            break
        case 'extra judicial':
            mensaje = 'BUENOS DIAS  Sr(a): *'+nombre+'* DNI: *'+dni+'*, le saludamos del Área Pre-Judicial de(l) *'+cartera+'* . \n\nPara informarle que debido a la falta de interés en pagar su deuda atrasada, se procederá de manera extrajudicial a la recuperación del crédito entregado a su persona, dicha acción se llevara acabo en su domicilio directamente con el propietario del inmueble. \n\nLa fecha de dicha acción será el *'+
                fecha+'* , y sera llevada acabo por la comisión de cobranza compuesta por las personas jurídicas que representan a nuestra Entidad.\n\nEs muy lamentable llegar a esta situación pero su falta de compromiso y responsabilidad no nos deja otra salida. \n\nSi esta en su haber la posibilidad de pagar entre *HOY HÁGALO*, de esa forma la acción extrajudicial quedará sin efecto.\n\n\n*HOY SI O SI DEBE NORMALIZAR SU CUENTA, NO HAY PRORROGAS*.\n\nQuedo atento a su respuesta. \n\n\n*BUENOS DIAS.*'
            break
    }

    let whatsapp = document.getElementById('whatsapp')
    let link = 'http://api.whatsapp.com/send?phone=51' + cliente.telefono
    textArea.innerHTML = mensaje
    whatsapp.href = link
    whatsapp.innerHTML = "Enviar whatsapp a " + cliente.nombre.toUpperCase()
}

btnCopiar.addEventListener('click', function (e) {
    mensaje.select();
    try {
        var successful = document.execCommand('copy');

        if (successful) respuesta.innerHTML = 'Copiado!';
        else respuesta.innerHTML = 'Incapaz de copiar!';
    } catch (err) {
        rpta.innerHTML = 'Browser no soportado!';
    }
    let textArea = document.getElementById('mensaje')
    textArea.innerHTML = ""
});


opcTipoMsje.addEventListener('change', function () {
    let opcion = opcTipoMsje.value.toLowerCase()
    if (opcion == 'campaña' || opcion == 'excepción' || opcion == 'recordatorio') {
        document.querySelector('.fecha').innerHTML = 'Fecha limite de Campaña ó excepción:'
        document.querySelector('.form_fecha').style.display = 'flex'
        document.querySelector('.form_monto').style.display = 'flex'
        document.querySelector('.form_dni').style.display = 'none'

    } else if (opcion == 'extra judicial') {
        document.querySelector('.fecha').innerHTML = 'Fecha de embargo:'
        document.querySelector('.form_dni').style.display = 'flex'
        document.querySelector('.form_monto').style.display = 'none'

    } else {
        document.querySelector('.fecha').innerHTML = 'Fecha limite de Campaña ó excepción:'
        document.querySelector('.form_fecha').style.display = 'flex'
        document.querySelector('.form_monto').style.display = 'flex'
        document.querySelector('.form_dni').style.display = 'none'

    }
})