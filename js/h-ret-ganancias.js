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
                    let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                    let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                    let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                        let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                        let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                        let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                            let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                            let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                            let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                                let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                                let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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
                                let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
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

const retToGo = document.getElementById("footer-card")

$('#ret').on("click", function(){
    retCalc();
    $('#datosNeto').val(importeNeto.value)
    $('#datosPagosAnteriores').val(pagosMes.value)
    $('#datosRetAnteriores').val(retencionesMes.value)
    if ($(window).width() < 992) {
      retToGo.scrollIntoView()
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
   $('#datosImporteRetencion').hide()
   $('#divPluralidad').hide()
   $('#ret').prop('disabled', true)
   $('#alertRetencionPluralidad').hide()
}

$('#nuevoCalculo').on("click", function(){
  window.location.href = '/blog/h-ret-ganancias.html'
})

$(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#retencionesMes').mask('000.000.000.000.000,00', {reverse: true});
  });