![bang](/mikekunze/bang.js/blob/master/client/img/logo.jpg?raw=true "Bang.js")

## Overview
	Bang is an attempt at simplifying a completely asynchronous web application MVC
	environment that utilizes NodeJS server side and ExtJS 4.0.7 client side.  
	This application stack does not refresh, but rather exploits powerful dynamic 
	code injection through ajax and websockets.
	
	The client side is organized by controller, model, view, and store each having
	their own directories.  Ext.Direct is used to load "bootstrap" self executing anonymous
	function apps that in turn load controllers, all dynamically and via asyncronous design.
	
	The server side is organized by lib, model, routes, and settings each having 
	their own directories.  Each defined component is loaded modularly with the 
	use of NodeJS module export concept.

## Features
* [Jade](http://jade-lang.com/) for a robust, elegant, feature rich template engine
* [Stylus](http://learnboost.github.com/stylus/) for an expressive, dynamic and robust CSS
* [Mongoose](http://mongoosejs.com/) for a MongoDB object modeling tool designed to work in an asynchronous environment.
* [Socket.io](http://socket.io) for realtime transport mechanisms
* Crypto for client side encryption
    
## Requires
* [NodeJS](http://nodejs.org/) 0.6.6
* [MongoDB](http://www.mongodb.org/) 2.0.2
* [ExtJS](http://www.sencha.com/products/extjs/) 4.0.7 (place it inside ./client)
    
## Installation
    Inside the bang.js directory
    npm install

## Settings

* settings/db.js    configures mongoose connect string and other db related constants
* settings/web.js   configures web server constants
* settings/index.js configures path and auto loads db, web, and anything else in settings


## Start up
    node app.js

## Add mongo users
###### With the mongo client, run the following command:
    use bang
    db.users.insert({ username: 'test', userHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'})
    db.users.insert({ username: 'test1', userHash: '1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014', password: '1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014'})
    db.users.insert({ username: 'test2', userHash: '60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752', password: '60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752'})
    db.users.insert({ username: 'test3', userHash: 'fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13', password: 'fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13'})
    
    You now have 4 test uses with the following user/pass combinations:
    test  / test
    test1 / test1
    test2 / test2
    test3 / test3
    
## Using bang
    Bang is designed to utilize the current functionality:  realtime log console, realtime
    authenticated socket client monitoring system wide message broadcasting, and an API 
    interface to the server side logger functionality.

To witness current functionality, load the logConsole first.

* Navigate to running instance with a web browser, [http://localhost:3069/bang](http://localhost:3069/bang)
* Using the web browser's javascript console, login with one of the available test users, and 
  type the following commands:

##### logConsole - GUI for realtime log monitoring 
    Ext.bang.util.getApp({ app: 'bang', js: 'logConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });

##### clientsConsole - GUI for realtime authenticated clients monitoring
    Ext.bang.util.getApp({ app: 'bang', js: 'clientsConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });

p 
  This console will show all connected socket clients.  Currently, that means
  all authenticated clients that are listening to the server.
  
  If you run login again, with another username, the clientsConsole will update.
  This functionality is likely to change, allowing one client one login session.
  
    Ext.bang.util.getApp({ app: 'bang', js: 'login.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });  
      
##### broadcastMessage - messages all users with interface loaded
    Ext.bang.util.getApp({ app: 'bang', js: 'broadcastMessage.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });    
##### logMessage - API for server logger
    Ext.bang.util.getApp({ app: 'bang', js: 'logMessage.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });    
