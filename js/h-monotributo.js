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
      if (arrCategoria[3] === "A") {
        exImpuesto = 1;
      } else if (arrCategoria[3] === "B") {
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
      alquieresDevengadosIndice = "B";
      break;
    case "3":
      alquieresDevengadosIndice = "C";
      break;
    case "4":
      alquieresDevengadosIndice = "D";
      break;
    case "5":
      alquieresDevengadosIndice = "E";
      break;
    case "6":
      alquieresDevengadosIndice = "F";
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
  let topeIngresosSer = categoriaServicios.H.ingresosBrutosT;
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
      } else if (ingresosBrutosJS > categoriaServicios.H.ingresosBrutosT) {
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
    ingresosBrutosT: 2108288.01,
    superficie: 30,
    energia: 3300,
    alquileres: 485448.92,
    impuesto: 1047.86,
    sipa: 4623.27,
    obra: 6457.26,
  },
  B: {
    indice: 2,
    categoria: "B",
    ingresosBrutosT: 3133941.63,
    superficie: 45,
    energia: 5000,
    alquileres: 485448.92,
    impuesto: 2018.89,
    sipa: 5085.60,
    obra: 6457.26,
  },
  C: {
    indice: 3,
    categoria: "C",
    ingresosBrutosT: 4387518.23,
    superficie: 60,
    energia: 6700,
    alquileres: 970897.79,
    impuesto: 3452.09,
    sipa: 5594.16,
    obra: 6457.26,
  },
  D: {
    indice: 4,
    categoria: "D",
    ingresosBrutosT: 5449094.55,
    superficie: 85,
    energia: 10000,
    alquileres: 970897.79,
    impuesto: 5671.23,
    sipa: 6153.58,
    obra: 7673.13,
  },
  E: {
    indice: 5,
    categoria: "E",
    ingresosBrutosT: 6416528.72,
    superficie: 110,
    energia: 13000,
    alquileres: 1209769.40,
    impuesto: 10787.67,
    sipa: 6768.94,
    obra: 9389.36,
  },
  F: {
    indice: 6,
    categoria: "F",
    ingresosBrutosT: 8020660.90,
    superficie: 150,
    energia: 16500,
    alquileres: 1213622.14,
    impuesto: 14840.88,
    sipa: 7445.83,
    obra: 10850.90,
  },
  G: {
    indice: 7,
    categoria: "G",
    ingresosBrutosT: 9624793.05,
    superficie: 200,
    energia: 20000,
    alquileres: 1456346.67,
    impuesto: 18878.58,
    sipa: 8190.41,
    obra: 11625.96,
  },
  H: {
    indice: 8,
    categoria: "H",
    ingresosBrutosT: 11916410.45,
    superficie: 200,
    energia: 20000,
    alquileres: 1941795.53,
    impuesto: 43150.91,
    sipa: 9009.45,
    obra: 13951.15,
  },
};

let categoriaVentas = {
  A: {
    indice: 1,
    categoria: "A",
    ingresosBrutosT: 2108288.01,
    superficie: 30,
    energia: 3300,
    alquileres: 485448.92,
    impuesto: 1047.86,
    sipa: 4623.27,
    obra: 6457.26,
    pUnitario: 180589.67,
  },
  B: {
    indice: 2,
    categoria: "B",
    ingresosBrutosT: 3133941.63,
    superficie: 45,
    energia: 5000,
    alquileres: 485448.92,
    impuesto: 2018.89,
    sipa: 5085.60,
    obra: 6457.26,
    pUnitario: 180589.67,
  },
  C: {
    indice: 3,
    categoria: "C",
    ingresosBrutosT: 4387518.23,
    superficie: 60,
    energia: 6700,
    alquileres: 970897.79,
    impuesto: 3190.00,
    sipa: 5594.16,
    obra: 6457.26,
    pUnitario: 180589.67,
  },
  D: {
    indice: 4,
    categoria: "D",
    ingresosBrutosT: 5449094.55,
    superficie: 85,
    energia: 10000,
    alquileres: 970897.79,
    impuesto: 5239.75,
    sipa: 6153.58,
    obra: 7673.13,
    pUnitario: 180589.67,
  },
  E: {
    indice: 5,
    categoria: "E",
    ingresosBrutosT: 6416528.72,
    superficie: 110,
    energia: 13000,
    alquileres: 1209769.40,
    impuesto: 8368.13,
    sipa: 6768.94,
    obra: 9389.36,
    pUnitario: 180589.67,
  },
  F: {
    indice: 6,
    categoria: "F",
    ingresosBrutosT: 8020660.90,
    superficie: 150,
    energia: 16500,
    alquileres: 1213622.14,
    impuesto: 10926.38,
    sipa: 7445.83,
    obra: 10850.90,
    pUnitario: 180589.67,
  },
  G: {
    indice: 7,
    categoria: "G",
    ingresosBrutosT: 9624793.05,
    superficie: 200,
    energia: 20000,
    alquileres: 1456346.67,
    impuesto: 13623.24,
    sipa: 8190.41,
    obra: 11625.96,
    pUnitario: 180589.67,
  },
  H: {
    indice: 8,
    categoria: "H",
    ingresosBrutosT: 11916410.45,
    superficie: 200,
    energia: 20000,
    alquileres: 1941795.53,
    impuesto: 33442.08,
    sipa: 9009.45,
    obra: 13951.15,
    pUnitario: 180589.67,
  },
  I: {
    indice: 9,
    categoria: "I",
    ingresosBrutosT: 13337213.22,
    superficie: 200,
    energia: 20000,
    alquileres: 1941795.53,
    impuesto: 53938.71,
    sipa: 9910.39,
    obra: 17272.86,
    pUnitario: 180589.67,
  },
  J: {
    indice: 10,
    categoria: "J",
    ingresosBrutosT: 15285088.04,
    superficie: 200,
    energia: 20000,
    alquileres: 1941795.53,
    impuesto: 63385.73,
    sipa: 10901.43,
    obra: 19332.31,
    pUnitario: 180589.67,
  },
  K: {
    indice: 11,
    categoria: "K",
    ingresosBrutosT: 16957968.71,
    superficie: 200,
    energia: 20000,
    alquileres: 1941795.53,
    impuesto: 72817.31,
    sipa: 11991.57,
    obra: 22155.77,
    pUnitario: 180589.67,
  },
};

$(function () {
  $("#ingresosBrutos").mask("000.000.000.000.000,00", { reverse: true });
  $("#pagosMes").mask("000.000.000.000.000,00", { reverse: true });
  $("#retencionesMes").mask("000.000.000.000.000,00", { reverse: true });
  $("#adherentesVal").mask("000.000.000.000.000", { reverse: true });
});
