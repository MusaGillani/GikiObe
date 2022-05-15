# OBE Evaluation System

## Usage

#### Setup (incase of fresh pull/clone)

**run :**
$ npm install
in root directory to install dependencies

- create a .env file and add below code (for mysql)
- sample.env file has the format for .env file
- replace USERNAME, PASSWORD, HOST, PORT, DATABASE-NAME

### Run below commands for each pull/fetch

**run :**
in server dir
$ npx prisma db push
$ npx prisma generate

**run :**
in root dir
$ node start

to start the server in development
in root dir
$ npm run dev
