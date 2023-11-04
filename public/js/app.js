const weatherForm = document.querySelector("form");
const formData = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const messageFive = document.querySelector("#message-5");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";
  messageFive.textContent = "";
  fetch("/weather?address=" + formData.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "Country: " + data.country;
        messageTwo.textContent = "Region: " + data.region;
        messageThree.textContent = "City: " + data.city;
        messageFour.textContent = "Forcast: " + data.forcast;
        messageFive.textContent = "Temperature: " + data.temperature;
      }
    });
  });
});
