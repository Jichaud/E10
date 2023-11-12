// cargaInicio();
let html = "";
let ingresosBrutosJS = "";
let numeroAdherentes = "";
let ingresosBrutosIndice = "";
let tipoActividadValue = "";
let superficieAfectadaIndice = "";
let energiaConsumidaIndice = "";
let alquieresDevengadosIndice = "";

function retCalcFin() {
  $("#ret").hide();
  $("#nuevoCalculo").prop("hidden", false);
  $("#regRet").prop("disabled", true);
  $("#importeNeto").prop("disabled", true);
  $("#inscriptoGanancias").prop("disabled", true);
  $("#pluralidadSujetos").prop("disabled", true);
  $("#btnAdherentes").prop("disabled", true);
  $("#pagosMes").prop("disabled", true);
  $("#retencionesMes").prop("disabled", true);
  $("#tipoPersona").prop("disabled", true);
}

const monoToGo = document.getElementById("footer-card");

$("#categoria").on("click", function () {
  $("#datosIngresosBrutos").val(Intl.NumberFormat("es", {style: "currency", currency: "USD", currencySign: "accounting",}).format(ingresosBrutosJS).replace("US$", ""))
  $("#datosSuperficieAfectada").val($("#superficieAfectada option:selected").text())
  $("#datosEnergiaConsumida").val($("#energiaConsumida option:selected").text())
  $("#datosAlquieresDevengados").val($("#alquieresDevengados option:selected").text())
  $("#datosAdherentes").val(numeroAdherentes)
  if ($(window).width() < 992) {
    monoToGo.scrollIntoView();
  } else {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
    $('#iconoAdherentes').prop('hidden', false)
  } else {
    $("#adherentesVal").hide();
    $("#adherentesVal").val("");
    numeroAdherentes = 0
    $("#btnAdherentes").hide();
    $('#iconoAdherentes').prop('hidden', true)
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
      $("#actividad").hide();
      $("#alertDatosCategoria").hide();
      $("#datosImporteRetencion").hide();
      tipoActividadValue = "Selecciona...";
      break;
    case "1":
      codigoActividad.innerText = "Locaciones y/o Prestaciones de Servicios";
      actividad.className = "alert bg-danger-subtle fs-5";
      categoria.className = "btn btn-outline-danger fs-4 fw-bold";
      nuevoCalculo.className = "btn btn-outline-danger fs-4 fw-bold";
      btnAdherentes.className = "btn btn-outline-danger btn-sm mt-4 mb-3 fs-5";
      $("#actividad").show();
      tipoActividadValue = "1";
      break;
    case "2":
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
      superficieAfectadaIndice = 1;
      break;
    case "2":
      superficieAfectadaIndice = 2;
      break;
    case "3":
      superficieAfectadaIndice = 3;
      break;
    case "4":
      superficieAfectadaIndice = 4;
      break;
    case "5":
      superficieAfectadaIndice = 5;
      break;
    case "6":
      superficieAfectadaIndice = 6;
      break;
    case "7":
      superficieAfectadaIndice = 7;
      break;
  }
}

function energiaConsumida() {
  switch ($("#energiaConsumida").val()) {
    case "1":
      energiaConsumidaIndice = 1;
      break;
    case "2":
      energiaConsumidaIndice = 2;
      break;
    case "3":
      energiaConsumidaIndice = 3;
      break;
    case "4":
      energiaConsumidaIndice = 4;
      break;
    case "5":
      energiaConsumidaIndice = 5;
      break;
    case "6":
      energiaConsumidaIndice = 6;
      break;
    case "7":
      energiaConsumidaIndice = 7;
      break;
  }
}

function alquieresDevengados() {
  switch ($("#alquieresDevengados").val()) {
    case "1":
      alquieresDevengadosIndice = 1;
      break;
    case "2":
      alquieresDevengadosIndice = 2;
      break;
    case "3":
      alquieresDevengadosIndice = 3;
      break;
    case "4":
      alquieresDevengadosIndice = 4;
      break;
    case "5":
      alquieresDevengadosIndice = 5;
      break;
    case "6":
      alquieresDevengadosIndice = 6;
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
  let topeIngresosSer = categoriaServicios.catHs.ingresosBrutos;
  let topeIngresosV = categoriaVentas.catKv.ingresosBrutos;
  if (tipoActividadValue === "1") {
    if (ingresosBrutosJS <= categoriaServicios.catAs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catAs.indice;
    } else if (ingresosBrutosJS <= categoriaServicios.catBs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catBs.indice;
    } else if (ingresosBrutosJS <= categoriaServicios.catCs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catCs.indice;
    } else if (ingresosBrutosJS <= categoriaServicios.catDs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catDs.indice;
    } else if (ingresosBrutosJS <= categoriaServicios.catEs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catEs.indice;
    } else if (ingresosBrutosJS <= categoriaServicios.catFs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catFs.indice;
    } else if (ingresosBrutosJS <= categoriaServicios.catGs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catGs.indice;
    } else if (ingresosBrutosJS <= categoriaServicios.catHs.ingresosBrutos) {
      ingresosBrutosIndice = categoriaServicios.catHs.indice;
    } else if (ingresosBrutosJS > categoriaServicios.catHs.ingresosBrutos) {
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
  } else {
    if (ingresosBrutosJS <= categoriaVentas.catAv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catAv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catBv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catBv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catCv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catCv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catDv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catDv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catEv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catEv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catFv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catFv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catGv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catGv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catHv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catHv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catIv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catIv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catJv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catJv.indice;
    } else if (ingresosBrutosJS <= categoriaVentas.catKv.ingresosBrutos) {
      ingresosBrutosIndice = categoriaVentas.catKv.indice;
    } else if (ingresosBrutosJS > categoriaVentas.catKv.ingresosBrutos) {
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
  numeroAdherentes = document.getElementById("adherentesVal").value;
});

function cargaInicio() {
  $("#retencion").hide();
  $("#tipoPersona").hide();
  $("#labelPersona").hide();
  $("#alertDatosCategoria").hide();
  $("#datosImporteRetencion").hide();
  $("#divPluralidad").hide();
  $("#ret").prop("disabled", true);
  $("#alertRetencionPluralidad").hide();
}

$("#nuevoCalculo").on("click", function () {
  window.location.href = "/blog/h-monotributo.html";
});

let categoriaServicios = {
  catAs: {
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
  catBs: {
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
  catCs: {
    indice: 3,
    categoria: "C",
    ingresosBrutos: 2944235.6,
    superficie: 60,
    energia: 6700,
    alquileres: 460356.93,
    impuesto: 1636.83,
    sipa: 2652.52,
    obra: 3061.75,
  },
  catDs: {
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
  catEs: {
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
  catFs: {
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
  catGs: {
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
  catHs: {
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
};

let categoriaVentas = {
  catAv: {
    indice: 1,
    categoria: "A",
    ingresosBrutos: 1414762.58,
    superficie: 30,
    energia: 3300,
    alquileres: 230178.48,
    impuesto: 496.85,
    sipa: 2192.15,
    obra: 3061.75,
    pUnitario: 85627.66,
  },
  catBv: {
    indice: 2,
    categoria: "B",
    ingresosBrutos: 2103025.45,
    superficie: 45,
    energia: 5000,
    alquileres: 230178.48,
    impuesto: 957.27,
    sipa: 2411.36,
    obra: 3061.75,
    pUnitario: 85627.66,
  },
  catCv: {
    indice: 3,
    categoria: "C",
    ingresosBrutos: 2944235.6,
    superficie: 60,
    energia: 6700,
    alquileres: 460356.93,
    impuesto: 1512.56,
    sipa: 2652.52,
    obra: 3061.75,
    pUnitario: 85627.66,
  },
  catDv: {
    indice: 4,
    categoria: "D",
    ingresosBrutos: 3656604.33,
    superficie: 85,
    energia: 10000,
    alquileres: 460356.93,
    impuesto: 2484.46,
    sipa: 2917.75,
    obra: 3638.26,
    pUnitario: 85627.66,
  },
  catEv: {
    indice: 5,
    categoria: "E",
    ingresosBrutos: 4305799.15,
    superficie: 110,
    energia: 13000,
    alquileres: 573619.32,
    impuesto: 3967.8,
    sipa: 3209.55,
    obra: 4452.02,
    pUnitario: 85627.66,
  },
  catFv: {
    indice: 6,
    categoria: "F",
    ingresosBrutos: 5382248.94,
    superficie: 150,
    energia: 16500,
    alquileres: 575446.12,
    impuesto: 5180.81,
    sipa: 3530.49,
    obra: 5145.02,
    pUnitario: 85627.66,
  },
  catGv: {
    indice: 7,
    categoria: "G",
    ingresosBrutos: 6458698.71,
    superficie: 200,
    energia: 20000,
    alquileres: 690535.39,
    impuesto: 6459.54,
    sipa: 3883.53,
    obra: 5512.52,
    pUnitario: 85627.66,
  },
  catHv: {
    indice: 8,
    categoria: "H",
    ingresosBrutos: 7996484.12,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 15856.76,
    sipa: 4271.88,
    obra: 6615.02,
    pUnitario: 85627.66,
  },
  catIv: {
    indice: 9,
    categoria: "I",
    ingresosBrutos: 8949911.06,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 25575.36,
    sipa: 4699.08,
    obra: 8190.03,
    pUnitario: 85627.66,
  },
  catJv: {
    indice: 10,
    categoria: "J",
    ingresosBrutos: 10257028.68,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 30054.72,
    sipa: 5169.03,
    obra: 9166.53,
    pUnitario: 85627.66,
  },
  catKv: {
    indice: 11,
    categoria: "K",
    ingresosBrutos: 11379612.01,
    superficie: 200,
    energia: 20000,
    alquileres: 920713.84,
    impuesto: 34526.76,
    sipa: 5685.87,
    obra: 10505.29,
    pUnitario: 85627.66,
  },
};

$(function () {
  $("#ingresosBrutos").mask("000.000.000.000.000,00", { reverse: true });
  $("#pagosMes").mask("000.000.000.000.000,00", { reverse: true });
  $("#retencionesMes").mask("000.000.000.000.000,00", { reverse: true });
  $("#adherentesVal").mask("000.000.000.000.000", { reverse: true });
});
