setTimeout(() => {
  var appViewId = getAppViewId();
  if (appViewId == 'fbc24a95-a5ea-4aa8-9b63-1fc1c69b5ffd') {
    debugger
    var section = '3b211683-b215-4a66-99ae-da4cdaefd41d';
    var status = getFieldValue('b6a7d209-6463-4228-8a62-2c3cc56de315');
    var observation = getFieldValue('32296ffc-a4c5-4c03-8f93-591e28fa057f')
    if (sessionStorage.rolesId == '12ef9a54-036d-4942-a391-2c9fb6538753') {
      if (status == 'Aprobado' || status == 'Denegado' || status == 'Atencion') {
        visibilitySection(section, false);

      } else {
        visibilitySection(section, true);
      }
      disableField('b6a7d209-6463-4228-8a62-2c3cc56de315', true);
      disableField('32296ffc-a4c5-4c03-8f93-591e28fa057f', true);
    }else{
      disableField('b6a7d209-6463-4228-8a62-2c3cc56de315', false);
      disableField('32296ffc-a4c5-4c03-8f93-591e28fa057f', false);
    }
  }
}, 100);