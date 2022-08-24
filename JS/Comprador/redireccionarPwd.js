var url = location.href;
    var urlSplit = url.split('appViewId=')
var url2 = urlSplit[1];
let urlSplit2 = url2.split('&')
let idVista = urlSplit2[0]

    if (idVista == 'fd31855a-35d4-4e9a-ba99-c1e036e9583f') {
        debugger
        setTimeout(() => {

            $('.btn-recordar').ready(() => {
                $('.btn-recordar').on("click", function () {
                    debugger;
                    var url = $(this).attr("id");
                    goLocation(url);
                });
            })
        }, 1000)
    }