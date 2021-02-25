# Interview Scheduler

## Screenshots

Home page
!["Screenshot Description"](https://github.com/eascan/scheduler/blob/master/docs/Home-page.png?raw=true)

Creating a new appointment
!["Screenshot Description"](https://github.com/eascan/scheduler/blob/master/docs/Create-new-app.png?raw=true)

Confirmation of delete action
!["Screenshot Description"](https://github.com/eascan/scheduler/blob/master/docs/Delete-confirmation.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Description of the application

Using the latest tools and techniques, he goal was to create a modern client application while learning and practicing React.

- Interview Scheduler is a single page application (SPA) built using React. This application allows users to book and cancel interviews. A consice API server is used to provide realtime experience.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest and Cypress tests are used through the development of the project.

## Technical Specifications

- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.
