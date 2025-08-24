cargaInicio();
let html = "";
let ingresosBrutosJS = 0;
let numeroAdherentes = 0;
let ingresosBrutosIndice = "";
let tipoActividadValue = "";
let superficieAfectadaIndice = "";
let energiaConsumidaIndice = "";
let alquieresDevengadosIndice = "";
let exSipaObraVal = 0;
let exObraVal = 0;
let exImpuesto = 0;

const monoToGo = document.getElementById("footer-card");

// Habilita la selección del tipo de exención impuesto integrado
$("#exImpuesto").on("click", function() {
  if ($("#exImpuesto").prop("checked") == true) {
  $("#tipoExImpuesto").prop("hidden", false);
  } else {
  $("#tipoExImpuesto").prop("hidden", true);
  }
});

$("#categoria").on("click", function () {
  // Verifica carga algún dato
  if (
    superficieAfectadaIndice === "" &&
    energiaConsumidaIndice === "" &&
    ingresosBrutosIndice === "" &&
    alquieresDevengadosIndice === ""
  ) {
    $("#parametroModal").modal("show");
  } else {
    $("#printReport").show();
    $("#actividad").hide();
    $("#nuevoCalculo").show();
    $("#tipoActividad").prop("disabled", true);
  }

  let datosCategoriaAsignada = document.getElementById(
    "datosCategoriaAsignada"
  );
  let catAsignadaEscala = document.getElementById("catAsignadaEscala");
  let paramCat = document.getElementById("paramCat");
  let impoPago = document.getElementById("impoPago");

  let arrCategoria = [
    ingresosBrutosIndice,
    superficieAfectadaIndice,
    energiaConsumidaIndice,
    alquieresDevengadosIndice,
  ];
  arrCategoria.sort();

  if ($("#exImpuesto").prop("checked") == true) {
    if (
      superficieAfectadaIndice === "" &&
      energiaConsumidaIndice === "" &&
      ingresosBrutosIndice === "" &&
      alquieresDevengadosIndice === ""
    ) {
      $("#parametroModal").modal("show");
    } else {
      if (ingresosBrutosJS <= categoriaServicios.A.ingresosBrutosT && $("#tipoExImpuesto").val() === "2") {
        exImpuesto = 1;
      } else if (ingresosBrutosJS <= categoriaServicios.A.ingresosBrutosT && $("#tipoExImpuesto").val() === "4") {
        exImpuesto = 1;
      } else if (ingresosBrutosJS <= categoriaServicios.D.ingresosBrutosT && $("#tipoExImpuesto").val() === "5") {
        exImpuesto = 1;
      } else if ($("#tipoExImpuesto").val() === "1" || $("#tipoExImpuesto").val() === "3") {
        exImpuesto = 1;
      } else {
        exImpuesto = 0;
        $("#impuestoModal").modal("show");
      }
    }
  }

  try {
    $("#datosIngresosBrutos").val(
      Intl.NumberFormat("es", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      })
        .format(ingresosBrutosJS)
        .replace("US$", "")
    );
    $("#datosSuperficieAfectada").val(
      $("#superficieAfectada option:selected").text()
    );
    $("#datosEnergiaConsumida").val(
      $("#energiaConsumida option:selected").text()
    );
    $("#datosAlquieresDevengados").val(
      $("#alquieresDevengados option:selected").text()
    );
    $("#datosAdherentes").val(numeroAdherentes);

    switch (tipoActividadValue) {
      case "1":
        // Servicios
        let catAsignadaIngresosVal =
          categoriaServicios[arrCategoria[3]].ingresosBrutosT;
        let catAsignadaEnergiaVal = categoriaServicios[arrCategoria[3]].energia;
        let catAsignadaAlquileresVal =
          categoriaServicios[arrCategoria[3]].alquileres;
        let catAsignadaJubilacionVal = categoriaServicios[arrCategoria[3]].sipa;
        let catAsignadaObraSocialVal = categoriaServicios[arrCategoria[3]].obra;
        let catAsignadaObraSocialValAdherentes =
          categoriaServicios[arrCategoria[3]].obra * (+numeroAdherentes + 1);
        let catAsignadaImpuestoVal = 0;
        if (exImpuesto === 1) {
          catAsignadaImpuestoVal = 0;
        } else {
          catAsignadaImpuestoVal = categoriaServicios[arrCategoria[3]].impuesto;
        }
        let totalPorMesVal = 0;
        if (exSipaObraVal === 1) {
          totalPorMesVal = catAsignadaImpuestoVal;
        } else if (exObraVal === 1) {
          totalPorMesVal = catAsignadaJubilacionVal + catAsignadaImpuestoVal;
        } else if ($("#adherentes").prop("checked") == true) {
          totalPorMesVal =
            catAsignadaJubilacionVal +
            catAsignadaObraSocialValAdherentes +
            catAsignadaImpuestoVal;
        } else {
          totalPorMesVal =
            catAsignadaJubilacionVal +
            catAsignadaObraSocialVal +
            catAsignadaImpuestoVal;
        }

        if ($("#datosSuperficieAfectada").val() == "Selecciona...") {
          $("#datosSuperficieAfectada").val("Sin información");
        }
        if ($("#datosEnergiaConsumida").val() == "Selecciona...") {
          $("#datosEnergiaConsumida").val("Sin información");
        }
        if ($("#datosAlquieresDevengados").val() == "Selecciona...") {
          $("#datosAlquieresDevengados").val("Sin información");
        }

        $("#catAsignadaEscala").text(
          categoriaServicios[arrCategoria[3]].categoria
        );
        $("#catAsignadaIngresos").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(catAsignadaIngresosVal)
            .replace("US$", "")
        );
        $("#catAsignadaSuperficie").val(
          "Hasta " + categoriaServicios[arrCategoria[3]].superficie + " m2"
        );
        $("#catAsignadaEnergía").val(
          "Hasta " +
            Intl.NumberFormat("es", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 3,
              currencySign: "accounting",
            })
              .format(catAsignadaEnergiaVal)
              .replace("US$", "") +
            " Kw"
        );
        $("#catAsignadaAlquileres").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(catAsignadaAlquileresVal)
            .replace("US$", "")
        );
        if (exSipaObraVal === 1) {
          $("#catAsignadaJubilacion").val("Exento");
        } else {
          $("#catAsignadaJubilacion").val(
            Intl.NumberFormat("es", {
              style: "currency",
              currency: "USD",
              currencySign: "accounting",
            })
              .format(catAsignadaJubilacionVal)
              .replace("US$", "")
          );
        }
        if (exSipaObraVal === 1) {
          $("#catAsignadaObraSocialLabel").text("Obra social");
          $("#catAsignadaObraSocial").val("Exento");
        } else if (exObraVal === 1) {
          $("#catAsignadaObraSocialLabel").text("Obra social");
          $("#catAsignadaObraSocial").val("Exento");
        } else {
          if ($("#adherentes").prop("checked") == true) {
            $("#catAsignadaObraSocialLabel").text("Obra social + adherentes");
            $("#catAsignadaObraSocial").val(
              Intl.NumberFormat("es", {
                style: "currency",
                currency: "USD",
                currencySign: "accounting",
              })
                .format(catAsignadaObraSocialValAdherentes)
                .replace("US$", "")
            );
          } else {
            $("#catAsignadaObraSocialLabel").text("Obra social");
            $("#catAsignadaObraSocial").val(
              Intl.NumberFormat("es", {
                style: "currency",
                currency: "USD",
                currencySign: "accounting",
              })
                .format(catAsignadaObraSocialVal)
                .replace("US$", "")
            );
          }
        }
        if (exImpuesto === 1) {
          $("#catAsignadaImpuesto").val("Exento");
        } else {
          $("#catAsignadaImpuesto").val(
            Intl.NumberFormat("es", {
              style: "currency",
              currency: "USD",
              currencySign: "accounting",
            })
              .format(catAsignadaImpuestoVal)
              .replace("US$", "")
          );
        }
        $("#totalPorMes").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(totalPorMesVal)
            .replace("US$", "")
        );

        $("#totalPorMesSM").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(totalPorMesVal)
            .replace("US$", "")
        );

        datosCategoriaAsignada.className = "alert alert-danger";
        catAsignadaEscala.className =
          "badge bg-danger rounded fs-1 me-4 text-light";
        $("#datosCategoriaAsignada").show();
        $("#catAsignadaEscala").show();
        $("#alertDatosCategoria").show();
        paramCat.className = "fs-4 fw-bold badge bg-danger rounded-5 mt-4";
        impoPago.className = "fs-4 fw-bold badge bg-danger rounded-5";

        break;

      case "2":
        // Ventas
        let catAsignadaIngresosValV =
          categoriaVentas[arrCategoria[3]].ingresosBrutosT;
        let catAsignadaEnergiaValV = categoriaVentas[arrCategoria[3]].energia;
        let catAsignadaAlquileresValV =
          categoriaVentas[arrCategoria[3]].alquileres;
        let catAsignadaJubilacionValV = categoriaVentas[arrCategoria[3]].sipa;
        let catAsignadaObraSocialValV = categoriaVentas[arrCategoria[3]].obra;
        let catAsignadaObraSocialValAdherentesV =
          categoriaVentas[arrCategoria[3]].obra * (+numeroAdherentes + 1);
        let catAsignadaImpuestoValV = 0;
        if (exImpuesto === 1) {
          catAsignadaImpuestoValV = 0;
        } else {
          catAsignadaImpuestoValV = categoriaVentas[arrCategoria[3]].impuesto;
        }
        let totalPorMesValV = 0;
        if (exSipaObraVal === 1) {
          totalPorMesValV = catAsignadaImpuestoValV;
        } else if (exObraVal === 1) {
          totalPorMesValV = catAsignadaJubilacionValV + catAsignadaImpuestoValV;
        } else if ($("#adherentes").prop("checked") == true) {
          totalPorMesValV =
            catAsignadaJubilacionValV +
            catAsignadaObraSocialValAdherentesV +
            catAsignadaImpuestoValV;
        } else {
          totalPorMesValV =
            catAsignadaJubilacionValV +
            catAsignadaObraSocialValV +
            catAsignadaImpuestoValV;
        }

        if ($("#datosSuperficieAfectada").val() == "Selecciona...") {
          $("#datosSuperficieAfectada").val("Sin información");
        }
        if ($("#datosEnergiaConsumida").val() == "Selecciona...") {
          $("#datosEnergiaConsumida").val("Sin información");
        }
        if ($("#datosAlquieresDevengados").val() == "Selecciona...") {
          $("#datosAlquieresDevengados").val("Sin información");
        }

        $("#catAsignadaEscala").text(
          categoriaVentas[arrCategoria[3]].categoria
        );
        $("#catAsignadaIngresos").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(catAsignadaIngresosValV)
            .replace("US$", "")
        );
        $("#catAsignadaSuperficie").val(
          "Hasta " + categoriaVentas[arrCategoria[3]].superficie + " m2"
        );
        $("#catAsignadaEnergía").val(
          "Hasta " +
            Intl.NumberFormat("es", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 3,
              currencySign: "accounting",
            })
              .format(catAsignadaEnergiaValV)
              .replace("US$", "") +
            " Kw"
        );
        $("#catAsignadaAlquileres").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(catAsignadaAlquileresValV)
            .replace("US$", "")
        );
        if (exSipaObraVal === 1) {
          $("#catAsignadaJubilacion").val("Exento");
        } else {
          $("#catAsignadaJubilacion").val(
            Intl.NumberFormat("es", {
              style: "currency",
              currency: "USD",
              currencySign: "accounting",
            })
              .format(catAsignadaJubilacionValV)
              .replace("US$", "")
          );
        }
        if (exSipaObraVal === 1) {
          $("#catAsignadaObraSocialLabel").text("Obra social");
          $("#catAsignadaObraSocial").val("Exento");
        } else if (exObraVal === 1) {
          $("#catAsignadaObraSocialLabel").text("Obra social");
          $("#catAsignadaObraSocial").val("Exento");
        } else {
          if ($("#adherentes").prop("checked") == true) {
            $("#catAsignadaObraSocialLabel").text("Obra social + adherentes");
            $("#catAsignadaObraSocial").val(
              Intl.NumberFormat("es", {
                style: "currency",
                currency: "USD",
                currencySign: "accounting",
              })
                .format(catAsignadaObraSocialValAdherentesV)
                .replace("US$", "")
            );
          } else {
            $("#catAsignadaObraSocialLabel").text("Obra social");
            $("#catAsignadaObraSocial").val(
              Intl.NumberFormat("es", {
                style: "currency",
                currency: "USD",
                currencySign: "accounting",
              })
                .format(catAsignadaObraSocialValV)
                .replace("US$", "")
            );
          }
        }
        if (exImpuesto === 1) {
          $("#catAsignadaImpuesto").val("Exento");
        } else {
          $("#catAsignadaImpuesto").val(
            Intl.NumberFormat("es", {
              style: "currency",
              currency: "USD",
              currencySign: "accounting",
            })
              .format(catAsignadaImpuestoValV)
              .replace("US$", "")
          );
        }
        $("#totalPorMes").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(totalPorMesValV)
            .replace("US$", "")
        );

        $("#totalPorMesSM").val(
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(totalPorMesValV)
            .replace("US$", "")
        );

        datosCategoriaAsignada.className = "alert alert-primary";
        catAsignadaEscala.className =
          "badge bg-primary rounded fs-1 me-4 text-light";
        $("#datosCategoriaAsignada").show();
        $("#catAsignadaEscala").show();
        $("#alertDatosCategoria").show();
        paramCat.className = "fs-4 fw-bold badge bg-primary rounded-5 mt-4";
        impoPago.className = "fs-4 fw-bold badge bg-primary rounded-5";
        $("#precioUnitario").prop("hidden", false);
        $("#catAsignadaPrecio").val(Intl.NumberFormat("es", {
          style: "currency",
          currency: "USD",
          currencySign: "accounting",
        })
          .format(categoriaVentas.A.pUnitario)
          .replace("US$", ""));

        break;
    }
  } catch (error) {
    console.log(error);
  }

  if ($(window).width() < 992) {
    monoToGo.scrollIntoView();
  } else {
    window.scroll({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
  }
});

$("#exSipaObra").click(function () {
  if ($(this).prop("checked") == true) {
    exSipaObraVal = 1;
    $("#exObra").prop("checked", false);
    $("#exObra").prop("disabled", true);
  } else {
    exSipaObraVal = 0;
    $("#exObra").prop("disabled", false);
  }
});

$("#exObra").click(function () {
  if ($(this).prop("checked") == true) {
    exObraVal = 1;
    $("#exSipaObra").prop("checked", false);
    $("#exSipaObra").prop("disabled", true);
  } else {
    exSipaObraVal = 0;
    $("#exSipaObra").prop("disabled", false);
  }
});

$("#ingresosAnuales").click(function () {
  if ($(this).prop("checked") == true) {
    $("#labelIngresosAnuales").text("Ingresos anuales");
  } else {
    $("#labelIngresosAnuales").text("Ingresos mensuales");
  }
  calcIngresos();
});

$("#adherentes").click(function () {
  if ($(this).prop("checked") == true) {
    $("#adherentesVal").show();
    $("#btnAdherentes").show();
    $("#iconoAdherentes").prop("hidden", false);
  } else {
    $("#adherentesVal").hide();
    $("#adherentesVal").val("");
    numeroAdherentes = 0;
    $("#btnAdherentes").hide();
    $("#iconoAdherentes").prop("hidden", true);
  }
});

let codigoActividad = document.getElementById("codigoActividad");
let actividad = document.getElementById("actividad");
let categoria = document.getElementById("categoria");
let nuevoCalculo = document.getElementById("nuevoCalculo");
let btnAdherentes = document.getElementById("btnAdherentes");
$("#tipoActividad").change(function () {
  switch ($(this).val()) {
    case "Selecciona...":
      $("#categoria").prop("hidden", true);
      $("#actividad").hide();
      $("#alertDatosCategoria").hide();
      $("#datosCategoriaAsignada").hide();
      tipoActividadValue = "Selecciona...";
      break;
    case "1":
      $("#categoria").prop("hidden", false);
      codigoActividad.innerText = "Locaciones y/o Prestaciones de Servicios";
      actividad.className = "alert bg-danger-subtle fs-5";
      categoria.className = "btn btn-outline-danger fs-4 fw-bold";
      nuevoCalculo.className = "btn btn-outline-danger fs-4 fw-bold";
      btnAdherentes.className = "btn btn-outline-danger btn-sm mt-4 mb-3 fs-5";
      $("#actividad").show();
      tipoActividadValue = "1";
      break;
    case "2":
      $("#categoria").prop("hidden", false);
      codigoActividad.innerText = "Venta de cosas muebles";
      actividad.className = "alert bg-primary-subtle fs-5";
      categoria.className = "btn btn-outline-primary fs-4 fw-bold";
      nuevoCalculo.className = "btn btn-outline-primary fs-4 fw-bold";
      btnAdherentes.className = "btn btn-outline-primary btn-sm mt-4 mb-3 fs-5";
      $("#actividad").show();
      tipoActividadValue = "2";
      break;
  }
});

function superficieAfectada() {
  switch ($("#superficieAfectada").val()) {
    case "1":
      superficieAfectadaIndice = "A";
      break;
    case "2":
      superficieAfectadaIndice = "B";
      break;
    case "3":
      superficieAfectadaIndice = "C";
      break;
    case "4":
      superficieAfectadaIndice = "D";
      break;
    case "5":
      superficieAfectadaIndice = "E";
      break;
    case "6":
      superficieAfectadaIndice = "F";
      break;
    case "7":
      superficieAfectadaIndice = "G";
      break;
  }
}

function energiaConsumida() {
  switch ($("#energiaConsumida").val()) {
    case "1":
      energiaConsumidaIndice = "A";
      break;
    case "2":
      energiaConsumidaIndice = "B";
      break;
    case "3":
      energiaConsumidaIndice = "C";
      break;
    case "4":
      energiaConsumidaIndice = "D";
      break;
    case "5":
      energiaConsumidaIndice = "E";
      break;
    case "6":
      energiaConsumidaIndice = "F";
      break;
    case "7":
      energiaConsumidaIndice = "G";
      break;
  }
}

function alquieresDevengados() {
  switch ($("#alquieresDevengados").val()) {
    case "1":
      alquieresDevengadosIndice = "A";
      break;
    case "2":
      alquieresDevengadosIndice = "C";
      break;
    case "3":
      alquieresDevengadosIndice = "E";
      break;
    case "4":
      alquieresDevengadosIndice = "G";
      break;
    case "5":
      alquieresDevengadosIndice = "H";
      break;
  }
}

function calcIngresos() {
  if ($("#ingresosAnuales").prop("checked") == true) {
    ingresosBrutosJS = $("#ingresosBrutos")
      .val()
      .replace(/\./g, "")
      .replace(",", ".");
  } else {
    ingresosBrutosJS =
      $("#ingresosBrutos").val().replace(/\./g, "").replace(",", ".") * 12;
  }
  let topeModal = document.getElementById("topeModal");
  let pTopeModal = document.getElementById("pTopeModal");
  let topeIngresosSer = categoriaServicios.K.ingresosBrutosT;
  let topeIngresosV = categoriaVentas.K.ingresosBrutosT;
  switch (tipoActividadValue) {
    case "1":
      if (ingresosBrutosJS <= categoriaServicios.A.ingresosBrutosT) {
        ingresosBrutosIndice = "A";
      } else if (ingresosBrutosJS <= categoriaServicios.B.ingresosBrutosT) {
        ingresosBrutosIndice = "B";
      } else if (ingresosBrutosJS <= categoriaServicios.C.ingresosBrutosT) {
        ingresosBrutosIndice = "C";
      } else if (ingresosBrutosJS <= categoriaServicios.D.ingresosBrutosT) {
        ingresosBrutosIndice = "D";
      } else if (ingresosBrutosJS <= categoriaServicios.E.ingresosBrutosT) {
        ingresosBrutosIndice = "E";
      } else if (ingresosBrutosJS <= categoriaServicios.F.ingresosBrutosT) {
        ingresosBrutosIndice = "F";
      } else if (ingresosBrutosJS <= categoriaServicios.G.ingresosBrutosT) {
        ingresosBrutosIndice = "G";
      } else if (ingresosBrutosJS <= categoriaServicios.H.ingresosBrutosT) {
        ingresosBrutosIndice = "H";
      } else if (ingresosBrutosJS <= categoriaServicios.I.ingresosBrutosT) {
        ingresosBrutosIndice = "I";
      } else if (ingresosBrutosJS <= categoriaServicios.J.ingresosBrutosT) {
        ingresosBrutosIndice = "J";
      } else if (ingresosBrutosJS <= categoriaServicios.K.ingresosBrutosT) {
        ingresosBrutosIndice = "K";
      } else if (ingresosBrutosJS > categoriaServicios.K.ingresosBrutosT) {
        $("#ingresosBrutos").val("0,00");
        ingresosBrutosJS = 0;
        pTopeModal.innerText =
          "Superás el tope para quedar dentro del régimen de monotributo para locaciones y/o prestaciones de servicios.";
        topeModal.innerText =
          "Tope " +
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(topeIngresosSer)
            .replace("US$", "");
        $("#ingresosModal").modal("show");
      }
      break;

    case "2":
      if (ingresosBrutosJS <= categoriaVentas.A.ingresosBrutosT) {
        ingresosBrutosIndice = "A";
      } else if (ingresosBrutosJS <= categoriaVentas.B.ingresosBrutosT) {
        ingresosBrutosIndice = "B";
      } else if (ingresosBrutosJS <= categoriaVentas.C.ingresosBrutosT) {
        ingresosBrutosIndice = "C";
      } else if (ingresosBrutosJS <= categoriaVentas.D.ingresosBrutosT) {
        ingresosBrutosIndice = "D";
      } else if (ingresosBrutosJS <= categoriaVentas.E.ingresosBrutosT) {
        ingresosBrutosIndice = "E";
      } else if (ingresosBrutosJS <= categoriaVentas.F.ingresosBrutosT) {
        ingresosBrutosIndice = "F";
      } else if (ingresosBrutosJS <= categoriaVentas.G.ingresosBrutosT) {
        ingresosBrutosIndice = "G";
      } else if (ingresosBrutosJS <= categoriaVentas.H.ingresosBrutosT) {
        ingresosBrutosIndice = "H";
      } else if (ingresosBrutosJS <= categoriaVentas.I.ingresosBrutosT) {
        ingresosBrutosIndice = "I";
      } else if (ingresosBrutosJS <= categoriaVentas.J.ingresosBrutosT) {
        ingresosBrutosIndice = "J";
      } else if (ingresosBrutosJS <= categoriaVentas.K.ingresosBrutosT) {
        ingresosBrutosIndice = "K";
      } else if (ingresosBrutosJS > categoriaVentas.K.ingresosBrutosT) {
        $("#ingresosBrutos").val("0,00");
        ingresosBrutosJS = 0;
        pTopeModal.innerText =
          "Superás el tope para quedar dentro del régimen de monotributo para venta de cosas muebles.";
        topeModal.innerText =
          "Tope " +
          Intl.NumberFormat("es", {
            style: "currency",
            currency: "USD",
            currencySign: "accounting",
          })
            .format(topeIngresosV)
            .replace("US$", "");
        $("#ingresosModal").modal("show");
      }
      break;
  }
}

$("#ingresosBrutos").on("change", function () {
  calcIngresos();
  console.log(ingresosBrutosIndice);
  console.log(ingresosBrutosJS);
});

$("#superficieAfectada").on("change", function () {
  superficieAfectada();
  console.log(superficieAfectadaIndice);
});

$("#energiaConsumida").on("change", function () {
  energiaConsumida();
  console.log(energiaConsumidaIndice);
});

$("#alquieresDevengados").on("change", function () {
  alquieresDevengados();
  console.log(alquieresDevengadosIndice);
});

$("#btnAdherentes").click(function () {
  let adherentesVal = document.getElementById("adherentesVal").value;
  if (adherentesVal < 1) {
    $("#adherentes").prop("checked", false);
    $("#iconoAdherentes").prop("hidden", true);
    $("#adherentesVal").hide();
    $("#btnAdherentes").hide();
    $("#adherenteModal").modal("show");
  } else {
    numeroAdherentes = document.getElementById("adherentesVal").value;
  }
});

function cargaInicio() {
  $("#actividad").hide();
  $("#adherentesVal").hide();
  $("#printReport").hide();
  $("#iconoAdherentes").prop("hidden", true);
  $("#btnAdherentes").hide();
  $("#nuevoCalculo").hide();
}

$("#nuevoCalculo").on("click", function () {
  window.location.href = "/blog/h-monotributo.html";
});

let categoriaServicios = {
  A: {
    indice: 1,
    categoria: "A",
    ingresosBrutosT: 8992597.87,
    superficie: 30,
    energia: 3300,
    alquileres: 2091301.83,
    impuesto: 4182.6,
    sipa: 13663.17,
    obra: 19239.97,
  },
  B: {
    indice: 2,
    categoria: "B",
    ingresosBrutosT: 13175201.52,
    superficie: 45,
    energia: 5000,
    alquileres: 2091301.83,
    impuesto: 7946.95,
    sipa: 15029.49,
    obra: 19239.97,
  },
  C: {
    indice: 3,
    categoria: "C",
    ingresosBrutosT: 18473166.15,
    superficie: 60,
    energia: 6700,
    alquileres: 2858112.5,
    impuesto: 13663.17,
    sipa: 16532.44,
    obra: 19239.97,
  },
  D: {
    indice: 4,
    categoria: "D",
    ingresosBrutosT: 22934610.05,
    superficie: 85,
    energia: 10000,
    alquileres: 2858112.5,
    impuesto: 22307.22,
    sipa: 18185.68,
    obra: 22864.9,
  },
  E: {
    indice: 5,
    categoria: "E",
    ingresosBrutosT: 26977793.6,
    superficie: 110,
    energia: 13000,
    alquileres: 3624923.17,
    impuesto: 41826.04,
    sipa: 20004.25,
    obra: 27884.02,
  },
  F: {
    indice: 6,
    categoria: "F",
    ingresosBrutosT: 33809379.57,
    superficie: 150,
    energia: 16500,
    alquileres: 3624923.17,
    impuesto: 58835.29,
    sipa: 22004.67,
    obra: 32066.63,
  },
  G: {
    indice: 7,
    categoria: "G",
    ingresosBrutosT: 40431835.35,
    superficie: 200,
    energia: 20000,
    alquileres: 4322023.77,
    impuesto: 107074.65,
    sipa: 30806.54,
    obra: 34576.19,
  },
  H: {
    indice: 8,
    categoria: "H",
    ingresosBrutosT: 61344853.64,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 306724.27,
    sipa: 43129.16,
    obra: 41547.19,
  },
  I: {
    indice: 9,
    categoria: "I",
    ingresosBrutosT: 68664410.05,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 609963.03,
    sipa: 60380.82,
    obra: 51306.61,
  },
  J: {
    indice: 10,
    categoria: "J",
    ingresosBrutosT: 78632948.76,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 731955.63,
    sipa: 84533.15,
    obra: 57580.51,
  },
  K: {
    indice: 11,
    categoria: "K",
    ingresosBrutosT: 94805682.9,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 1024737.89,
    sipa: 118346.41,
    obra: 65806.3,
  },
};

let categoriaVentas = {
  A: {
    indice: 1,
    categoria: "A",
    ingresosBrutosT: 8992597.87,
    superficie: 30,
    energia: 3330,
    alquileres: 2091301.83,
    impuesto: 4182.6,
    sipa: 13663.17,
    obra: 19239.97,
    pUnitario: 466361.15,
  },
  B: {
    indice: 2,
    categoria: "B",
    ingresosBrutosT: 13175201.52,
    superficie: 45,
    energia: 5000,
    alquileres: 2091301.83,
    impuesto: 7946.95,
    sipa: 15029.49,
    obra: 19239.97,
    pUnitario: 466361.15,
  },
  C: {
    indice: 3,
    categoria: "C",
    ingresosBrutosT: 18473166.15,
    superficie: 60,
    energia: 6700,
    alquileres: 2858112.5,
    impuesto: 12547.81,
    sipa: 16532.44,
    obra: 19239.97,
    pUnitario: 466361.15,
  },
  D: {
    indice: 4,
    categoria: "D",
    ingresosBrutosT: 22934610.05,
    superficie: 85,
    energia: 10000,
    alquileres: 2858112.5,
    impuesto: 20773.6,
    sipa: 18185.68,
    obra: 22864.9,
    pUnitario: 466361.15,
  },
  E: {
    indice: 5,
    categoria: "E",
    ingresosBrutosT: 26977793.6,
    superficie: 110,
    energia: 13000,
    impuesto: 33181.99,
    alquileres: 3624923.17,
    impuesto: 28829.60,
    sipa: 20004.25,
    obra: 27884.02,
    pUnitario: 466361.15,
  },
  F: {
    indice: 6,
    categoria: "F",
    ingresosBrutosT: 33809379.57,
    superficie: 150,
    energia: 16500,
    alquileres: 3624923.17,
    impuesto: 43220.24,
    sipa: 22004.67,
    obra: 32066.63,
    pUnitario: 466361.15,
  },
  G: {
    indice: 7,
    categoria: "G",
    ingresosBrutosT: 40431835.35,
    superficie: 200,
    energia: 20000,
    alquileres: 4322023.77,
    impuesto: 53537.32,
    sipa: 30806.54,
    obra: 34576.19,
    pUnitario: 466361.15,
  },
  H: {
    indice: 8,
    categoria: "H",
    ingresosBrutosT: 61344853.64,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 153362.13,
    sipa: 43129.16,
    obra: 41547.19,
    pUnitario: 466361.15,
  },
  I: {
    indice: 9,
    categoria: "I",
    ingresosBrutosT: 68664410.05,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 243985.21,
    sipa: 60380.82,
    obra: 51306.61,
    pUnitario: 466361.15,
  },
  J: {
    indice: 10,
    categoria: "J",
    ingresosBrutosT: 78632948.76,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 292782.26,
    sipa: 84533.15,
    obra: 57580.51,
    pUnitario: 466361.15,
  },
  K: {
    indice: 11,
    categoria: "K",
    ingresosBrutosT: 94805682.9,
    superficie: 200,
    energia: 20000,
    alquileres: 6273905.49,
    impuesto: 341579.3,
    sipa: 118346.41,
    obra: 65806.3,
    pUnitario: 466361.15,
  },
};
$(function () {
  $("#ingresosBrutos").mask("000.000.000.000.000,00", { reverse: true });
  $("#pagosMes").mask("000.000.000.000.000,00", { reverse: true });
  $("#retencionesMes").mask("000.000.000.000.000,00", { reverse: true });
  $("#adherentesVal").mask("000.000.000.000.000", { reverse: true });
});