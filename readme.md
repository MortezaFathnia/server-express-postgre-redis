Express-Server
======

!!! This code is still in developing state and is not complete !!!

Simple `express` server.

## Folder Structure

```
.
├── client
│   ├── admin/
│   ├── guest/
│   └── member/
├── logs/
└── server
    ├── api
    │   ├── example
    │   │   └── subfolder
    │   └── user
    ├── libs
    │   ├── authentication
    │   ├── common
    │   ├── database
    │   ├── date
    │   ├── logger
    │   ├── redis
    │   └── session
    ├── routes
    ├── server.js
    └── tests
├── index.js
├── package.json
├── readme.md
```

## Start

Install node dependencies with `npm`

> npm i

Start your Redis server and Database agent.

Run `index.js` with node or pm2 and pass the environment

> node index.js

> pm2 start index.js

## Components

- [x] Authentication
- [ ] Authorize
- [x] Role-based client side
- [x] Session
- [x] Logger
- [x] Db connection
- [ ] Uploading file
- [ ] Streaming data
- [ ] Chat system
- [ ] Clustering


## Rules

1) Defining Api

Put your new API in `/server/api` folder

Create `example` folder and put `index.js` file inside.

Your `index.js` file should be export an object with this structure:

```js
module.exports = {
  hello: {
    GET: controller.hello,
    POST: controller.hello,
    DELETE: controller.hello,
    PUT: controller.hello
  }
};
```

Your can request to your new api with this:

[method] url:port/api/[path-to-api]/[http-handler]

For example

```
GET localhost:8080/api/example/hello
                       ^       ^
                       |       |
                       |       http handler
                       |
                     path to folder contains index.js 
```

2) Defining Access

Add new record to **acls** table in database

```
id------user_id------role------access------path--------------createdAt------updatedAt

1       null         guest     crud        /api/example      null           null		
```

Add this characters for these operations:

- **c** for `post` method
- **r** for `get` method
- **u** for `put` method
- **d** for `delete` method
