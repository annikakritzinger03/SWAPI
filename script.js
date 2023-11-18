//All people --> https://swapi.dev/api/people
//All species --> https://swapi.dev/api/species
//More info --> https://swapi.dev/documentation

class Character{
    constructor(name, height, mass, species){
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.species = species;

        this.traningLvl;
        this.weapon;
        this.skill;
    }
}

const trainingLevels = {
    "Sith Lord" : 1,
    "Jedi Master" : 2,
    "Jedi Knight" : 3,
    "Rebellion Leader" : 4,
    "Wookiee Warrior" : 5,
    "Gungan Warrior" : 6,
    "Crime Lord" : 7,
    "Pilot" : 8,
    "Astromech Droid" : 9,
    "Protocol Droid" : 10
};

const weapons = {
    "Lightsaber" : 1,
    "Bowcaster" : 2,
    "Blaster pistol" : 3,
    "Tools and gadgets" : 4,
    "None" : 5
};

const skills = {
    "Using the dark side of the force" : 1,
    "Using the force (highly proficient)" : 2,
    "Using the force (proficient)" : 3,
    "Using the force (capable)" : 4,
    "Strong and physically powerful" : 5,
    "Expert marksman" : 6,
    "Mind control and force persuasion" : 7,
    "Unintentionally lucky" : 8,
    "Manipulative and cunning" : 9,
    "Computer hacking" : 10,
    "Fluent in 6+ million languages" : 11
};

function Compare()
{
    const selectedChar1 = document.getElementById("character1");
    const selectedChar2 = document.getElementById("character2");
    const selectedOption1 = selectedChar1.options[selectedChar1.selectedIndex];
    const selectedOption2 = selectedChar2.options[selectedChar2.selectedIndex];

    if(selectedOption1.value == selectedOption2.value){
        document.getElementById("result").innerHTML = `${selectedOption1.innerHTML} CANNOT BATTLE AGAINST THEMSELF!`;
    }

    const char1Score = GetCharacterScore(selectedOption1, 1);
    const char2Score = GetCharacterScore(selectedOption2, 2);
    
    let winner = (char1Score > char2Score) ? selectedOption1 : selectedOption2;
    document.getElementById("result").innerHTML = `${winner.innerHTML} WILL WIN IN BATTLE!`;
}

function GetCharacterScore(selectedOption, charNum){
    let charScore = 0;
    let person = selectedOption.value;
    let request = `https://swapi.dev/api/people/${person}/`;

    let character = GetData(request, charNum);
        // .then(() => {
    //     let speciesRequest = document.getElementById(`species${charNum}`).value;
    //     //Getting species (third field)
    //     GetSpecies(speciesRequest); 
    // }); 

    let height = document.getElementById(`height${charNum}`);
    let mass = document.getElementById(`mass${charNum}`);
    let species = document.getElementById(`species${charNum}`);
    let trainingLvl = document.getElementById(`training${charNum}`);
    let weapon = document.getElementById(`weapon${charNum}`);
    let skill = document.getElementById(`skill${charNum}`);

    switch(true){
        case (character.name == "Luke Skywalker"):
            character.trainingLvl = trainingLevels["Jedi Knight"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Using the force (proficient)"];
            break;
        case (character.name == "C-3PO"):
            character.trainingLvl = trainingLevels["Protocol Droid"];
            character.weapon = weapons.None;
            character.skill = skills["Fluent in 6+ million languages"];
            break;
        case (character.name == "R2-D2"):
            character.trainingLvl = trainingLevels["Astromech Droid"];
            character.weapon = weapons["Tools and gadgets"];
            character.skill = skills["Computer hacking"];
            break;
        case (character.name == "Darth Vader"):
            character.trainingLvl = trainingLevels["Sith Lord"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Using the dark side of the force"];
            break;
        case (character.name == "Leia Organa"):
            character.trainingLvl = trainingLevels["Rebellion Leader"];
            character.weapon = weapons["Blaster pistol"];
            character.skill = skills["Using the force (capable)"];
            break;
        case (character.name == "Obi-Wan Kenobi"):
            character.trainingLvl = trainingLevels["Jedi Master"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Mind control and force persuasion"]
            break;
        case (character.name == "Chewbacca"):
            character.trainingLvl = trainingLevels["Wookiee Warrior"];
            character.weapon = weapons.Bowcaster;
            character.skill = skills["Strong and physically powerful"];
            break;                      
        case (character.name == "Han Solo"):
            character.trainingLvl = trainingLevels.Pilot;
            character.weapon = weapons["Blaster pistol"];
            character.skill = skills["Expert marksman"];
            break;
        case (character.name == "Jabba Desilijic Tiure"):
            character.trainingLvl = trainingLevels["Crime Lord"]
            character.weapon = weapons.None;
            character.skill = skills["Manipulative and cunning"];
            break;
        case (character.name == "Yoda"):
            character.trainingLvl = trainingLevels["Jedi Master"];
            character.weapon = weapons.Lightsaber;
            character.skill = skills["Using the force (highly proficient)"];
            break;
        case (character.name == "Jar Jar Binks"):
            character.trainingLvl = trainingLevels["Gungan Warrior"];
            character.weapon = weapons.None;
            character.skill = skills["Unintentionally lucky"];
            break;     
    }

    let trainingScore = trainingLevels[character.trainingLvl];
    let weaponScore = weapons[character.weapon];
    let skillScore = skills[character.skill];

    height.value = character.height;
    mass.value = character.mass;
    species.value = character.species;
    trainingLvl.value = character.training;
    weapon.value = character.weapon;
    skill.value = character.skill;
  
    return charScore;
}

function GetData(URL, charNum){
    let character;

    fetch(URL)
    .then((response) => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }).then((data) => {
        //Can query the entire object or just specific parts of it
        // height.value = data.height;
        // mass.value = data.mass;
        console.log(data);
        const species = data.species;
        const speciesName = GetSpecies(species);

        character = new Character(data.name, data.height, data.mass, speciesName);
    }).catch(console.error);

    return character;
}

function GetSpecies(speciesURL){
    let speciesName;

    if(speciesURL.length == 0){
        speciesName = "Human";
    }
    else{         
        fetch(speciesURL)
        .then((speciesResponse) => {
            if(!speciesResponse.ok) throw new Error(speciesResponse.statusText);
            return speciesResponse.json();
        }).then((speciesData) => {
            console.log(speciesData);
            speciesName = speciesData.name;
        }).catch(console.error);
    }

    return speciesName;
}