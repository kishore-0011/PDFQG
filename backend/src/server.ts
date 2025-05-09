import dotenv from "dotenv";
import app from "./app";
import { checkDatabaseConnection, initializeDatabase } from "./config/db";


dotenv.config()

const PORT = process.env.PORT || 5001;


(async () => {
  try {
    // First check if we can connect to the database
    const isConnected = await checkDatabaseConnection();
    
    if (isConnected) {
      // Then initialize tables
      await initializeDatabase();
      console.log('Database setup completed');
    } else {
      console.error('Could not connect to database');
    }
  } catch (error) {
    console.error('Database setup failed:', error);
    // Don't exit process to allow API to run even if DB is not available
    console.error('Server will start but database features will not work correctly.');
  }
})();


app.listen(PORT, () =>{
    console.log(`Server is running on the PORT ${PORT}`)

})
