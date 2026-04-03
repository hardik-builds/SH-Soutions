import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });
    
    // Always return success to prevent email enumeration attacks
    // But only send email if user actually exists
    if (user) {
      // Here you would typically:
      // 1. Generate a reset token
      // 2. Save it to the user document with an expiration
      // 3. Send an email with the reset link
      
      // For demo purposes, we'll just log it
      console.log(`Password reset requested for: ${email}`);
      
      // In a real app, you would use a service like SendGrid, Nodemailer, etc.
      // Example:
      // const resetToken = generateResetToken();
      // user.resetPasswordToken = resetToken;
      // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      // await user.save();
      // await sendResetEmail(email, resetToken);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, we sent a password reset link.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}