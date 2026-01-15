# Production Deployment Checklist

Use this checklist before deploying NeWoFlow Frontend to production.

## Pre-Deployment

### Code Quality
- [ ] All ESLint warnings resolved (`npm run lint`)
- [ ] Code formatted with Prettier (`npm run format`)
- [ ] No console.log statements in production code
- [ ] All TODO comments reviewed and addressed
- [ ] Build succeeds without warnings (`npm run build`)

### Testing
- [ ] All user flows tested (login, catalog, media, upload)
- [ ] Role-based permissions verified for all user types
- [ ] Forms validate correctly
- [ ] Error handling tested (network errors, validation errors)
- [ ] File uploads work with progress indicators
- [ ] Responsive design verified on mobile/tablet/desktop

### Configuration
- [ ] Environment variables configured for production
- [ ] `VITE_API_BASE_URL` points to production backend
- [ ] CORS configured on backend for production domain
- [ ] API timeout values appropriate for production
- [ ] Max upload size set correctly

### Security
- [ ] No sensitive data in client-side code
- [ ] No API keys or secrets in frontend code
- [ ] Token storage uses secure methods (httpOnly cookies if possible)
- [ ] XSS protection in place (React handles this by default)
- [ ] HTTPS enforced in production

### Performance
- [ ] Bundle size optimized (< 500 KB gzipped)
- [ ] Images optimized and properly sized
- [ ] Lazy loading implemented where appropriate
- [ ] No memory leaks in components
- [ ] API calls properly cached with TanStack Query

## Deployment

### Build
- [ ] Clean build created (`rm -rf dist && npm run build`)
- [ ] Build artifacts reviewed for correctness
- [ ] Source maps generated for debugging (if needed)

### Hosting Configuration
- [ ] Static files served with proper cache headers
- [ ] SPA fallback configured (all routes serve index.html)
- [ ] Gzip/Brotli compression enabled
- [ ] CDN configured (if applicable)

### Domain & SSL
- [ ] Custom domain configured
- [ ] SSL certificate installed and valid
- [ ] HTTPS redirect configured
- [ ] DNS records properly configured

### Monitoring
- [ ] Error tracking configured (Sentry, LogRocket, etc.)
- [ ] Analytics configured (Google Analytics, Plausible, etc.)
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured

## Post-Deployment

### Verification
- [ ] Production site loads successfully
- [ ] Login works with production backend
- [ ] All main features accessible
- [ ] No console errors in production
- [ ] SSL certificate valid and secure

### Documentation
- [ ] Deployment documentation updated
- [ ] API endpoints documented
- [ ] User guide created (if needed)
- [ ] Admin guide created

### Rollback Plan
- [ ] Previous version backed up
- [ ] Rollback procedure documented
- [ ] Database backup taken (backend)

## Environment-Specific Checks

### Staging
- [ ] Staging environment mirrors production
- [ ] Full testing completed on staging
- [ ] Performance testing on staging

### Production
- [ ] All staging checks passed
- [ ] Stakeholders notified of deployment
- [ ] Support team briefed on new features
- [ ] Monitoring dashboards active

## Common Issues & Solutions

### Build Fails
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### CORS Errors
- Check backend CORS configuration
- Verify `VITE_API_BASE_URL` is correct
- Ensure backend allows production domain

### 404 on Refresh
- Configure server to serve index.html for all routes
- For Nginx: `try_files $uri $uri/ /index.html;`
- For Apache: Use .htaccess with RewriteRule

### Large Bundle Size
- Check for accidentally imported large libraries
- Use tree-shaking optimizations
- Lazy load routes and heavy components

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review and update documentation
- [ ] Monitor error rates and performance
- [ ] Review user feedback and analytics

### Security Updates
- [ ] Apply security patches promptly
- [ ] Review dependency vulnerabilities
- [ ] Update SSL certificates before expiry

## Support Contacts

- **Frontend Issues**: [Your Team]
- **Backend Issues**: [Backend Team]
- **Infrastructure**: [DevOps Team]
- **Security**: [Security Team]

---

**Last Updated**: January 2026
**Next Review**: Quarterly
