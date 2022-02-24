# GikiObe

OBE evaluation system

## Usage

run :
$ npm install
in backend directory to install dependencies

create a db in mysql and use the name below

creata .env file and add below code (for mysql)

e.g file
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
HOST=localhost
USER=root
PASSWORD=password
PORT=3306
DATABASE=obe_development

run :
in server dir
$ npx prisma db push
$ npx prisma generate

to start the server in development
in backend dir
npm run dev
