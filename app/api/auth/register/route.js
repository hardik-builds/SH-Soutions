import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  console.log('Registration API called');
  
  try {
    // Check environment variables
    console.log('Checking environment variables...');
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return Response.json(
        { success: false, message: 'Server configuration error: JWT_SECRET missing' },
        { status: 500 }
      );
    }
    console.log('JWT_SECRET is defined');
    
    // Parse request body
    console.log('Parsing request body...');
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return Response.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const { name, email, password } = body;
    
    // Validate input
    console.log('Validating input...');
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return Response.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }
    console.log('Input validation passed');
    
    // Validate password length
    if (password.length < 6) {
      console.log('Password too short');
      return Response.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    console.log('Password validation passed');
    
    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      return Response.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    console.log('Email validation passed');
    
    // Connect to database
    console.log('Connecting to database...');
    try {
      await connectDB();
      console.log('Database connected successfully');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return Response.json(
        { success: false, message: `Database connection failed: ${dbError.message}` },
        { status: 500 }
      );
    }
    
    // Check if user already exists
    console.log('Checking if user already exists...');
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
      console.log('User check completed');
    } catch (findError) {
      console.error('Error checking existing user:', findError);
      return Response.json(
        { success: false, message: `Error checking existing user: ${findError.message}` },
        { status: 500 }
      );
    }
    
    if (existingUser) {
      console.log('User already exists');
      return Response.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }
    console.log('User does not exist, proceeding with registration');
    
    // Hash password
    console.log('Hashing password...');
    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      console.log('Password hashed successfully');
    } catch (hashError) {
      console.error('Password hashing error:', hashError);
      return Response.json(
        { success: false, message: `Error processing password: ${hashError.message}` },
        { status: 500 }
      );
    }
    
    // Create new user
    console.log('Creating new user...');
    let user;
    try {
      user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword
      });
      console.log('User created successfully:', user);
    } catch (createError) {
      console.error('Error creating user:', createError);
      return Response.json(
        { success: false, message: `Error creating user account: ${createError.message}` },
        { status: 500 }
      );
    }
    
    // Generate JWT token
    console.log('Generating JWT token...');
    let token;
    try {
      token = jwt.sign(
        { 
          id: user._id.toString(), 
          email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      console.log('JWT token generated successfully');
    } catch (tokenError) {
      console.error('JWT token generation error:', tokenError);
      return Response.json(
        { success: false, message: `Error generating authentication token: ${tokenError.message}` },
        { status: 500 }
      );
    }
    
    // Create user response object without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      createdAt: user.createdAt
    };
    
    console.log('Registration completed successfully');
    return Response.json(
      {
        success: true,
        message: 'User registered successfully',
        user: userResponse,
        token
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific errors
    if (error.code === 11000) {
      return Response.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    if (error.name === 'ValidationError') {
      return Response.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, message: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}