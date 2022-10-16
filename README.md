# Web Based Game on Cloud

## Wiki

https://github.com/srijon-mandal/game-archive/wiki

## Basic Concepts:

### What is a Video Game ?
A video game is an electronic game that involves interaction with a user interface to generate visual feedback on a two- or three-dimensional video display device such as a touchscreen, virtual reality headset or monitor/TV set.

### What is Web Server ?
"Web server" can refer to hardware or software, or both of them working together.
On the hardware side, a web server is a computer that stores web server software and a website's component files (e.g. HTML documents, images, CSS stylesheets, and JavaScript files). It is connected to the Internet and supports physical data interchange with other devices connected to the web.

On the software side, a web server includes several parts that control how web users access hosted files, at minimum an HTTP server. An HTTP server is a piece of software that understands URLs (web addresses) and HTTP (the protocol your browser uses to view webpages). It can be accessed through the domain names (like mozilla.org) of websites it stores, and delivers their content to the end-user's device.

At the most basic level, whenever a browser needs a file which is hosted on a web server, the browser requests the file via HTTP. When the request reaches the correct web server (hardware), the HTTP server (software) accepts request, finds the requested document (if it doesn't then a 404 response is returned), and sends it back to the browser, also through HTTP.

To publish a website, you need either a static or a dynamic web server.

A static web server, or stack, consists of a computer (hardware) with an HTTP server (software). We call it "static" because the server sends its hosted files "as-is" to your browser.

A dynamic web server consists of a static web server plus extra software, most commonly an application server and a database. We call it "dynamic" because the application server updates the hosted files before sending them to your browser via the HTTP server.

For example, to produce the final webpages you see in the browser, the application server might fill an HTML template with contents from a database. Sites like MDN or Wikipedia have many thousands of webpages, but they aren't real HTML documents, only a few HTML templates and a giant database. This setup makes it easier and quicker to maintain and deliver the content.

### What is Cloud ?

"The cloud" refers to servers that are accessed over the Internet, and the software and databases that run on those servers. Cloud servers are located in data centers all over the world. By using cloud computing, users and companies don't have to manage physical servers themselves or run software applications on their own machines.

The cloud enables users to access the same files and applications from almost any device, because the computing and storage takes place on servers in a data center, instead of locally on the user device. 

This is why a user can log into their Instagram account on a new phone after their old phone breaks and still find their old account in place, with all their photos, videos, and conversation history. 

It works the same way with cloud email providers like Gmail or Microsoft Office 365, and with cloud storage providers like Dropbox or Google Drive.

### What is Web Application?

In computing, a web application or web app is a client–server computer program that the client runs in a web browser. Common web applications include webmail, online retail sales, online banking, and online auction. 
Development and Deployment Steps

## Develop the Game using Javascript and html file

* -- Setup Audio config, 
* -- Game background, 
* -- Sprite, 
* -- Physiscs properties (bounce, collision boundary)
* -- Setup movment frames
* -- Handle Mouse Clicks (Up,Down,Left,Right) and trigger collectStar and hitBomb events

## Run the Game in a webserver

NodeJs is one of the most popular web application serving library.
It provides an Http handling module Express.js

### Install Node Package Manager
* sudo npm install -g n

* sudo ln -sf /usr/local/n/versions/node/<latest_version>/bin/node /usr/bin/node  

* sudo npm install http-server -g

### Create a folder webGames

* Create the file package.json to specify required libraries

* npm install

It will install the required library Express.js as specified in package.json and create the folder node_modules.
Copy the required javascript , image and htmls files in a folder named public

### Create the http request serving code server.js

node_modules	package.json	public server.js

### Test localy

* Start the Game:   
* * npm start

* Play the Game:  
http://localhost:8089/webGame.html


## Deploy the Webgame in Cloud

* Create an account in Google Cloud ($300 Free Credit)

* Download the client tool (google-cloud-sdk) to access the Cloud

./google-cloud-sdk/install.sh

### Create your project

./google-cloud-sdk/bin/gcloud projects create <your-project-name>

### Enable the Billing for the project 

./google-cloud-sdk/bin/gcloud config set project <your-project-name>

### Find the Project Endpoint

./google-cloud-sdk/bin/gcloud projects describe <your-project-name>

* You will find the cloud endpoint where project is published

https://<your-project-name>.appspot.com

* Initialze local settings with correct google cloud email-id 
./google-cloud-sdk/bin/gcloud init
**  -- Create a new configuration
* * * 	-- Choose the account
* * * 	-- Choose the project

* Create a file app.yaml inside your webGame folder
app.yaml node_modules	package.json	public server.js

### Deploy the Project
./google-cloud-sdk/bin/gcloud app deploy webGames/app.yaml
Select the Cloud Data Center
[15] us-west2
Play the Game in Cloud

http://<your-project>.appspot.com/webgame.html 





## References


### Learn Phase3 Game Development Library

https://phaser.io/tutorials/getting-started-phaser3/part7

https://phaser.io/tutorials/getting-started-phaser3/part7

http://phaser.io/tutorials/making-your-first-phaser-3-game/part10

https://github.com/photonstorm/phaser

### Learn to code and run in local box
http://127.0.0.1:8080/phaser3/part11.html

### More Phaser3 Notes:

https://www.youtube.com/watch?v=frRWKxB9Hm0
https://www.youtube.com/watch?v=OS7neDUUhPE
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/
https://photonstorm.github.io/phaser3-docs/Phaser.Sound.html
https://www.html5gamedevs.com/topic/38333-audio-play-on-event/
https://labs.phaser.io/view.html?src=src\transform\rotation%20and%20origin.js
https://github.com/photonstorm/phaser3-examples/tree/master/public/js
https://github.com/Berkay-Cubuk/my_first_phaser_game
https://github.com/codypahlon/Game/blob/97ad6184ddfde26ac9b471cee199c1acd3c853e1/src/scenes/Tutorial.js


https://phasertutorials.com/creating-a-simple-multiplayer-game-in-phaser-3-with-an-authoritative-server-part-1/
https://phasertutorials.com/creating-a-phaser-3-leaderboard-with-user-authentication-using-node-js-express-mongodb-part-1/
https://phasertutorials.com/creating-a-phaser-3-leaderboard-with-user-authentication-using-node-express-mongodb-part-2/
https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-3/
https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-4/
https://phasertutorials.com/phaser-leaderboard-with-user-authentication-using-node-express-mongodb-part-5/

https://www.freecodecamp.org/news/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135/
https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/

https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/

### Write your first Nodejs App in Cloud

https://cloud.google.com/appengine/docs/standard/nodejs/building-app/writing-web-service
https://dev.to/carlosazaustre/how-to-deploy-a-webapp-to-google-cloud-run-with-cloud-build-4eel

https://cloud.google.com/nodejs/
https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/appengine/building-an-app/build/app.yaml

https://nodejs.org/en/docs/guides/getting-started-guide/
https://codelabs.developers.google.com/codelabs/cloud-run-hello/#0
https://cloud.google.com/nodejs/getting-started/hello-world#before-you-begin

https://cloud.google.com/appengine/docs/standard/nodejs/building-app/deploying-web-service
https://cloud.mongodb.com/user#/atlas/login





