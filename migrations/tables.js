const accountTable = `CREATE TABLE IF NOT EXISTS
           accounts(
             accountid SERIAL PRIMARY KEY,
             username TEXT NOT NULL,
             passwordhash TEXT NOT NULL,
             salt TEXT NOT NULL
                 )`;
const recipeTable = `CREATE TABLE IF NOT EXISTS
           recipes(
             recipeid SERIAL PRIMARY KEY,
             creator INTEGER REFERENCES accounts(accountid),
             username TEXT NOT NULL,
             preptime VARCHAR(20) NOT NULL,
             cooktime VARCHAR(20) NOT NULL,
             servings VARCHAR(20) NOT NULL,
             mealtype VARCHAR(20) NOT NULL,
             recipetitle VARCHAR(100) NOT NULL,
             description VARCHAR(500) NOT NULL,
             ingredients TEXT NOT NULL,
             directions TEXT NOT NULL,
             image TEXT NOT NULL,
             creationtime TIMESTAMP NOT NULL
                )`;
const favoriteTable = `CREATE TABLE IF NOT EXISTS
           accounts_recipes(
             recipe_id INTEGER REFERENCES recipes(recipeid),
             account_id INTEGER REFERENCES accounts(accountid),
             constraint id PRIMARY KEY(account_id, recipe_id)
                )`;

module.exports = {
    accountTable,
    recipeTable,
    favoriteTable
};