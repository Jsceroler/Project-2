# Barks and Whiskers
====================================================
## App description

Basically petfinder. 



----------------------------------------------------
## config [folder]

## config.json [file]

----------------------------------------------------
## models [folder]

## fav.js [file]

## index.js [file]

# user.js [file]

# schema.sql [file]

----------------------------------------------------
## public [folder]

## js [folder]
### index.js

## styles [folder]
### styles.css

----------------------------------------------------
## routes [folder]

### favRoutes.js [file]

### htmlRoutes.js [file]

### userRoutes.js [file]

----------------------------------------------------
## test [folder]

### canary.test.js [file]

----------------------------------------------------
## views [folder]

### 404 [file]

### detail [file]

### favs [file]

### index [file]

### login [file]

### register [file]

## images [folder]

## layouts [folder]


----------------------------------------------------
### .env [file]
- text file used to define variables needed for application, used for managing secret, keys and passwords. Added to gitignore so that it is not pushed to github

----------------------------------------------------
### .eslintignore/.eslintrc.json [file]
- configuration file for ESlint, will specify how formating in the file should be

----------------------------------------------------
### .gitignore [file]
- text file that will tell Git which files and/or folders to ignore, these files will not be pushed to github

----------------------------------------------------
### .travis.yml [file]
- File specifying programming language used, building and testing environment, other parameters

----------------------------------------------------
### package.json/package-lock.json [file]
- metadata revelant to project
- handles project dependencies

----------------------------------------------------
### Procfile [file] -> Heroku
- Text file to explicitly declare what command should be executed to start the app
- web: declares the process type will be attached to the HTTP routing stack of Heroku and will receive web traffic when deplayed

[Heroku Getting Started](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile)
----------------------------------------------------
### README.md [file]
- Tell people what the project is, why its useful and how to use it

----------------------------------------------------
### server.js [file]