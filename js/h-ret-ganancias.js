cargaInicio();
let html = ''

function retCalc () {

    let importeNeto = document.getElementById("importeNeto").value;
    let pagosMes = document.getElementById("pagosMes").value;
    let retencionesMes = document.getElementById("retencionesMes").value;
    let importeNetoNum = importeNeto.replace(/\./g,'').replace(",",".")
    let pagosMesNum = pagosMes.replace(/\./g,'').replace(",",".")
    let retencionesMesNum = retencionesMes.replace(/\./g,'').replace(",",".")
    const datosAlertPluralidad = document.getElementById("datosImporteRetencionAlquileresPluralidad")

    switch($('#regRet').val()){
        case "31":
    if ($('#inscriptoGanancias').prop('checked') == true) {
        if ($('#pluralidadSujetos').prop('checked') == true) {
            let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
            let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
            for (let sumaPlu of sumaPluralidad) {
                calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 11200) * 0.06 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                let redondeo = Intl.NumberFormat("es", {style: "currency", currency:"USD", currencySign: "accounting"}).format((calculoSumaPlu*100)/100).replace("US$", "")
                    html += `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">Beneficiario</div>
                        ${redondeo}
                      </div>
                      <span class="badge bg-secondary rounded-pill">Alquileres</span>
                    </li>
                  </ol>
                    `
            }
            datosAlertPluralidad.innerHTML = html;
            $('#pDatosRetencionPluralidad').text("Retención alquileres");
            alertRetencionPluralidad.className = "alert alert-warning";
            $('#alertRetencionPluralidad').show()
            $('#datosMin').val("240,00")
            $('#datosMNSR').val("11.200,00")
            $('#alertDatosRetencion').show()
            $('#datosRetencion').text("Datos retención alquileres")

        } else {
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
        $('#datosImporteRetencionAlquileres').show()
        }
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
        $('#datosImporteRetencionAlquileres').show()

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
        $('#datosImporteRetencionAlquileres').show()

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
        $('#pluralidad').val("")
        $('.beneficiariosPluralidad').val("")
    }
})

let codigoRetencion = document.getElementById("codigoRetencion");
let retencion = document.getElementById("retencion");
let ret = document.getElementById("ret");
let nuevoCalculo = document.getElementById("nuevoCalculo");
let btnPluralidad = document.getElementById("btnPluralidad");
$('#regRet').change(function(){
    switch($(this).val()){
        case "Selecciona régimen...":
            $('#retencion').hide()
            $('#alertDatosRetencion').hide()
            $('#datosImporteRetencionAlquilere').hide()
        break;
        case "31":
            codigoRetencion.innerText = "Alquileres";
            retencion.className = "alert bg-warning-subtle fs-5";
            ret.className = "btn btn-outline-warning fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-warning fs-4 fw-bold";
            btnPluralidad.className = "btn btn-outline-warning fs-4 fw-bold";
            $('#retencion').show()
        break;
        case "78":
            codigoRetencion.innerText = "Enajenación de bienes";
            retencion.className = "alert bg-primary-subtle fs-5";
            ret.className = "btn btn-outline-primary fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-primary fs-4 fw-bold";
            btnPluralidad.className = "btn btn-outline-primary fs-4 fw-bold";
            $('#retencion').show()
        break;
        case "94":
            codigoRetencion.innerText = "Servicios";
            retencion.className = "alert bg-success-subtle fs-5";
            ret.className = "btn btn-outline-success fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-success fs-4 fw-bold";
            btnPluralidad.className = "btn btn-outline-success fs-4 fw-bold";
            $('#retencion').show()
        break;
        case "116":
            codigoRetencion.innerText = "Profesiones liberales";
            retencion.className = "alert bg-danger-subtle fs-5";
            ret.className = "btn btn-outline-danger fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-danger fs-4 fw-bold";
            btnPluralidad.className = "btn btn-outline-danger fs-4 fw-bold";
            $('#retencion').show()
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

$('#btnPluralidad').click(function(){
    var number = document.getElementById("pluralidad").value;
    var divElement = document.getElementById("camposPluralidad");
    while (divElement.hasChildNodes()) {
        divElement.removeChild(divElement.lastChild);
    }
    for (i=0;i<number;i++){
        var newSpanPorcentaje = divElement.appendChild(document.createElement("span"));
        newSpanPorcentaje.className = "fw-bold badge bg-secondary text-light mt-3 mb-3 py-3 text-wrap";
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
   $('#retencion').hide()
   $('#tipoPersona').hide()
   $('#labelPersona').hide()
   $('#alertDatosRetencion').hide()
   $('#datosImporteRetencionAlquileres').hide()
   $('#divPluralidad').hide()
   $('#ret').prop('disabled', true)
   $('#alertRetencionPluralidad').hide()
}

$(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#retencionesMes').mask('000.000.000.000.000,00', {reverse: true});
  });