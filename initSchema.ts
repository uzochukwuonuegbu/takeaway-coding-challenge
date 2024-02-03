import { getDbClient } from './getDbClient';

const client = getDbClient();

async function createSchema() {
  try {
    await client.connect();

    // Define your schema creation queries here
    const schemaQueries = [
      'CREATE TABLE IF NOT EXISTS players (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS games (id VARCHAR(255) PRIMARY KEY, player1 VARCHAR(255) REFERENCES players(id), player2 VARCHAR(255) REFERENCES players(id), status VARCHAR(50) DEFAULT \'pending\', winner VARCHAR(255) REFERENCES players(id), next_move VARCHAR(255) REFERENCES players(id), result INTEGER NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    ];

    for (const query of schemaQueries) {
      console.log('RUNNING QUERY');
      const res = await client.query(query);
      console.log('Executed query:', query, res);
    }

    console.log('Schema creation completed successfully!');
  } catch (error) {
    console.error('Error creating schema:', error);
  } finally {
    await client.end();
  }
}

createSchema();