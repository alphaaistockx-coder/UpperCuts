# Booking Form Email Setup Guide

## Current Status
Your booking form is configured to send submissions to **Bryanr856@gmail.com**

## Setup Required (5 minutes)

### Option 1: Formspree (Recommended - Free & Easy)

1. **Go to** [https://formspree.io/](https://formspree.io/)

2. **Sign up** with your email (Bryanr856@gmail.com)

3. **Create a new form** - Click "New Form"

4. **Get your form endpoint** - It will look like: `https://formspree.io/f/YOUR_FORM_ID`

5. **Update index.html** - Replace line with your form endpoint:
   ```html
   <form class="booking-form" id="bookingForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   
   Find this line (around line 2276) and replace `xanykorq` with your actual form ID

6. **Test it!** - Submit a test booking on your website

### Option 2: Netlify Forms (If hosting on Netlify)

If you're deploying to Netlify, you can use their built-in forms:

1. Add `netlify` attribute to your form tag:
   ```html
   <form class="booking-form" id="bookingForm" netlify name="booking" method="POST">
   ```

2. Netlify will automatically handle form submissions and email them to you

3. You can view submissions in your Netlify dashboard

### Option 3: Contact Form Services

Other alternatives:
- **Web3Forms**: https://web3forms.com/ (Free, no account needed)
- **Basin**: https://usebasin.com/ (Free tier available)
- **Getform**: https://getform.io/ (Free for 50 submissions/month)

## What Customers Will See

When someone books an appointment, they'll see:
- ✅ Success: "Thanks! Your request has been received. We'll text you shortly to confirm your appointment."
- ❌ Error: "Oops! There was a problem. Please call us at (386) 873-4163 to book."

## Email Format

You'll receive emails with:
- Customer Name
- Phone Number
- Preferred Date & Time
- Service Selected
- Preferred Barber
- Any Special Notes

## Need Help?

If you need assistance setting this up, let me know and I can walk you through it!
