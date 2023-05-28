cargaInicio();

let importeNeto = document.getElementById("importeNeto").value;
let pagosMes = document.getElementById("pagosMes").value;

function retAlquileresCalc () {
    document.getElementById("importeRetAlquileres").value = parseInt(importeNeto + pagosMes);
    
}

$('#retAlquileres').on("click", function(){
    retAlquileresCalc();
})

$('#inscriptoGanancias').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelInscriptoGanancias').text("Inscripto ganancias");
    } else {
        $('#labelInscriptoGanancias').text("NO inscripto ganancias");
    }
})

$('#regRet').change(function(){
    switch($(this).val()){
        case "Selecciona régimen...":
            $('#retencionAlquileres').hide()
        break;
        case "31":
            $('#retencionAlquileres').show()
        break;
        case "78":
            $('#retencionAlquileres').hide()
        break;
        case "94":
            $('#retencionAlquileres').hide()
        break;
        case "116":
            $('#retencionAlquileres').hide()
        break;
    }

})

function cargaInicio(){
   // $('#retencionAlquileres').hide()
}

// Mask values
/* $(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
  }); */