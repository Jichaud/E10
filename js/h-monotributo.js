// cargaInicio();
let html = "";
let ingresosBrutosJS = 0;
let numeroAdherentes = 0;
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
  let arrCategoria = [
    ingresosBrutosIndice,
    superficieAfectadaIndice,
    energiaConsumidaIndice,
    alquieresDevengadosIndice,
  ];
  arrCategoria.sort();
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
  
  console.log(categoriaServicios[arrCategoria[3]])
  
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
      $("#actividad").hide();
      $("#alertDatosCategoria").hide();
      $("#datosCategoriaAsignada").hide();
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
  let topeIngresosSer = categoriaServicios.H.ingresosBrutos;
  let topeIngresosV = categoriaVentas.K.ingresosBrutos;
  if (tipoActividadValue === "1") {
    if (ingresosBrutosJS <= categoriaServicios.A.ingresosBrutos) {
      ingresosBrutosIndice = "A";
    } else if (ingresosBrutosJS <= categoriaServicios.B.ingresosBrutos) {
      ingresosBrutosIndice = "B";
    } else if (ingresosBrutosJS <= categoriaServicios.C.ingresosBrutos) {
      ingresosBrutosIndice = "C";
    } else if (ingresosBrutosJS <= categoriaServicios.D.ingresosBrutos) {
      ingresosBrutosIndice = "D";
    } else if (ingresosBrutosJS <= categoriaServicios.E.ingresosBrutos) {
      ingresosBrutosIndice = "E";
    } else if (ingresosBrutosJS <= categoriaServicios.F.ingresosBrutos) {
      ingresosBrutosIndice = "F";
    } else if (ingresosBrutosJS <= categoriaServicios.G.ingresosBrutos) {
      ingresosBrutosIndice = "G";
    } else if (ingresosBrutosJS <= categoriaServicios.H.ingresosBrutos) {
      ingresosBrutosIndice = "H";
    } else if (ingresosBrutosJS > categoriaServicios.H.ingresosBrutos) {
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
    if (ingresosBrutosJS <= categoriaVentas.A.ingresosBrutos) {
      ingresosBrutosIndice = "A";
    } else if (ingresosBrutosJS <= categoriaVentas.B.ingresosBrutos) {
      ingresosBrutosIndice = "B";
    } else if (ingresosBrutosJS <= categoriaVentas.C.ingresosBrutos) {
      ingresosBrutosIndice = "C";
    } else if (ingresosBrutosJS <= categoriaVentas.D.ingresosBrutos) {
      ingresosBrutosIndice = "D";
    } else if (ingresosBrutosJS <= categoriaVentas.E.ingresosBrutos) {
      ingresosBrutosIndice = "E";
    } else if (ingresosBrutosJS <= categoriaVentas.F.ingresosBrutos) {
      ingresosBrutosIndice = "F";
    } else if (ingresosBrutosJS <= categoriaVentas.G.ingresosBrutos) {
      ingresosBrutosIndice = "G";
    } else if (ingresosBrutosJS <= categoriaVentas.H.ingresosBrutos) {
      ingresosBrutosIndice = "H";
    } else if (ingresosBrutosJS <= categoriaVentas.I.ingresosBrutos) {
      ingresosBrutosIndice = "I";
    } else if (ingresosBrutosJS <= categoriaVentas.J.ingresosBrutos) {
      ingresosBrutosIndice = "J";
    } else if (ingresosBrutosJS <= categoriaVentas.K.ingresosBrutos) {
      ingresosBrutosIndice = "K";
    } else if (ingresosBrutosJS > categoriaVentas.K.ingresosBrutos) {
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
  $("#datosCategoriaAsignada").hide();
  $("#divPluralidad").hide();
  $("#ret").prop("disabled", true);
  $("#alertRetencionPluralidad").hide();
}

$("#nuevoCalculo").on("click", function () {
  window.location.href = "/blog/h-monotributo.html";
});

let categoriaServicios = {
  A: {
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
  B: {
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
  C: {
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
  D: {
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
  E: {
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
  F: {
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
  G: {
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
  H: {
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
  A: {
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
  B: {
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
  C: {
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
  D: {
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
  E: {
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
  F: {
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
  G: {
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
  H: {
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
  I: {
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
  J: {
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
  K: {
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
