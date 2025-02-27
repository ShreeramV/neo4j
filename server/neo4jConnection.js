const neo4j = require("neo4j-driver");

(async () => {
  const URI = "neo4j+s://6de85b9a.databases.neo4j.io";
  const USER = "neo4j"; 
  const PASSWORD = "6H9NL_9Usg0hHPUD-clcdgmmHO45kO3PpiLHfcZBzpQ";

  let driver;

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.getServerInfo();
    console.log("✅ Connection to Neo4j established!");
    console.log(serverInfo);
  } catch (err) {
    console.error(`❌ Connection error: ${err.message}`);
  } finally {
    if (driver) {
      await driver.close(); 
    }
  }
})();
