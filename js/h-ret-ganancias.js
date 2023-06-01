cargaInicio();

function retCalc () {

    let importeNeto = document.getElementById("importeNeto").value;
    let pagosMes = document.getElementById("pagosMes").value;
    let retencionesMes = document.getElementById("retencionesMes").value;
    let importeNetoNum = importeNeto.replace(/\./g,'').replace(",",".")
    let pagosMesNum = pagosMes.replace(/\./g,'').replace(",",".")
    let retencionesMesNum = retencionesMes.replace(/\./g,'').replace(",",".")

    switch($('#regRet').val()){
        case "31":
    if ($('#inscriptoGanancias').prop('checked') == true) {
    document.getElementById("importeRet").value = Intl.NumberFormat("es-ES", {minimumFractionDigits: 2}).format((+importeNetoNum - +pagosMesNum - 11200) * 0.06 - +retencionesMesNum)
    } else if ($('#tipoPersona').prop('checked')) {
        document.getElementById("importeRet").value = Intl.NumberFormat("es-ES", {minimumFractionDigits: 2}).format((+importeNetoNum - +pagosMesNum) * 0.28 - +retencionesMesNum)
    } else {
        document.getElementById("importeRet").value = Intl.NumberFormat("es-ES", {minimumFractionDigits: 2}).format((+importeNetoNum - +pagosMesNum) * 0.25 - +retencionesMesNum)
    }
}
};

$('#ret').on("click", function(){
    retCalc();
    
})

$('#inscriptoGanancias').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelInscriptoGanancias').text("Inscripto ganancias");
        $('#datosMin').val("240,00")
        $('#datosMNSR').val("11.200,00")
        $('#tipoPersona').hide()
        $('#labelPersona').hide()
    } else {
        $('#labelInscriptoGanancias').text("NO inscripto ganancias");
        $('#datosMin').val("1.020,00")
        $('#datosMNSR').val("-.-")
        $('#tipoPersona').show()
        $('#labelPersona').show()
    }
})

$('#tipoPersona').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelPersona').text("PH / SI");
    } else {
        $('#labelPersona').text("Resto de sujetos");
    }
})

$('#regRet').change(function(){
    switch($(this).val()){
        case "Selecciona régimen...":
            $('#retencion').hide()
        break;
        case "31":
            $('#retencion').show()
        break;
        case "78":
            $('#retencion').hide()
        break;
        case "94":
            $('#retencion').hide()
        break;
        case "116":
            $('#retencion').hide()
        break;
    }

})

function cargaInicio(){
   // $('#retencion').hide()
   $('#tipoPersona').hide()
   $('#labelPersona').hide()
}

$(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#retencionesMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#importeRet').mask('000.000.000.000.000,00', {reverse: true});
  });