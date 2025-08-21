import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'

// Simple waitlist API that stores emails to a JSON file
// In production, you'd want to use a database or CRM integration

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, source = 'landing', timestamp = new Date().toISOString() } = req.body

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // In production, save to database or send to CRM
    // For now, we'll log it (in Vercel, this goes to the function logs)
    console.log('New waitlist signup:', {
      email,
      source,
      timestamp,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    })

    // You could also integrate with services like:
    // - Supabase: await supabase.from('waitlist').insert({ email, source })
    // - Airtable: await airtable.create({ email, source })
    // - SendGrid: await sendWelcomeEmail(email)
    // - Slack: await notifySlack(`New signup: ${email}`)

    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully joined the waitlist!',
      data: { email, source }
    })

  } catch (error) {
    console.error('Waitlist error:', error)
    return res.status(500).json({ 
      error: 'Failed to process signup',
      message: 'Please try again or contact support'
    })
  }
}