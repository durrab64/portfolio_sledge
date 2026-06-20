# Portfolio Contact Form Setup

## Setting up EmailJS for Contact Form

To make your contact form actually send emails, you need to set up EmailJS. Follow these steps:

### 1. Sign up for EmailJS
- Go to https://www.emailjs.com/
- Create a free account

### 2. Get your credentials
After signing up, you'll need three pieces of information:

**Public Key**: Found in your EmailJS dashboard under "Account" → "General"
**Service ID**: Create a service (Gmail, Outlook, etc.) in the "Email Services" section
**Template ID**: Create an email template in the "Email Templates" section

### 3. Configure the template
Create a new email template with these variables:
- `{{from_name}}` - The sender's name
- `{{from_email}}` - The sender's email
- `{{service_type}}` - The selected service
- `{{message}}` - The message content
- `{{to_email}}` - Your email (mhdurrabrehan@gmail.com)

### 4. Update the JavaScript
In `script.js`, replace these placeholders:
- `YOUR_PUBLIC_KEY` → Your EmailJS public key
- `YOUR_SERVICE_ID` → Your EmailJS service ID
- `YOUR_TEMPLATE_ID` → Your EmailJS template ID

### 5. Test the form
After configuration, test the contact form to ensure emails are being sent to mhdurrabrehan@gmail.com

## Alternative: Formspree
If you prefer a simpler setup:
1. Go to https://formspree.io/
2. Create a free account
3. Get your form endpoint URL
4. Update the form action in `index.html` and remove the JavaScript form handling

## Security Note
Never commit your EmailJS credentials to version control. Consider using environment variables if deploying to a platform that supports them.