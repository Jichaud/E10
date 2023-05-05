let selectDate = document.getElementById('selectDate').value;
let index = [
    {
        mes: "Selecciona fecha...",
        indice: 1800.4565
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
    }
    ];


    $('#selectDate').change(function(){
        let findIndex = index.find(element => element.mes === selectDate);
        switch($(this).val()){
            case "Selecciona fecha...":
            console.log(findIndex.indice);
            break;
            default:
            console.log(findIndex.indice);
            break;
        }
    })

