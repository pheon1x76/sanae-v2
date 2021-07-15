const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
  });

const CurrencyShop = require("./models/CurrencyShop")(sequelize, Sequelize.DataTypes);
require("./models/Users")(sequelize, Sequelize.DataTypes);
require("./models/UserItems")(sequelize, Sequelize.DataTypes);
require("./models/Polls")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize.sync({ force }).then(async () => {
    const shop = [
        CurrencyShop.upsert({ name: "Yuyuko Fumo", description: "A totally normal fumo. Throw your wallet at it to buy.", cost: 60 }),
        CurrencyShop.upsert({ name: "Reimu Fumo", description: "The one and only.", cost: 70 }),
        CurrencyShop.upsert({ name: "Honey", description: "Yum", cost: 2 }),
    ];
    await Promise.all(shop);
    console.log("Database synced");
    sequelize.close();
}).catch(console.error);