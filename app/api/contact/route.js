import connectDB from '@/lib/mongodb';
import { createContact } from '@/lib/createContact';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    console.log('=== Contact Form Submission ===');
    
    const { name, email, phone, company, service, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();
    console.log('Database connected successfully');

    // Create contact using helper function
    const contact = await createContact({ name, email, phone, company, service, message });
    console.log('Contact created with ID:', contact._id);

    // Send email notification
    try {
      console.log('Preparing email...');
      
      // Check if email configuration exists
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email not configured, skipping email notification');
        return Response.json(
          { success: true, message: 'Contact saved successfully (email notification disabled)' },
          { status: 200 }
        );
      }

      // Create email transporter
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_PORT === '465',
        auth: {
          user: process.env.EMAIL_USER,
          pass: 
          process.env.EMAIL_PASS
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || 'info@shsolutions.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <h2 style="color: #111827; margin: 0 0 10px;">New Contact Form Submission</h2>
            <p style="color: #4b5563; margin: 0 0 10px;">From: ${name}</p>
            <p style="color: #6b7280; margin: 0 0 10px;">Email: ${email}</p>
            <p style="color: ${phone || 'Not provided'}</p>
            <p style="color: ${company || 'Not provided'}</p>
            <p style="color: ${service || 'Not specified'}</p>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 10px; margin-top: 10px;">
              <p style="color: #111827; margin: 0 0 10px;">Message:</p>
              <p style="color: ${message}</p>
            </div>
            <p style="font-size: 12px; color: #9ca3af; margin: 0 0 10px;">Contact ID: ${contact._id}</p>
            <p style="font-size: 12px; color: #6b7280;">Date: ${new Date(contact.createdAt).toLocaleDateString()}</p>
          </div>
      `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return Response.json(
        { success: true, message: 'Contact saved but email notification failed' },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
        contactId: contact._id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return Response.json(
        { success: false, message: `Validation error: ${error.message}` },
        { status: 400 }
      );
    }
    
    if (error.code === 11000) {
      return Response.json(
        { success: false, message: 'Email already exists' },
        { status: 409 }
      );
    }

    return Response.json(
      { success: false, message: 'Failed to submit your message. Please try again.' },
      { status: 500 }
    );
  }
}