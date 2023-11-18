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

async function GetData(URL){
    let height = document.getElementById("height1");
    let mass = document.getElementById("mass1");
    let species = document.getElementById("species1");

    fetch(URL)
    .then((response) => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }).then(async (data) => {
        //Can query the entire object or just specific parts of it
        height.value = data.height;
        mass.value = data.mass;
        console.log(data);

        const species = data.species;
        await GetSpecies(species) .then(() => {
            console.log("testing...");
        });
    }).catch(console.error);
}

async function GetSpecies(speciesURL){
    let species = document.getElementById("species1");

    if(speciesURL.length == 0){
        species.value = "Human";
    }
    else{         
        fetch(speciesURL)
        .then((speciesResponse) => {
            if(!speciesResponse.ok) throw new Error(speciesResponse.statusText);
            return speciesResponse.json();
        }).then((speciesData) => {
            console.log(speciesData);
            species.value = speciesData.name;
        }).catch(console.error);
    }
}