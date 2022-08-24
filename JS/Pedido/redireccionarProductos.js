
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1];

if (idVista == '87ad62b5-00e9-4c70-8cd6-e9461cb671a9') {
    debugger
    setTimeout(() => {

        $('.seguir-comprando').ready(() => {
            $('.seguir-comprando').on("click", function () {
                debugger;
                var url = $(this).attr("id");
                goLocation(url);
            });
        })
    }, 1500)
}