# Netlify Deployment & Form Setup Guide

## ✅ Your Site is Now Netlify-Ready!

All files are configured for Netlify deployment. Follow these steps to go live:

---

## 📤 Deploy to Netlify (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Netlify deployment with form handling"
git push origin main
```

### Step 2: Connect to Netlify

1. **Go to** [https://netlify.com](https://netlify.com)
2. **Sign up/Login** (use GitHub for easy integration)
3. **Click** "Add new site" → "Import an existing project"
4. **Choose** GitHub and authorize
5. **Select** your `UpperCuts` repository
6. **Deploy settings:**
   - Build command: (leave empty)
   - Publish directory: `.` (root)
7. **Click** "Deploy site"

Your site will be live in ~1 minute at a Netlify URL like: `uppercurs-barber.netlify.app`

---

## 📧 Configure Form Email Notifications

### In Netlify Dashboard:

1. **Go to:** Site settings → Forms → Form notifications
2. **Click:** "Add notification" → "Email notification"
3. **Email to notify:** `Bryanr856@gmail.com`
4. **Event:** Form submission
5. **Form:** Select "booking"
6. **Save**

Now every booking will be emailed to Bryan's Gmail! 📨

---

## 🎯 Set Up Custom Domain (Optional)

### Option A: Use a Custom Domain You Own

1. **In Netlify:** Domain settings → Add custom domain
2. **Enter:** your domain (e.g., `uppercutsbarber.shop`)
3. **Follow:** Netlify's DNS instructions
4. **Enable:** Free HTTPS/SSL (automatic)

### Option B: Use Netlify Subdomain

1. **In Netlify:** Domain settings → Edit site name
2. **Choose:** `uppercutsbarber` (becomes `uppercutsbarber.netlify.app`)

---

## 📋 What's Configured

✅ **Form Handling:** Netlify Forms captures all booking requests  
✅ **Email Notifications:** Sends to Bryanr856@gmail.com  
✅ **Success Page:** Beautiful confirmation page after booking  
✅ **Anti-Spam:** Honeypot field prevents bot submissions  
✅ **Form Data:** Viewable in Netlify dashboard  
✅ **Performance:** Headers optimized for caching  
✅ **Security:** Security headers configured  

---

## 🔍 View Form Submissions

**In Netlify Dashboard:**
1. Go to your site
2. Click **Forms** in sidebar
3. Click **booking** form
4. See all submissions with timestamps

You can also export submissions as CSV!

---

## 📱 Test Your Form

After deployment:

1. Visit your live site
2. Scroll to "Booking" section
3. Fill out the form
4. Submit
5. Check Bryanr856@gmail.com for the email
6. Check Netlify dashboard → Forms to see the submission

---

## 🔧 Customize Email Notifications (Advanced)

In Netlify dashboard, you can customize:
- Email subject line
- Who receives notifications
- Add multiple email addresses
- Set up Slack/webhook notifications

---

## 💡 Pro Tips

1. **Test Form First:** Submit a test booking before telling customers
2. **Check Spam Folder:** First emails might go to spam
3. **Add to Contacts:** Add notifications@netlify.com to contacts
4. **Mobile Test:** Test form on phone to ensure it works
5. **Backup Contact:** Add (386) 873-4163 as alternative contact method

---

## 🆘 Troubleshooting

**Not receiving emails?**
- Check spam folder
- Verify email in Netlify Form Notifications
- Check Netlify Forms tab to see if submissions are recorded
- Add notifications@netlify.com to safe senders

**Form not submitting?**
- Check browser console for errors
- Ensure you deployed the latest code
- Verify form has `data-netlify="true"` attribute

---

## 🚀 You're All Set!

Once deployed, your customers can book appointments 24/7, and you'll receive every booking request via email!

**Need help?** Netlify has excellent support and documentation.
