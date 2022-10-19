setTimeout(() => {
  let fieldId = '2abc97c5-223b-4fc8-b24f-afb588126d17';
  let result = getFieldValue(fieldId);
  getCountry(result);
  console.log(result);
}, 500);