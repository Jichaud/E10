cargaInicio();
let html = ''

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

$('#pluralidadSujetos').click(function(){
    if ($(this).prop('checked') == true) {
        $('#divPluralidad').show()
    } else {
        $('#divPluralidad').hide()
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

$('#btnSumaPluralidad').click(function(){
    let sumaPluralidad = document.querySelectorAll("beneficiariosPluralidad");
    var sum = 0;
    for (var i=0;i<sumaPluralidad.length;i++) {
        sum = sum + parseFloat(sumaPluralidad.childNodes[0].nodeValue);
        console.log(sum)
    }
})

$('#btnPluralidad').click(function(){
    var number = document.getElementById("pluralidad").value;
    var divElement = document.getElementById("camposPluralidad");
    while (divElement.hasChildNodes()) {
        divElement.removeChild(divElement.lastChild);
    }
    for (i=0;i<number;i++){
        var newSpanPorcentaje = divElement.appendChild(document.createElement("span"));
        newSpanPorcentaje.className = "fw-bold badge bg-warning text-dark mb-3 py-3 text-wrap";
        newSpanPorcentaje.textContent = "Indicar porcentaje de participación";
        var newDivElementLabel = divElement.appendChild(document.createElement("div"));
        newDivElementLabel.className = "col-4"
        var label = document.createElement("label");
        label.name = "Beneficiario" + (1+i);
        label.className = "form-check-label fw-bold"
        label.htmlFor = "beneficiario" + (1 + i);
        label.textContent = "nº " + (i+1);
        divElement.appendChild(label);
        newDivElementLabel.appendChild(label);
        var newDivElementInput = divElement.appendChild(document.createElement("div"))
        newDivElementInput.className = "col-6"
        var input = document.createElement("input");
        input.type = "text";
        input.name = "Beneficiario" + (1 + i);
        input.id = "beneficiario" + (1+ i);
        input.className = "form-control text-center mb-3 beneficiariosPluralidad";
        divElement.appendChild(input);
        divElement.appendChild(document.createElement("br"));
        newDivElementInput.appendChild(input);
    }
})

function cargaInicio(){
   // $('#retencion').hide()
   $('#tipoPersona').hide()
   $('#labelPersona').hide()
   $('#alertDatosRetencion').hide()
   $('#datosImporteRetencionAlquilere').hide()
   $('#divPluralidad').hide()
   $('#ret').prop('disabled', true)
}

$(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#retencionesMes').mask('000.000.000.000.000,00', {reverse: true});
  });