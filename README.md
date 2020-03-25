# Example: Authentication With Express

This is a minimal example of how to implement user authentication in a web application. It uses:

1. [Express.js][url-expressjs] for the web framework
1. PostgreSQL for the database, using [node-postgres][url-node-postgres], [Knex.js][url-knexjs], and [Objection.js][url-objectionjs]
1. [objection-password][url-objection-password] to handle passwords in the database
1. [Handlebars.js][url-handlebars] for templating
1. [Bootstrap][url-bootstrap-docs] for a CSS framework

## Installing

1. Clone this repository (or make a fork and clone that)
1. Install the required dependencies by running:

   ```console
   npm install
   ```

1. Create the development database by running:

   ```console
   npm run db:create
   ```

   This command runs the PostgreSQL-supplied `createdb` program. See `package.json` for the exact command.

1. Create the necessary tables (e.g., `users`) by running:

   ```console
   npm run db:migrate
   ```

   This command runs `npx knex migrate:latest`. You can also use `knex` directly. See `npx knex --help`.

1. Launch the web applciation by running:

   ```console
   npm run dev
   ```

   This uses [nodemon][url-nodemon] to automatically reload your web application whenever you save a file.

1. Visit <http://localhost:3000> to see the web application!

## Passwords

By default, [objection-password][url-objection-password] uses [bcrypt][wiki-bcrypt] to hash user passwords. We don't want to store the raw password text in the database, but we still need to verify quickly whether a user entered a valid password.

See the Wikipedia article on [hash functions and password verification][wiki-hash-password] for more information.

[url-expressjs]: https://expressjs.com/
[url-knexjs]: http://knexjs.org/
[url-objectionjs]: https://vincit.github.io/objection.js/
[url-handlebars]: https://handlebarsjs.com/
[url-node-postgres]: https://node-postgres.com/
[url-bootstrap-docs]: https://getbootstrap.com/docs/4.4/getting-started/introduction/
[url-objection-password]: https://github.com/scoutforpets/objection-password
[url-nodemon]: https://nodemon.io/
[wiki-bcrypt]: https://en.wikipedia.org/wiki/Bcrypt
[wiki-hash-password]: https://en.wikipedia.org/wiki/Cryptographic_hash_function#Password_verification
