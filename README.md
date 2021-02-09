# CRM Omni Web App

This is the Web Application that is generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4. This application connects with the CRM OMNI REST API that serves JSON data.

## Development server

Run `ng serve` for a dev server. Navigate to  [localhost](http://localhost:4200/ "localhost"). The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
To build the project for multiple formats, use the below CLI commands

##### Build All Projects for Production
```sh
	npm run build:crmo-build-all-prod
```

##### Build All Projects (Libraries ONLY) for Production
```sh
	npm run build:crmo-build-libs-prod
```

##### Build All Projects for Production (with Development Environemnt File)
```sh
	npm run build:crmo-build-all-devenv
```

##### Build All Projects in Debug Mode + Serve
```sh
	npm run build:crmo-build-all-serve-backend
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Key Commands
These are some CLI commands that would be essential for development.

#### CRMO Backend
```sh
    npx ng serve crmo-backend
    npx ng generate application crmo-backend --legacyBrowsers=true --lintFix=true --prefix=crmo-backend --routing=true --strict=true --style=scss
    npx ng generate library crmo-lib --lintFix=true --prefix=crmo-lib
    npx ng generate module modules/user --project=crmo-backend --routing=true --module=modules/user
    npx ng generate component modules/user/auth --project=crmo-backend --module=modules/user
```

#### CRMO Library
```
    npx ng generate service services/common/privilege/privilege --project=crmo-lib

```