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
* [RedisServer](http://redis.io) 2.4.7
* [ExtJS](http://www.sencha.com/products/extjs/) 4.0.7 (place it inside ./client/lib as extjs)
* [Sencha Touch](http://www.sencha.com/products/touch/) (place it inside ./client/lib as touch)
* [BackboneJS](http://documentcloud.github.com/backbone/)
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) (place it inside ./client/lib as bootstrap)
     
## GitHub Repo Branches
* [master](https://github.com/mikekunze/bang.js) has the most stable code base  
* [bang.js-dev](https://github.com/mikekunze/bang.js/tree/bang.js-dev) has the most unstable and experimental code

## Documentation
* Required: [Add MongoDB test users](https://github.com/mikekunze/bang.js/blob/master/docs/mongodb.md)
* Required: [Add RedisServer](https://github.com/mikekunze/bang.js/blob/master/docs/redis.md)

* [Bang.js Server interface](https://github.com/mikekunze/bang.js/blob/master/docs/server.md)
  * [Creating an Application](https://github.com/mikekunze/bang.js/blob/master/docs/application.md)

* [Bang.js Client interface](https://github.com/mikekunze/bang.js/blob/master/docs/client.md)  (via web browser console)
   
## Installation
    npm install -g iced-coffee-script
    git clone https://mikekunze@github.com/mikekunze/bang.js.git
    cd bang.js
    npm install

## Settings
* server/settings/db.js    configures mongoose connect string and other db related constants
* server/settings/web.js   configures web server constants
* server/settings/index.js configures path and auto loads db, web, and anything else in settings

## Start up bang.js

    iced bang