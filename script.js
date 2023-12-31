//All people --> https://swapi.dev/api/people
//All species --> https://swapi.dev/api/species
//More information --> https://swapi.dev/documentation

//Default display settings
document.getElementById("character1").value = 1;
document.getElementById("character2").value = 2;
document.getElementById("logo1").src = `images/CharacterLogos/1.png`;
 document.getElementById("logo2").src = `images/CharacterLogos/2.png`;

class Character{
    constructor(name, height, mass, species){
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.species = species;

        this.trainingLvl = 0;
        this.weapon = 0;
        this.skill = 0;

        this.score = 0;
    }

    //While height and mass are compared, they do not count toward the character score
    CalculateScore(){
        this.score = parseInt(this.species) + parseInt(this.trainingLvl) + 
            parseInt(this.weapon) + parseInt(this.skill);
    }
}

//Dictionaries to indicate the individual attribute scores
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

//Comparing attributes and displaying the paragraph border in red/green/blue
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

//Using ShowAttributeComparison for all 6 attributes
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

//Function called by compare button
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

    await FormatResults();
    //icons from behance.net by Travis Pietsch --> https://www.behance.net/gallery/32367153/Star-Wars-Icons
    document.getElementById("logo1").src = `images/CharacterLogos/${selectedOption1.value}.png`;
    document.getElementById("logo2").src = `images/CharacterLogos/${selectedOption2.value}.png`;

    let winner;
    if(char1Score == char2Score){
        document.getElementById("result").innerHTML = `IT'S A TIE!`;
    }
    else{
        winner = (char1Score > char2Score) ? selectedOption1 : selectedOption2;
        document.getElementById("result").innerHTML = `${winner.innerHTML} WILL WIN IN BATTLE!`;
    }
}

async function GetCharacterScore(selectedOption, charNum){
    let person = selectedOption.value;
    let request = `https://swapi.dev/api/people/${person}/`;

    //Character object with name, height, mass, species
    let character = await GetData(request, charNum);

    //Populating the next 3 attributes by using the dictionaries
    switch(character.name){
        case "Luke Skywalker":
            //Changing the species from name to number for easier comparison
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

    //console.log(character);

    //Calculating and displaying each character's score
    character.CalculateScore();
    document.getElementById(`result${charNum}`).innerHTML = "SCORE:  " + character.score;

    //Displaying all character attributes in text boxes
    document.getElementById(`height${charNum}`).value = character.height;
    document.getElementById(`mass${charNum}`).value = character.mass;
    document.getElementById(`species${charNum}`).value = getKeyByValue(speciesList, character.species);
    document.getElementById(`training${charNum}`).value = getKeyByValue(trainingLevels, character.trainingLvl);
    document.getElementById(`weapon${charNum}`).value = getKeyByValue(weapons,character.weapon);
    document.getElementById(`skill${charNum}`).value = getKeyByValue(skills,character.skill);
  
    return character.score;
}

//Getting character data (SWAPI) 
async function GetData(URL, charNum){
    return await fetch(URL)
    .then((response) => {
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
    }).then(async (data) => {
        //console.log(data);

        //Species URL is used to get the species name
        const species = data.species;
        const speciesName = await GetSpecies(species);

        //Returning character object with the first 4 attributes
        character = new Character(data.name, data.height, data.mass, speciesName);
        return character;
    }).catch(error => console.log(error));
}

//Getting character species (SWAPI) 
async function GetSpecies(speciesURL){
    let speciesName;

    //SWAPI species for human characters = []
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
            //console.log(speciesData);
            speciesName = speciesData.name;
            //console.log(speciesName);
            return speciesName;
        }).catch(error => console.log(error));
    }
}