# WDI Project 4
## URL
###[Deployed on Heroku](https://caliapp.herokuapp.com/)
## Description
The site is an interactive crowd-sourced travel planning tool for those looking to explore California. It will pull from the Google Maps API to display an interactive map with user recommended destinations and tips.
## Team:
Name | Email | Github
---- | ----- | ------
Stefanie Koenig (PM) | stefanie.l.koenig@gmail.com | stefkoenig
Genny Langan | cglangan78@gmail.com | cglangan78
## Installation Instructions
Fork the repo, clone the forked repo, and npm install.
## User Stories
#### Unregistered Users
* Users who are interested in planning a trip to or within California will access the site.
* On the homepage, users will see a map of California with pins dropped on user recommended destinations. In future iterations, these pins will have different icons representing different types of destinations: outdoorsy, city, party, touristy, off the beaten path, etc. A legend on the homepage will outline what each icon represents. The icon size will be larger based on the amount of recommendations/likes the destination has.
* Users can click the marker on the map in order to see a description of the location.
* In the future, users will be able to click on destinations to see recommendations, comments, and pictures from other users and information from the Yelp API.
* Users can register or log in to the site for additional functionality.

#### Registered Users
* Once users are registered and logged in, they can save destinations in order to plan itineraries for future trips.
* Registered users can add destinations they recommend to the map.
* In future iterations, registered users will also be able to add comments, photos, information,and recommendations for destinations.
* Registered users can edit or delete their accounts.

## Technologies Used
* HTML
* CSS
* Bootstrap
* Node.js
  * Express
  * Mongoose
  * Morgan
  * Body-parser
  * Path
  * Bcrypt-Nodejs
  * Dotenv
  * HTTP
  * Jsonwebtoken
  * Logger
* Mongo DB
* Angular.js
* Google Maps API


Technologies to implement in the future:
* Yelp API

## Wire Frames
Unregistered User Home Page with Login and Signup:

![Image of Unregistered User Home Page]
(https://cloud.githubusercontent.com/assets/14102582/11764488/4b2a3dec-a0e7-11e5-80b7-4e97ea7f4cf0.png)

Registered User Home Page with User Profile Page:

![Image of Registered User Home Page]
(https://cloud.githubusercontent.com/assets/14102582/11764487/48d0c17e-a0e7-11e5-9dfa-7a578d8c38d9.png)

## Data Model
* Users have many favorited destinations
* In the future, destinations will have many comments and pictures.
