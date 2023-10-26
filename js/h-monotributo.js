// cargaInicio();
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
                    case "119":
                        if ($('#inscriptoGanancias').prop('checked') == true) {
                            if ($('#pluralidadSujetos').prop('checked') == true) {
                                let sumaPluralidad = document.getElementsByClassName("beneficiariosPluralidad");
                                let alertRetencionPluralidad = document.getElementById("alertRetencionPluralidad");
                                for (let sumaPlu of sumaPluralidad) {
                                    if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) <= 71000) {
                                      calculoSumaPlu = ((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) * 0.05 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) <= 142000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) - 71000) * 0.09 + 3550 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) <= 213000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) - 142000) * 0.12 + 9940 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) <= 284000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) - 213000) * 0.15 + 18640 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) <= 426000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) - 284000) * 0.19 + 29110 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) <= 568000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) - 426000) * 0.23 + 56090 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) <= 852000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) - 568000) * 0.27 + 88750 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
                                    } else if (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) > 852000) {
                                      calculoSumaPlu = (((parseFloat(sumaPlu.value) / 100 * (+importeNetoNum + +pagosMesNum)) - 160000) - 852000) * 0.31 + 165430 - (parseFloat(sumaPlu.value) / 100 * +retencionesMesNum)
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
                                $('#datosMNSR').val("160.000,00")
                                $('#alertDatosRetencion').show()
                                $('#datosRetencion').text("Datos retención profesiones liberales")
                                retCalcFin();
            
                            } else {
                                let importeRetInscripto = (+importeNetoNum + +pagosMesNum - 67170) * 0.02 - +retencionesMesNum
                                if ((+importeNetoNum + +pagosMesNum - 160000) <= 71000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000) * 0.05 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 160000) <= 142000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000 - 71000) * 0.09 + 3550 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 160000) <= 213000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000 - 142000) * 0.12 + 9940 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 160000) <= 284000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000 - 213000) * 0.15 + 18640 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 160000) <= 426000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000 - 284000) * 0.19 + 29110 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 160000) <= 568000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000 - 426000) * 0.23 + 56090 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 160000) <= 852000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000 - 568000) * 0.27 + 88750 - +retencionesMesNum
                                } else if ((+importeNetoNum + +pagosMesNum - 160000) > 852000) {
                                  importeRetInscripto = (+importeNetoNum + +pagosMesNum - 160000 - 852000) * 0.31 + 165340 - +retencionesMesNum
                                }

                                if (importeRetInscripto < 240) {
                                    $('#importeRet').val("Menor al mínimo")
                                } else {
                                    document.getElementById("importeRet").value = Intl.NumberFormat("es", { style: "currency", currency: "USD", currencySign: "accounting" }).format(importeRetInscripto).replace("US$", "")
                                }
                                alertDatosRetencion.className = "alert alert-danger";
                                $('#pDatosImporteRetencion').text("Retención profesiones liberales")
                                $('#datosMin').val("240,00")
                                $('#datosMNSR').val("160.000,00")
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
                                let importeRetResto = (+importeNetoNum + +pagosMesNum) * 0.28 - +retencionesMesNum
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

$('#ingresosAnuales').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelIngresosAnuales').text("Ingresos anuales");
    } else {
        $('#labelIngresosAnuales').text("Ingresos mensuales");
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
$('#tipoActividad').change(function(){
    switch($(this).val()){
        case "Selecciona...":
            $('#retencion').hide()
            $('#alertDatosRetencion').hide()
            $('#datosImporteRetencion').hide()
        break;
        case "1":
            codigoRetencion.innerText = "Locaciones y/o Prestaciones de Servicios";
            retencion.className = "alert bg-danger-subtle fs-5";
            ret.className = "btn btn-outline-danger fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-danger fs-4 fw-bold";
            btnPluralidad.className = "btn btn-outline-danger fs-4 fw-bold";
            $('#retencion').show()
        break;
        case "2":
            codigoRetencion.innerText = "Venta de cosas muebles";
            retencion.className = "alert bg-primary-subtle fs-5";
            ret.className = "btn btn-outline-primary fs-4 fw-bold";
            nuevoCalculo.className = "btn btn-outline-primary fs-4 fw-bold";
            btnPluralidad.className = "btn btn-outline-primary fs-4 fw-bold";
            $('#retencion').show()
        break;
    }

})

$('#ingresosBrutos').on('change', function(){
    if ($('#ingresosBrutos').val() <= 0 ) {
        $('#ret').prop('disabled', true)
    } else {
        $('#ret').prop('disabled', false)
        // de aquí en adelante, cambiar a una sección de cálculo general luego de cargar todos los parámetros para tomar el índice más alto
        let ingresosBrutosJS = $('#ingresosBrutos').val().replace(/\./g, '').replace(",", ".")
        if ($('#tipoActividad').val() === "1") {
          if (ingresosBrutosJS <= 1414762.58) {
            console.log(categoriaServicios.catAs.impuesto)
            console.log(categoriaServicios.catAs.indice)
          } else if (ingresosBrutosJS <= 2103025.45) {
            console.log(categoriaServicios.catBs.impuesto)
            console.log(categoriaServicios.catBs.indice)
          }
            
        }
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

let categoriaServicios = {
  catAs:
  {
    indice: 1,
    categoria: "A",
    ingresosBrutos: 1414762.58,
    superficie: 30,
    energia: 3300,
    alquileres: 230178.48,
    impuesto: 496.85,
    sipa: 2192.15,
    obra: 3061.75,
  },
  catBs:
  {
    indice: 2,
    categoria: "B",
    ingresosBrutos: 2103025.45,
    superficie: 45,
    energia: 5000,
    alquileres: 230178.48,
    impuesto: 957.27,
    sipa: 2411.36,
    obra: 3061.75,
  },
  catCs:
  {
    indice: 3,
    categoria: "C",
    ingresosBrutos: 2944235.60,
    superficie: 60,
    energia: 6700,
    alquileres: 460356.93,
    impuesto: 1636.83,
    sipa: 2652.52,
    obra: 3061.75,
  },
  catDs:
  {
    indice: 4,
    categoria: "D",
    ingresosBrutos: 3656604.33,
    superficie: 85,
    energia: 10000,
    alquileres: 460356.93,
    impuesto: 2689.05,
    sipa: 2917.75,
    obra: 3638.26,
  },
  catEs:
  {
    indice: 5,
    categoria: "E",
    ingresosBrutos: 4305799.15,
    superficie: 110,
    energia: 13000,
    alquileres: 573619.32,
    impuesto: 5115.04,
    sipa: 3209.55,
    obra: 4452.02,
  },
  catFs:
  {
    indice: 6,
    categoria: "F",
    ingresosBrutos: 5382248.94,
    superficie: 150,
    energia: 16500,
    alquileres: 575446.12,
    impuesto: 7036.89,
    sipa: 3530.49,
    obra: 5145.02,
  },
  catGs:
  {
    indice: 7,
    categoria: "G",
    ingresosBrutos: 6458698.71,
    superficie: 200,
    energia: 20000,
    alquileres: 690535.39,
    impuesto: 8951.39,
    sipa: 3883.53,
    obra: 5512.52,
  },
  catHs:
  {
    indice: 8,
    categoria: "H",
    ingresosBrutos: 7996484.12,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 20460.26,
    sipa: 4271.88,
    obra: 6615.02,
  },

}

$(function(){
    $('#ingresosBrutos').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
    $('#retencionesMes').mask('000.000.000.000.000,00', {reverse: true});
  });