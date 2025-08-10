// General Utilities
const passportRankDict = {
    0: {
        'rank_title': "Preschooler",
        'score_threshold_min': 0,
        'trainer_card_index': 1,
    },
    1: {
        'rank_title': "School Kid",
        'score_threshold_min': 700,
        'trainer_card_index': 1,
    },
    2: {
        'rank_title': "Backpacker",
        'score_threshold_min': 1500,
        'trainer_card_index': 2,
    },
    3: {
        'rank_title': "PKMN Breeder",
        'score_threshold_min': 3500,
        'trainer_card_index': 2,
    },
    4: {
        'rank_title': "PKMN Ranger",
        'score_threshold_min': 5250,
        'trainer_card_index': 2,
    },
    5: {
        'rank_title': "Ace Trainer",
        'score_threshold_min': 7500,
        'trainer_card_index': 3,
    },
    6: {
        'rank_title': "Veteran",
        'score_threshold_min': 9000,
        'trainer_card_index': 3,
    },
    7: {
        'rank_title': "Gym Leader",
        'score_threshold_min': 10500,
        'trainer_card_index': 4,
    },
    8: {
        'rank_title': "Elite 4",
        'score_threshold_min': 12000,
        'trainer_card_index': 4,
    },
    9: {
        'rank_title': "Champion",
        'score_threshold_min': 13500,
        'trainer_card_index': 5,
    },
    10: {
        'rank_title': "Team Leader",
        'score_threshold_min': 27000,
        'trainer_card_index': 6,
    },
    11: {
        'rank_title': "Protagonist",
        'score_threshold_min': 52000,
        'trainer_card_index': 6,
    },
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// Passport Max Values (Do not change with user input)
function calcMaxPassportScore() {
    var max_passport_score = 0;
    var all_ball_icon_imgs = document.getElementsByClassName("ball-icon");

    for (k = 0; k < all_ball_icon_imgs.length; k++) {
        if (all_ball_icon_imgs[k].classList.contains("pokeball")){
            max_passport_score += 100
            }
        if (all_ball_icon_imgs[k].classList.contains("greatball")){
            max_passport_score += 250
            }
        if (all_ball_icon_imgs[k].classList.contains("ultraball")){
            max_passport_score += 400
            }
        if (all_ball_icon_imgs[k].classList.contains("masterball")){
            max_passport_score += 750
            }
        }
    return max_passport_score
}

function calcMaxPassportChallengeCount() {
    var passport_challenge_count = 0;
    var all_ball_icon_imgs = document.getElementsByClassName("ball-icon-container");

    for (k = 0; k < all_ball_icon_imgs.length; k++) {
        passport_challenge_count += 1
        }

    return passport_challenge_count
}

// Current Passport Progress Functions (do change with user input)
function calcCurrentPassportScore() {
    var nuzlocke_passport_score = 0;
    var all_ball_icon_imgs = document.getElementsByClassName("ball-icon");

    for (k = 0; k < all_ball_icon_imgs.length; k++) {
        if (all_ball_icon_imgs[k].classList.contains("coloured")){
            if (all_ball_icon_imgs[k].classList.contains("pokeball")){
                nuzlocke_passport_score += 100
                }
            if (all_ball_icon_imgs[k].classList.contains("greatball")){
                nuzlocke_passport_score += 250
                }
            if (all_ball_icon_imgs[k].classList.contains("ultraball")){
                nuzlocke_passport_score += 400
                }
            if (all_ball_icon_imgs[k].classList.contains("masterball")){
                nuzlocke_passport_score += 750
                }
            }
        }
    return nuzlocke_passport_score
}

function updatePassportScoreHTML(){
    var currentPassportScore = calcCurrentPassportScore()
    var maxPassportScore = calcMaxPassportScore()

    var passport_score_elem = document.getElementById("passport_score");
    passport_score_elem.textContent = "Passport Score: " + currentPassportScore + " / " + maxPassportScore;
}

function calcScoreToNextRank(){
    var currentPassportScore = calcCurrentPassportScore()
    var passportRank = getPassportRank()
    var scoreToNextRank = 'Null'

    try {
        var nextRankScoreThreshold = passportRankDict[passportRank+1]["score_threshold_min"]
        scoreToNextRank = nextRankScoreThreshold - currentPassportScore
    } catch (error) {
        console.log(error)
    }

    return scoreToNextRank
}

function updatePassportScoreToNextRankHTML(){
    var scoreToNextRank = calcScoreToNextRank()

    var passport_score_to_next_rank_elem = document.getElementById("passport_score_to_next_rank");
    passport_score_to_next_rank_elem.textContent = "Score To Next Rank: " + scoreToNextRank;
}

function calcCurrentPassportChallengeCount() {
    var passport_complete_challenge_count = 0;
    var ball_container_elem_list = document.getElementsByClassName("ball-icon-container");

    for (k = 0; k < ball_container_elem_list.length; k++) {
        var ball_icon_imgs = ball_container_elem_list[k].childNodes

        var should_increment = false;
        for (j = 0; j < ball_icon_imgs.length; j++) {
            if (ball_icon_imgs[j].classList.contains("coloured")) {
                should_increment = true;
            }
        }
        if (should_increment === true){
                passport_complete_challenge_count += 1
            }
        }
    return passport_complete_challenge_count
}

function updatePassportChallengeCountHTML(){
    var completeChallengeCount = calcCurrentPassportChallengeCount()
    var maxPassportChallengeCount = calcMaxPassportChallengeCount()

    var complete_challenge_count_elem = document.getElementById("complete_challenge_count");
    complete_challenge_count_elem.textContent = "Challenges Complete: " + completeChallengeCount + " / " + maxPassportChallengeCount;
}

// Passport Rank Functions
function getPassportRank() {
    var current_passport_score = calcCurrentPassportScore();
    var current_challenges_complete = calcCurrentPassportChallengeCount()
    var passportRank = null;

    for(var dictKey in Object.keys(passportRankDict)){
        var rank_score_threshold_min = passportRankDict[dictKey]["score_threshold_min"]
        if (current_passport_score >= rank_score_threshold_min) {
            passportRank = parseInt(dictKey)
        }
    }
    return passportRank
}

function getPassportRankTitle(passportRank){
    return passportRankDict[passportRank]["rank_title"]
}

function updatePassportTitleHTML(){
    var passportRank = getPassportRank()
    var passportRankTitle = getPassportRankTitle(passportRank)

    var passport_title_elem = document.getElementById("passport_title");
    passport_title_elem.textContent = passportRankTitle;
}

function updatePassportRankHTML(){
    var passportRank = getPassportRank()

    var passport_rank_elem = document.getElementById("passport_rank");
    passport_rank_elem.textContent = passportRank;
}

function generatePassportTCImgSrcString(){
    var passportRank = getPassportRank()
    var passportTrainerCardIndex = passportRankDict[passportRank]["trainer_card_index"];

    return "static/images/trainer_cards/tc" + passportTrainerCardIndex + "_blank.png"
}


function updatePassportTCImageHTML() {
    var passportTCImgSrcString = generatePassportTCImgSrcString();

    var passport_trainer_card_img_elem = document.getElementById("passport_tc_img");
    passport_trainer_card_img_elem.src = passportTCImgSrcString;
}


function generatePassportRankImgSrcString(spriteGenderOverride){
    var imgIndex = null;
    var passportImgSrcString = null;
    var passportGender = null;

    var passportRank = getPassportRank()
    if (spriteGenderOverride == null){
        passportGender = getPassportGender()
    } else {
        passportGender = spriteGenderOverride
    }

    const passportImgSourceFilepath = "static/images/rank_sprites/r" + passportRank
    if (passportRank <= 6){
        passportImgSrcString = passportImgSourceFilepath + "/" + passportGender + ".png"
    }
    else if (passportRank === 7) {
        // Returns a random integer from 0 to the number of images in the folder:

        if (passportGender === 'male'){
            imgIndex = Math.floor(Math.random() * 27);
        }
        else if (passportGender === 'female'){
            imgIndex = Math.floor(Math.random() * 17);
        }
        passportImgSrcString = passportImgSourceFilepath + "/" + passportGender + "/" + passportGender[0] + imgIndex + ".png"
    }
    else if (passportRank === 8) {
        // Returns a random integer from 0 to the number of images in the folder:
        if (passportGender === 'male'){
            imgIndex = Math.floor(Math.random() * 10);
        }
        else if (passportGender === 'female'){
            imgIndex = Math.floor(Math.random() * 7);
        }
        passportImgSrcString = passportImgSourceFilepath + "/" + passportGender + "/" + passportGender[0] + imgIndex + ".png"
    }
    else if (passportRank === 9) {
        // Returns a random integer from 0 to the number of images in the folder:
        if (passportGender === 'male'){
            imgIndex = Math.floor(Math.random() * 5);
        }
        else if (passportGender === 'female'){
            imgIndex = Math.floor(Math.random() * 2);
        }
        passportImgSrcString = passportImgSourceFilepath + "/" + passportGender + "/" + passportGender[0] + imgIndex + ".png"
    }
    else if (passportRank === 10) {
        // Returns a random integer from 0 to the number of images in the folder:
        imgIndex = Math.floor(Math.random() * 7);

        passportImgSrcString = passportImgSourceFilepath + "/team_leader_" + imgIndex + ".png"
    }
    else if (passportRank === 11) {
        // Returns a random integer from 0 to the number of images in the folder:
        if (passportGender === 'male'){
            imgIndex = Math.floor(Math.random() * 6);
        }
        else if (passportGender === 'female'){
            imgIndex = Math.floor(Math.random() * 5);
        }
        passportImgSrcString = passportImgSourceFilepath + "/" + passportGender + "/" + passportGender[0] + imgIndex + ".png"
    }
    return passportImgSrcString
}


function updatePassportRankImageHTML(spriteGenderOverride) {
    var passportRankImgSRCString = generatePassportRankImgSrcString(spriteGenderOverride)

    var passport_rank_img_elem = document.getElementById("passport_rank_image");
    passport_rank_img_elem.src = passportRankImgSRCString;
}

// Passport Name Functionality
function getPassportNameCookie(){
    return getCookie("passportName")
}

function setPassportNameCookie(passportNameString){
    // Saves Cookie for ~3 months
    setCookie("passportName", passportNameString, 90)
}

function getNewPassportName() {
    var passportNameInput = document.getElementById("name_text_input")
    var passportName = passportNameInput.value

    return passportName
}

function updatePassportNameHTML(passportName){
    var passport_name_elem = document.getElementById("passport_name");
    passport_name_elem.textContent = passportName;
}

//Passport sprite gender functionality
function getPassportSpriteGenderCookie(){
    return getCookie("passportSpriteGender")
}

function setPassportSpriteGenderCookie(passportSpriteGenderString){
    // Saves Cookie for ~3 months
    setCookie("passportSpriteGender", passportSpriteGenderString, 90)
}

function getPassportGender() {
    var passportGenderCookie = getPassportSpriteGenderCookie()
    console.log(passportGenderCookie)
    var passportSpriteGender = null
    if (passportGenderCookie != null){
        passportSpriteGender = passportGenderCookie
    }
    return passportSpriteGender
}

function updateGenderRadioButtonState(spriteGenderOverride){
    var passportGender = null;

    if (spriteGenderOverride == null){
        passportGender = getPassportSpriteGenderCookie()
    } else {
        passportGender = spriteGenderOverride
    }

    if (passportGender != null){
        if (passportGender === 'male'){
            document.getElementById("male-radio-button-input").checked = true;
        } else if (passportGender === 'female'){
            document.getElementById("female-radio-button-input").checked = true;
        }
    }
}


// Passport HTML saving & recalling functionality
async function exportTrainerCardImg() {
    const element = document.getElementById('trainer_card');
    try {
        const canvas = await html2canvas(element, {
            allowTaint: true,
            useCORS: true,
            scale: 2,
            backgroundColor:null
        });
        const imgUrl = canvas.toDataURL('image/png');
        const img = new Image();
        img.src = imgUrl;
        img.id = 'tc_preview_img'
        document.body.appendChild(img);

        // Download Image
        const link = document.createElement('a');
        link.download = 'NuzlockePassportTC.png';
        link.href = imgUrl;
        link.click();
    } catch (err) {
      console.error('Error Exporting Trainer Card Img:', err);
    }

    // Remove img from webpage after downloading
    var tc_image = document.getElementById('tc_preview_img');
    tc_image.remove()
}

function generateFullPassportJSON(){
    const ballIconElements = document.getElementsByClassName('ball-icon');
    var challengeCompleteBallIDList = [];

    // Scan all ball icons and if coloured (challenge complete), log icon ID
    for (var i = 0; i < ballIconElements.length; i++) {
        if (ballIconElements[i].classList.contains("coloured")) {
            var ballIconID = ballIconElements[i].id
            challengeCompleteBallIDList.push(ballIconID)
        }
    }
    const passportName = getPassportNameCookie()
    const passportSpriteGender = getPassportSpriteGenderCookie()
    const passportDict = {
        "passportName": passportName,
        "passportSpriteGender": passportSpriteGender,
        "challengeCompleteBallIDList": challengeCompleteBallIDList,
    };
    return JSON.stringify(passportDict)
}

function getFullPassportJSONCookie(){
    return getCookie("passportColouredItems")
}

function setFullPassportJSONCookie(fullPassportJSON){
    // Saves Cookie for ~3 months
    setCookie("passportColouredItems", fullPassportJSON, 90)
}

function exportFullPassport() {
    try {
        const filename = 'NuzlockePassport.json';
        const passportJSONStr = generateFullPassportJSON()

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(passportJSONStr));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

    } catch (err) {
        console.error('Error Exporting Full Passport JSON:', err);
    }
}

function updatePassportHTMLFromDict(passportDict){
    // Read passport info from parsed passportDict JSON
    try {
        var passportName = passportDict["passportName"]
        updatePassportNameHTML(passportName)
    } catch (err) {
        console.log(err)
    }

    try {
        var passportSpriteGender = passportDict["passportSpriteGender"]
        updateGenderRadioButtonState(passportSpriteGender)
    } catch (err) {
        console.log(err)
    }

    try{
        // Clear all coloured ball icons
        var all_ball_icon_imgs = document.getElementsByClassName("ball-icon");

        for (k = 0; k < all_ball_icon_imgs.length; k++) {
            if (all_ball_icon_imgs[k].classList.contains("coloured")) {
                all_ball_icon_imgs[k].classList.remove("coloured")
            }
        }

        // Colour only those specified by the imported passport dict
        var challengeCompleteBallIDList = passportDict["challengeCompleteBallIDList"]
        for (var i = 0; i < challengeCompleteBallIDList.length; i++) {
            var ballID = challengeCompleteBallIDList[i]
            var ballElem = document.getElementById(ballID)
            if (!ballElem.classList.contains("coloured")){
                ballElem.classList.add("coloured")
            }
            if (!ballElem.classList.contains("shake")){
                ballElem.classList.add("shake")
            }
        }
    } catch (err) {
        console.log(err)
    }

    updatePassportScoreHTML()
    updatePassportChallengeCountHTML()
    updatePassportTitleHTML()
    updatePassportRankHTML()
    updatePassportRankImageHTML(passportSpriteGender)
    updatePassportTCImageHTML()
    updatePassportScoreToNextRankHTML()
}

function importFullPassport(){
    const passportFileList = document.getElementById("import_passport_file_select").files;
    const numFiles = passportFileList.length;
    const passportFile = passportFileList[0];

    if (numFiles === 1){
        let fileReader = new FileReader();
        fileReader.readAsText(passportFile);
        fileReader.onload = function(e) {
            // when fileReader is ready, load passport dict JSON string from uploaded text file
            var passportJSONStr = fileReader.result;
            var passportDict = JSON.parse(passportJSONStr)
            updatePassportHTMLFromDict(passportDict)
        };
    }
}



// User interaction functionality (Functions run when user interacts with elements)

function updateName(){
    var newPassportName = getNewPassportName()
    updatePassportNameHTML(newPassportName)
    setPassportNameCookie(newPassportName)
    var passportJSON = generateFullPassportJSON()
    setFullPassportJSONCookie(passportJSON)
}

function updateSpriteGender(spriteGender){
    setPassportSpriteGenderCookie(spriteGender)
    updatePassportRankImageHTML()
    var passportJSON = generateFullPassportJSON()
    setFullPassportJSONCookie(passportJSON)
}

function ballContainerOnClick(){
    // when ball container is clicked, toggle 'coloured' and 'shake' classes for all child ball images and recalculate passport HTML elements

    var ball_icon_imgs = this.childNodes
    for (j = 0; j < ball_icon_imgs.length; j++) {
        ball_icon_imgs[j].classList.toggle("coloured");
        ball_icon_imgs[j].classList.toggle("shake");
    }

    // Update passport trainer card elements
    updatePassportScoreHTML()
    updatePassportChallengeCountHTML()
    updatePassportTitleHTML()
    updatePassportRankHTML()
    updatePassportRankImageHTML()
    updatePassportTCImageHTML()
    updatePassportScoreToNextRankHTML()

    // Generate coloured ball-icon element JSON and save to cookies
    const fullPassportJSON = generateFullPassportJSON()
    setFullPassportJSONCookie(fullPassportJSON)
}


// Passport Initialization function (Should be run on JS file import as soon as html loads)
function initPassport() {
    var ball_icons_containers = document.getElementsByClassName("ball-icon-container");
    for (i = 0; i < ball_icons_containers.length; i++) {
        ball_icons_containers[i].addEventListener("click", ballContainerOnClick);
    }

    var passportName = getPassportNameCookie()
    if (passportName != null) {
        updatePassportNameHTML(passportName)
    }

    var passportSpriteGender = getPassportSpriteGenderCookie()
    if (passportSpriteGender != null) {
        updatePassportRankImageHTML(passportSpriteGender)
        updateGenderRadioButtonState()
    }

    var passportJSON = getFullPassportJSONCookie()
    var passportDict = JSON.parse(passportJSON)
    updatePassportHTMLFromDict(passportDict)
}

initPassport()
