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
        let importeRetInscripto = (+importeNetoNum + +pagosMesNum - 11200) * 0.06 - +retencionesMesNum
        if (importeRetInscripto < 240) {
            $('#importeRet').val("Menor al mínimo")
        } else {
            document.getElementById("importeRet").value = Intl.NumberFormat("es", {style: "currency", currency:"USD", currencySign: "accounting"}).format(importeRetInscripto).replace("US$", "")
        }
        $('#datosMin').val("240,00")
        $('#datosMNSR').val("11.200,00")
        $('#alertDatosRetencion').show()
        $('#datosRetencion').text("Datos retención alquileres")
        $('#datosImporteRetencionAlquilere').show()

    } else if ($('#tipoPersona').prop('checked')) {
        let importeRetPersona = (+importeNetoNum + +pagosMesNum) * 0.28 - +retencionesMesNum
        if (importeRetPersona < 1020) {
            $('#importeRet').val("Menor al mínimo")
        } else {
            document.getElementById("importeRet").value = Intl.NumberFormat("es", {style: "currency", currency:"USD", currencySign: "accounting"}).format(importeRetPersona).replace("US$", "")
        }
        $('#datosMin').val("1.020,00")
        $('#datosMNSR').val("-.-")
        $('#alertDatosRetencion').show()
        $('#datosRetencion').text("Datos retención alquileres")
        $('#datosImporteRetencionAlquilere').show()

    } else {
        let importeRetResto = (+importeNetoNum + +pagosMesNum) * 0.25 - +retencionesMesNum
        if (importeRetResto < 1020) {
            $('#importeRet').val("Menor al mínimo")
        } else {
            document.getElementById("importeRet").value = Intl.NumberFormat("es", {style: "currency", currency:"USD", currencySign: "accounting"}).format(importeRetResto).replace("US$", "")
        }
        $('#datosMin').val("1.020,00")
        $('#datosMNSR').val("-.-")
        $('#alertDatosRetencion').show()
        $('#datosRetencion').text("Datos retención alquileres")
        $('#datosImporteRetencionAlquilere').show()

    }
    
}
};

$('#ret').on("click", function(){
    retCalc();
    $('#datosNeto').val(importeNeto.value)
    $('#datosPagosAnteriores').val(pagosMes.value)
    $('#datosRetAnteriores').val(retencionesMes.value)
    
})

$('#inscriptoGanancias').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelInscriptoGanancias').text("Inscripto ganancias");
        $('#tipoPersona').hide()
        $('#labelPersona').hide()
    } else {
        $('#labelInscriptoGanancias').text("NO inscripto ganancias");
        $('#tipoPersona').show()
        $('#labelPersona').show()
    }
})

$('#tipoPersona').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelPersona').text("PH / SI");
        $('#inscriptoGanancias').show();
    } else {
        $('#labelPersona').text("Resto de sujetos");
        $('#inscriptoGanancias').show();
    }
})

$('#regRet').change(function(){
    switch($(this).val()){
        case "Selecciona régimen...":
            $('#retencion').hide()
            $('#alertDatosRetencion').hide()
            $('#datosImporteRetencionAlquilere').hide()
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

$('#importeNeto').on('change', function(){
    if ($('#importeNeto').val() <= 0 ) {
        $('#ret').prop('disabled', true)
    } else {
        $('#ret').prop('disabled', false)
    }
})

function cargaInicio(){
   // $('#retencion').hide()
   $('#tipoPersona').hide()
   $('#labelPersona').hide()
   $('#alertDatosRetencion').hide()
   $('#datosImporteRetencionAlquilere').hide()
   $('#ret').prop('disabled', true)
}

$(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#retencionesMes').mask('000.000.000.000.000,00', {reverse: true});
  });