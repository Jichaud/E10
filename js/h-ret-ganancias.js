cargaInicio();

function retAlquileresCalc () {
    let importeNeto = document.getElementById("importeNeto").value;
    let pagosMes = document.getElementById("pagosMes").value;
    let importeNetoNum = importeNeto.replace(/\./g,'').replace(",",".")
    let pagosMesNum = pagosMes.replace(/\./g,'').replace(",",".")
    document.getElementById("importeRetAlquileres").value = Intl.NumberFormat("es-ES", {minimumFractionDigits: 2}).format(+importeNetoNum + +pagosMesNum)
        
    // console.log(importeNetoNum)
}

$('#retAlquileres').on("click", function(){
    retAlquileresCalc();
    
})

$('#inscriptoGanancias').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelInscriptoGanancias').text("Inscripto ganancias");
        $('#datosMin').val("240,00")
        $('#datosMNSR').val("11.200,00")
    } else {
        $('#labelInscriptoGanancias').text("NO inscripto ganancias");
        $('#datosMin').val("1.020,00")
        $('#datosMNSR').val("-.-")
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

$(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#importeRetAlquileres').mask('000.000.000.000.000,00', {reverse: true});
  });