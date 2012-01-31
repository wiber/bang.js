![bang](/mikekunze/bang.js/blob/master/client/img/logo.jpg?raw=true "Bang.js")

## Overview
	Bang is an attempt at simplifying a completely asynchronous web application MVC
	environment that utilizes NodeJS server side and ExtJS 4.0.7 client side.  
	This application stack does not refresh, but rather exploits powerful dynamic 
	code injection through ajax and websockets.
	
	This application framework's front end works on any web browser on any operating
	system, while the back end server works on any operating system including windows.
	The entire goal of this project is to be open, universal, and reusable.

## Features
* [Jade](http://jade-lang.com/) for a robust, elegant, feature rich template engine
* [Stylus](http://learnboost.github.com/stylus/) for an expressive, dynamic and robust CSS
* [Mongoose](http://mongoosejs.com/) for a MongoDB object modeling tool designed to work in an asynchronous environment.
* [Socket.io](http://socket.io) for realtime transport mechanisms
* [Iced-Coffee-Script](http://maxtaco.github.com/coffee-script/) for coffee-script code flow with async support
* [Crypto](http://code.google.com/p/crypto-js/) for client side encryption
    
## Requires
* [NodeJS](http://nodejs.org/) 0.6.8
* [MongoDB](http://www.mongodb.org/) 2.0.2
* [ExtJS](http://www.sencha.com/products/extjs/) 4.0.7 (place it inside ./client)
     
##  GitHub Repo Branches
* [master](https://github.com/mikekunze/bang.js) has the most stable code base  
* [bang.js-dev](https://github.com/mikekunze/bang.js/tree/bang.js-dev) has the most unstable and experimental code

## Documentation
* [Setup MongoDB](https://github.com/mikekunze/bang.js/blob/master/docs/mongodb.md)
* [Bang.js Server interface](https://github.com/mikekunze/bang.js/blob/master/docs/server.md)
* [Bang.js Client interface](https://github.com/mikekunze/bang.js/blob/master/docs/client.md)  (via web browser console)
   
## Installation
    npm install -g iced-coffee-script
    git clone https://mikekunze@github.com/mikekunze/bang.js.git
    cd bang.js
    npm install

## Settings
* settings/db.js    configures mongoose connect string and other db related constants
* settings/web.js   configures web server constants
* settings/index.js configures path and auto loads db, web, and anything else in settings

## Start up bang.js

### no interactive debugging
    iced bang
    
### interactive debugging with tab completion 
    iced
    > server = require './bang'

    > server.settings   // settings object
    > server.db         // db object containing db functions
    > server.logger     // logger object containing logging functionality
    
    // Log a message to the log_messages collection:
    > server.logger.logMessage 'hey, our servers are belong to us', () ->
        console.log '#    logger succeeds'
    
## Using bang Client
    Bang is designed to utilize the current functionality:  realtime log console, realtime
    authenticated socket client monitoring, realtime system wide message broadcasting, remote execution,
    realtime IRC like chat, and an API interface to the server side logger functionality.

    To witness current functionality, load the logConsole first.

    Navigate to running instance with a web browser, [http://localhost:3069/bang](http://localhost:3069/bang)

    Using the web browser's javascript console, login with one of the available test users, and
    type the following commands:

##### chatConsole - GUI for realtime global chat
    Ext.bang.util.getApp({ app: 'bang', js: 'chatConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });
    
##### logConsole - GUI for realtime log monitoring 
    Ext.bang.util.getApp({ app: 'bang', js: 'logConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });

##### clientsConsole - GUI for realtime authenticated clients monitoring
    Ext.bang.util.getApp({ app: 'bang', js: 'clientsConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });

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
    remotejs.logMessage('message', function() {
      console.log('logger succeeds');
    });    
        
#### remote execution
    There is the ability to push a client to run an application.  To do so, first
    you must obtain the socket_id, found in the clientsConsole.
    
    Once you have the socket_id, remote push like so:
    
    remotejs.getJS({ app: 'bang', js: 'broadcastMessage.js', remoteClient: '123412341234' }, Ext.bang.util.run);
    
