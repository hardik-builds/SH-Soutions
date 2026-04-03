import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function GET() {
  const results = {};
  
  // Test environment variables
  results.envVars = {
    JWT_SECRET: !!process.env.JWT_SECRET,
    MONGODB_URI: !!process.env.MONGODB_URI
  };
  
  // Test database connection
  try {
    await connectDB();
    results.dbConnection = { success: true };
  } catch (error) {
    results.dbConnection = { success: false, error: error.message };
  }
  
  // Test User model
  try {
    const userCount = await User.countDocuments();
    results.userModel = { success: true, count: userCount };
  } catch (error) {
    results.userModel = { success: false, error: error.message };
  }
  
  // Test bcrypt
  try {
    const testHash = await bcrypt.hash('test', 10);
    results.bcrypt = { success: true };
  } catch (error) {
    results.bcrypt = { success: false, error: error.message };
  }
  
  // Test JWT
  try {
    const testToken = jwt.sign({ test: 'test' }, process.env.JWT_SECRET || 'fallback');
    results.jwt = { success: true };
  } catch (error) {
    results.jwt = { success: false, error: error.message };
  }
  
  return Response.json(results);
}