# Library Room Booking System
A school's library room booking system built with ReactJS, Node.js, Express.js and MySQL.

![UI overview](docs/figma-overview.png)

## Table of Contents

* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [About project](#about-project)
  * [Problem](#problem)
  * [Solution](#solution)
* [Planning](#planning)
  * [User stories](#user-stories)
  * [Unified Modeling Language Diagram](#unified-modeling-language-diagram)
  * [Logical Design](#logical-design)
  * [Jira KAN board](#jira-kan-board)
* [Design](#design)
  * [Wireframes](#wireframes)
* [Development](#development)
  * [Requirements](#requirements)
  * [Technologies](#technologies)
* [Future Developments](#future-developments)

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development purposes.
### Prerequisites
#### Back-end:
- MySQL
- Express.js
- Node.js

```json
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jest": "^29.7.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.2.0",
    "mongoose": "^8.0.0",
    "mysql": "^2.18.1",
    "mysql2": "^3.6.3",
    "mysql2-promise": "^0.1.4",
    "sequelize": "^6.34.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
```
#### Front-end:
- ReactJS
```json
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@material/data-table": "^14.0.0",
    "@mui/material": "^5.14.16",
    "@mui/x-data-grid": "^6.18.0",
    "@mui/x-date-pickers": "^6.18.1",
    "axios": "^1.6.0",
    "date-fns": "^2.30.0",
    "dayjs": "^1.11.10",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-day-picker": "^8.9.1",
    "react-dom": "^18.2.0",
    "react-modal": "^3.16.1",
    "react-router-dom": "^6.18.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^4.4.5"
  }
```
### Installation
Clone the repo
```
git clone https://github.com/destroyedbyBrian/SchoolRoomBookingSystem
```

Change to the `api` folder and install development and production dependencies.

```
cd api
npm i
```

Change to the `client` folder and install development and producation dependencies.
```
cd client
npm i
```

You will need to setup a database on MySQL workbench.

In .env file, input your own details
```
HOST=localhost
USER=root
PASSWORD=password
DATABASE=roombookingsys
```

Go to the `api` folder and start the server.
```
cd api
npm run devStart
```

Go to the `client` folder and run the script start script.
```
cd client
npm run dev
```

Open the front-end by right clicking on the url setup by vite. You access the back-end on http://localhost:4000.

## About project
To revamp school's library room booking system by designing and developing a working prototype using any programming language and database.

### Problem
Presently, room reservations are administered through a rudimentary spreadsheet system. This approach lacks flexibility, is burdensome, and lacks precision in scheduling. Furthermore, it fails to provide a comprehensive overview of room utilization, hindering the client's ability to optimize resource usage effectively.
 
### Solution
A web application that enables the client, including administrative staff, teachers, and students, to log in from any location, anytime for seamless, precise, and prompt room reservations. This system will ensure that room resources are fully utilised by preventing double-bookings and addressing common user frustrations.

## Planning
Consulted my lecturer, who acted as the project sponsor of this project to discuss on the expected requirements.

Researched on the most suitable tools for this project. While doing so, I designed the prototype using Figma. 

Work breakdown using Jira KAN board.

[Jira KAN board](https://musketeersrbs.atlassian.net/jira/software/projects/RBS/boards/1)

### User Stories

#### <ins>All Staff</ins>

**In order to** not have to enter my login details each visit, **as a** Staff Member, **I want to** have the application remember me.

**In order to** see if there are available rooms on a specific date, **as a** Staff Member, **I want to** be able to pick a date and see an overview of all available rooms and availability for that date.

**In order to** unlock a room, **as a** Staff Member, **I want to** create and launch a room for students to book them.

**In order to** view future room bookings, **as a** Staff Member, **I want to** be able to select a date using a calendar or search for a date.

**In order to** find where a room is located, **as a** Staff Member, **I want to** view a floorplan with selected room easily identifiable.

**In order to** find a room that has enough chairs, **as a** Staff Member, **I want to** be able to view room capacity.

#### <ins>All Students</ins>

**In order to** easily book a room, **as a** student, **I want to** be able to view only available rooms.

**In order to** ensure that room allocation is flexible and amend errors in bookings, **as a** student, **I want to** be able to edit and delete my bookings.

**In order to** ensure my booking was successfully created, **as a** student, **I want to** be notified with a confirmation message.

### Unified Modeling Language Diagram
![Unified Modeling Language Diagram](docs/UML-diagram.png)

### Logical Design
![Logical Design](docs/logical-design.png)

## Design
We designed the application to be an intuitive and simple, yet powerful way to navigate, analyse and create bookings. This ultimately enables the efficient use of resources.

### Wireframes

[View wireframes in Figma](https://www.figma.com/file/rZz04yE5prT3OphMTgalHQ/RBS-UI?type=design&node-id=0-1&mode=design&t=E1wwCyDvrJgyADH8-0)

#### Create & Launch Room (Staff)
![Create Room](docs/staff-view.png)
![Launch Room](docs/create-room.png)
#### Book Room (Student)
![Book Room](docs/student-view.png)
![Book Room](docs/book-room.png)
#### Delete Booking (Student)
![Delete Booking](docs/delete-booking.png)
## Development

### Requirements
[x] Backend - Node.js
[x] Frontend - ReactJS
[x] MySQL and MySQL workbench


### Jira KAN BOARD
![Jira KAN Board](docs/jira-kan-board.png)

### Technologies
- Node.js
- Express
- MongoDB
- Mongoose
- React.js
- bcryptjs
- cookie-parser
- jsonwebtoken
- uuid


## Future developments
- Weekly and monthly views
- Filter
- Calendar view
- Link with Google Calendar
