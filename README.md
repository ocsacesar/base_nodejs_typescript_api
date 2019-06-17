# Base Project

This project is used as a basis for API creation with Hapi, JWT, Typescript and SequelizeJS. Feel free to use or contribute to this project.

### Settings
All project settings are in the `settings.json` file in the `/src/setting/settings.json` directory.

NOTE: `You need to create the database with the same value in 'database' property on the 'settings.json' file. By default, the database is 'base'.`

### Running the project

If you are running this project for the first time. Don't forget to run the `npm install` to install all dependencies of the project.
```js   
npm install
```` 

You are able to running this project in differents environments: **dev**, **prod** or **test**.

To run in the **development** environment you can run the commands below
```js   
npm start
```` 
or 
```js   
npm run dev
````

To run in the **production** environment you can run the commands below
```js   
npm run prod
````

To run in the **test** environment you can run the commands below
```js   
npm run test
````

License
----
MIT