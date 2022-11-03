setTimeout(function () {
  var StringQuery = `SELECT detalle.CENombre, detalle.Cargo, detalle.Id
FROM Kuiper_Lappiz_DetalleOrganigrama AS detalle
INNER JOIN Kuiper_Lappiz_Organigramas AS org
ON org.Id = detalle.Organigrama
INNER JOIN Kuiper_Lappiz_Clientes AS cliente
ON cliente.Id = org.ClienteFK
WHERE cliente.Id = '${sessionStorage.ClienteFK}'`;
  execQuery(StringQuery).then(function (response) {
    var dataResult = response[0];
    //imprimir resultado de la consulta
    console.log(dataResult);
    //console.log(response)
    $('#e4c919ff-77d8-4ab9-8817-f86bdf4c924d').data('kendoDropDownList').setDataSource(dataResult);
  }, function (error) {
    console.log(error);
  });
}, 1000);
