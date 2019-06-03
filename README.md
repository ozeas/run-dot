# work-at-olist-front
[![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ozeas/work-at-olist-front/blob/master/LICENSE)

Project develop for application at the vacancy of frontend developer at olist company.

## Installing / Getting started

Steps for run this project.

```shell
$ git clone git@github.com:ozeas/work-at-olist-front.git
$ cd work-at-olist-front && yarn
$ npm run build
$ npm run start
```

## Developing

### Built With
This project was developed with:
1. HTML5/CSS3
1. JavaScript ES6

Others:
1. Webpack ^7.4.5
1. karma ^3.0.0
1. Jasmine ^3.2.0

### Prerequisites

1. Git ([link for git](https://git-scm.com "link for git"))
2. Node LTS ([link for node](https://nodejs.org/en/ "link for node"))
3. Yarn ([link for yarn](https://yarnpkg.com/pt-BR/ "link for yarn"))

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
$ git clone git@github.com:ozeas/work-at-olist-front.git
$ cd work-at-olist-front
$ yarn
$ npm run dev
```

### Building
```shell
$ git clone git@github.com:ozeas/work-at-olist-front.git
$ cd work-at-olist-front
$ yarn
$ npm run build
$ npm run start
```

### Deploying / Publishing
 Steps for publish this project at the herokuapp
 ```shell
 $ cd myapp
 $ heroku login
 $ heroku create
 $ git remote -v
	heroku  https://git.heroku.com/thawing-inlet-61413.git (fetch)
	heroku  https://git.heroku.com/thawing-inlet-61413.git (push)
$ heroku git:remote -a thawing-inlet-61413
$ heroku config:set NPM_CONFIG_PRODUCTION=false
$ git push heroku master
	Initializing repository, done.
	updating 'refs/heads/master'
	...
 ```

The before steps should create a new repository on herokuapp and deploy and publish this project online in your account herokup.

## Demo

The demonstration of this project can be seen at [herokuapp.](https://work-olist-frontend.herokuapp.com "herokuapp.")


## Tests

This project use Karma and Jasmine with engines for testing.

ATTENTION: is required use browser chrome for show runs tests.

```shell
$ npm run test
```

## Style guide
This project follows the rules of the clean code. Applying the [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base "Airbnb") style guide with [Eslint](https://eslint.org/docs/user-guide/getting-started "Eslint") to monitor the pattern code.

## Licensing

Project available under MIT license
