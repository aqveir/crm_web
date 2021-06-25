## Environment Settings
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/

**Node**: v10.15.3
**NPM**: v6.14.5
**Angular** CLI: v11.1.4
**Angular**: v11.1.2
... animations, cdk, common, compiler, compiler-cli, core, forms
... localize, material, material-moment-adapter
... platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes


| Package                       |  Version     |
| ----------------------------- | ------------ |
| @angular-devkit/architect     | 0.1101.4     |
| @angular-devkit/build-angular | 0.1101.4     |
| @angular-devkit/core          | 11.1.4       |
| @angular-devkit/schematics    | 11.1.4       |
| @angular/cli                  | 11.1.4       |
| @schematics/angular           | 11.1.4       |
| @schematics/update            | 0.1101.4     |
| ng-packagr                    | 11.1.4       |
| rxjs                          | 6.6.3        |
| typescript                    | 4.1.4        |

------------

## Development Packages
1. Template Provider: [KeenThemes](https://keenthemes.com/metronic/ "KeenThemes")
2. Template: [Demo 3](https://preview.keenthemes.com/metronic/demo3/index.html "Demo 3")
3. Rich Text Editor: CKEditor v5.0
4. Library: [Ng Template](https://github.com/ngx-translate/core) 

------------


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

------------

## Development Support
The application uses Angular **workSpace development strategy**. We have below application or libraries in the project.
1. crmo-backend: This is the **ng application** intended for use by the CRM Subscribers.
2. crmo-lib: As the name suggests, this is the ng library for the CRM Omni application. All Interfaces, Models and Services (Business) are managed by this library. 
>This library need to be built prior to building the crmo-backend application.
3. ellaisys-lib: This is the ng library that holds all the core services. e.g. 
- Translate Service
- HTTP Service,
- Storage Service
- Broker Service