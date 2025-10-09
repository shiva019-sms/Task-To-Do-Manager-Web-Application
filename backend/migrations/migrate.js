const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

const runMigrations = async () => {
  try {
    console.log('Starting database migration...');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    await pool.query(schema);
    
    console.log('Database migration completed successfully!');
    
    // Create a sample team and user for testing
    console.log('Creating sample data...');
    
    const teamResult = await pool.query(
      "INSERT INTO teams (name) VALUES ('Sample Team') ON CONFLICT DO NOTHING RETURNING id"
    );
    
    if (teamResult.rows.length > 0) {
      const teamId = teamResult.rows[0].id;
      
      // Create sample user (password: 'password123')
      const hashedPassword = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
      
      await pool.query(`
        INSERT INTO users (email, password, name, team_id, role) 
        VALUES ('admin@example.com', $1, 'Admin User', $2, 'admin')
        ON CONFLICT (email) DO NOTHING
      `, [hashedPassword, teamId]);
      
      console.log('Sample data created:');
      console.log('- Team: Sample Team');
      console.log('- User: admin@example.com (password: password123)');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();