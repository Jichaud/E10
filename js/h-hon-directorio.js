cargaInicio();
let html = ''

$('#btnSiguienteDirectores').click(function () {
  $('#periodoFiscalDato').show()
  $('#ret').show()
  $('#resumenCargaDatos').show()
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });


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
          <p class="femeninoVal" id="honoTopeUnoVal${i}">17.500,00</p>
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
            <div class="fw-bold" id="masculinoVal">Director</div>
            <p class="masculinoVal" id="honoTopeUnoVal${i}">12.500,00</p>
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
          <p class="transgeneroVal" id="honoTopeUnoVal${i}">20.000,00</p>
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
  
  if ($('#regRet').val() == 2021) {
      primerTramoHasta = 5000000;
      segundoTramoDesde = 5000000;
      segundoTramoHasta = 50000000;
      segundoTramoFijo = 1250000;
      segundoTramoExcedente = 5000000;
      tercerTramoDesde = 50000000;
      tercerTramoFijo = 14750000;
      tercerTamoExcedente = 50000000;
  } else if ($('#regRet').val() == 2022) {
      primerTramoHasta = 7604948.57;
      segundoTramoDesde = 7604948.57;
      segundoTramoHasta = 76049485.68;
      segundoTramoFijo = 1901237.14;
      segundoTramoExcedente = 7604948.57;
      tercerTramoDesde = 76049485.68;
      tercerTramoFijo = 22434598.28;
      tercerTamoExcedente = 76049485.68;
    }

  let totalTope2Val = function () {

    // PERÍODO FISCAL 2021
    if ($('#regRet').val() == 2021) {

      $('#periodoFiscalDato').text("Estás calculando para el período fiscal 2021")

      // Resultado positivo - IIGG negativo
      if ($('#resultadoPositivo').prop('checked') == true) {
        if ($('#IIGGdiferido').prop('checked') == true) {
          if (UiHonoTopeDos <= primerTramoHasta) {

            let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/primerTramo2021.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else if (UiHonoTopeDos <= segundoTramoHasta) {

            let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoDesde * 0.3)) / (1 - 0.25 * 0.3)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/segundoTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else {

            let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

            if (totalTope2HtmlIIGG < 0) {

              let totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              let totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/tercerTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } // FIN Resultado positivo - IIGG negativo

        } else {

          // Resultado positivo - IIGG positivo
          if (UiHonoTopeDos <= primerTramoHasta) {

            let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/primerTramo2021.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else if (UiHonoTopeDos <= segundoTramoHasta) {

            let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoDesde * 0.3)) / (1 - 0.25 * 0.3)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/segundoTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else {

            let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

            if (totalTope2HtmlIIGG < 0) {

              let totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              let totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/tercerTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          }

        } // FIN Resultado positivo - IIGG positivo
      }

      // Resultado negativo - IIGG negativo
      if ($('#resultadoPositivo').prop('checked') == false) {
      if ($('#IIGGdiferido').prop('checked') == true) {
        if (UiHonoTopeDos <= primerTramoHasta) {

          let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/primerTramo2021.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else if (UiHonoTopeDos <= segundoTramoHasta) {

          let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoExcedente * 0.3)) / (1 - 0.25 * 0.3)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/segundoTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else {
          
          let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

          if (totalTope2HtmlIIGG < 0) {

            let totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            let totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/tercerTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } // FIN Resultado negativo - IIGG negativo

      } else {

        // Resultado negativo - IIGG positivo
        if (UiHonoTopeDos <= primerTramoHasta) {

          let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/primerTramo2021.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else if (UiHonoTopeDos <= segundoTramoHasta) {

          let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoExcedente * 0.3)) / (1 - 0.25 * 0.3)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/segundoTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else {

          let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

          if (totalTope2HtmlIIGG < 0) {

            let totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            let totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/tercerTramo2021.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        }

      } // FIN Resultado negativo - IIGG positivo
    }
  } // FINAL PERÍODO FISCAL 2021

    // PERÍODO FISCAL 2021
    if ($('#regRet').val() == 2022) {

      $('#periodoFiscalDato').text("Estás calculando para el período fiscal 2022")

      // Resultado positivo - IIGG negativo
      if ($('#resultadoPositivo').prop('checked') == true) {
        if ($('#IIGGdiferido').prop('checked') == true) {
          if (UiHonoTopeDos <= primerTramoHasta) {

            let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/primerTramo2022.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else if (UiHonoTopeDos <= segundoTramoHasta) {

            let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoDesde * 0.3)) / (1 - 0.25 * 0.3)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/segundoTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else {

            let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

            if (totalTope2HtmlIIGG < 0) {

              let totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              let totalTope2Html = (+resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/tercerTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } // FIN Resultado positivo - IIGG negativo

        } else {

          // Resultado positivo - IIGG positivo
          if (UiHonoTopeDos <= primerTramoHasta) {

            let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/primerTramo2022.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else if (UiHonoTopeDos <= segundoTramoHasta) {

            let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoDesde * 0.3)) / (1 - 0.25 * 0.3)

            if (totalTope2HtmlIIGG < 0) {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/segundoTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          } else {

            let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

            if (totalTope2HtmlIIGG < 0) {

              let totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            } else {

              let totalTope2Html = (+resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

              htmlTopeDos +=
                `
        <img src="bimages/tercerTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
              datosTope2.innerHTML = htmlTopeDos;

              $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

            }

          }

        } // FIN Resultado positivo - IIGG positivo
      }

      // Resultado negativo - IIGG negativo
      if ($('#resultadoPositivo').prop('checked') == false) {
      if ($('#IIGGdiferido').prop('checked') == true) {
        if (UiHonoTopeDos <= primerTramoHasta) {

          let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/primerTramo2022.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else if (UiHonoTopeDos <= segundoTramoHasta) {

          let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoExcedente * 0.3)) / (1 - 0.25 * 0.3)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/segundoTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else {
          
          let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

          if (totalTope2HtmlIIGG < 0) {

            let totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            let totalTope2Html = (+-resultadoEECCTopeDos + +impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/tercerTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } // FIN Resultado negativo - IIGG negativo

      } else {

        // Resultado negativo - IIGG positivo
        if (UiHonoTopeDos <= primerTramoHasta) {

          let totalTope2HtmlIIGG = (0.25 * +UiHonoTopeDos - 0.25 * 0.25 * (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos)) / (1 - 0.25 * 0.25)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/primerTramo2022.webp" class="ms-3 img-fluid" alt="Primer tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else if (UiHonoTopeDos <= segundoTramoHasta) {

          let totalTope2HtmlIIGG = (segundoTramoFijo + 0.3 * +UiHonoTopeDos - 0.25 * 0.3 * (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (segundoTramoExcedente * 0.3)) / (1 - 0.25 * 0.3)

          if (totalTope2HtmlIIGG < 0) {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/segundoTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        } else {

          let totalTope2HtmlIIGG = (tercerTramoFijo + 0.35 * +UiHonoTopeDos - 0.25 * 0.35 * (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) - (tercerTamoExcedente * 0.35)) / (1 - 0.25 * 0.35)

          if (totalTope2HtmlIIGG < 0) {

            let totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos) * 0.25

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          } else {

            let totalTope2Html = (+-resultadoEECCTopeDos + +-impuestoGananciasTopeDos + +totalHonorarioTopeDos - totalTope2HtmlIIGG) * 0.25

            htmlTopeDos +=
              `
        <img src="bimages/tercerTramo2022.webp" class="ms-3 img-fluid" alt="Segundo tramo">
        `
            datosTope2.innerHTML = htmlTopeDos;

            $('#totalTopeDos').val(`$${Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(totalTope2Html).replace("US$", "")}`)

          }

        }

      } // FIN Resultado negativo - IIGG positivo
    }
  } // FINAL PERÍODO FISCAL 2022
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

  // INICIO retención ganancias

  let htmlTratamiento = ''
  let htmlRetencion = ''

  for (i = 1; i <= cantidadDirectores; i++) {
    let directorRete = $('#director' + i).val()
    let directorReteEval = directorRete.replace(/\./g, '').replace(",", ".")
    let aprobadoTotal = $('#honoAsignado').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let porcentajeEval = Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 }).format(+directorReteEval / +aprobadoTotal)
    let honoTopeUnoVal = $('#honoTopeUnoVal' + i).text()
    let honoTopeUnoValEval = honoTopeUnoVal.replace(/\./g, '').replace(",", ".")
    let totalTopeUno = $('#totalTopeUno').val()
    let totalTopeUnoEval = totalTopeUno.replace(/\$/g, '').replace(/\./g, '').replace(",", ".")

    let gnsaiRete = $('#gnsaiPerceptores').val()
    let gnsaiReteEval = gnsaiRete.replace(/\$/g, '').replace(/\./g, '').replace(",", ".")
    let excedentePerceptoresRete = $('#excedentePerceptores').val()
    let excedentePerceptoresReteEval = excedentePerceptoresRete.replace(/\$/g, '').replace(/\./g, '').replace(",", ".")


    if ($('#honoDeducible').val().replace(/\$/g, '').replace(/\./g, '').replace(",", ".") == totalTopeUnoEval) {
      if (+gnsaiReteEval < 0) {
      let noComputableRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(0).replace("US$", "")
      let gravadoRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+aprobadoTotal * (+directorReteEval / +aprobadoTotal)).replace("US$", "")
      let gravadoReteEval = gravadoRete.replace(/\./g, '').replace(",", ".")
      let retencionGananaciasHono = 0;

      if ((+gravadoReteEval - 67170) <= 0) {
        retencionGananaciasHono = 0
      } else if ((+gravadoReteEval - 67170) <= 8000) {
        retencionGananaciasHono = (+gravadoReteEval - 67170) * 0.05
      } else if ((+gravadoReteEval - 67170) <= 16000) {
        retencionGananaciasHono = 400 + (((+gravadoReteEval - 67170) - 8000) * 0.09)
      } else if ((+gravadoReteEval - 67170) <= 24000) {
        retencionGananaciasHono = 1120 + (((+gravadoReteEval - 67170) - 16000) * 0.12)
      } else if ((+gravadoReteEval - 67170) <= 32000) {
        retencionGananaciasHono = 2080 + (((+gravadoReteEval - 67170) - 24000) * 0.15)
      } else if ((+gravadoReteEval - 67170) <= 48000) {
        retencionGananaciasHono = 3280 + (((+gravadoReteEval - 67170) - 32000) * 0.19)
      } else if ((+gravadoReteEval - 67170) <= 64000) {
        retencionGananaciasHono = 6320 + (((+gravadoReteEval - 67170) - 48000) * 0.23)
      } else if ((+gravadoReteEval - 67170) <= 96000) {
        retencionGananaciasHono = 10000 + (((+gravadoReteEval - 67170) - 64000) * 0.27)
      } else if ((+gravadoReteEval - 67170) > 96000) {
        retencionGananaciasHono = 18640 + (((+gravadoReteEval - 67170) - 96000) * 0.31)
      }

      let retencionGananaciasHonoPrint = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+retencionGananaciasHono).replace("US$", "")

      htmlRetencion += `
      <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold border rounded-2 border-2 bg-secondary-subtle">Director</div>
      <div class="alert alert-danger mt-3 fs-5 fw-bold" role="alert">
        Retención ganancias ${retencionGananaciasHonoPrint}
      </div>
      </div>
      </li>
        `

      importeRetencion.innerHTML = htmlRetencion;

      htmlTratamiento += `
        <div class="table-responsive rounded-4 mt-4">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="bg-success text-light" scope="col" colspan="4">Director nº ${i}</th>
              </tr>
              <tr>
                <th class="bg-success-subtle" scope="col">Porcentaje</th>
                <th class="bg-success-subtle" scope="col">Asamblea</th>
                <th class="bg-success-subtle" scope="col">Gravado</th>
                <th class="bg-warning" scope="col">No computable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${porcentajeEval}</td>
                <td>${directorRete}</td>
                <td>${gravadoRete}</td>
                <td class="bg-warning">${noComputableRete}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `

      directorRetencion.innerHTML = htmlTratamiento;

    } else if (+gnsaiReteEval > +excedentePerceptoresReteEval) {

      let noComputableRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+directorReteEval - +honoTopeUnoValEval).replace("US$", "")
      let gravadoRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+honoTopeUnoValEval).replace("US$", "")
      let gravadoReteEval = gravadoRete.replace(/\./g, '').replace(",", ".")
      let retencionGananaciasHono = 0;


      if ((+gravadoReteEval - 67170) <= 0) {
        retencionGananaciasHono = 0
      } else if ((+gravadoReteEval - 67170) <= 8000) {
        retencionGananaciasHono = (+gravadoReteEval - 67170) * 0.05
      } else if ((+gravadoReteEval - 67170) <= 16000) {
        retencionGananaciasHono = 400 + (((+gravadoReteEval - 67170) - 8000) * 0.09)
      } else if ((+gravadoReteEval - 67170) <= 24000) {
        retencionGananaciasHono = 1120 + (((+gravadoReteEval - 67170) - 16000) * 0.12)
      } else if ((+gravadoReteEval - 67170) <= 32000) {
        retencionGananaciasHono = 2080 + (((+gravadoReteEval - 67170) - 24000) * 0.15)
      } else if ((+gravadoReteEval - 67170) <= 48000) {
        retencionGananaciasHono = 3280 + (((+gravadoReteEval - 67170) - 32000) * 0.19)
      } else if ((+gravadoReteEval - 67170) <= 64000) {
        retencionGananaciasHono = 6320 + (((+gravadoReteEval - 67170) - 48000) * 0.23)
      } else if ((+gravadoReteEval - 67170) <= 96000) {
        retencionGananaciasHono = 10000 + (((+gravadoReteEval - 67170) - 64000) * 0.27)
      } else if ((+gravadoReteEval - 67170) > 96000) {
        retencionGananaciasHono = 18640 + (((+gravadoReteEval - 67170) - 96000) * 0.31)
      }

      let retencionGananaciasHonoPrint = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+retencionGananaciasHono).replace("US$", "")

      htmlRetencion += `
      <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold border rounded-2 border-2 bg-secondary-subtle">Director</div>
      <div class="alert alert-danger mt-3 fs-5 fw-bold" role="alert">
        Retención ganancias ${retencionGananaciasHonoPrint}
      </div>
      </div>
      </li>
        `

      importeRetencion.innerHTML = htmlRetencion;

      htmlTratamiento += `
      <div class="table-responsive rounded-4 mt-4">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="bg-success text-light" scope="col" colspan="4">Director nº ${i}</th>
            </tr>
            <tr>
              <th class="bg-success-subtle" scope="col">Porcentaje</th>
              <th class="bg-success-subtle" scope="col">Asamblea</th>
              <th class="bg-success-subtle" scope="col">Gravado</th>
              <th class="bg-warning" scope="col">No computable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${porcentajeEval}</td>
              <td>${directorRete}</td>
              <td>${gravadoRete}</td>
              <td class="bg-warning">${noComputableRete}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `

      directorRetencion.innerHTML = htmlTratamiento;

    } else if (+gnsaiReteEval < +excedentePerceptoresReteEval) {

      let noComputableRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+gnsaiReteEval * (+directorReteEval / +aprobadoTotal)).replace("US$", "")
      let noComputableReteEval = noComputableRete.replace(/\./g, '').replace(",", ".")
      let gravadoRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+directorReteEval - +noComputableReteEval).replace("US$", "")
      let gravadoReteEval = gravadoRete.replace(/\./g, '').replace(",", ".")
      let retencionGananaciasHono = 0;

      if ((+gravadoReteEval - 67170) <= 0) {
        retencionGananaciasHono = 0
      } else if ((+gravadoReteEval - 67170) <= 8000) {
        retencionGananaciasHono = (+gravadoReteEval - 67170) * 0.05
      } else if ((+gravadoReteEval - 67170) <= 16000) {
        retencionGananaciasHono = 400 + (((+gravadoReteEval - 67170) - 8000) * 0.09)
      } else if ((+gravadoReteEval - 67170) <= 24000) {
        retencionGananaciasHono = 1120 + (((+gravadoReteEval - 67170) - 16000) * 0.12)
      } else if ((+gravadoReteEval - 67170) <= 32000) {
        retencionGananaciasHono = 2080 + (((+gravadoReteEval - 67170) - 24000) * 0.15)
      } else if ((+gravadoReteEval - 67170) <= 48000) {
        retencionGananaciasHono = 3280 + (((+gravadoReteEval - 67170) - 32000) * 0.19)
      } else if ((+gravadoReteEval - 67170) <= 64000) {
        retencionGananaciasHono = 6320 + (((+gravadoReteEval - 67170) - 48000) * 0.23)
      } else if ((+gravadoReteEval - 67170) <= 96000) {
        retencionGananaciasHono = 10000 + (((+gravadoReteEval - 67170) - 64000) * 0.27)
      } else if ((+gravadoReteEval - 67170) > 96000) {
        retencionGananaciasHono = 18640 + (((+gravadoReteEval - 67170) - 96000) * 0.31)
      }

      let retencionGananaciasHonoPrint = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+retencionGananaciasHono).replace("US$", "")

      htmlRetencion += `
  <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
    <div class="fw-bold border rounded-2 border-2 bg-secondary-subtle">Director</div>
  <div class="alert alert-danger mt-3 fs-5 fw-bold" role="alert">
  Retención ganancias ${retencionGananaciasHonoPrint}
  </div>
  </div>
  </li>
  `

      importeRetencion.innerHTML = htmlRetencion;

      htmlTratamiento += `
  <div class="table-responsive rounded-4 mt-4">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="bg-success text-light" scope="col" colspan="4">Director nº ${i}</th>
        </tr>
        <tr>
          <th class="bg-success-subtle" scope="col">Porcentaje</th>
          <th class="bg-success-subtle" scope="col">Asamblea</th>
          <th class="bg-success-subtle" scope="col">Gravado</th>
          <th class="bg-warning" scope="col">No computable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${porcentajeEval}</td>
          <td>${directorRete}</td>
          <td>${gravadoRete}</td>
          <td class="bg-warning">${noComputableRete}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `

      directorRetencion.innerHTML = htmlTratamiento;

    }

    // evalúa por tope 1

    } else if (+gnsaiReteEval < 0) {

      let noComputableRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(0).replace("US$", "")
      let noComputableReteEval = noComputableRete.replace(/\./g, '').replace(",", ".")
      let gravadoRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+directorReteEval - +noComputableReteEval).replace("US$", "")
      let gravadoReteEval = gravadoRete.replace(/\./g, '').replace(",", ".")
      let retencionGananaciasHono = 0;


      if ((+gravadoReteEval - 67170) <= 0) {
        retencionGananaciasHono = 0
      } else if ((+gravadoReteEval - 67170) <= 8000) {
        retencionGananaciasHono = (+gravadoReteEval - 67170) * 0.05
      } else if ((+gravadoReteEval - 67170) <= 16000) {
        retencionGananaciasHono = 400 + (((+gravadoReteEval - 67170) - 8000) * 0.09)
      } else if ((+gravadoReteEval - 67170) <= 24000) {
        retencionGananaciasHono = 1120 + (((+gravadoReteEval - 67170) - 16000) * 0.12)
      } else if ((+gravadoReteEval - 67170) <= 32000) {
        retencionGananaciasHono = 2080 + (((+gravadoReteEval - 67170) - 24000) * 0.15)
      } else if ((+gravadoReteEval - 67170) <= 48000) {
        retencionGananaciasHono = 3280 + (((+gravadoReteEval - 67170) - 32000) * 0.19)
      } else if ((+gravadoReteEval - 67170) <= 64000) {
        retencionGananaciasHono = 6320 + (((+gravadoReteEval - 67170) - 48000) * 0.23)
      } else if ((+gravadoReteEval - 67170) <= 96000) {
        retencionGananaciasHono = 10000 + (((+gravadoReteEval - 67170) - 64000) * 0.27)
      } else if ((+gravadoReteEval - 67170) > 96000) {
        retencionGananaciasHono = 18640 + (((+gravadoReteEval - 67170) - 96000) * 0.31)
      }

      let retencionGananaciasHonoPrint = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+retencionGananaciasHono).replace("US$", "")

      htmlRetencion += `
      <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold border rounded-2 border-2 bg-secondary-subtle">Director</div>
      <div class="alert alert-danger mt-3 fs-5 fw-bold" role="alert">
        Retención ganancias ${retencionGananaciasHonoPrint}
      </div>
      </div>
      </li>
        `

      importeRetencion.innerHTML = htmlRetencion;

      htmlTratamiento += `
      <div class="table-responsive rounded-4 mt-4">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="bg-success text-light" scope="col" colspan="4">Director nº ${i}</th>
            </tr>
            <tr>
              <th class="bg-success-subtle" scope="col">Porcentaje</th>
              <th class="bg-success-subtle" scope="col">Asamblea</th>
              <th class="bg-success-subtle" scope="col">Gravado</th>
              <th class="bg-warning" scope="col">No computable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${porcentajeEval}</td>
              <td>${directorRete}</td>
              <td>${gravadoRete}</td>
              <td class="bg-warning">${noComputableRete}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `

      directorRetencion.innerHTML = htmlTratamiento;
    

    } else if (+gnsaiReteEval > +excedentePerceptoresReteEval) {

      let noComputableRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+excedentePerceptoresReteEval * (+directorReteEval / +aprobadoTotal)).replace("US$", "")
      let noComputableReteEval = noComputableRete.replace(/\./g, '').replace(",", ".")
      let gravadoRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+directorReteEval - +noComputableReteEval).replace("US$", "")
      let gravadoReteEval = gravadoRete.replace(/\./g, '').replace(",", ".")
      let retencionGananaciasHono = 0;


      if ((+gravadoReteEval - 67170) <= 0) {
        retencionGananaciasHono = 0
      } else if ((+gravadoReteEval - 67170) <= 8000) {
        retencionGananaciasHono = (+gravadoReteEval - 67170) * 0.05
      } else if ((+gravadoReteEval - 67170) <= 16000) {
        retencionGananaciasHono = 400 + (((+gravadoReteEval - 67170) - 8000) * 0.09)
      } else if ((+gravadoReteEval - 67170) <= 24000) {
        retencionGananaciasHono = 1120 + (((+gravadoReteEval - 67170) - 16000) * 0.12)
      } else if ((+gravadoReteEval - 67170) <= 32000) {
        retencionGananaciasHono = 2080 + (((+gravadoReteEval - 67170) - 24000) * 0.15)
      } else if ((+gravadoReteEval - 67170) <= 48000) {
        retencionGananaciasHono = 3280 + (((+gravadoReteEval - 67170) - 32000) * 0.19)
      } else if ((+gravadoReteEval - 67170) <= 64000) {
        retencionGananaciasHono = 6320 + (((+gravadoReteEval - 67170) - 48000) * 0.23)
      } else if ((+gravadoReteEval - 67170) <= 96000) {
        retencionGananaciasHono = 10000 + (((+gravadoReteEval - 67170) - 64000) * 0.27)
      } else if ((+gravadoReteEval - 67170) > 96000) {
        retencionGananaciasHono = 18640 + (((+gravadoReteEval - 67170) - 96000) * 0.31)
      }

      let retencionGananaciasHonoPrint = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+retencionGananaciasHono).replace("US$", "")

      htmlRetencion += `
      <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold border rounded-2 border-2 bg-secondary-subtle">Director</div>
      <div class="alert alert-danger mt-3 fs-5 fw-bold" role="alert">
        Retención ganancias ${retencionGananaciasHonoPrint}
      </div>
      </div>
      </li>
        `

      importeRetencion.innerHTML = htmlRetencion;

      htmlTratamiento += `
      <div class="table-responsive rounded-4 mt-4">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="bg-success text-light" scope="col" colspan="4">Director nº ${i}</th>
            </tr>
            <tr>
              <th class="bg-success-subtle" scope="col">Porcentaje</th>
              <th class="bg-success-subtle" scope="col">Asamblea</th>
              <th class="bg-success-subtle" scope="col">Gravado</th>
              <th class="bg-warning" scope="col">No computable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${porcentajeEval}</td>
              <td>${directorRete}</td>
              <td>${gravadoRete}</td>
              <td class="bg-warning">${noComputableRete}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `

      directorRetencion.innerHTML = htmlTratamiento;

    } else {

      let noComputableRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+gnsaiReteEval * (+directorReteEval / +aprobadoTotal)).replace("US$", "")
      let noComputableReteEval = noComputableRete.replace(/\./g, '').replace(",", ".")
      let gravadoRete = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+directorReteEval - +noComputableReteEval).replace("US$", "")
      let gravadoReteEval = gravadoRete.replace(/\./g, '').replace(",", ".")
      let retencionGananaciasHono = 0;

      if ((+gravadoReteEval - 67170) <= 0) {
        retencionGananaciasHono = 0
      } else if ((+gravadoReteEval - 67170) <= 8000) {
        retencionGananaciasHono = (+gravadoReteEval - 67170) * 0.05
      } else if ((+gravadoReteEval - 67170) <= 16000) {
        retencionGananaciasHono = 400 + (((+gravadoReteEval - 67170) - 8000) * 0.09)
      } else if ((+gravadoReteEval - 67170) <= 24000) {
        retencionGananaciasHono = 1120 + (((+gravadoReteEval - 67170) - 16000) * 0.12)
      } else if ((+gravadoReteEval - 67170) <= 32000) {
        retencionGananaciasHono = 2080 + (((+gravadoReteEval - 67170) - 24000) * 0.15)
      } else if ((+gravadoReteEval - 67170) <= 48000) {
        retencionGananaciasHono = 3280 + (((+gravadoReteEval - 67170) - 32000) * 0.19)
      } else if ((+gravadoReteEval - 67170) <= 64000) {
        retencionGananaciasHono = 6320 + (((+gravadoReteEval - 67170) - 48000) * 0.23)
      } else if ((+gravadoReteEval - 67170) <= 96000) {
        retencionGananaciasHono = 10000 + (((+gravadoReteEval - 67170) - 64000) * 0.27)
      } else if ((+gravadoReteEval - 67170) > 96000) {
        retencionGananaciasHono = 18640 + (((+gravadoReteEval - 67170) - 96000) * 0.31)
      }

      let retencionGananaciasHonoPrint = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(+retencionGananaciasHono).replace("US$", "")

      htmlRetencion += `
  <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
    <div class="fw-bold border rounded-2 border-2 bg-secondary-subtle">Director</div>
  <div class="alert alert-danger mt-3 fs-5 fw-bold" role="alert">
  Retención ganancias ${retencionGananaciasHonoPrint}
  </div>
  </div>
  </li>
  `

      importeRetencion.innerHTML = htmlRetencion;

      htmlTratamiento += `
  <div class="table-responsive rounded-4 mt-4">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="bg-success text-light" scope="col" colspan="4">Director nº ${i}</th>
        </tr>
        <tr>
          <th class="bg-success-subtle" scope="col">Porcentaje</th>
          <th class="bg-success-subtle" scope="col">Asamblea</th>
          <th class="bg-success-subtle" scope="col">Gravado</th>
          <th class="bg-warning" scope="col">No computable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${porcentajeEval}</td>
          <td>${directorRete}</td>
          <td>${gravadoRete}</td>
          <td class="bg-warning">${noComputableRete}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `

      directorRetencion.innerHTML = htmlTratamiento;

    }

  } // final for

  document.getElementById('btnSiguienteDirectores').innerHTML = 'Modificar <i class="bi bi-pencil-square"></i>'
  document.getElementById('btnSiguienteDirectores').className = 'btn btn-warning btn-sm py-2 mb-3 fs-5 rounded-pill'
  
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
      $('#negativoIG').prop("hidden", true);
  } else {
    $('#labelIIGGdiferido').text("IIGG positivo");
    $('#negativoIG').prop("hidden", false);
  }
})

$('#resultadoPositivo').click(function(){
  if ($(this).prop('checked') == true) {
      $('#labelresultadoPositivo').text("Resultado positivo");
      $('#negativoEECC').prop("hidden", true);
  } else {
    $('#labelresultadoPositivo').text("Resultado negativo");
    $('#negativoEECC').prop("hidden", false);
  }
})

function cargaInicio(){
   $('#EECC').hide()
   $('#directores').hide()
   $('#periodoFiscalDato').hide()
   $('#ret').hide()
   $('#resumenCargaDatos').hide()
   $('#topeUnoDatos').hide()
   $('#topeDosDatos').hide()
   $('#deducibleDatos').hide()
   $('#tratamientoDatos').hide()
   $('#retencionDatos').hide()
   $('#nuevoCalculo').hide()
   maskApply();

}

$('#regRet').change(function(){
  switch($(this).val()){
    case "Selecciona el período fiscal...":
      $('#EECC').hide()
      $('#directores').hide()
      $('#periodoFiscalDato').hide()
      $('#ret').hide()
      $('#resumenCargaDatos').hide()
      $('#topeUnoDatos').hide()
      $('#topeDosDatos').hide()
      $('#deducibleDatos').hide()
      $('#tratamientoDatos').hide()
      $('#retencionDatos').hide()
      $('#nuevoCalculo').hide()
    break;
    default:
      $('#EECC').show()
      $('#directores').show()
    break;
  }
})

$('#ret').click(function () {
  $('#resumenCargaDatos').show()
  $('#topeUnoDatos').show()
  $('#topeDosDatos').show()
  $('#deducibleDatos').show()
  $('#tratamientoDatos').show()
  $('#retencionDatos').show()
  $('#nuevoCalculo').show()
  $('#btnSiguienteDirectores').prop("disabled", true)
})

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