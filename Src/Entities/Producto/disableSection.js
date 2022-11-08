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
  }
}, 100);