//All perople --> https://swapi.dev/api/people
//More info --> https://swapi.dev/documentation

let request = "https://swapi.dev/api/people/2/";

fetch(request).then((response) => {
    return response.json();
}).then((data) => {
    let name = document.getElementById("name");
    let gender = document.getElementById("gender");
    let height = document.getElementById("height");
    console.log(data);
    //Can query the entire object or just specific parts of it
    name.innerHTML = data.name;
    gender.innerHTML = data.gender;
    height.innerHTML = data.height;
})