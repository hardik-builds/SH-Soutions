import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return Response.json({ success: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await request.json();

    const project = await Project.create({
      ...body,
      userId: decoded.id
    });

    return Response.json({ success: true, project });

  } catch (error) {
    console.error(" ERROR:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}