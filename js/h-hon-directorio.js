cargaInicio();
let html = ''

function retCalcFin () {
    $('#ret').hide()
    $('#nuevoCalculo').prop('hidden', false)
    $('#regRet').prop('disabled', true)
    $('#importeNeto').prop('disabled', true)
    $('#inscriptoGanancias').prop('disabled', true)
    $('#pluralidadSujetos').prop('disabled', true)
    $('#btnPluralidad').prop('disabled', true)
    $('#pagosMes').prop('disabled', true)
    $('#retencionesMes').prop('disabled', true)
    $('#tipoPersona').prop('disabled', true)
}

function retCalc() {

    let importeNeto = document.getElementById("importeNeto").value;
    let pagosMes = document.getElementById("pagosMes").value;
    let retencionesMes = document.getElementById("retencionesMes").value;
    let importeNetoNum = importeNeto.replace(/\./g, '').replace(",", ".")
    let pagosMesNum = pagosMes.replace(/\./g, '').replace(",", ".")
    let retencionesMesNum = retencionesMes.replace(/\./g, '').replace(",", ".")
    const datosAlertPluralidad = document.getElementById("datosImporteRetencionPluralidad")
    let alertDatosRetencion = document.getElementById("datosImporteRetencion")

    switch ($('#regRet').val()) {
        case "31":
            if ($('#inscriptoGanancias').prop('checked') == true) {
                if ($('#pluralidadSujetos').prop('checked') == true) {
                    let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                    let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                    for (let sumaPlu of sumaPluralidad) {
                        calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 11200) * 0.06 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                        let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                        if (calculoSumaPlu < 240) {
                            html += `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">Beneficiario</div>
                        Menor al mínimo
                      </div>
                      <span class="badge bg-warning text-dark rounded-pill">Alquileres</span>
                    </li>
                  </ol>
                    `
                        } else {
                            html += `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">Beneficiario</div>
                        ${redondeo}
                      </div>
                      <span class="badge bg-warning text-dark rounded-pill">Alquileres</span>
                    </li>
                  </ol>
                    `
                        }
                    }
                    datosAlertPluralidad.innerHTML = html;
                    $('#pDatosRetencionPluralidad').text("Retención alquileres");
                    alertRetencionPluralidad.className = "alert alert-warning";
                    $('#alertRetencionPluralidad').show()
                    $('#datosMin').val("240,00")
                    $('#datosMNSR').val("11.200,00")
                    $('#alertDatosRetencion').show()
                    $('#datosRetencion').text("Datos retención alquileres")
                    retCalcFin();

                } else {
                    let importeRetInscripto = (+importeNetoNum + +pagosMesNum - 11200) * 0.06 - +retencionesMesNum
                    if (importeRetInscripto < 240) {
                        $('#importeRet').val("Menor al mínimo")
                    } else {
                        document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetInscripto).replace("US$", "")
                    }
                    alertDatosRetencion.className = "alert alert-warning";
                    $('#datosImporteRetencion').text()
                    $('#pDatosImporteRetencion').text("Retención alquileres")
                    $('#datosMin').val("240,00")
                    $('#datosMNSR').val("11.200,00")
                    $('#alertDatosRetencion').show()
                    $('#datosRetencion').text("Datos retención alquileres")
                    $('#datosImporteRetencion').show()
                    retCalcFin();
                }
            } else if ($('#tipoPersona').prop('checked')) {
                if ($('#pluralidadSujetos').prop('checked') == true) {
                    let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                    let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                    for (let sumaPlu of sumaPluralidad) {
                        calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.28 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                        let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                        if (calculoSumaPlu < 1020) {
                            html += `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Beneficiario</div>
                            Menor al mínimo
                          </div>
                          <span class="badge bg-warning text-dark rounded-pill">Alquileres</span>
                        </li>
                      </ol>
                        `
                        } else {
                            html += `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Beneficiario</div>
                            ${redondeo}
                          </div>
                          <span class="badge bg-warning text-dark rounded-pill">Alquileres</span>
                        </li>
                      </ol>
                        `
                        }
                    }
                    datosAlertPluralidad.innerHTML = html;
                    $('#pDatosRetencionPluralidad').text("Retención alquileres");
                    alertRetencionPluralidad.className = "alert alert-warning";
                    $('#alertRetencionPluralidad').show()
                    $('#datosMin').val("1.020,00")
                    $('#alertDatosRetencion').show()
                    $('#datosRetencion').text("Datos retención alquileres")
                    retCalcFin();

                } else {
                    let importeRetPersona = (+importeNetoNum + +pagosMesNum) * 0.28 - +retencionesMesNum
                    if (importeRetPersona < 1020) {
                        $('#importeRet').val("Menor al mínimo")
                    } else {
                        document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetPersona).replace("US$", "")
                    }
                    alertDatosRetencion.className = "alert alert-warning";
                    $('#pDatosImporteRetencion').text("Retención alquileres")
                    $('#datosMin').val("1.020,00")
                    $('#datosMNSR').val("-.-")
                    $('#alertDatosRetencion').show()
                    $('#datosRetencion').text("Datos retención alquileres")
                    $('#datosImporteRetencion').show()
                    retCalcFin();
                }
            } else {
                if ($('#pluralidadSujetos').prop('checked') == true) {
                    let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                    let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                    for (let sumaPlu of sumaPluralidad) {
                        calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.25 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                        let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                        if (calculoSumaPlu < 1020) {
                            html += `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">Beneficiario</div>
                        Menor al mínimo
                      </div>
                      <span class="badge bg-warning text-dark rounded-pill">Alquileres</span>
                    </li>
                  </ol>
                    `
                        } else {
                            html += `
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">Beneficiario</div>
                        ${redondeo}
                      </div>
                      <span class="badge bg-warning text-dark rounded-pill">Alquileres</span>
                    </li>
                  </ol>
                    `
                        }
                    }
                    datosAlertPluralidad.innerHTML = html;
                    $('#pDatosRetencionPluralidad').text("Retención alquileres");
                    alertRetencionPluralidad.className = "alert alert-warning";
                    $('#alertRetencionPluralidad').show()
                    $('#datosMin').val("1.020,00")
                    $('#alertDatosRetencion').show()
                    $('#datosRetencion').text("Datos retención alquileres")
                    retCalcFin();
                } else {
                    let importeRetResto = (+importeNetoNum + +pagosMesNum) * 0.25 - +retencionesMesNum
                    if (importeRetResto < 1020) {
                        $('#importeRet').val("Menor al mínimo")
                    } else {
                        document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetResto).replace("US$", "")
                    }
                    alertDatosRetencion.className = "alert alert-warning";
                    $('#pDatosImporteRetencion').text("Retención alquileres")
                    $('#datosMin').val("1.020,00")
                    $('#datosMNSR').val("-.-")
                    $('#alertDatosRetencion').show()
                    $('#datosRetencion').text("Datos retención alquileres")
                    $('#datosImporteRetencion').show()
                    retCalcFin();
                }
            }
            break;
            case "78":
                if ($('#inscriptoGanancias').prop('checked') == true) {
                    if ($('#pluralidadSujetos').prop('checked') == true) {
                        let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                        let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                        for (let sumaPlu of sumaPluralidad) {
                            calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 224000) * 0.02 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                            let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                            if (calculoSumaPlu < 240) {
                                html += `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Beneficiario</div>
                            Menor al mínimo
                          </div>
                          <span class="badge bg-primary rounded-pill">Enajenación de bienes</span>
                        </li>
                      </ol>
                        `
                            } else {
                                html += `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Beneficiario</div>
                            ${redondeo}
                          </div>
                          <span class="badge bg-primary rounded-pill">Enajenación de bienes</span>
                        </li>
                      </ol>
                        `
                            }
                        }
                        datosAlertPluralidad.innerHTML = html;
                        $('#pDatosRetencionPluralidad').text("Retención enajenación de bienes");
                        alertRetencionPluralidad.className = "alert alert-primary";
                        $('#alertRetencionPluralidad').show()
                        $('#datosMin').val("240,00")
                        $('#datosMNSR').val("224.000,00")
                        $('#alertDatosRetencion').show()
                        $('#datosRetencion').text("Datos retención enajenación de bienes")
                        retCalcFin();
    
                    } else {
                        let importeRetInscripto = (+importeNetoNum + +pagosMesNum - 224000) * 0.02 - +retencionesMesNum
                        if (importeRetInscripto < 240) {
                            $('#importeRet').val("Menor al mínimo")
                        } else {
                            document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetInscripto).replace("US$", "")
                        }
                        alertDatosRetencion.className = "alert alert-primary";
                        $('#pDatosImporteRetencion').text("Retención enajenación de bienes")
                        $('#datosMin').val("240,00")
                        $('#datosMNSR').val("224.000,00")
                        $('#alertDatosRetencion').show()
                        $('#datosRetencion').text("Datos retención enajenación de bienes")
                        $('#datosImporteRetencion').show()
                        retCalcFin();
                    }
                } else if ($('#tipoPersona').prop('checked')) {
                    if ($('#pluralidadSujetos').prop('checked') == true) {
                        let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                        let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                        for (let sumaPlu of sumaPluralidad) {
                            calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.10 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                            let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                            if (calculoSumaPlu < 240) {
                                html += `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">Beneficiario</div>
                                Menor al mínimo
                              </div>
                              <span class="badge bg-primary rounded-pill">Enajenación de bienes</span>
                            </li>
                          </ol>
                            `
                            } else {
                                html += `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">Beneficiario</div>
                                ${redondeo}
                              </div>
                              <span class="badge bg-primary rounded-pill">Enajenación de bienes</span>
                            </li>
                          </ol>
                            `
                            }
                        }
                        datosAlertPluralidad.innerHTML = html;
                        $('#pDatosRetencionPluralidad').text("Retención enajenación de bienes");
                        alertRetencionPluralidad.className = "alert alert-primary";
                        $('#alertRetencionPluralidad').show()
                        $('#datosMin').val("240,00")
                        $('#alertDatosRetencion').show()
                        $('#datosRetencion').text("Datos retención enajenación de bienes")
                        retCalcFin();
    
                    } else {
                        let importeRetPersona = (+importeNetoNum + +pagosMesNum) * 0.10 - +retencionesMesNum
                        if (importeRetPersona < 240) {
                            $('#importeRet').val("Menor al mínimo")
                        } else {
                            document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetPersona).replace("US$", "")
                        }
                        alertDatosRetencion.className = "alert alert-primary";
                        $('#pDatosImporteRetencion').text("Retención enajenación de bienes")
                        $('#datosMin').val("240,00")
                        $('#datosMNSR').val("-.-")
                        $('#alertDatosRetencion').show()
                        $('#datosRetencion').text("Datos retención enajenación de bienes")
                        $('#datosImporteRetencion').show()
                        retCalcFin();
                    }
                } else {
                    if ($('#pluralidadSujetos').prop('checked') == true) {
                        let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                        let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                        for (let sumaPlu of sumaPluralidad) {
                            calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.10 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                            let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                            if (calculoSumaPlu < 240) {
                                html += `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Beneficiario</div>
                            Menor al mínimo
                          </div>
                          <span class="badge bg-primary rounded-pill">Enajenación de bienes</span>
                        </li>
                      </ol>
                        `
                            } else {
                                html += `
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="ms-2 me-auto">
                            <div class="fw-bold">Beneficiario</div>
                            ${redondeo}
                          </div>
                          <span class="badge bg-primary rounded-pill">Enajenación de bienes</span>
                        </li>
                      </ol>
                        `
                            }
                        }
                        datosAlertPluralidad.innerHTML = html;
                        $('#pDatosRetencionPluralidad').text("Retención enajenación de bienes");
                        alertRetencionPluralidad.className = "alert alert-primary";
                        $('#alertRetencionPluralidad').show()
                        $('#datosMin').val("240,00")
                        $('#alertDatosRetencion').show()
                        $('#datosRetencion').text("Datos retención enajenación de bienes")
                        retCalcFin();
                    } else {
                        let importeRetResto = (+importeNetoNum + +pagosMesNum) * 0.10 - +retencionesMesNum
                        if (importeRetResto < 240) {
                            $('#importeRet').val("Menor al mínimo")
                        } else {
                            document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetResto).replace("US$", "")
                        }
                        alertDatosRetencion.className = "alert alert-primary";
                        $('#pDatosImporteRetencion').text("Retención enajenación de bienes")
                        $('#datosMin').val("240,00")
                        $('#datosMNSR').val("-.-")
                        $('#alertDatosRetencion').show()
                        $('#datosRetencion').text("Datos retención enajenación de bienes")
                        $('#datosImporteRetencion').show()
                        retCalcFin();
                    }
                }
                break;
                case "94":
                    if ($('#inscriptoGanancias').prop('checked') == true) {
                        if ($('#pluralidadSujetos').prop('checked') == true) {
                            let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                            let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                            for (let sumaPlu of sumaPluralidad) {
                                calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 67170) * 0.02 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                                if (calculoSumaPlu < 240) {
                                    html += `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">Beneficiario</div>
                                Menor al mínimo
                              </div>
                              <span class="badge bg-success rounded-pill">Servicios</span>
                            </li>
                          </ol>
                            `
                                } else {
                                    html += `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">Beneficiario</div>
                                ${redondeo}
                              </div>
                              <span class="badge bg-success rounded-pill">Servicios</span>
                            </li>
                          </ol>
                            `
                                }
                            }
                            datosAlertPluralidad.innerHTML = html;
                            $('#pDatosRetencionPluralidad').text("Retención servicios");
                            alertRetencionPluralidad.className = "alert alert-success";
                            $('#alertRetencionPluralidad').show()
                            $('#datosMin').val("240,00")
                            $('#datosMNSR').val("67.170,00")
                            $('#alertDatosRetencion').show()
                            $('#datosRetencion').text("Datos retención servicios")
                            retCalcFin();
        
                        } else {
                            let importeRetInscripto = (+importeNetoNum + +pagosMesNum - 67170) * 0.02 - +retencionesMesNum
                            if (importeRetInscripto < 240) {
                                $('#importeRet').val("Menor al mínimo")
                            } else {
                                document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetInscripto).replace("US$", "")
                            }
                            alertDatosRetencion.className = "alert alert-success";
                            $('#pDatosImporteRetencion').text("Retención servicios")
                            $('#datosMin').val("240,00")
                            $('#datosMNSR').val("67.170,00")
                            $('#alertDatosRetencion').show()
                            $('#datosRetencion').text("Datos retención servicios")
                            $('#datosImporteRetencion').show()
                            retCalcFin();
                        }
                    } else if ($('#tipoPersona').prop('checked')) {
                        if ($('#pluralidadSujetos').prop('checked') == true) {
                            let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                            let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                            for (let sumaPlu of sumaPluralidad) {
                                calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.28 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                                if (calculoSumaPlu < 240) {
                                    html += `
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                  <div class="ms-2 me-auto">
                                    <div class="fw-bold">Beneficiario</div>
                                    Menor al mínimo
                                  </div>
                                  <span class="badge bg-success rounded-pill">Servicios</span>
                                </li>
                              </ol>
                                `
                                } else {
                                    html += `
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                  <div class="ms-2 me-auto">
                                    <div class="fw-bold">Beneficiario</div>
                                    ${redondeo}
                                  </div>
                                  <span class="badge bg-success rounded-pill">Servicios</span>
                                </li>
                              </ol>
                                `
                                }
                            }
                            datosAlertPluralidad.innerHTML = html;
                            $('#pDatosRetencionPluralidad').text("Retención servicios");
                            alertRetencionPluralidad.className = "alert alert-success";
                            $('#alertRetencionPluralidad').show()
                            $('#datosMin').val("240,00")
                            $('#alertDatosRetencion').show()
                            $('#datosRetencion').text("Datos retención servicios")
                            retCalcFin();
        
                        } else {
                            let importeRetPersona = (+importeNetoNum + +pagosMesNum) * 0.28 - +retencionesMesNum
                            if (importeRetPersona < 240) {
                                $('#importeRet').val("Menor al mínimo")
                            } else {
                                document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetPersona).replace("US$", "")
                            }
                            alertDatosRetencion.className = "alert alert-success";
                            $('#pDatosImporteRetencion').text("Retención servicios")
                            $('#datosMin').val("240,00")
                            $('#datosMNSR').val("-.-")
                            $('#alertDatosRetencion').show()
                            $('#datosRetencion').text("Datos retención servicios")
                            $('#datosImporteRetencion').show()
                            retCalcFin();
                        }
                    } else {
                        if ($('#pluralidadSujetos').prop('checked') == true) {
                            let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                            let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                            for (let sumaPlu of sumaPluralidad) {
                                calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.25 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                                if (calculoSumaPlu < 240) {
                                    html += `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">Beneficiario</div>
                                Menor al mínimo
                              </div>
                              <span class="badge bg-success rounded-pill">Servicios</span>
                            </li>
                          </ol>
                            `
                                } else {
                                    html += `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">Beneficiario</div>
                                ${redondeo}
                              </div>
                              <span class="badge bg-success rounded-pill">Servicios</span>
                            </li>
                          </ol>
                            `
                                }
                            }
                            datosAlertPluralidad.innerHTML = html;
                            $('#pDatosRetencionPluralidad').text("Retención servicios");
                            alertRetencionPluralidad.className = "alert alert-success";
                            $('#alertRetencionPluralidad').show()
                            $('#datosMin').val("240,00")
                            $('#alertDatosRetencion').show()
                            $('#datosRetencion').text("Datos retención servicios")
                            retCalcFin();
                        } else {
                            let importeRetResto = (+importeNetoNum + +pagosMesNum) * 0.25 - +retencionesMesNum
                            if (importeRetResto < 240) {
                                $('#importeRet').val("Menor al mínimo")
                            } else {
                                document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetResto).replace("US$", "")
                            }
                            alertDatosRetencion.className = "alert alert-success";
                            $('#pDatosImporteRetencion').text("Retención servicios")
                            $('#datosMin').val("240,00")
                            $('#datosMNSR').val("-.-")
                            $('#alertDatosRetencion').show()
                            $('#datosRetencion').text("Datos retención servicios")
                            $('#datosImporteRetencion').show()
                            retCalcFin();
                        }
                    }
                    break;
                    case "116":
                        if ($('#inscriptoGanancias').prop('checked') == true) {
                            if ($('#pluralidadSujetos').prop('checked') == true) {
                                let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                                let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                                for (let sumaPlu of sumaPluralidad) {
                                    if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) <= 8000) {
                                      calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) * 0.05 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) <= 16000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) - 8000) * 0.09 + 400 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) <= 24000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) - 16000) * 0.12 + 1120 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) <= 32000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) - 24000) * 0.15 + 2080 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) <= 48000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) - 32000) * 0.19 + 3280 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) <= 64000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) - 48000) * 0.23 + 6320 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) <= 96000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) - 64000) * 0.27 + 10000 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) > 96000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 16830) - 96000) * 0.31 + 18640 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    }
                                  
                                  let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                                    if (calculoSumaPlu < 240) {
                                        html += `
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                  <div class="ms-2 me-auto">
                                    <div class="fw-bold">Beneficiario</div>
                                    Menor al mínimo
                                  </div>
                                  <span class="badge bg-danger rounded-pill">Profesiones liberales</span>
                                </li>
                              </ol>
                                `
                                    } else {
                                        html += `
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                  <div class="ms-2 me-auto">
                                    <div class="fw-bold">Beneficiario</div>
                                    ${redondeo}
                                  </div>
                                  <span class="badge bg-danger rounded-pill">Profesiones liberales</span>
                                </li>
                              </ol>
                                `
                                    }
                                }
                                datosAlertPluralidad.innerHTML = html;
                                $('#pDatosRetencionPluralidad').text("Retención profesiones liberales");
                                alertRetencionPluralidad.className = "alert alert-danger";
                                $('#alertRetencionPluralidad').show()
                                $('#datosMin').val("240,00")
                                $('#datosMNSR').val("16.830,00")
                                $('#alertDatosRetencion').show()
                                $('#datosRetencion').text("Datos retención profesiones liberales")
                                retCalcFin();
            
                            } else {
                                let importeRetInscripto = (+importeNetoNum + +pagosMesNum - 67170) * 0.02 - +retencionesMesNum
                                if ((+importeNetoNum + +pagosMesNum - 16830) <= 8000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830) * 0.05 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 16830) <= 16000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830 - 8000) * 0.09 + 400 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 16830) <= 24000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830 - 16000) * 0.12 + 1120 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 16830) <= 32000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830 - 24000) * 0.15 + 2080 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 16830) <= 48000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830 - 32000) * 0.19 + 3280 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 16830) <= 64000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830 - 48000) * 0.23 + 6320 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 16830) <= 96000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830 - 64000) * 0.27 + 10000 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 16830) > 96000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 16830 - 96000) * 0.31 + 18640 - +retencionesMesNum
                                }

                                if (importeRetInscripto < 240) {
                                    $('#importeRet').val("Menor al mínimo")
                                } else {
                                    document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetInscripto).replace("US$", "")
                                }
                                alertDatosRetencion.className = "alert alert-danger";
                                $('#pDatosImporteRetencion').text("Retención profesiones liberales")
                                $('#datosMin').val("240,00")
                                $('#datosMNSR').val("16.830,00")
                                $('#alertDatosRetencion').show()
                                $('#datosRetencion').text("Datos retención profesiones liberales")
                                $('#datosImporteRetencion').show()
                                retCalcFin();
                            }
                        } else if ($('#tipoPersona').prop('checked')) {
                            if ($('#pluralidadSujetos').prop('checked') == true) {
                                let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                                let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                                for (let sumaPlu of sumaPluralidad) {
                                  calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.28 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                                    if (calculoSumaPlu < 240) {
                                        html += `
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                      <div class="ms-2 me-auto">
                                        <div class="fw-bold">Beneficiario</div>
                                        Menor al mínimo
                                      </div>
                                      <span class="badge bg-danger rounded-pill">Profesiones liberales</span>
                                    </li>
                                  </ol>
                                    `
                                    } else {
                                        html += `
                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                      <div class="ms-2 me-auto">
                                        <div class="fw-bold">Beneficiario</div>
                                        ${redondeo}
                                      </div>
                                      <span class="badge bg-danger rounded-pill">Profesiones liberales</span>
                                    </li>
                                  </ol>
                                    `
                                    }
                                }
                                datosAlertPluralidad.innerHTML = html;
                                $('#pDatosRetencionPluralidad').text("Retención profesiones liberales");
                                alertRetencionPluralidad.className = "alert alert-danger";
                                $('#alertRetencionPluralidad').show()
                                $('#datosMin').val("240,00")
                                $('#datosMNSR').val("-.-")
                                $('#alertDatosRetencion').show()
                                $('#datosRetencion').text("Datos retención profesiones liberales")
                                retCalcFin();
            
                            } else {
                                let importeRetPersona = (+importeNetoNum + +pagosMesNum) * 0.28 - +retencionesMesNum
                                if (importeRetPersona < 240) {
                                    $('#importeRet').val("Menor al mínimo")
                                } else {
                                    document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetPersona).replace("US$", "")
                                }
                                alertDatosRetencion.className = "alert alert-danger";
                                $('#pDatosImporteRetencion').text("Retención profesiones liberales")
                                $('#datosMin').val("240,00")
                                $('#datosMNSR').val("-.-")
                                $('#alertDatosRetencion').show()
                                $('#datosRetencion').text("Datos retención profesiones liberales")
                                $('#datosImporteRetencion').show()
                                retCalcFin();
                            }
                        } else {
                            if ($('#pluralidadSujetos').prop('checked') == true) {
                                let sumaPluralidad = document.getElementsByClassName("directoresPluralidad");
                                let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                                for (let sumaPlu of sumaPluralidad) {
                                  calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum))) * 0.28 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    let redondeo = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format((calculoSumaPlu * 100) / 100).replace("US$", "")
                                    if (calculoSumaPlu < 240) {
                                        html += `
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                  <div class="ms-2 me-auto">
                                    <div class="fw-bold">Beneficiario</div>
                                    Menor al mínimo
                                  </div>
                                  <span class="badge bg-danger rounded-pill">Profesiones liberales</span>
                                </li>
                              </ol>
                                `
                                    } else {
                                        html += `
                                <li class="list-group-item d-flex justify-content-between align-items-start">
                                  <div class="ms-2 me-auto">
                                    <div class="fw-bold">Beneficiario</div>
                                    ${redondeo}
                                  </div>
                                  <span class="badge bg-danger rounded-pill">Profesiones liberales</span>
                                </li>
                              </ol>
                                `
                                    }
                                }
                                datosAlertPluralidad.innerHTML = html;
                                $('#pDatosRetencionPluralidad').text("Retención profesiones liberales");
                                alertRetencionPluralidad.className = "alert alert-danger";
                                $('#alertRetencionPluralidad').show()
                                $('#datosMin').val("240,00")
                                $('#datosMNSR').val("-.-")
                                $('#alertDatosRetencion').show()
                                $('#datosRetencion').text("Datos retención profesiones liberales")
                                retCalcFin();
                            } else {
                                let importeRetResto = (+importeNetoNum + +pagosMesNum) * 0.25 - +retencionesMesNum
                                if (importeRetResto < 240) {
                                    $('#importeRet').val("Menor al mínimo")
                                } else {
                                    document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetResto).replace("US$", "")
                                }
                                alertDatosRetencion.className = "alert alert-danger";
                                $('#pDatosImporteRetencion').text("Retención profesiones liberales")
                                $('#datosMin').val("240,00")
                                $('#datosMNSR').val("-.-")
                                $('#alertDatosRetencion').show()
                                $('#datosRetencion').text("Datos retención profesiones liberales")
                                $('#datosImporteRetencion').show()
                                retCalcFin();
                            }
                        }
    }
};

$('#ret').on("click", function(){
    retCalc();
    $('#datosNeto').val(importeNeto.value)
    $('#datosPagosAnteriores').val(pagosMes.value)
    $('#datosRetAnteriores').val(retencionesMes.value)
    window.scrollTo(0,120)
    $('#offcanvasScrolling').hide()
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
        $('.directoresPluralidad').val("")
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
            $('#datosImporteRetencion').hide()
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

$('#btnSiguienteDirectores').click(function(){
  let cantidadDirectores = document.getElementById("cantidadDirectores").value;
  // $('#cantidadDirectoresList').text(cantidadDirectores)
  let femeninoSelector = $('input.femeninoSelector:checked')
  $('#femeninoList').text(femeninoSelector.length)
  let masculinoSelector = $('input.masculinoSelector:checked')
  $('#masculinoList').text(masculinoSelector.length)
  let transgeneroSelector = $('input.transgeneroSelector:checked')
  $('#transgeneroList').text(transgeneroSelector.length)
  
  let cantidadDirectoresToNum = cantidadDirectores
  let sumDist = 0;
  for (var i = 1; i <= cantidadDirectores; i++) {
    let cantidadDirectoresConcat = "director" + [i]
    console.log(cantidadDirectoresConcat)
    let cHono = cantidadDirectoresConcat.value.replace(/\./g, '').replace(",", ".")
    console.log(cHono)
    
  }


  console.log(sumDist)

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
        checkGeneroInputLabelF.textContent = "Femenino";
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
})

function cargaInicio(){
/*    $('#retencion').hide()
   $('#tipoPersona').hide()
   $('#labelPersona').hide()
   $('#divPluralidad').hide()
   $('#ret').prop('disabled', true) */
}

$('#nuevoCalculo').on("click", function(){
    location.reload(true);
})

function maskApply() {
$(document).ready(function(){
    $('.directoresPluralidad').mask('000.000.000.000.000,00', {reverse: true});
  });
}