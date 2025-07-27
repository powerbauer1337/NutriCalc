# NutriCalc Deployment Guide

## Overview

This guide covers the deployment process for NutriCalc to GitHub Pages, including troubleshooting common issues and best practices.

## Quick Deployment

### Method 1: Automated Script (Recommended)
```bash
npm run deploy
```

This runs the comprehensive deployment script that:
- ✅ Runs all tests and quality checks
- ✅ Builds the production version
- ✅ Deploys to GitHub Pages
- ✅ Generates deployment report

### Method 2: Simple Deployment
```bash
npm run deploy:simple
```

Quick deployment without extensive checks.

### Method 3: Force Deployment
```bash
npm run deploy:force
```

Force deployment (overwrites existing deployment).

## Deployment Process

### 1. Pre-deployment Checks
```bash
# Run tests
npm test -- --run

# Check code quality
npm run lint
npm run type-check

# Build locally to verify
npm run build
```

### 2. Manual Deployment Steps
```bash
# 1. Clean and build
rm -rf dist
npm run build

# 2. Deploy to GitHub Pages
npx gh-pages -d dist

# 3. Verify deployment
npm run preview
```

## Configuration

### GitHub Pages Settings
1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select branch: `gh-pages`
4. Select folder: `/ (root)`

### Environment Variables
- `NODE_ENV=production` for production builds
- Base URL automatically set to `/NutriCalc/` for GitHub Pages

## Troubleshooting

### Common Issues

#### 1. "gh-pages not found"
```bash
npm install --save-dev gh-pages
```

#### 2. "Permission denied"
```bash
# Check GitHub token permissions
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3. "Build fails"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 4. "404 on deployed site"
- Check that `base` in `vite.config.js` matches repository name
- Verify GitHub Pages is enabled in repository settings
- Ensure `homepage` in `package.json` is correct

#### 5. "Assets not loading"
- Verify base path configuration
- Check browser console for 404 errors
- Ensure all imports use relative paths

### Debug Commands
```bash
# Check build output
ls -la dist/

# Test build locally
npm run preview

# Check GitHub Pages status
curl -I https://powerbauer1337.github.io/NutriCalc

# Verify git configuration
git remote -v
git branch -a
```

## Deployment Checklist

### Before Deployment
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build completes successfully
- [ ] Local preview works correctly
- [ ] Performance metrics acceptable

### After Deployment
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Forms function properly
- [ ] Mobile responsiveness verified
- [ ] Performance monitoring active

## Monitoring

### Performance Metrics
- Bundle size: Target < 100KB gzipped
- Load time: Target < 3 seconds
- Core Web Vitals: All green scores

### Analytics
- User interactions tracked
- Error monitoring active
- Performance data collected

## Rollback Procedure

### Quick Rollback
```bash
# Revert to previous deployment
git checkout gh-pages
git reset --hard HEAD~1
git push --force-with-lease origin gh-pages
```

### Full Rollback
```bash
# Deploy specific commit
git checkout <commit-hash>
npm run build
npx gh-pages -d dist
```

## Automation

### GitHub Actions
The repository includes automated deployment via GitHub Actions:
- Triggers on push to `main` or `feature/ui-redesign-modern`
- Runs tests and builds automatically
- Deploys to GitHub Pages on success

### Manual Trigger
```bash
# Trigger GitHub Actions manually
gh workflow run deploy.yml
```

## Best Practices

### 1. Version Control
- Always commit changes before deployment
- Use semantic versioning for releases
- Tag important deployments

### 2. Testing
- Run full test suite before deployment
- Test on multiple browsers
- Verify mobile experience

### 3. Performance
- Monitor bundle size growth
- Optimize images and assets
- Use code splitting for large features

### 4. Security
- Keep dependencies updated
- Review security advisories
- Use environment variables for secrets

## Support

### Getting Help
1. Check this documentation
2. Review GitHub Actions logs
3. Check browser console for errors
4. Verify GitHub Pages settings

### Useful Links
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)

## Deployment URLs

- **Production**: https://powerbauer1337.github.io/NutriCalc
- **Preview**: http://localhost:3003 (after `npm run preview`)
- **Development**: http://localhost:3002 (after `npm start`)

---

*Last updated: 2025-01-27*
