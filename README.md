# ChatMug
A simple chat web app built using VueJS and Socket.io, backed by a Redis database.

![Desktop Chat](resources/desktop-chat.jpg?raw=true "Desktop Chat")
![Desktop Login](resources/desktop-login.jpg?raw=true "Desktop Login")
![Mobile](resources/mobile.jpg?raw=true "Mobile")

### Overview

- ES6 app
- VueJS single page application
- Restify API on the server side
- Tailwind for CSS
- Redis database for storage
- Local development using webpack and hot-reload module
- Unit tests using Jest
- E2E tests using nightwatch
- docker-compose environment

## Project setup
```
docker-compose exec app npm install
docker-compose up -d

// Access the website at
http://localhost:8080
```

##### Lints and fixes files
```
docker-compose exec app npm run lint
```

##### Run end-to-end tests
```
// Need to have the socket.io server running
docker-compose up -d
docker-compose exec app npm run test:e2e
```

##### Run unit tests
```
docker-compose exec app npm run test:unit
npm run test:unit
```

### Author
- Dan Ursu

License (MIT)