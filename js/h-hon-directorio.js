cargaInicio();
let html = ''

$('#btnSiguienteDirectores').click(function () {
  let cantidadDirectores = document.getElementById("cantidadDirectores").value;
  $('#cantidadDirectoresList').text(cantidadDirectores)
  let femeninoSelector = $('input.femeninoSelector:checked')
  $('#femeninoList').text(femeninoSelector.length)
  let masculinoSelector = $('input.masculinoSelector:checked')
  $('#masculinoList').text(masculinoSelector.length)
  let transgeneroSelector = $('input.transgeneroSelector:checked')
  $('#transgeneroList').text(transgeneroSelector.length)

  let totalHonorarios = function () {
    let sum = 0;
    $('.directoresPluralidad').each(function () {
      let numHono = $(this).val().replace(/\./g, '').replace(",", ".")
      sum += parseFloat(numHono);
    })

    $('#totalHonorario').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(sum.toFixed(2)).replace("US$", "")}`)

  }

  totalHonorarios();

  let resultadoEECC = document.getElementById("resultadoEECC").value
  $('#totalEECC').val(`$${resultadoEECC}`)

  let impuestoGanancias = document.getElementById("impuestoGanancias").value
  $('#totalIIGG').val(`$${impuestoGanancias}`)

  let UiHono = document.getElementById("UiHono").value
  $('#totalUiHono').val(`$${UiHono}`)


  // Function tope 1

  let htmlTopeUno = ''

  const datosTope1 = document.getElementById("datosTope1")

  for (i = 1; i <= cantidadDirectores; i++) {
    if ($('#femenino' + i).prop('checked') == true) {
      htmlTopeUno += `
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold" id="femeninoVal">Director</div>
          <p class="femeninoVal">17.500,00</p>
        </div>
        <span class="badge bg-danger rounded-pill">Género: Mujer</span>
      </li>
    </ol>
      `
      datosTope1.innerHTML = htmlTopeUno;
    } else if ($('#masculino' + i).prop('checked') == true) {
      htmlTopeUno += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Director</div>
            <p class="masculinoVal">12.500,00</p>
          </div>
          <span class="badge bg-danger rounded-pill">Género: Masculino</span>
        </li>
      </ol>
        `
      datosTope1.innerHTML = htmlTopeUno;
    } else if ($('#transgenero' + i).prop('checked') == true) {
      htmlTopeUno += `
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold" id="transgeneroVal">Director</div>
          <p class="transgeneroVal">20.000,00</p>
        </div>
        <span class="badge bg-danger rounded-pill">Género: Transgénero</span>
      </li>
    </ol>
      `
      datosTope1.innerHTML = htmlTopeUno;
    }

  }

  let totalTope1Val = function () {
    let sum = 0;
    $('.masculinoVal').each(function () {
      let numMasc = $(this).text().replace(/\./g, '').replace(",", ".")
      sum += parseFloat(numMasc);
    })

    $('.femeninoVal').each(function () {
      let numFem = $(this).text().replace(/\./g, '').replace(",", ".")
      sum += parseFloat(numFem);
    })

    $('.transgeneroVal').each(function () {
      let numTrans = $(this).text().replace(/\./g, '').replace(",", ".")
      sum += parseFloat(numTrans);
    })

    $('#totalTopeUno').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(sum.toFixed(2)).replace("US$", "")}`)

  }

  totalTope1Val();
  // FINAL Function tope 1

  
  // Function tope 2

  let resultadoEECCTopeDos = resultadoEECC.replace(/\./g, '').replace(",", ".")
  let impuestoGananciasTopeDos = impuestoGanancias.replace(/\./g, '').replace(",", ".")
  let totalHonorario = $('#totalHonorario').val()
  let totalHonorarioTopeDos = totalHonorario.replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
  let UiHonoTopeDos = UiHono.replace(/\./g, '').replace(",", ".")
  let htmlTopeDos = ''
  const datosTope2 = document.getElementById("datosTope2")
  

  let totalTope2Val = function () {

    if ($('#IIGGdiferido').prop('checked') == true) {
      if (UiHonoTopeDos <= 7604948.57) {

        let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

        if (totalTope2HtmlIIGG < 0) {
  
          totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        } else {
  
          totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25
  
          htmlTopeDos +=
            `
      <img src="bimages/primerTramo.webp" class="ms-3 img-fluid" alt="Primer tramo">
      `
          datosTope2.innerHTML = htmlTopeDos;
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        }
  
      } else if (UiHonoTopeDos <= 76049485.68) {
  
        let totalTope2HtmlIIGG = (1901237.14 + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (7604948.57 * 0.3)) / (1 - 0.25 * 0.3)
  
        if (totalTope2HtmlIIGG < 0) {
  
          totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        } else {
  
          totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25
  
          htmlTopeDos +=
            `
      <img src="bimages/segundoTramo.webp" class="ms-3 img-fluid" alt="Segundo tramo">
      `
          datosTope2.innerHTML = htmlTopeDos;
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        }
  
      } else {
  
        let totalTope2HtmlIIGG = (22434598.28 + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (76049485.68 * 0.35)) / (1 - 0.25 * 0.35)
  
        if (totalTope2HtmlIIGG < 0) {
  
          let totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        } else {
  
          let totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25
  
          htmlTopeDos +=
            `
      <img src="bimages/tercerTramo.webp" class="ms-3 img-fluid" alt="Segundo tramo">
      `
          datosTope2.innerHTML = htmlTopeDos;
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        }
  
      }
  
    } else {

      if (UiHonoTopeDos <= 7604948.57) {

        let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

        if (totalTope2HtmlIIGG < 0) {
  
          totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        } else {
  
          totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25
  
          htmlTopeDos +=
            `
      <img src="bimages/primerTramo.webp" class="ms-3 img-fluid" alt="Primer tramo">
      `
          datosTope2.innerHTML = htmlTopeDos;
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        }
  
      } else if (UiHonoTopeDos <= 76049485.68) {
  
        let totalTope2HtmlIIGG = (1901237.14 + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (7604948.57 * 0.3)) / (1 - 0.25 * 0.3)
  
        if (totalTope2HtmlIIGG < 0) {
  
          totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        } else {
  
          totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25
  
          htmlTopeDos +=
            `
      <img src="bimages/segundoTramo.webp" class="ms-3 img-fluid" alt="Segundo tramo">
      `
          datosTope2.innerHTML = htmlTopeDos;
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        }
  
      } else {
  
        let totalTope2HtmlIIGG = (22434598.28 + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (76049485.68 * 0.35)) / (1 - 0.25 * 0.35)
  
        if (totalTope2HtmlIIGG < 0) {
  
          let totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        } else {
  
          let totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25
  
          htmlTopeDos +=
            `
      <img src="bimages/tercerTramo.webp" class="ms-3 img-fluid" alt="Segundo tramo">
      `
          datosTope2.innerHTML = htmlTopeDos;
  
          $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)
  
        }
  
      }
  
    }
  }

  totalTope2Val();

  // Evalúa valor negativo de tope 2
  let totalTopeDosNeg = $('#totalTopeDos').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
  if (+totalTopeDosNeg < 0) {
    $('#totalTopeDos').val("Negativo")
    datosTope2.innerHTML = '';
  }

  // FINAL Function tope 2

  // INICIO honorario deducible
  function honorarioDeducible() {
    let totalTopeDosEval = $('#totalTopeDos').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let totalTopeUnoEval = $('#totalTopeUno').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    if (+totalTopeDosEval > +totalTopeUnoEval) {
      $('#maxTope').val($('#totalTopeDos').val())
    } else {
      $('#maxTope').val($('#totalTopeUno').val())
    }

    $('#honoAsignado').val($('#totalHonorario').val())

    let maxTopeEval = $('#maxTope').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let honoAsignadoEval = $('#honoAsignado').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")

    if (+maxTopeEval > +honoAsignadoEval) {
      $('#honoDeducible').val($('#honoAsignado').val())
    } else {
      $('#honoDeducible').val($('#maxTope').val())
    }

  }

  honorarioDeducible();

  // FINAL honorario deducible

  // INICIO function tratamiento perceptores
  function tratamientoPerceptores() {
    $('#aprobadoPerceptores').val($('#honoAsignado').val())
    $('#deducidoPerceptores').val($('#honoDeducible').val())
    let aprobadoPerceptoresEval = $('#aprobadoPerceptores').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let deducidoPerceptoresEval = $('#deducidoPerceptores').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let excedentePerceptoresEval = +aprobadoPerceptoresEval - +deducidoPerceptoresEval
    $('#excedentePerceptores').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(excedentePerceptoresEval).replace("US$", "")}`)

    $('#UIPerceptores').val($('#totalUiHono').val())
    $('#deducidoPerceptoresDos').val($('#honoDeducible').val())
    let UIPerceptoresEval = $('#UIPerceptores').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let deducidoPerceptoresDosEval = $('#deducidoPerceptoresDos').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let gnsaiEval = +UIPerceptoresEval - +deducidoPerceptoresDosEval
    $('#gnsaiPerceptores').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(gnsaiEval).replace("US$", "")}`)

  }
  // FINAL function tratamiento perceptores

  tratamientoPerceptores();
  
})

$('#btnDirectores').click(function(){
    var number = document.getElementById("cantidadDirectores").value;
    var divElement = document.getElementById("camposDirectores");
    while (divElement.hasChildNodes()) {
        divElement.removeChild(divElement.lastChild);
    }
    for (i=0;i<number;i++){
        var newDivElementLabel = divElement.appendChild(document.createElement("div"));
        newDivElementLabel.className = "col-3"
        var label = document.createElement("label");
        label.name = "Beneficiario" + (1+i);
        label.className = "form-check-label fw-bold mt-3"
        label.htmlFor = "beneficiario" + (1 + i);
        label.textContent = "nº " + (i+1);
        divElement.appendChild(label);
        newDivElementLabel.appendChild(label);
        var newDivElementInput = divElement.appendChild(document.createElement("div"))
        newDivElementInput.className = "col-9"
        var input = document.createElement("input");
        input.type = "text";
        input.name = "Director" + (1 + i);
        input.id = "director" + (1+ i);
        input.className = "form-control text-end mt-3 mb-3 directoresPluralidad";
        divElement.appendChild(input);
        
        var checkGeneroDivF = divElement.appendChild(document.createElement("div"));
        checkGeneroDivF.className = "form-check";
        var checkGeneroInputF = document.createElement("input");
        checkGeneroInputF.type = "radio";
        checkGeneroInputF.className = "form-check-input mb-3 femeninoSelector";
        checkGeneroInputF.name = "Genero" + (i+1);
        checkGeneroInputF.id = "femenino" + (i+1);
        var checkGeneroInputLabelF = document.createElement("label");
        checkGeneroInputLabelF.className = "form-check-label";
        checkGeneroInputLabelF.htmlFor = "femenino" + (i+1);
        checkGeneroInputLabelF.textContent = "Mujer";
        divElement.appendChild(checkGeneroInputF);
        divElement.appendChild(checkGeneroInputLabelF);
        checkGeneroDivF.appendChild(checkGeneroInputF);
        checkGeneroDivF.appendChild(checkGeneroInputLabelF);

        var checkGeneroDivM = divElement.appendChild(document.createElement("div"));
        checkGeneroDivM.className = "form-check";
        var checkGeneroInputM = document.createElement("input");
        checkGeneroInputM.type = "radio";
        checkGeneroInputM.className = "form-check-input mb-3 masculinoSelector";
        checkGeneroInputM.name = "Genero" + (i+1);
        checkGeneroInputM.id = "masculino" + (i+1);
        var checkGeneroInputLabelM = document.createElement("label");
        checkGeneroInputLabelM.className = "form-check-label";
        checkGeneroInputLabelM.htmlFor = "masculino" + (i+1);
        checkGeneroInputLabelM.textContent = "Masculino";
        divElement.appendChild(checkGeneroInputM);
        divElement.appendChild(checkGeneroInputLabelM);
        checkGeneroDivM.appendChild(checkGeneroInputM);
        checkGeneroDivM.appendChild(checkGeneroInputLabelM);

        var checkGeneroDivT = divElement.appendChild(document.createElement("div"));
        checkGeneroDivT.className = "form-check";
        var checkGeneroInputT = document.createElement("input");
        checkGeneroInputT.type = "radio";
        checkGeneroInputT.className = "form-check-input mb-3 transgeneroSelector";
        checkGeneroInputT.name = "Genero" + (i+1);
        checkGeneroInputT.id = "transgenero" + (i+1);
        var checkGeneroInputLabelT = document.createElement("label");
        checkGeneroInputLabelT.className = "form-check-label";
        checkGeneroInputLabelT.htmlFor = "transgenero" + (i+1);
        checkGeneroInputLabelT.textContent = "Transgénero";
        divElement.appendChild(checkGeneroInputT);
        divElement.appendChild(checkGeneroInputLabelT);
        checkGeneroDivT.appendChild(checkGeneroInputT);
        checkGeneroDivT.appendChild(checkGeneroInputLabelT);

        newDivElementInput.appendChild(input);
        newDivElementInput.appendChild(checkGeneroDivF);
        newDivElementInput.appendChild(checkGeneroDivM);
        newDivElementInput.appendChild(checkGeneroDivT);
        divElement.appendChild(document.createElement("hr"));
    }

    maskApply();

    if (number <= 0) {
      $('#btnSiguienteDirectores').prop("hidden", true)
    } else {
      $('#btnSiguienteDirectores').prop("hidden", false)
    }
})

$('#IIGGdiferido').click(function(){
  if ($(this).prop('checked') == true) {
      $('#labelIIGGdiferido').text("IIGG negativo");
  } else {
    $('#labelIIGGdiferido').text("IIGG positivo");
  }
})

function cargaInicio(){
/*    $('#retencion').hide()
   $('#tipoPersona').hide()
   $('#labelPersona').hide()
   $('#divPluralidad').hide()
   $('#ret').prop('disabled', true) */
   maskApply();
}

$('#nuevoCalculo').on("click", function(){
    location.reload(true);
})

function maskApply() {
$(document).ready(function(){
    $('.directoresPluralidad').mask('000.000.000.000.000,00', {reverse: true});
    $('#resultadoEECC').mask('000.000.000.000.000,00', {reverse: true});
    $('#impuestoGanancias').mask('000.000.000.000.000,00', {reverse: true});
    $('#UiHono').mask('000.000.000.000.000,00', {reverse: true});
  });
}