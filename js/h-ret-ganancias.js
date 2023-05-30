cargaInicio();

function retAlquileresCalc () {
    let importeNeto = document.getElementById("importeNeto").value;
    let pagosMes = document.getElementById("pagosMes").value;
    let importeNetoNum = importeNeto.replace(".","")
    let pagosMesNum = pagosMes.replace(",",".","."," ")
    // document.getElementById("importeRetAlquileres").value = (+importeNetoNum + +pagosMesNum).toFixed(2)
    console.log(importeNetoNum)
}

$('#retAlquileres').on("click", function(){
    retAlquileresCalc();
})

$('#inscriptoGanancias').click(function(){
    if ($(this).prop('checked') == true) {
        $('#labelInscriptoGanancias').text("Inscripto ganancias");
    } else {
        $('#labelInscriptoGanancias').text("NO inscripto ganancias");
    }
})

$('#regRet').change(function(){
    switch($(this).val()){
        case "Selecciona régimen...":
            $('#retencionAlquileres').hide()
        break;
        case "31":
            $('#retencionAlquileres').show()
        break;
        case "78":
            $('#retencionAlquileres').hide()
        break;
        case "94":
            $('#retencionAlquileres').hide()
        break;
        case "116":
            $('#retencionAlquileres').hide()
        break;
    }

})

function cargaInicio(){
   // $('#retencionAlquileres').hide()
}

$(function(){
    $('#importeNeto').mask('000.000.000.000.000,00', {reverse: true});
    $('#pagosMes').mask('000.000.000.000.000,00', {reverse: true});
  });