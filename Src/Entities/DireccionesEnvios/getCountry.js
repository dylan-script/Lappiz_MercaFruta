function getCountry(id) {
  debugger
  let StringQuery = `SELECT Nombre FROM MercaFruta_Lappiz_Pais WHERE Id = '${id}'`;
  execQuery(StringQuery).then(function (response) {
    var dataResult1 = response;
    var dataResult2 = response;
    //imprimir resultado de la consulta
    console.log(dataResult1);
    sessionStorage.Country = dataResult2[0][0].Nombre;
    console.log(sessionStorage.Country);
    
  }, function (error) {
    console.log(error);
  });
  
  setVisibility(sessionStorage.Country);
}

function setVisibility(country) {
  debugger
  let fields = [
    '9f9cd846-c4ad-4025-bfa2-d8ba6afca274',
    '55ea7d30-bf21-427e-9417-c845d0a89db2',
    '7cc595bd-f16f-46ee-ac7d-b7c3d76b2d0d',
    '07ee19e5-4869-4ef2-b93d-29aabd7e5516'
  ];
  for (let i = 0; i < fields.length; i++) {
    visibilityField(fields[i], false)
  }
  if (country != 'Colombia') {
    visibilityField(fields[2], true);//Departamento
    visibilityField(fields[3], true);//Ciudad
  } else {
    visibilityField(fields[0], true);//DepartamentoFK
    visibilityField(fields[1], true);//CiudadFK
  }
}