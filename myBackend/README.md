## TrustTrip BACKEND

### Latest Update per Beta-Version Deployment
Date | Description | Version
 --- | --- | --- 
7.02.2025 | Backend deployed to K8s with the Github Action Workflow | 0.6.6

### Change-/Errorlogs:

31.10.2024
Unable to  book rides
> error 400 unable to book in search page, Data is not going into database or backend.

Able to submit ride form but doesnt show up in the contracts
> Ride appears in search page, but not in my Contracts.

05.11.2024
> A script that retries to start the container application, just in case the application takes time booting might be useful

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

17.11.2024
> Dont forget to change the sequelize database from localhost <> db according to the container/not environment

21.12.2024
-renamed 'flyer_db' to 'tt_db'

13.01.2025
-Database and Backend are not running on GKE server but because it doesn't support https, it is not possible to connect with the Frontend running on CloudRun

-An attempt to implement a TLS Certificate to the backend to make it https was made, but the verification of the certificate was still not possible.

03.02.2025 - Back on the saddle preparing for my report.
- Installed Prometheus and implementing it ot the backend server.
-Backend server (server.js) now supports the monitoring of processes with the promClient library 
- Still need to integrate this system on the backend kubernetes and link it to the Prometheus application installed on the system.

7.02.2025
-Created K8s workflow for the Backend.
