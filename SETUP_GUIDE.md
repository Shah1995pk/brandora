# Brandora Website Setup Guide

## 📋 Step-by-Step Setup Instructions

### Step 1: Prepare Your Assets

Create an `assets` folder in your repository with the following structure:

```
assets/
├── logo.png              (Your brand logo - 200x200px)
├── profile.jpg           (Your profile picture - 400x500px)
├── portfolio/
│   ├── work-1.jpg
│   ├── work-2.jpg
│   ├── work-3.jpg
│   ├── work-4.jpg
│   ├── work-5.jpg
│   └── work-6.jpg
└── clients/
    ├── client-1.png
    ├── client-2.png
    ├── client-3.png
    └── client-4.png
```

### Step 2: Update Your Profile Information

Edit `index.html` and replace:

**Find:**
```html
<h1>BRANDORA</h1>
```
**With:** Your actual brand name (keep it as is if using BRANDORA)

**Find:**
```html
<h3>Syed Shah Zeb</h3>
```
**With:** Your actual name

**Find:**
```html
<p>Creative Entrepreneur & Brand Strategist</p>
```
**With:** Your professional title

### Step 3: Update Services Section

Keep the 6 services as listed or customize them:
- Graphic Design
- Video Editing
- Social Media Management
- Digital Marketing
- Shopify Store Management
- Brand Consultation

Update descriptions to match your specific expertise.

### Step 4: Update Portfolio Section

Replace the placeholder portfolio items with your actual work:

**In the Portfolio Grid, update:**
```html
<h3>Graphic Design Project</h3>
<p>Brand Identity Design</p>
```

With your actual project titles and descriptions.

### Step 5: Update Client Logos

Replace client placeholders:

**Find:**
```html
<h3>Client Name</h3>
<p>Service Provided</p>
```

**With:** Actual client names and services provided

### Step 6: Update Contact Information

**Find these in the Contact Section:**

```html
<p>Your City, Country</p>
```
**Replace with:** Your actual location

```html
<p>+92 Your Phone Number</p>
```
**Replace with:** Your actual phone number

```html
<p>hello@brandora.com</p>
```
**Replace with:** Your actual email address

### Step 7: Update Social Media Links

**Find:**
```html
<a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
```

**Replace the `#` with actual URLs:**
- Facebook: `https://facebook.com/your-profile`
- Instagram: `https://instagram.com/your-profile`
- Twitter: `https://twitter.com/your-profile`
- YouTube: `https://youtube.com/your-channel`
- LinkedIn: `https://linkedin.com/in/your-profile`

### Step 8: Add Your Images

#### Logo (assets/logo.png)
- Size: 200x200px
- Format: PNG with transparent background
- This appears in the navbar

#### Profile Picture (assets/profile.jpg)
- Size: 400x500px
- Format: JPG
- Shows in the About section

#### Portfolio Images (assets/portfolio/work-1.jpg to work-6.jpg)
- Size: 600x400px recommended
- Format: JPG
- Add your best work samples

#### Client Logos (assets/clients/client-1.png to client-4.png)
- Size: 200x200px
- Format: PNG
- Client brand logos or names

## 🎨 Customization Options

### Change Colors

Open `styles.css` and modify the `:root` variables:

```css
:root {
    --primary-color: #FF6B6B;      /* Change this color */
    --secondary-color: #4ECDC4;    /* Change this color */
    --dark-color: #1a1a1a;
    --light-color: #f8f9fa;
    --text-color: #333;
}
```

### Add More Portfolio Items

Copy this block in the portfolio section:

```html
<div class="portfolio-item">
    <img src="assets/portfolio/work-7.jpg" alt="Portfolio Work 7">
    <div class="portfolio-overlay">
        <h3>Project Title</h3>
        <p>Project Description</p>
    </div>
</div>
```

### Add More Clients

Copy this block in the clients section:

```html
<div class="client-card">
    <img src="assets/clients/client-5.png" alt="Client 5">
    <h3>Client Name</h3>
    <p>Service Provided</p>
</div>
```

## 📧 Enable Contact Form

The current form shows an alert. To enable email functionality:

### Option 1: Using Formspree

1. Go to [formspree.io](https://formspree.io)
2. Sign up and create a new form
3. Replace the form action in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Using EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Follow their integration guide
3. Update `script.js` with your credentials

## 🚀 Deployment

### GitHub Pages (Free)

1. Push all files to your GitHub repository
2. Go to Settings → Pages
3. Select "main" branch as source
4. Save
5. Your site will be live at: `https://Shah1995pk.github.io/brandora`

### Netlify (Free)

1. Connect your GitHub repository
2. Netlify automatically deploys on push
3. Get a free domain or use custom domain

### Vercel (Free)

1. Import your GitHub repository
2. One-click deployment
3. Free domain included

## ✅ Testing Checklist

- [ ] All images load correctly
- [ ] Mobile responsive (test on phone)
- [ ] All links work
- [ ] Contact form submits
- [ ] Social media links open correctly
- [ ] Text is updated with your information
- [ ] Colors look good
- [ ] Navigation works smoothly

## 🆘 Troubleshooting

**Images not showing?**
- Check that images are in the correct `assets` folder
- Verify image names match exactly (case-sensitive)
- Ensure images are in correct format (PNG/JPG)

**Website looks broken on mobile?**
- Clear browser cache
- Test in incognito mode
- Check viewport meta tag in HTML

**Colors look different?**
- Clear CSS cache
- Try different browser
- Check color values in styles.css

## 📞 Need Help?

Refer to the README.md for additional information and resources.

---

**Your portfolio website is ready! Start customizing and showcase your amazing work! 🎉**