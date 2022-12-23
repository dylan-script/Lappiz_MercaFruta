setTimeout(() => {

  $('span:contains("Variedad / Nombre Común")').attr("id", "div1");
  $('#div1').text('Nombre Común');
  $('span:contains("Variedad / Nombre Científico")').attr("id", "div2");
  $('#div2').text('Nombre Científico');

  var appViewId = getAppViewId();
  if (appViewId == 'fbc24a95-a5ea-4aa8-9b63-1fc1c69b5ffd') {

    if (e.isNew) {
      disableField('6fe20197-4644-4d4f-80a7-51eae18a1522', true);
      disableField('3b6e1388-2d28-4312-9bcf-9f5deda72350', true);
      let mayor = 'cc394438-3787-474e-a1ca-070d978dc82a';
      setFieldValue(mayor, 'SI');
      let detal = '8126a877-23d3-462b-9603-a8e3cb0ac710';
      setFieldValue(detal, 'SI');
      let registro = '8f3af676-bf20-49d5-8b93-c2442d533384';
      setFieldValue(registro, 'SI');
      let tipo = '7c2bd4bf-1690-40b2-9655-0ccc84117dcd'
      setFieldValue(tipo, '0')
      let pesoMayor = '6fd26d9c-0ec4-4b24-8824-f4162ce80493'
      setFieldValue(pesoMayor, 'Kilogramos')
      let pesoDetal = '3c90e145-fbd3-48f9-85ac-eb0deb62bd3a'
      setFieldValue(pesoDetal, 'Kilogramos')
      visibilitySection('63db0e5d-39a2-43fa-9047-80aef86ce742', false)
    } else {
      debugger
      disableField('b6a7d209-6463-4228-8a62-2c3cc56de315', true);
      disableField('32296ffc-a4c5-4c03-8f93-591e28fa057f', true);
      if (sessionStorage.rolesId != '12ef9a54-036d-4942-a391-2c9fb6538753') {
        disableField('b6a7d209-6463-4228-8a62-2c3cc56de315', false);
        disableField('32296ffc-a4c5-4c03-8f93-591e28fa057f', false);
      }
    }
  }
}, 500);