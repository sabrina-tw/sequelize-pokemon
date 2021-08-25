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

### Enable login/logout with JWT and cookies

Install dependencies

```bash
npm i bcryptjs cookie-parser jsonwebtoken dotenv
```

Require dotenv, cookie-parser in app.js

```js
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

Add config/jwt.js

```js
const jwt = require("jsonwebtoken");

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("Missing secrets to sign JWT token");
  }
  return secret;
};

const createJWTToken = (username) => {
  const today = new Date();
  const exp = new Date(today);

  const secret = getJWTSecret();
  exp.setDate(today.getDate() + 60); // adding days

  const payload = { username: username, exp: parseInt(exp.getTime() / 1000) };
  const token = jwt.sign(payload, secret);
  return token;
};

module.exports = createJWTToken;
```

Add hooks to Trainer model to hash passwords before create/update

```js
const bcrypt = require("bcryptjs");

...

hooks: {
  beforeCreate: async (trainer) => {
    if (trainer.password) {
      const salt = await bcrypt.genSaltSync(10);
      trainer.password = bcrypt.hashSync(trainer.password, salt);
    }
  },
  beforeUpdate: async (trainer) => {
    if (trainer.password) {
      const salt = await bcrypt.genSaltSync(10);
      trainer.password = bcrypt.hashSync(trainer.password, salt);
    }
  },
},
```

Add login/logout routes to Trainer routes with jwt token creation

```js
const bcrypt = require("bcryptjs");
const createJWTToken = require("../config/jwt");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const trainer = await db.Trainer.findOne({
      where: { username: { [db.Sequelize.Op.iLike]: "%" + username + "%" } },
    });

    if (!trainer) {
      return res.status(422).json({ message: "Invalid username or password." });
    }

    const result = await bcrypt.compare(password, trainer.password);

    if (!result) {
      throw new Error("Login failed");
    }

    const token = createJWTToken(trainer.username);

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    // you are setting the cookie here, and the name of your cookie is `token`
    res.cookie("token", token, {
      expires: expiryDate,
      httpOnly: true, // client-side js cannot access cookie info
      secure: true, // use HTTPS
    });

    res.send("You are now logged in!");
  } catch (err) {
    if (err.message === "Login failed") {
      err.statusCode = 400;
    }
    next(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").send("You are now logged out!");
});
```

Add middleware/auth.js

```js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized");
    } else {
      // If cookies are valid, it will set req.user with details of the currently logged in user
      req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = {
  auth,
};
```

Protect routes with auth middleware. This route will have access to `req.user`, which we can the use to find the currently logged in Trainer

```js
const { auth } = require("../middleware/auth");

router.post("/:id/catch", auth, async (req, res, next) => {
  try {
    // get trainer by username which is stored in req.user
    const trainer = await db.Trainer.findOne({
      where: {
        username: req.user.username,
      },
    });
    ...
  } catch (error) {
    next(error);
  }
});
```
