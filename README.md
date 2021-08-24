# sequelize-pokemon

TODO:

- [x] Trainer model, route, migration file
- [x] implement JWT with trainers /login and /logout
- [ ] implement associations (Trainer hasMany Pokemon/SimplePokemon)
- [ ] deploy to Heroku
- [ ] run migrations on Heroku
- [ ] (bonus) testing
- [ ] (bonus) testing for jwt

### (WIP) Testing

1. Create test database: `NODE_ENV=test npx sequelize db:create`

### (WIP) Database Migration

Configured `db:*` scripts in `package.json` . For addition of production scripts, please consider passing in params through `--` before creating more npm scripts.
Literally, with the current scripts in `package.json`, we don't need npm script `db:create` and `db:migrate`, but we just create for convenience to run it in multiple environments.

eg. We could run `npm run db:help -- --help` to achieve `sequelize-cli --help`, ie. `db:help` script is reusable for us.

**To confirm**: Currently using npx because production app build probably doesn't need to use it.

**Assuming you have configured postgres as Superuser for Postgres database server**

1. `npm run db:create` to create dev and prod database.
2. `npm run db:createTestDB` to create test database (you might want to run it in more than one environment).
3. `npm run db:migrate` to apply all the pending migrations.
