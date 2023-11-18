//All people --> https://swapi.dev/api/people
//All species -->
//More info --> https://swapi.dev/documentation

async function Compare()
{
    const selectedChar = document.getElementById("character1");
    const selectedOption = selectedChar.options[selectedChar.selectedIndex];

    let person1 = selectedOption.value;
    let request = `https://swapi.dev/api/people/${person1}/`;

    await GetData(request).then(() => {
        let speciesRequest = document.getElementById("species1").value;
        //GetSpecies(speciesRequest);
        console.log(speciesRequest);
        let winner = selectedOption.innerHTML;
        document.getElementById("result").innerHTML = `${winner} WILL WIN IN BATTLE!`;
    }); 
}

function GetData(URL){
    return new Promise((resolve, reject) => {
        let height = document.getElementById("height1");
        let mass = document.getElementById("mass1");
        let species = document.getElementById("species1");
    
        fetch(URL).then((response) => {
            return response.json();
        }).then((data) => {
            //Can query the entire object or just specific parts of it
            height.value = data.height;
            mass.value = data.mass;
            console.log(data);

            const species = data.species;
            GetSpecies(species);
        })

        setTimeout(() => {
            resolve();
        })
    }, 2000);  
}

function GetSpecies(speciesURL){
    let species = document.getElementById("species1");

    if(speciesURL.length == 0){
        species.value = "Human";
    }
    else{         
        fetch(speciesURL).then((speciesResponse) => {
            return speciesResponse.json();
        }).then((speciesData) => {
            console.log(speciesData);
            species.value = speciesData.name;
        })
    }
}