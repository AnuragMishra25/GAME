/**
 * Title        : Game.js
 * Author       : Anurag Mishra
 * Date         : 13/08/2017
 * Description  : Javascript Library for Backend Wrapper
 * Version      : 1.0
 */

/**
 * Self invoking Function to initialize create Game Object
 * @return {object} Game - The main object which will start and render the game
 */
var Game = (function(){

    //private variables to be used internally for various purpose
    var _mode = "prod";// tells the environment
    var _userId = 0;//tell the user id
    var _endPoint = 0;// to be appended for url formulation, gets derived by mode
    var _post = "POST";//constant string for POST
    var _get = "GET";//constant string for GET
    var _achievementId = 0;//currentAchievement of User
    var _currentScore = 0;//Current Score of User
    var _stepsComplete = 0;// Step completed by User till now
    var _stepsTotal = 0;// Total steps for an achievement

    //URL constatns foe the APIS
    var _url={
        getScore : '/api/v1/getScore',
        updateScore : '/api/v1/postScore',
        getAchievement : '/api/v1/getAchievement',
        updateAchievement : '/api/v1/updateAchievement'
    };

    //endpoints for the server on basis of mode
    var _serverEnds={
        prod : "prod",
        dev : "dev",
        stage : "stage"
    };

    function isInteger(data){
        if (data === parseInt(data, 10))
            return true;
        else
            return false;
    }

    /**
    * Function to set enevironment for the game
    * @param {string} mode - Can be dev, stage or prod
    */
    function setMode(mode){
        _mode = mode;
        switch(_mode){
            case "dev" : 
                _endPoint = _serverEnds.dev;
                break;
            case "stage" : 
                _endPoint = _serverEnds.stage;
                break;
            case "prod" : 
                _endPoint = _serverEnds.prod;
                break;
            default : 
                _endPoint = _serverEnds.prod;
                break;
        }
    }

    /**
    * Function to set enevironment for the game
    * @param {number} userId - Can be dev, stage or prod
    * @param {string} env - Can be dev, stage or prod
    */
    function init(userId, env){
        if(isInteger(userId)){
            setUserId(userId);
            setMode(env);
        }else{
            return "UserId is not an integer";
        }
    }

    /**
    * Function to set user Id for the game
    * @param {integer} userId : value for userId
    */
    function setUserId(userId){
        if(isInteger(userId)){
            if(_userId == 0){
                _userId = userId;
                console.log("User Id registered");
            }
        }else{
            return "UserId is not an integer";
        }
    }

    //constant for making endpoint
    var _constants={
        endPoint : "https://jsonplaceholder.typicode.com/posts/1"
    };

    /**
    * Function to fetch user Id for the game
    */
    function getUserId(){
        return _userId;
    }
    
    /**
    * Function to update current score to backend
    */
    function updateScore(currentScore){
        if(isInteger(currentScore)){
            var params={
                userId : _userId,
                score : currentScore
            }
            var result = _xmlHttpWrapper( _endPoint + _url.updateScore, _post , params ,false);
            if(result !== "error"){
                _currentScore = currentScore;
                result = JSON.parse(result);
                return result;
            }else{
                return{code : 801 , error : 'Error Occured! Score cannot be updated'}
            }
        }else{
            return "Score is not an integer";
        }
    }

    /**
    * Function to fetch current score from backend
    */
    function getScore(){
        var params={
            userId : _userId
        }
        var result = _xmlHttpWrapper( _endPoint + _url.getScore, _get , params ,false);
        if(result !== "error"){
            result = JSON.parse(result);
            return result;
        }else{
            return{code : 800 , error : 'Error Occured! Score cannot be fetched'}
        }
    }

    /**
    * Function to fetch Achievement from backend
    */
    function getAchievement(achievementId){
        if(isInteger(achievementId)){
            var params={
                userId : _userId,
                achievementId : achievementId
            }
            var result = _xmlHttpWrapper( _endPoint + _url.getAchievement, _post , params ,false);
            if(result !== "error"){
                _achievementId = achievementId;
                result = JSON.parse(result);
                return result;
            }else{
                return{code : 802 , error : 'Error Occured! Achievement cannot be fetched'}
            }
        }else{
            return "achievementId is not an integer"
        }
    }

    /**
    * Function to check if Achievement unlocked
    */
    function checkIfAchievementUnlocked(){
        if(_stepsTotal < _stepsComplete){
            return "No achievement Unlocked";
        }else{
             var result = getAchievement(_achievementId);
             _stepsTotal = result.stepsTotal;
             return "Achievement Unlocked";
        }
    }

    /**
    * Function to update achievement to backend
    */
    function updateAchievement(achievementId, stepsComplete){
        if(isInteger(achievementId) && isInteger(stepsComplete)){
            var params={
                userId : _userId,
                achievementId : achievementId,
                stepsComplete : stepsComplete
            }
            var result = _xmlHttpWrapper( _endPoint + _url.updateAchievement, _get , params ,false);
            if(result !== "error"){
                _achievementId = achievementId;
                _stepsComplete = stepsComplete
                result = JSON.parse(result);
                // checkIfAchievementUnlocked();
                return result;
            }else{
                return{code : 803 , error : 'Error Occured! Achievement cannot be updated'}
            }
        }else{
            return "Params are not integer";
        }
    }

    /**
    * Utility function which wraps XMLHTTPRequest API
    * @param {string} url          : url to hit
    * @param {string} type         : type of request, get or post
    * @param {object} params       : params to be send in request
    * @param {boolean} isAsync     : synchronous or non synchronous
    * @param {string} errorMessage : message to be displayed
    */
    function _xmlHttpWrapper(url, type, params, isAsync, errorMessage){
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, isAsync);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)) {
                return xhr.responseText;
            }else{
                console.log(errorMessage);
                return "error";
            }
        }
        xhr.send(params);
    }

    //this is the object that will be given finally to the end user
    return {
        updateScore: updateScore,
        getScore : getScore,
        getAchievement : getAchievement,
        updateAchievement : updateAchievement,
        setUserId : setUserId,
        init : init
    };

})();
