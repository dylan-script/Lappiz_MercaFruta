setTimeout(() => {
  var appViewId = getAppViewId();
  if (appViewId == '8b905cbc-ad73-4f90-99d8-6cb8aaca83bb') {
    debugger
    disableField('b6a7d209-6463-4228-8a62-2c3cc56de315', true);
    disableField('32296ffc-a4c5-4c03-8f93-591e28fa057f', true);
    if (sessionStorage.rolesId != '12ef9a54-036d-4942-a391-2c9fb6538753') {
      disableField('b6a7d209-6463-4228-8a62-2c3cc56de315', false);
      disableField('32296ffc-a4c5-4c03-8f93-591e28fa057f', false);
    }
  } else if (appViewId == 'fbc24a95-a5ea-4aa8-9b63-1fc1c69b5ffd') {

    var mayor = 'cc394438-3787-474e-a1ca-070d978dc82a';
    setFieldValue(mayor, 'SI');
    var detal = '8126a877-23d3-462b-9603-a8e3cb0ac710';
    setFieldValue(detal, 'SI');
    let tipo = '7c2bd4bf-1690-40b2-9655-0ccc84117dcd'
    setFieldValue(tipo, 'Frutas')
    let pesoMayor = '6fd26d9c-0ec4-4b24-8824-f4162ce80493'
    setFieldValue(pesoMayor, 'Kilogramos')
    let pesoDetal = '3c90e145-fbd3-48f9-85ac-eb0deb62bd3a'
    setFieldValue(pesoDetal, 'Gramos')
  }
}, 500);