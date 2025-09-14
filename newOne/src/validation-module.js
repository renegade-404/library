export const validator = () => {
  const inputs = document.querySelectorAll("input[required]");
  const errorMessages = document.querySelectorAll(".error-message");

  let isValid = true;

  inputs.forEach(input => {
    errorMessages.forEach(span => {
      span.hidden = true;
      span.ariaHidden = true;
    });
    input.classList = "";
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.classList = "error";
      errorMessages.forEach(span => {
      span.hidden = false;
      span.ariaHidden = false;
    });
      isValid = false; 
    }
  });

  return isValid;
}