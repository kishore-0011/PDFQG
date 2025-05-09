import dotenv from "dotenv";
import app from "./app";
import { checkDatabaseConnection, initializeDatabase } from "./config/db";


dotenv.config()

const PORT = process.env.PORT || 5001;


(async () => {
  try {
    
    const isConnected = await checkDatabaseConnection();
    
    if (isConnected) {
     
      await initializeDatabase();
      console.log('Database setup completed');
    } else {
      console.error('Could not connect to database');
    }
  } catch (error) {
    console.error('Database setup failed:', error);
  }
})();


app.listen(PORT, () =>{
    console.log(`Server is running on the PORT ${PORT}`)

})
