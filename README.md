# GAME

This library is a wrapper over backend for a game.
Library is inclusive of everything and is written in pure javascript, supported for all version of all browser


                                            USAGE:
Include this library in your webapp or sdk and can be accessed by "Game" keyword (e.g. Game.init() etc)

                                            LIMITATION:  
Make sure, no other module in your application is using Game keyword.



                                        FOR GAME CLIENT:

Game.init(integer userId, string env);

Game can be started by using init function
Game.init(integer userId, string env);
userId can be any integer, only one user can play at a time.
env values can be : "dev", "stage", "prod"
Exceptions & Errors : if userId is not integer, an error message will be returned

********************************************************************************************

Game.setUserId(number userId);

To set UserId, setUserId function can be used
Game.setUserId(number userId)
userId is any number
Exceptions & Errors : if userId is not integer, an error message will be returned

*********************************************************************************************

Game.getUser();

For fetching score of user at anytime, getScore can be called
Game.getUser();

*********************************************************************************************

Game.updateUser(integer score);

For updating score of user at anytime, updateScore can be called
Game.updateUser(integer score);
score is number, of values from anything to anything
Exceptions & Errors : if score is not integer, an error message will be returned

*********************************************************************************************

Game.getAchievement(number achievementId);

For fetching achievement of user at anytime, getAchievement can be called
Game.getAchievement(number achievementId);
achievement is unique identifier number within a game
Exceptions & Errors : if achievementId is not integer, an error message will be returned

*********************************************************************************************

Game.updateAchievement(number achievementId, number stepsComplete);


For updating achievement of user at anytime, updateAchievement can be called
Game.updateAchievement(number achievementId, number stepsComplete);
achievementId is number, of values from anything to anything
stepsComplete is number, of values from anything to anything
Exceptions & Errors : if achievementId or stepsComplete is not integer, an error message will be returned

*********************************************************************************************

Game.checkIfAchievementUnlocked();

For checking if achievement is unlocked,checkIfAchievementUnlocked can be called
Game.checkIfAchievementUnlocked();
Exceptions & Errors : if achievementId or stepsComplete is not integer, an error message will be returned



                                        FOR API PROVIDER:
can modify the urls of API, by iterating the code from line 26 to line 37
server endpoints for dev, stage, prod can be modified from line 34 to 38
