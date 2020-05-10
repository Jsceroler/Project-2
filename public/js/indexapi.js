var mytemplate = require("./myTemplate.hbs")

const key = "4R4cDe3N9j6iabXuasqdymRf4OOyRBWDHvV0c8LO9XbOFrSrCY";
const secretKey = "eUy4fScKoXYDxjixBRC7JL3SWAk562ktndEAUYgP";
const validZip = /^\d{5}$/;

let token;
// get the token first
fetch("https://api.petfinder.com/v2/oauth2/token", {
    body: `grant_type=client_credentials&client_id=${key}&client_secret=${secretKey}`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
})
    .then(response => response.json())
    .then(data => {
        token = data.access_token;
    });

// Access the form
const petForm = document.getElementById('pet-form');
// Access error
const error = document.getElementById('error');
// Access results
const results = document.getElementById('results');

// find Animal
function showAnimals(animalInfo) {
    results.innerHTML = '<div></div>';
    animalInfo.forEach(animal => {
        let image;
        if (animal.photos.length > 0) {
            image = animal.photos[0].medium;
        } else {
            image = "<a href='https://www.petfinder.com'><img src='img/pets logo.jpeg' border='0' alt='Petfinder Logo' /></a>";
        }
        results.innerHTML += `
          <div class="card">
            <img src=${image} class="img-fluid rounded-circle mt-2">
            <div class="card-body">
              <h3 class="card-title text-center">${animal.name}</h3>
              <h5 class="card-text text-center">City: ${animal.contact.address.city}</h5>
              <h6 class="card-text text-center">State: ${animal.contact.address.state}</h6>
              <ul class="list-group">
                <li class="list-group-item">Age: ${animal.age}</li>
                <li class="list-group-item">Gender: ${animal.gender}</li>
                <li class="list-group-item">Size: ${animal.size}</li>
                <li class="list-group-item">Email: ${animal.contact.email}</li>
                <li class="list-group-item">Phone: ${animal.contact.phone}</li>
                <li class="list-group-item">Shelter ID: ${animal.organization_id}</li>
              </ul>
            </div>
          </div>
          <br>
        `;
    });
}
// Fetch animals from the API
function fetchAnimals(animal, zip) {
    // fetch pets
    // get data using the token
    fetch(`https://api.petfinder.com/v2/animals/?type=${animal}&contact.address.postcode=${zip}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            showAnimals(data.animals);
        });
}

// Add event listener
// check if the zip code is valid
petForm.addEventListener('submit', e => {
    e.preventDefault();
    // Access user input
    const animal = document.getElementById('animal').value;
    const zip = document.getElementById('zip').value;
    if (validZip.test(zip)) {
        results.innerHTML = '<div class="small"><iframe src="img/pets logo.jpeg" width="500px" height="500px"</iframe></div>';
        setTimeout(() => {
            fetchAnimals(animal, zip);
        }, 2000);
    } else {
        error.textContent = '(Enter a valid zip code)';
        error.style.color = 'danger';
        setTimeout(() => {
            error.textContent = '';
        }, 1000);
    }
}); 