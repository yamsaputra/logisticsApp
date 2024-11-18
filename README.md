# TrustTrip

Social based on-demand logistics mobile app.

## Usage

1. Run "ionic serve" in the myApp folder to execute the front-end.
2. Run "npm start" in the myBackend folder to activate the back-end.
3. Database is running on phpmyadmin.co with the possibilty to run locally. Configurable in the "sequelize.js" file.

### Change-/Errorlogs:
31.10.2024
Login failed user still prints out undefined
-postRequests.js:52
loginPage.vue:182

Unable to sign up
> Login details not going into Database/Backend

Unable book rides
> error 400 unable to book in search page, Data is not going into database or backend.

Able to submit ride form but doesnt show up in the contracts
> Ride appears in search page, but not in my Contracts.

05.11.2024
> A script that retries to start the container application, just in case the application takes time booting might be useful

>Latest error in containerizing: npm connectivity in front end unresolved.

10.11.2024
> NPM connectivity issue resolved: cause was that the used frameworks/libraries were outdated.
-outdated softwares (ionic included) updated in the package.json

11.11.2024
> docker services communicate with each other using the services names defined in the compose file. Now connected

> the docker sequelize instance for docker development is set. using the root user instead of a created one for this temporary setting to save time.

- creating a user in the database is still problematic, the user_id is not randomly/automatically generated
"
backend-1   | Executing (default): SELECT `user_id`, `fname`, `lname`, 
`age`, `email`, `password`, `rating` FROM `users` AS `users` WHERE `users`.`email` = 'admin';
backend-1   | Executing (default): INSERT INTO `users` (`user_id`,`fname`,`lname`,`age`,`email`,`password`) VALUES (?,?,?,?,?,?);
backend-1   | Database error creating user: Error
backend-1   |     at Query.run (/backendApp/node_modules/sequelize/lib/dialects/mysql/query.js:52:25)
backend-1   |     at /backendApp/node_modules/sequelize/lib/sequelize.js:315:28
backend-1   |     at async MySQLQueryInterface.insert (/backendApp/node_modules/sequelize/lib/dialects/abstract/query-interface.js:308:21)    
backend-1   |     at async model.save (/backendApp/node_modules/sequelize/lib/model.js:2490:35)
backend-1   |     at async users.create (/backendApp/node_modules/sequelize/lib/model.js:1362:12)
backend-1   |     at async register (file:///backendApp/sequelize.js:179:21)
backend-1   |     at async registerUser (file:///backendApp/postRequestsBE.js:25:21) {
backend-1   |   name: 'SequelizeDatabaseError',
backend-1   |   parent: Error: Column 'user_id' cannot be null
backend-1   |       at Packet.asError (/backendApp/node_modules/mysql2/lib/packets/packet.js:738:17)
""

13.11.2024
> Attempted port forwarding to host the containerized app but the University's restricted Network might be preventing me from accessing it from my mobile phone 
- Might need VPN or attempt to connect when on University grounds.

> DB settings for dev stage: front and backend on VS code, DB on container.
- added testConnection() in sequelize.js
- added alterTable() in sequelize.js
- added syncModels() in sequelize.js

> Login issue solved. Data is successfully stored in the DB.

Presentation for Susan from creating user, creating ride and booking a ride
> Input dari Susan:
- UX masih terlalu kosong, kurang rame
- Mungkin warna warna yang lebih mencolok?

> Contracts page not refreshed when an item has been erased.
- Contracts will list all the user's created rides but not the booked rides.

15.11.2024
>Responsive design in progess..
- https://www.youtube.com/watch?v=H7JxI3-uklk

17.11.2024
> Dont forget to change the sequelize database from localhost <> db according to the container/not environment