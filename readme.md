Express-Server
======

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
