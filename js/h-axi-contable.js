cargaInicio();

function findIndex() {
    let selectDate = document.getElementById('selectDate').value;
    let findIndex = index.find(element => element.mes === selectDate);
    let selectIndex = document.getElementById('selectIndex').value = Number.parseFloat(findIndex.indice).toFixed(4);
}

$('#selectDate').change(function(){
    switch($(this).val()){
        case "Selecciona fecha base...":
        selectIndex.value = '...';
        selectDateEnd.value = "Selecciona fecha..."
        selectDateStart.value = "Selecciona fecha..."
        selectIndexEnd.value = '...';
        selectIndexStart.value = '...';
        $('#selectDateEnd').prop('disabled', true)
        $('#selectDateStart').prop('disabled', true)
        $('#verTabla').prop('disabled', true)
        $('#cambiaSelectDateEnd').prop('hidden', true)
        break;
        default:
        findIndex();
        $('#selectDateEnd').prop('disabled', false)
        break;
    }
})

let index = [
    {
        mes: "Enero 2024",
        indice: 4261.5324
    },
    {
        mes: "Febrero 2024",
        indice: 4825.7881
    },
    {
        mes: "Marzo 2024",
        indice: 5357.0929
    },
    {
        mes: "Abril 2024",
        indice: 5830.2271
    },
    {
        mes: "Mayo 2024",
        indice: 6073.7165
    },
    {
        mes: "Enero 2023",
        indice: 1202.9790
    },
    {
        mes: "Febrero 2023",
        indice: 1282.7091
    },
    {
        mes: "Marzo 2023",
        indice: 1381.1601
    },
    {
        mes: "Abril 2023",
        indice: 1497.2147
    },
    {
        mes: "Mayo 2023",
        indice: 1613.5895
    },
    {
        mes: "Junio 2023",
        indice: 1709.6115
    },
    {
        mes: "Julio 2023",
        indice: 1818.0838
    },
    {
        mes: "Agosto 2023",
        indice: 2044.2832
    },
    {
        mes: "Septiembre 2023",
        indice: 2304.9242
    },
    {
        mes: "Octubre 2023",
        indice: 2496.2730
    },
    {
        mes: "Noviembre 2023",
        indice: 2816.0628
    },
    {
        mes: "Diciembre 2023",
        indice: 3533.1922
    },
    {
        mes: "Enero 2022",
        indice: 605.0317
    },
    {
        mes: "Febrero 2022",
        indice: 633.4341
    },
    {
        mes: "Marzo 2022",
        indice: 676.0566
    },
    {
        mes: "Abril 2022",
        indice: 716.9399
    },
    {
        mes: "Mayo 2022",
        indice: 753.147
    },
    {
        mes: "Junio 2022",
        indice: 793.0278
    },
    {
        mes: "Julio 2022",
        indice: 851.761
    },
    {
        mes: "Agosto 2022",
        indice: 911.1316
    },
    {
        mes: "Septiembre 2022",
        indice: 967.3076
    },
    {
        mes: "Octubre 2022",
        indice: 1028.706
    },
    {
        mes: "Noviembre 2022",
        indice: 1079.2787
    },
    {
        mes: "Diciembre 2022",
        indice: 1134.5875
    },
    {
        mes: "Enero 2021",
        indice: 401.5071
    },
    {
        mes: "Febrero 2021",
        indice: 415.8595
    },
    {
        mes: "Marzo 2021",
        indice: 435.8657
    },
    {
        mes: "Abril 2021",
        indice: 453.6503
    },
    {
        mes: "Mayo 2021",
        indice: 468.725
    },
    {
        mes: "Junio 2021",
        indice: 483.6049
    },
    {
        mes: "Julio 2021",
        indice: 498.0987
    },
    {
        mes: "Agosto 2021",
        indice: 510.3942
    },
    {
        mes: "Septiembre 2021",
        indice: 528.4968
    },
    {
        mes: "Octubre 2021",
        indice: 547.0802
    },
    {
        mes: "Noviembre 2021",
        indice: 560.9184
    },
    {
        mes: "Diciembre 2021",
        indice: 582.4575
    },
    {
        mes: "Enero 2020",
        indice: 289.8299
    },
    {
        mes: "Febrero 2020",
        indice: 295.666
    },
    {
        mes: "Marzo 2020",
        indice: 305.5515
    },
    {
        mes: "Abril 2020",
        indice: 310.1243
    },
    {
        mes: "Mayo 2020",
        indice: 314.9087
    },
    {
        mes: "Junio 2020",
        indice: 321.9738
    },
    {
        mes: "Julio 2020",
        indice: 328.2014
    },
    {
        mes: "Agosto 2020",
        indice: 337.0632
    },
    {
        mes: "Septiembre 2020",
        indice: 346.6207
    },
    {
        mes: "Octubre 2020",
        indice: 359.657
    },
    {
        mes: "Noviembre 2020",
        indice: 371.0211
    },
    {
        mes: "Diciembre 2020",
        indice: 385.8826
    },
    {
        mes: "Enero 2019",
        indice: 189.6101
    },
    {
        mes: "Febrero 2019",
        indice: 196.7501
    },
    {
        mes: "Marzo 2019",
        indice: 205.9571
    },
    {
        mes: "Abril 2019",
        indice: 213.0517
    },
    {
        mes: "Mayo 2019",
        indice: 219.5691
    },
    {
        mes: "Junio 2019",
        indice: 225.537
    },
    {
        mes: "Julio 2019",
        indice: 230.494
    },
    {
        mes: "Agosto 2019",
        indice: 239.6077
    },
    {
        mes: "Septiembre 2019",
        indice: 253.7102
    },
    {
        mes: "Octubre 2019",
        indice: 262.0661
    },
    {
        mes: "Noviembre 2019",
        indice: 273.2158
    },
    {
        mes: "Diciembre 2019",
        indice: 283.4442
    },
    {
        mes: "Enero 2018",
        indice: 126.9887
    },
    {
        mes: "Febrero 2018",
        indice: 130.0606
    },
    {
        mes: "Marzo 2018",
        indice: 133.1054
    },
    {
        mes: "Abril 2018",
        indice: 136.7512
    },
    {
        mes: "Mayo 2018",
        indice: 139.5893
    },
    {
        mes: "Junio 2018",
        indice: 144.8053
    },
    {
        mes: "Julio 2018",
        indice: 149.2966
    },
    {
        mes: "Agosto 2018",
        indice: 155.1034
    },
    {
        mes: "Septiembre 2018",
        indice: 165.2383
    },
    {
        mes: "Octubre 2018",
        indice: 174.1473
    },
    {
        mes: "Noviembre 2018",
        indice: 179.6388
    },
    {
        mes: "Diciembre 2018",
        indice: 184.2552
    }
    ];

    // Fill selectDate - fecha base
    index.forEach((mes) => {
        let mesSelect = document.createElement("option");
        mesSelect.text = mes.mes;
        selectDate.appendChild(mesSelect);
    });

    // Fill selectDateEnd - fecha final
    index.forEach((mes) => {
        let mesSelectEnd = document.createElement("option");
        mesSelectEnd.text = mes.mes;
        selectDateEnd.appendChild(mesSelectEnd);
    });

    let indexTable = document.getElementById('indexTable');
    let rangoFechas = document.getElementById('rangoFechas');

    function showDom(indexTable, arr){
        document.getElementById(indexTable).innerHTML = "";
        index.coeficiente= document.getElementById('selectIndex').innerHTML
        let filtroIndice = index.filter(element => element.indice >= selectIndexStart.value && element.indice <= selectIndexEnd.value);
        let filtroOrdenado = filtroIndice.toSorted((a, b) => b.indice - a.indice);
        for(let e of filtroOrdenado) {
            document.getElementById(indexTable).innerHTML +=
            `<td>${e.mes}</td>
             <td>${Number.parseFloat(e.indice).toFixed(4).toString().replace(".",",")}</td>
             <td>${Number.parseFloat(selectIndex.value / e.indice).toFixed(4).toString().replace(".",",")}</td>`
        }
    }

    function filterIndexStart() {
        let selectDateStart = document.getElementById('selectDateStart').value;
        let filterIndexValue = index.find(element => element.mes === selectDateStart);
        let selectIndexStart = document.getElementById('selectIndexStart').value = Number.parseFloat(filterIndexValue.indice).toFixed(4);
    }
    
    $('#selectDateStart').change(function(){
        switch($(this).val()){
            case "Selecciona fecha...":
            selectIndexStart.value = '...';
            $('#verTabla').prop('disabled', true)
            break;
            default:
            $('#verTabla').prop('disabled', false)
            $('#cambiaSelectDateEnd').prop('hidden', false)
            filterIndexStart();
            let inVal = document.getElementById('selectIndexStart').value;
            let filterIndexConsole = index.filter(element => element.indice >= inVal);
            $('#selectDateEnd').prop('disabled', true)
            break;
        }
    })

    function filterIndexEnd() {
        let selectDateEnd = document.getElementById('selectDateEnd').value;
        let filterIndexValueEnd = index.find(element => element.mes === selectDateEnd);
        let selectIndexEnd = document.getElementById('selectIndexEnd').value = Number.parseFloat(filterIndexValueEnd.indice).toFixed(4);
    }
    
    $('#selectDateEnd').change(function(){
        switch($(this).val()){
            case "Selecciona fecha...":
            selectIndexEnd.value = '...';
            $('#selectDateStart').prop('disabled', true)
            break;
            default:
            filterIndexEnd();
            let inValEnd = document.getElementById('selectIndexEnd').value;
            let filterIndexConsoleEnd = index.filter(element => element.indice <= inValEnd);
            $('#selectDateStart').prop('disabled', false)
            $('#selectDate').prop('disabled', true)
            break;
        }
    })

    $('#selectDateEnd').on('focusout', function(){
        let filterDateStart = index.filter(element => element.indice < selectIndexEnd.value)
        // Fill selectDateStart - fecha de inicio
        filterDateStart.forEach((mes) => {
            let mesSelectStart = document.createElement("option");
            mesSelectStart.text = mes.mes;
            selectDateStart.appendChild(mesSelectStart);
        });
        $('#cambiarValores').show()
        $('#selectDateEnd').prop('disabled', true)
    })

    $('#cambiarValores').on("click", function() {
        location.reload(true);
    })
    
    // Visualización tabla
    $('#verTabla').on("click", function(){
        rangoFechas.innerHTML +=
        `Coeficientes para el período ${selectDateStart.value} - ${selectDateEnd.value}`
        showDom("indexTable", index);
        $('#rangoFechas').show()
        $('#tableVisIndex').show()
        $('#verTabla').hide()
        $('#nuevoCalculo').show()
        $('#exportarTabla').show()
        $('#selectDate').prop('disabled', true)
        $('#selectDateStart').prop('disabled', true)
        $('#selectDateEnd').prop('disabled', true)
        $('#cambiaSelectDateEnd').prop('hidden', true)
        $('#cambiarValores').hide()
    })

    $('#exportarTabla').on("click", function(){
        $("#tableVisIndex").table2excel({
            exclude: ".excludeThisClass",
            name: "AxI contable",
            filename: "AxI contable.xls",
            preserveColors: false
        });
    })

    $('#nuevoCalculo').on("click", function(){
        window.location.href = '/blog/h-axi-contable.html'
    })

    function cargaInicio(){
        $('#rangoFechas').hide(),
        $('#tableVisIndex').hide(),
        $('#nuevoCalculo').hide(),
        $('#verTabla').show(),
        $('#verTabla').prop('disabled', true),
        $('#selectDateEnd').prop('disabled', true),
        $('#selectDateStart').prop('disabled', true),
        $('#cambiarValores').hide(),
        $('#exportarTabla').hide()
    }