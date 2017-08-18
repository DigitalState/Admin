# admin
Frontend Administration

#### Requirements

Make sure you have Node version >= 6.0 and NPM >= 3

#### Run (Node and NPM)

Run the following command from the project directory:

```
cd ng2-admin
npm start
```

Then point your browser to [http://localhost:3000]()
```
http://localhost:3000/
```

##### Run (Docker container)
```
docker-compose up
```

Then browse to [http://localhost:3000]()

Notes: 
- The docker container takes a long time to download, build and compile dependencies.
- All instructions above run the "dev" mode which syncs `src` directory changes with the browser sessoin.
- Only Staff accounts such as (manager@digitalstate.ca) can login through this app.
