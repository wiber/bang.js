![bang](/mikekunze/bang.js/blob/master/client/img/logo.jpg?raw=true "Bang.js")

## Overview
	Bang is an attempt at simplifying a completely asynchronous web application MVC
	environment that utilizes NodeJS server side and ExtJS 4.0.7 client side.  
	This application stack does not refresh, but rather exploits powerful dynamic 
	code injection through ajax and websockets.
	
	The client side is organized by controller, model, view, and store each having
	their own directories.  Ext.Direct is used to load "bootstrap" apps that in turn
	load controllers, all dynamically and via asyncronous design.
	
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
* npm install

## Settings.js

* settings/db.js  configures mongoose connect string and other db related constants
* settings/web.js configures web server constants


## Start up
    node app.js
    
## Using bang
    Bang is designed to utilize the current functionality:  realtime log console, 
    system wide message broadcasting, and an API interface to the server side
    logger functionality.

To witness current functionality, load the logConsole first.

* Navigate to running instance with a web browser
* Using the web browser's javascript console, type the following commands:

##### logConsole - GUI for realtime log monitoring 
    remotejs.getJS({app: 'bang', js: 'logConsole.js'}, Ext.bang.util.run);

  
##### broadcastMessage - messages all users with interface loaded
    remotejs.getJS({app: 'bang', js: 'broadcast.js'}, Ext.bang.util.run);
    
  
##### logMessage - API for server logger
    remotejs.logMessage('log your message');    
    
    
##### login - login mechanism
###### With the mongo client, run the following command:
    db.users.insert({ username: 'test', password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'})
    
###### With the web browser's console, run the following:
    remotejs.getJS({app: 'bang', js: 'login.js'}, Ext.bang.util.run);
    
    After the loginPanel loads, enter the user pass combination (test/test)