# Academy_StudentsProject

1. npm run build
2. npm run start
3. docker-compose up -d

// execute a query on the database to be able to generate id
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

// the work with migrations
npm run sequelize:migrate:latest
npm run sequelize:migrate:undo

http://localhost:3000/register
{"username": "user1", "password": "qwe", "email": "email@gmail.com"}
