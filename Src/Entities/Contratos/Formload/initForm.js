setTimeout(() => {
  debugger
  if(sessionStorage.rolesId != '5af94aa3-aa52-44d4-a853-73fa9924c72f'){
    const status = '726f71df-2246-412c-b5cd-62d457bd413e';
    const observations = 'c77af81e-9dd7-413e-855a-1730dfc64a06';
    disableField(status, true);
    disableField(observations, true);
  }
  const status = getFieldValue('726f71df-2246-412c-b5cd-62d457bd413e');
  if(e.isNew || status == 'En Elaboración'){
    const ProviderSign = '6c1635b3-7dcd-423b-b4b6-0cdc3f2bf677';
    visibilityField(ProviderSign, false);
  }
}, 100);