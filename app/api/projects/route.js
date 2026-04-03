import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { getToken } from '@/lib/auth';

export async function GET(request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return Response.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token (you'll need to implement this)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Connect to database
    await connectDB();

    // Get user's projects
    const projects = await Project.find({ userId: decoded.id }).sort({ createdAt: -1 });

    return Response.json(
      { success: true, projects },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return Response.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, description } = await request.json();

    // Connect to database
    await connectDB();

    // Create new project
    const project = await Project.create({
      name,
      description,
      userId: decoded.id
    });

    return Response.json(
      { success: true, project },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}