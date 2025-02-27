const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

// ✅ 1. Add a Car Model
exports.addCarModel = async (req, res) => {
  const { model, brand, uniqueId, type, make } = req.body;
  const session = driver.session();
  
  try {
    const query = `
      CREATE (c:Car {model: $model, brand: $brand, uniqueId: $uniqueId, type: $type})
      MERGE (m:Make {name: $make})
      MERGE (c)-[:BELONGS_TO]->(m)
      RETURN c, m
    `;

    const result = await session.run(query, { model, brand, uniqueId, type, make });
    res.status(201).json({ message: "Car Model Added", data: result.records });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    session.close();
  }
};

// ✅ 2. Get All Car Models Grouped by Make
exports.getAllCarModels = async (req, res) => {
  const session = driver.session();
  
  try {
    const query = `
      MATCH (c:Car)-[:BELONGS_TO]->(m:Make)
      RETURN m.name AS make, collect(c) AS cars
    `;

    const result = await session.run(query);
    const groupedCars = result.records.map((record) => ({
      make: record.get("make"),
      cars: record.get("cars").map((car) => car.properties),
    }));

    res.status(200).json(groupedCars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    session.close();
  }
};
