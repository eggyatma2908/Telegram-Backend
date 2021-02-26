<p align="center">
  <a href="https://github.com/eggyatma2908/Telegram-Backend">
    <img src="./Logo/logo.png"  width="200px" alt="Logo" width="80">
  </a>
<h1 align="center">Telegram</h1>
  <p align="center">
   Telegram. Built with NodeJs using the ExpressJs Framework.
      Express.js is a web application framework for Node.js.
    <br />
  <br/>
    <a href="https://telegram-id.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/eggyatma2908/Telegram-Backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/eggyatma2908/Telegram-Backend/issues">Request Feature</a>
  </p>
  
## Built With
[![Express.js](https://img.shields.io/badge/Express-4.17.1-green?style=flat)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/NodeJs-v14-lightgreen?style=flat)](https://nodejs.org/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/)
* [Database](telegram.sql)


## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Typ
```npm install```
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Apache and MYSQL Server using xampp, etc.
5. Create a database with the name **telegram** then  import file **telegram.sql** in directory root/database to [phpmyadmin](http://localhost/phpmyadmin)
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.
8. You can see all the end point in postman collection [here](#rest-api)

## Set up .env file
Create .env file in your root project folder.<br>
```bash
PORT = YOUR_SERVER_PORT
DB_HOST = YOUR_SERVER_HOST
DB_NAME = DB_NAME
DB_USER = DB_USER
DB_PASSWORD = DB_PASSWORD
BASE_URL = [Backend API]
BASE_URL_FRONT_END = [Frontend API]
ACCESS_TOKEN_KEY = YOUR_ACCESS_KEY
REFRESH_TOKEN_KEY = YOUR_REFRESH_KEY
EMAIL_USERNAME = YOUR_EMAIL (For Nodemailer)
EMAIL_PASSWORD = YOUR_EMAIL_PASSWORD (For Nodemailer)
```

## Rest API
You can view my Postman collection </br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/abc8b64994ea84f3de6a)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Related Project
* [`Telegram Frontend`](https://github.com/eggyatma2908/Telegram-Frontend)

## Contact
Email : eggyatmariansyah@gmail.com <br>
LinkedIn : https://www.linkedin.com/in/eggyatmariansyah/
