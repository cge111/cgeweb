import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Define directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend build if it exists (for production)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// SMTP Transporter Configuration
const isSecure = process.env.SMTP_SECURE === 'true';
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: isSecure, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('[Server] SMTP connection verification failed:', error.message);
  } else {
    console.log('[Server] SMTP server is ready to deliver messages.');
  }
});

// Quote submission endpoint
app.post('/api/quote', async (req, res) => {
  try {
    const lead = req.body;

    if (!lead || !lead.contactName || !lead.email || !lead.phone || !lead.postcode) {
      return res.status(400).json({ error: 'Missing required fields: postcode, contactName, email, or phone.' });
    }

    const {
      id,
      contactName,
      phone,
      email,
      postcode,
      fuelType,
      submittedAt
    } = lead;

    console.log(`[Server] Received new quote request: ${id} from Postcode ${postcode}`);

    // Construct the email details
    const mailOptions = {
      from: `"${contactName} (via CGE Quote Form)" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO_EMAIL || 'hello@cgeenergy.co.uk',
      replyTo: email,
      subject: `CGE Business Energy Quote Request - ${id}`,
      text: `Hello CGE Team,\n\nA new business energy quote request has been submitted.\n\n` +
            `Reference ID: ${id}\n` +
            `Contact Representative: ${contactName}\n` +
            `Business Postcode: ${postcode}\n` +
            `Phone Number: ${phone}\n` +
            `Email Address: ${email}\n` +
            `Service Required: ${fuelType.toUpperCase() === 'BOTH' ? 'GAS + ELECTRICITY' : fuelType.toUpperCase()}\n` +
            `Submitted At: ${submittedAt}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 25px; border-radius: 5px;">
          <h2 style="color: #2E5F9E; border-bottom: 2px solid #ED4610; padding-bottom: 10px; margin-top: 0; text-transform: uppercase; font-size: 20px;">New Energy Quote Request</h2>
          <p style="font-size: 15px; margin-bottom: 20px;">A new commercial energy lead has been captured on the website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eee; width: 40%;">Reference ID:</td>
              <td style="padding: 10px; border: 1px solid #eee; font-family: monospace; font-weight: bold; color: #ED4610;">${id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eee;">Contact Name:</td>
              <td style="padding: 10px; border: 1px solid #eee;">${contactName}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eee;">Business Postcode:</td>
              <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; text-transform: uppercase;">${postcode}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eee;">Phone Number:</td>
              <td style="padding: 10px; border: 1px solid #eee;"><a href="tel:${phone}" style="color: #2E5F9E; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eee;">Email Address:</td>
              <td style="padding: 10px; border: 1px solid #eee;"><a href="mailto:${email}" style="color: #2E5F9E; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eee;">Service Required:</td>
              <td style="padding: 10px; border: 1px solid #eee; text-transform: uppercase; font-weight: bold;">${fuelType === 'both' ? 'GAS + ELECTRICITY' : fuelType}</td>
            </tr>
          </table>
          
          <div style="font-size: 11px; color: #777; border-top: 1px solid #eee; padding-top: 10px; margin-top: 20px; text-align: center;">
            Lead submitted on <strong>${submittedAt}</strong> via CGE Business Energy Services landing page.
          </div>
        </div>
      `
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Server] Email sent successfully: ${info.messageId}`);

    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('[Server] Failed to send quote email:', error);
    res.status(500).json({ error: error.message || 'Failed to dispatch quote request email.' });
  }
});

// Fallback for single page apps in production (routes everything else to index.html)
if (fs.existsSync(distPath)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Listen only if not running as a Vercel serverless function
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`[Server] CGE Business Energy Services host listening at http://localhost:${port}`);
  });
}

export default app;
