# Wefox Frontend Challenge

A simple implementation of DataTable to perform CRUD operations on some posts listed by a dockerized API.

## Docker

A docker configuration is provided with a pre-built image that includes the server API, the server uses a local sqlite database and runs in development mode, so the stdout is in verbose mode.
Find the details of how to run the API server in the README of the Docker repository below:

[Docker repository](https://hub.docker.com/r/wefoxgroup/wg-web-challenge).

### `docker compose up`

Dockerized API that operates over a single resource called posts.\
Open [http://localhost:3000/api/v1/posts](http://localhost:3000/api/v1/posts) to view it in postman.

## Client

React was used for the client-side.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Client Configuration

To run the app locally you need to set up an env file with the following properties:

**REACT_APP_GOOGLE_MAP_KEY**
**REACT_APP_CLOUD_NAME**
**REACT_APP_CLOUD_PRESET_NAME**

A sample with cridentials that works can be seen in the `env.sample.ts` file and can be used to test the app, you just need to make an `.env` file.

In the client project directory, you can run:

### `npm start`

Client app runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
