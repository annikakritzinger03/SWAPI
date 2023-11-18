//All people --> https://swapi.dev/api/people
//All species --> https://swapi.dev/api/species
//More info --> https://swapi.dev/documentation

class Character{
    constructor(name, height, mass, species){
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.species = species;

        this.traningLvl = 0;
        this.weapon = 0;
        this.skill = 0;

        this.score = 0;
    }

    CalculateScore(){
        this.score = parseInt(this.species) + parseInt(this.trainingLvl) + 
            parseInt(this.weapon) + parseInt(this.skill);
    }
}

const trainingLevels = {
    "Sith Lord" : 10,
    "Jedi Master" : 9,
    "Jedi Knight" : 8,
    "Rebellion Leader" : 7,
    "Wookiee Warrior" : 6,
    "Gungan Warrior" : 5,
    "Crime Lord" : 4,
    "Pilot" : 3,
    "Astromech Droid" : 2,
    "Protocol Droid" : 1
};

const weapons = {
    "Lightsaber" : 5,
    "Bowcaster" : 4,
    "Blaster pistol" : 3,
    "Tools and gadgets" : 2,
    "None" : 1
};

const skills = {
    "Using the dark side of the force" : 11,
    "Using the force (highly proficient)" : 10,
    "Using the force (proficient)" : 9,
    "Using the force (capable)" : 8,
    "Strong and physically powerful" : 7,
    "Expert marksman" : 6,
    "Mind control and force persuasion" : 5,
    "Unintentionally lucky" : 4,
    "Manipulative and cunning" : 3,
    "Computer hacking" : 2,
    "Fluent in 6+ million languages" : 1
};

const speciesList = {
    "Droid" : 6,
    "Wookie" : 5,
    "Yoda's species" : 4,
    "Human" : 3,
    "Gungan" : 2,
    "Hutt" : 1
};

// from https://www.geeksforgeeks.org/how-to-get-a-key-in-a-javascript-object-by-its-value/
function getKeyByValue(object, value){
    return Object.keys(object).find(key => object[key] === value);
}

function ShowAttributeComparison(value1, value2, component1, component2){
    if(value1 > value2){
        component1.style = "border: 8px solid rgb(34, 155, 34)";
        component2.style = "border: 8px solid rgb(177, 23, 23)";
    }
    else if(value1 < value2){
        component1.style = "border: 8px solid rgb(177, 23, 23)";
        component2.style = "border: 8px solid rgb(34, 155, 34)";
    }
    else{
        component1.style = "border: 8px solid blue";
        component2.style = "border: 8px solid blue";
    }
}

async function FormatResults(){
    ShowAttributeComparison(parseInt(document.getElementById("height1").value), 
        parseInt(document.getElementById("height2").value), 
        document.getElementById("height1p"),
        document.getElementById("height2p"));

    ShowAttributeComparison(parseInt(document.getElementById("mass1").value), 
    parseInt(document.getElementById("mass2").value), 
        document.getElementById("mass1p"),
        document.getElementById("mass2p"));

    ShowAttributeComparison(speciesList[document.getElementById("species1").value], 
        speciesList[document.getElementById("species2").value], 
        document.getElementById("species1p"),
        document.getElementById("species2p"));

    ShowAttributeComparison(trainingLevels[document.getElementById("training1").value], 
        trainingLevels[document.getElementById("training2").value], 
        document.getElementById("training1p"),
        document.getElementById("training2p"));

    ShowAttributeComparison(weapons[document.getElementById("weapon1").value], 
        weapons[document.getElementById("weapon2").value], 
        document.getElementById("weapon1p"),
        document.getElementById("weapon2p"));

    ShowAttributeComparison(skills[document.getElementById("skill1").value], 
    skills[document.getElementById("skill2").value], 
        document.getElementById("skill1p"),
        document.getElementById("skill2p"));
}

async function Compare()
{
    const selectedChar1 = document.getElementById("character1");
    const selectedChar2 = document.getElementById("character2");
    const selectedOption1 = selectedChar1.options[selectedChar1.selectedIndex];
    const selectedOption2 = selectedChar2.options[selectedChar2.selectedIndex];

    if(selectedOption1.value == selectedOption2.value){
        document.getElementById("result").innerHTML = `${selectedOption1.innerHTML} CANNOT BATTLE AGAINST THEMSELF!`;
    }

    const char1Score = await GetCharacterScore(selectedOption1, 1);
    const char2Score = await GetCharacterScore(selectedOption2, 2);
    document.getElementById("result1").innerHTML = "SCORE:  " + char1Score;
    document.getElementById("result2").innerHTML = "SCORE:  " + char2Score;

    //icons from behance.net by Travis Pietsch --> https://www.behance.net/gallery/32367153/Star-Wars-Icons
    document.getElementById("logo1").src = `images/CharacterLogos/${selectedChar1.value}.png`;
    document.getElementById("logo2").src = `images/CharacterLogos/${selectedChar2.value}.png`;

    await FormatResults();
    
    let winner = (char1Score > char2Score) ? selectedOption1 : selectedOption2;
    document.getElementById("result").innerHTML = `${winner.innerHTML} WILL WIN IN BATTLE!`;
}

async function GetCharacterScore(selectedOption, charNum){
    let person = selectedOption.value;
    let request = `https://swapi.dev/api/people/${person}/`;

    let character = await GetData(request, charNum);

    switch(character.name){
        case "Luke Skywalker":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Jedi Knight"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Using the force (proficient)"];
            break;
        case "C-3PO":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Protocol Droid"];
            character.weapon = weapons.None;
            character.skill = skills["Fluent in 6+ million languages"];
            break;
        case "R2-D2":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Astromech Droid"];
            character.weapon = weapons["Tools and gadgets"];
            character.skill = skills["Computer hacking"];
            break;
        case "Darth Vader":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Sith Lord"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Using the dark side of the force"];
            break;
        case "Leia Organa":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Rebellion Leader"];
            character.weapon = weapons["Blaster pistol"];
            character.skill = skills["Using the force (capable)"];
            break;
        case "Obi-Wan Kenobi":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Jedi Master"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Mind control and force persuasion"]
            break;
        case "Chewbacca":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Wookiee Warrior"];
            character.weapon = weapons.Bowcaster;
            character.skill = skills["Strong and physically powerful"];
            break;                      
        case "Han Solo":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels.Pilot;
            character.weapon = weapons["Blaster pistol"];
            character.skill = skills["Expert marksman"];
            break;
        case "Jabba Desilijic Tiure":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Crime Lord"]
            character.weapon = weapons.None;
            character.skill = skills["Manipulative and cunning"];
            break;
        case "Yoda":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Jedi Master"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Using the force (highly proficient)"];
            break;
        case "Jar Jar Binks":
            character.species = speciesList[character.species];
            character.trainingLvl = trainingLevels["Gungan Warrior"];
            character.weapon = weapons.None;
            character.skill = skills["Unintentionally lucky"];
            break;     
    }

    console.log(character);

    let charScore = character.CalculateScore();

    let height = document.getElementById(`height${charNum}`);
    let mass = document.getElementById(`mass${charNum}`);
    let species = document.getElementById(`species${charNum}`);
    let trainingLvl = document.getElementById(`training${charNum}`);
    let weapon = document.getElementById(`weapon${charNum}`);
    let skill = document.getElementById(`skill${charNum}`);

    height.value = character.height;
    mass.value = character.mass;
    species.value = getKeyByValue(speciesList, character.species);
    trainingLvl.value = getKeyByValue(trainingLevels, character.trainingLvl);
    weapon.value = getKeyByValue(weapons,character.weapon);
    skill.value = getKeyByValue(skills,character.skill);
  
    return character.score;
}

async function GetData(URL, charNum){
    return await fetch(URL)
    .then((response) => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }).then(async (data) => {
        console.log(data);
        const species = data.species;
        const speciesName = await GetSpecies(species);

        character = new Character(data.name, data.height, data.mass, speciesName);
        return character;
    }).catch(error => console.log(error));
}

async function GetSpecies(speciesURL){
    let speciesName;

    if(speciesURL.length == 0){
        speciesName = "Human";
        return speciesName;
    }
    else{         
        return await fetch(speciesURL)
        .then((speciesResponse) => {
            if(!speciesResponse.ok) throw new Error(speciesResponse.statusText);
            return speciesResponse.json();
        }).then((speciesData) => {
            console.log(speciesData);
            speciesName = speciesData.name;
            return speciesName;
        }).catch(error => console.log(error));
    }
}