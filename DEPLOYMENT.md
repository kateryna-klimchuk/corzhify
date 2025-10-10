# Corzhify - Deployment Guide

## 🚀 Deployment to Netlify

### Quick Deploy Commands

**Option 1: Build and Deploy to Production**

```bash
netlify deploy --prod --build
```

**Option 2: Build First, Then Deploy**

```bash
npm run build
netlify deploy --prod
```

**Option 3: Preview Deployment (Draft)**

```bash
netlify deploy --build
```

---

## 📋 Deployment Checklist

### Prerequisites

- ✅ Netlify CLI installed globally
- ✅ Logged in to Netlify (`netlify login`)
- ✅ Site linked to Netlify (`netlify link`)

### Before Deploying

1. ✅ Run type check: `npm run typecheck`
2. ✅ Test build locally: `npm run build`
3. ✅ Test locally: `netlify serve` or `npm start`
4. ✅ Review changes in IMPROVEMENTS.md

---

## 🌐 Live Site Information

**Production URL:** https://corzhify.netlify.app

**Admin Dashboard:** https://app.netlify.com/projects/corzhify

**Site ID:** 53f9532d-60ff-4551-b7cf-1e8f7636d411

---

## 📦 Build Configuration

The build configuration is defined in `netlify.toml`:

```toml
[build]
command = "npm run build"
publish = "build/client"

[dev]
command = "npm run dev"
framework = "vite"

[[headers]]
for = "/build/*"
[headers.values]
"Cache-Control" = "public, max-age=31560000, immutable"
```

### Build Output

- **Client files:** `build/client/` (static assets)
- **Server files:** `build/server/` (Remix server)
- **Netlify Functions:** `.netlify/functions-internal/`

---

## 🔄 Deployment Workflow

### 1. Local Development

```bash
npm run dev
# Or with Netlify dev server
netlify dev
```

### 2. Testing

```bash
# Type check
npm run typecheck

# Lint code
npm run lint

# Build for production
npm run build

# Test production build locally
netlify serve
```

### 3. Deployment

**Preview Deployment (for testing):**

```bash
netlify deploy --build
# This creates a unique preview URL
```

**Production Deployment:**

```bash
netlify deploy --prod --build
# This deploys to https://corzhify.netlify.app
```

---

## 🔧 Continuous Deployment

### Git-Based Deployment

If you prefer automatic deployments on git push:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build/client`
4. Push to your main branch

Netlify will automatically build and deploy on every push.

---

## 📊 Recent Deployment

**Date:** October 10, 2025
**Status:** ✅ Successfully Deployed
**Build Time:** ~1.5 seconds
**Deploy Time:** ~1 minute

### What Was Deployed:

- ✅ Enhanced Tailwind design system
- ✅ Improved component styles
- ✅ New API service layer
- ✅ Centralized TypeScript types
- ✅ Better accessibility features
- ✅ Error boundary component
- ✅ Refactored route loaders
- ✅ Performance improvements

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues

```bash
# Check Netlify status
netlify status

# View deployment logs
netlify watch

# Manual deployment
netlify deploy --prod --dir=build/client
```

### Functions Not Working

The site uses Remix's built-in server, not Netlify Functions. The warning about missing functions folder is expected and can be ignored.

---

## 📈 Performance Optimization

### Current Build Stats:

- Total bundle size: ~347 KB (client)
- Largest chunk: components (~248 KB)
- CSS size: ~20 KB
- Gzip enabled on all assets

### Caching Strategy:

- Static assets: Immutable, 1 year cache
- HTML: No cache
- API responses: Handled by Remix

## 💡 Next Steps

1. Monitor site performance with Netlify Analytics
2. Set up custom domain (optional)
3. Enable Netlify Forms for contact functionality (optional)
4. Set up monitoring/error tracking (e.g., Sentry)
5. Consider adding A/B testing
