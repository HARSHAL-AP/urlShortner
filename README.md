# Url Shortner 

This monorepo contains the source code for a simple yet powerful URL shortener web application. The application is designed to shorten long URLs into more manageable and shareable links. The monorepo structure allows for modular development, making it easy to maintain and extend the functionality of the web app.


## Technologies Used
### For Building Monorepo
- Turborepo

### Frontend
- ReactJS
- Typescript

### backend  
- Nodejs
- Express js 
- Typescript 

### Database 
- MongoDB

### Ui 
-Chakra Ui


## Dev

Following command will start all the apps and packages in dev mode.

```
npm run dev
```

## Create a build

```
npm run build
```

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [create-react-app](https://create-react-app.dev) app
- `web`: another [create-react-app](https://create-react-app.dev) app
- `server`: a [Express](https://expressjs.com) server
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-plugin-react` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

