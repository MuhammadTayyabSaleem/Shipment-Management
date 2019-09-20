# Xgrid-Task
Shipment Management System

To run the code:
1) open the directory in any editor like i am using vsCode
2) open terminal and type $npm install (make sure you are in main directory where server.js is present)
3) now for react app go to terminal and write $cd client
4) now $npm i
5) comeback to the main directory by $cd ../
6) now run the servers by $npm run dev

*Note: Configure mongoDB locally, for that install mongoDB and set its directory to MongoDB(or 'db' by default)
and set that path in (Server.js) and run point 6.
* if you want to have online mongoDB create an account in mongoDB atlas and from Connect Cluster copy the mongoURI 
and paste it in /Config/keys/mognoURI and uncomment the lines written for online DB and comment the lines written below
MongoDB Locally in Server.js.
*I have created an online db to run and test the system login with
Username: superAdmin
Password: alpha123
* If any error accur during $npm run dev see the error if it needs any module install that module in client directory by 
* $ npm i “module name”
INSTALATIONS:
* You need to install node
* A editor to use it
* And all the modules as per need
