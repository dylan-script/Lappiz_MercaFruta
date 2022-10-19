function typeUser() {
    console.clear();
    debugger
    let query = `SELECT * FRON Users WHERE Id = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
    runQuery(query);
    
}
function runQuery(Query) {
        debugger;
        execQuery(StringQuery).then(function(response){
        var dataResult = response.data[0];
        //imprimir resultado de la consulta
        console.log(dataResult);
        sessionStorage.typeUser = dataResult[0].Tipo;
        console.log(sessionStorage.typeUser);
        },function(error){
            console.log(error);
        });
}