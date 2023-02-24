const form = document.getElementById('my-form');
const rootElement = document.getElementById('root');

//-------------------------------------------------//


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Send form data to server using fetch API
    fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `name=${name}&age=${age}&phoneNumber=${phoneNumber}`
        })
        .then(response => {
            // Handle response from server
            console.log(response);
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });
});

//--------------------------------------------------------------//


const getDataButton = document.getElementById("getDataButton");
const dataList = document.getElementById("dataList");

getDataButton.addEventListener("click", () => {
    // Send a GET request to your Express.js server
    fetch("/data")
        .then(response => response.json())
        .then(data => {
            // Clear existing data in the list
            dataList.innerHTML = "";

            // Append each item to the list
            data.forEach(item => {
                rootElement.insertAdjacentHTML(
                    `beforeend`,
                    `
              <div class="name-container">
              Name: ${item.name}
              <div>
              <div>
              Age: ${item.age}
              <div>
              <div>
              Phonenumber: ${item.phoneNumber}
              <div>
              <hr>

            `
                );
            });
        });
});

//---------------------------------------------//

const clearDataButton = document.getElementById("clearDataButton");

clearDataButton.addEventListener("click", () => {
    rootElement.innerHTML = "";
})

//-------------------------------------------------//

function snackbar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);



}