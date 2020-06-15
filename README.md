# star-wars-api
A NodeJS API to integrate with the star wars api https://swapi.dev

## Development
From project folder, 
##### With docker
- Run `docker-compose up`

##### Without docker
- Run `npm install` to install dependencies
- Run `cp env.sample .env` to copy over sample environment variables
- Create a postgres database and update DATABASE_URL in .env with the database url
- Run `npm run dev` to start the app in development mode. This will start the app on port 5123
- Visit http://localhost:5123/docs to view documentation

## Documentation
Full documentation available at <a href="https://star-wars-api-dev.herokuapp.com/docs/">https://star-wars-api-dev.herokuapp.com/docs/</a>
