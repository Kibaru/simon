This is a node Js backend User authentication project.

Features:
1. User authentication (No unauthorised access)
2. Supports http requests and response
3. Promise based
4. Supports Json data, image support
5. Es6(configured with babel-cli and babel-preset)
6. Linter(Enhanced with eslint to enhance clean code and ensure es6 standards)
7. It includes a number of dependencies and devDependencies.
    Dependencies:  
          "bcrypt": "^1.0.3",
          "body-parser": "^1.18.2",
          "ejs": "^2.5.8",
          "express": "^4.16.3",
          "jsonwebtoken": "^8.2.1",
          "mongoose": "^5.0.14",
          "multer": "^1.3.0",
          "passport": "^0.4.0",
          "passport-jwt": "^4.0.0"

    DevDependencies:
            babel-cli": "^6.26.0",
            "babel-eslint": "^8.2.3",
            "babel-preset-env": "^1.6.1",
            "chai": "^4.1.2",
            "eslint": "^4.19.1",
            "eslint-config-airbnb": "^16.1.0",
            "eslint-config-prettier": "^2.9.0",
            "eslint-plugin-import": "^2.11.0",
            "eslint-plugin-jsx-a11y": "^6.0.3",
            "eslint-plugin-prettier": "^2.6.0",
            "eslint-plugin-react": "^7.7.0",
            "mocha": "^5.1.1",
            "nodemon": "^1.17.3",
            "prettier": "^1.12.1"

    Installation:
    1. clone the project into your local machine
         link https://github.com/Kibaru/simon
    2. Navigate into project folder and run  npm install to install all the dependencies.
    3. Run npm start to run the project.
    4. Use a http client web testing to handle server requests.
        I Used POSTMAN
    5. Ensure you have mongodb is installed on your computer and running.
             database:'mongodb://localhost:27017/hackerbay
             port: 3000(http://localhost:3000)
             Register-routes:        http://localhost:3000/users/register
             LoginRoute:
             http://localhost:3000/users/login
     6. On successful registration your can then login as well access other routes using the TOKEN GENERATED.
     home-public url image (http://localhost:3000/upload)
     book(http://localhost:3000/book)

     http://localhost:3000/id(PATCH Request)

     Testing:
     npm run test(mocha and chai)
