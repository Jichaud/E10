// cargaInicio();
let html = ''
let ingresosBrutosJS = ''
let numeroAdherentes = ''

function retCalcFin () {
    $('#ret').hide()
    $('#nuevoCalculo').prop('hidden', false)
    $('#regRet').prop('disabled', true)
    $('#importeNeto').prop('disabled', true)
    $('#inscriptoGanancias').prop('disabled', true)
    $('#pluralidadSujetos').prop('disabled', true)
    $('#btnAdherentes').prop('disabled', true)
    $('#pagosMes').prop('disabled', true)
    $('#retencionesMes').prop('disabled', true)
    $('#tipoPersona').prop('disabled', true)
}

const monoToGo = document.getElementById("footer-card")

$('#ret').on("click", function(){
    retCalc();
    $('#datosNeto').val(importeNeto.value)
    $('#datosPagosAnteriores').val(pagosMes.value)
    $('#datosRetAnteriores').val(retencionesMes.value)
    if ($(window).width() < 992) {
      monoToGo.scrollIntoView()
   }
   else {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
   }
    $('#offcanvasScrolling').hide()
})

$('#ingresosAnuales').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelIngresosAnuales').text("Ingresos anuales");
    } else {
        $('#labelIngresosAnuales').text("Ingresos mensuales");
    }
})

$('#adherentes').click(function(){
    if ($(this).prop('checked') == true) {
        $('#adherentesVal').show()
        $('#btnAdherentes').show()
    } else {
        $('#adherentesVal').hide()
        $('#adherentesVal').val("")
        $('#btnAdherentes').hide()
    }
})

let codigoRetencion = document.getElementById("codigoRetencion");
let retencion = document.getElementById("retencion");
let ret = document.getElementById("ret");
let nuevoCalculo = document.getElementById("nuevoCalculo");
let btnAdherentes = document.getElementById("btnAdherentes");
$('#tipoActividad').change(function(){
    switch($(this).val()){
        case "Selecciona...":
            $('#retencion').hide()
            $('#alertDatosRetencion').hide()
            $('#datosImporteRetencion').hide()
        break;
        case "1":
            codigoRetencion.innerText = "Locaciones y/o Prestaciones de Servicios";
            retencion.className = "alert bg-danger-subtle fs-5";
            ret.className = "btn btn-outline-danger fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-danger fs-4 fw-bold";
            btnAdherentes.className = "btn btn-outline-danger btn-sm mt-4 mb-3 fs-5";
            $('#retencion').show()
        break;
        case "2":
            codigoRetencion.innerText = "Venta de cosas muebles";
            retencion.className = "alert bg-primary-subtle fs-5";
            ret.className = "btn btn-outline-primary fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-primary fs-4 fw-bold";
            btnAdherentes.className = "btn btn-outline-primary btn-sm mt-4 mb-3 fs-5";
            $('#retencion').show()
        break;
    }

})

$('#ingresosBrutos').on('change', function(){
    if ($('#ingresosBrutos').val() <= 0 ) {
        $('#ret').prop('disabled', true)
    } else {
        $('#ret').prop('disabled', false)
        ingresosBrutosJS = $('#ingresosBrutos').val().replace(/\./g, '').replace(",", ".")
        // de aquí en adelante, cambiar a una sección de cálculo general luego de cargar todos los parámetros para tomar el índice más alto
        if ($('#tipoActividad').val() === "1") {
          if (ingresosBrutosJS <= 1414762.58) {
            console.log(categoriaServicios.catAs.impuesto)
            console.log(categoriaServicios.catAs.indice)
          } else if (ingresosBrutosJS <= 2103025.45) {
            console.log(categoriaServicios.catBs.impuesto)
            console.log(categoriaServicios.catBs.indice)
          }
            
        }
    }
})

$('#btnAdherentes').click(function(){
  numeroAdherentes = document.getElementById("adherentesVal").value
})


function cargaInicio(){
   $('#retencion').hide()
   $('#tipoPersona').hide()
   $('#labelPersona').hide()
   $('#alertDatosRetencion').hide()
   $('#datosImporteRetencion').hide()
   $('#divPluralidad').hide()
   $('#ret').prop('disabled', true)
   $('#alertRetencionPluralidad').hide()
}

$('#nuevoCalculo').on("click", function(){
  window.location.href = '/blog/h-ret-ganancias.html'
})

let categoriaServicios = {
  catAs:
  {
    indice: 1,
    categoria: "A",
    ingresosBrutos: 1414762.58,
    superficie: 30,
    energia: 3300,
    alquileres: 230178.48,
    impuesto: 496.85,
    sipa: 2192.15,
    obra: 3061.75,
  },
  catBs:
  {
    indice: 2,
    categoria: "B",
    ingresosBrutos: 2103025.45,
    superficie: 45,
    energia: 5000,
    alquileres: 230178.48,
    impuesto: 957.27,
    sipa: 2411.36,
    obra: 3061.75,
  },
  catCs:
  {
    indice: 3,
    categoria: "C",
    ingresosBrutos: 2944235.60,
    superficie: 60,
    energia: 6700,
    alquileres: 460356.93,
    impuesto: 1636.83,
    sipa: 2652.52,
    obra: 3061.75,
  },
  catDs:
  {
    indice: 4,
    categoria: "D",
    ingresosBrutos: 3656604.33,
    superficie: 85,
    energia: 10000,
    alquileres: 460356.93,
    impuesto: 2689.05,
    sipa: 2917.75,
    obra: 3638.26,
  },
  catEs:
  {
    indice: 5,
    categoria: "E",
    ingresosBrutos: 4305799.15,
    superficie: 110,
    energia: 13000,
    alquileres: 573619.32,
    impuesto: 5115.04,
    sipa: 3209.55,
    obra: 4452.02,
  },
  catFs:
  {
    indice: 6,
    categoria: "F",
    ingresosBrutos: 5382248.94,
    superficie: 150,
    energia: 16500,
    alquileres: 575446.12,
    impuesto: 7036.89,
    sipa: 3530.49,
    obra: 5145.02,
  },
  catGs:
  {
    indice: 7,
    categoria: "G",
    ingresosBrutos: 6458698.71,
    superficie: 200,
    energia: 20000,
    alquileres: 690535.39,
    impuesto: 8951.39,
    sipa: 3883.53,
    obra: 5512.52,
  },
  catHs:
  {
    indice: 8,
    categoria: "H",
    ingresosBrutos: 7996484.12,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 20460.26,
    sipa: 4271.88,
    obra: 6615.02,
  },

}

let categoriaVentas = {
  catAv:
  {
    indice: 1,
    categoria: "A",
    ingresosBrutos: 1414762.58,
    superficie: 30,
    energia: 3300,
    alquileres: 230178.48,
    impuesto: 496.85,
    sipa: 2192.15,
    obra: 3061.75,
    pUnitario: 85627.66,
  },
  catBv:
  {
    indice: 2,
    categoria: "B",
    ingresosBrutos: 2103025.45,
    superficie: 45,
    energia: 5000,
    alquileres: 230178.48,
    impuesto: 957.27,
    sipa: 2411.36,
    obra: 3061.75,
    pUnitario: 85627.66,
  },
  catCv:
  {
    indice: 3,
    categoria: "C",
    ingresosBrutos: 2944235.60,
    superficie: 60,
    energia: 6700,
    alquileres: 460356.93,
    impuesto: 1512.56,
    sipa: 2652.52,
    obra: 3061.75,
    pUnitario: 85627.66,
  },
  catDv:
  {
    indice: 4,
    categoria: "D",
    ingresosBrutos: 3656604.33,
    superficie: 85,
    energia: 10000,
    alquileres: 460356.93,
    impuesto: 2484.46,
    sipa: 2917.75,
    obra: 3638.26,
    pUnitario: 85627.66,
  },
  catEv:
  {
    indice: 5,
    categoria: "E",
    ingresosBrutos: 4305799.15,
    superficie: 110,
    energia: 13000,
    alquileres: 573619.32,
    impuesto: 3967.80,
    sipa: 3209.55,
    obra: 4452.02,
    pUnitario: 85627.66,
  },
  catFv:
  {
    indice: 6,
    categoria: "F",
    ingresosBrutos: 5382248.94,
    superficie: 150,
    energia: 16500,
    alquileres: 575446.12,
    impuesto: 5180.81,
    sipa: 3530.49,
    obra: 5145.02,
    pUnitario: 85627.66,
  },
  catGv:
  {
    indice: 7,
    categoria: "G",
    ingresosBrutos: 6458698.71,
    superficie: 200,
    energia: 20000,
    alquileres: 690535.39,
    impuesto: 6459.54,
    sipa: 3883.53,
    obra: 5512.52,
    pUnitario: 85627.66,
  },
  catHv:
  {
    indice: 8,
    categoria: "H",
    ingresosBrutos: 7996484.12,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 15856.76,
    sipa: 4271.88,
    obra: 6615.02,
    pUnitario: 85627.66,
  },
  catIv:
  {
    indice: 9,
    categoria: "I",
    ingresosBrutos: 8949911.06,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 25575.36,
    sipa: 4699.08,
    obra: 8190.03,
    pUnitario: 85627.66,
  },
  catJv:
  {
    indice: 10,
    categoria: "J",
    ingresosBrutos: 10257028.68,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 30054.72,
    sipa: 5169.03,
    obra: 9166.53,
    pUnitario: 85627.66,
  },
  catKv:
  {
    indice: 11,
    categoria: "K",
    ingresosBrutos: 11379612.01,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 34526.76,
    sipa: 5685.87,
    obra: 10505.29,
    pUnitario: 85627.66,
  },

}

$(function(){
    $('#ingresosBrutos').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#retencionesMes').mask('000.000.000.000.000,00', {reverse: true});
  });