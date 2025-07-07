# 🔐 Environment Variables for Vercel Deployment

## 🔍 Current Environment Variables Found

Based on your codebase analysis:

### **Backend Variables (drizzle.config.ts):**
- `DATABASE_URL` - Database connection string
- `NODE_ENV` - Environment mode
- `REPL_ID` - Replit-specific variable

### **Frontend API Calls:**
- Your app makes calls to `/api/cleanup`
- You'll need to configure the backend API URL

---

## 🎯 Required Environment Variables for Frontend

Since you're deploying **frontend-only**, you need to configure:

### **1. API Base URL**
```bash
VITE_API_URL=https://your-backend-api.com
```

### **2. Environment Mode**
```bash
VITE_NODE_ENV=production
```

---

## ⚙️ Setting Environment Variables in Vercel

### **Method 1: Vercel Dashboard**

1. **Go to your project** in Vercel Dashboard
2. **Click "Settings"** tab
3. **Click "Environment Variables"** in sidebar
4. **Add variables:**

```
Name: VITE_API_URL
Value: https://your-backend-api.com
Environment: Production, Preview, Development
```

```
Name: VITE_NODE_ENV  
Value: production
Environment: Production
```

### **Method 2: Vercel CLI**

```bash
# Add environment variables via CLI
vercel env add VITE_API_URL
# Enter value: https://your-backend-api.com

vercel env add VITE_NODE_ENV  
# Enter value: production
```

---

## 📝 Update Your Frontend Code

### **1. Create Environment Configuration**

Create `client/src/lib/config.ts`:
```typescript
// Environment configuration
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  isDevelopment: import.meta.env.VITE_NODE_ENV === 'development',
  isProduction: import.meta.env.VITE_NODE_ENV === 'production',
} as const;
```

### **2. Update API Calls in App.tsx**

Replace hardcoded API paths:
```typescript
// Before:
await fetch('/api/cleanup', { method: 'POST' });

// After:
import { config } from '@/lib/config';
await fetch(`${config.apiUrl}/api/cleanup`, { method: 'POST' });
```

---

## 🔧 Common Environment Variables

### **API Configuration:**
```bash
VITE_API_URL=https://api.yourbackend.com
VITE_API_VERSION=v1
VITE_API_TIMEOUT=5000
```

### **Feature Flags:**
```bash
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
VITE_MAINTENANCE_MODE=false
```

### **Third-Party Services:**
```bash
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
```

### **Database (if using client-side):**
```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
```

---

## 🌍 Environment-Specific Variables

### **Production:**
```bash
VITE_API_URL=https://api.ecotube.com
VITE_NODE_ENV=production
VITE_ENABLE_DEBUG=false
```

### **Preview/Staging:**
```bash
VITE_API_URL=https://staging-api.ecotube.com
VITE_NODE_ENV=staging
VITE_ENABLE_DEBUG=true
```

### **Development:**
```bash
VITE_API_URL=http://localhost:3000
VITE_NODE_ENV=development
VITE_ENABLE_DEBUG=true
```

---

## 📁 Local Development Setup

### **1. Create `.env.local` file:**
```bash
# .env.local (for local development)
VITE_API_URL=http://localhost:3000
VITE_NODE_ENV=development
VITE_ENABLE_DEBUG=true
```

### **2. Add to `.gitignore`:**
```bash
# Environment files
.env
.env.local
.env.production
.env.staging
*.env
```

### **3. Create `.env.example`:**
```bash
# .env.example (template for other developers)
VITE_API_URL=your_api_url_here
VITE_NODE_ENV=development
VITE_ENABLE_DEBUG=true
```

---

## 🔒 Security Best Practices

### **✅ Safe for Frontend (VITE_ prefix):**
- API URLs
- Public API keys
- Feature flags
- Public configuration

### **❌ NEVER expose in frontend:**
- Database passwords
- Private API keys
- JWT secrets
- Server credentials

### **🛡️ Security Tips:**
- Always use `VITE_` prefix for Vite variables
- Use different keys for dev/staging/production
- Rotate keys regularly
- Monitor usage in Vercel dashboard

---

## 🚀 Deployment Steps with Environment Variables

### **1. Set Variables in Vercel:**
```bash
VITE_API_URL=https://your-backend.com
VITE_NODE_ENV=production
```

### **2. Update Your Code:**
```typescript
// Use environment variables
const apiUrl = import.meta.env.VITE_API_URL;
```

### **3. Deploy:**
```bash
git push origin main
# Or redeploy in Vercel dashboard
```

### **4. Verify:**
- Check build logs for variable access
- Test API calls in production
- Verify functionality

---

## 🐛 Troubleshooting

### **Variables Not Working:**
```bash
# Check if variables are available
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### **Build Fails:**
- Ensure all required variables are set
- Check variable names (case-sensitive)
- Verify VITE_ prefix for frontend variables

### **CORS Issues:**
- Configure your backend to allow your Vercel domain
- Update API URL to match your backend

---

## ✅ Quick Setup Checklist

**Before Deployment:**
- [ ] Identify all API endpoints in your code
- [ ] Create environment variable configuration
- [ ] Update hardcoded URLs to use env vars
- [ ] Set variables in Vercel dashboard

**After Deployment:**
- [ ] Test all API calls
- [ ] Verify environment variables are loaded
- [ ] Check browser network tab for correct URLs
- [ ] Monitor for any errors

---

## 🎯 Next Steps for Your EcoTube App

1. **Set your backend API URL** in Vercel
2. **Update the `/api/cleanup` calls** to use environment variables
3. **Deploy and test** the functionality

Your frontend will then properly communicate with your backend API! 🚀