# scampea-frontend

## Prerequisite

[Nodejs](https://nodejs.org/en/download/)

### Optional but recommended

[Yarn](https://yarnpkg.com/en/docs/install)

## Build Setup

### With npm

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### With yarn (recommended)

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report

# run unit tests
yarn unit

# run e2e tests
yarn e2e

# run all tests
yarn test
```

### Setup login

1. Create a password grant client on the backend
2. Copy the client secret and client id
3. Paste the client secret and id in config/prod.env.js in the OAUTH_CONFIG object

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
