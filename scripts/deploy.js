#!/usr/bin/env node

/**
 * Deployment script for NutriCalc
 * Handles building and deploying to GitHub Pages
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command, description) {
  log(`\n${colors.blue}📋 ${description}...${colors.reset}`);
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    log(`${colors.green}✅ ${description} completed successfully${colors.reset}`);
    return output;
  } catch (error) {
    log(`${colors.red}❌ ${description} failed:${colors.reset}`);
    log(`${colors.red}${error.message}${colors.reset}`);
    process.exit(1);
  }
}

function checkPrerequisites() {
  log(`${colors.cyan}🔍 Checking prerequisites...${colors.reset}`);
  
  // Check if we're in the right directory
  if (!fs.existsSync('package.json')) {
    log(`${colors.red}❌ package.json not found. Please run this script from the project root.${colors.reset}`);
    process.exit(1);
  }
  
  // Check if dist directory exists and clean it
  if (fs.existsSync('dist')) {
    log(`${colors.yellow}🧹 Cleaning existing dist directory...${colors.reset}`);
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  log(`${colors.green}✅ Prerequisites check passed${colors.reset}`);
}

function runTests() {
  log(`${colors.cyan}🧪 Running test suite...${colors.reset}`);
  execCommand('npm test -- --run', 'Unit tests');
  execCommand('npm run lint', 'Code linting');
  execCommand('npm run type-check', 'TypeScript type checking');
}

function buildProject() {
  log(`${colors.cyan}🏗️ Building project for production...${colors.reset}`);
  execCommand('npm run build', 'Production build');
  
  // Verify build output
  if (!fs.existsSync('dist/index.html')) {
    log(`${colors.red}❌ Build failed: dist/index.html not found${colors.reset}`);
    process.exit(1);
  }
  
  // Get build stats
  const stats = fs.statSync('dist');
  log(`${colors.green}✅ Build completed successfully${colors.reset}`);
  
  // List build files
  const files = fs.readdirSync('dist');
  log(`${colors.blue}📦 Build output:${colors.reset}`);
  files.forEach(file => {
    const filePath = path.join('dist', file);
    const stat = fs.statSync(filePath);
    const size = (stat.size / 1024).toFixed(2);
    log(`  ${file} (${size} KB)`);
  });
}

function deployToGitHubPages() {
  log(`${colors.cyan}🚀 Deploying to GitHub Pages...${colors.reset}`);
  
  try {
    // Check if gh-pages is installed
    execCommand('npx gh-pages --version', 'Checking gh-pages installation');
    
    // Deploy to GitHub Pages
    execCommand('npx gh-pages -d dist -m "Deploy: $(date)"', 'GitHub Pages deployment');
    
    log(`${colors.green}🎉 Deployment completed successfully!${colors.reset}`);
    log(`${colors.blue}🌐 Your application will be available at:${colors.reset}`);
    log(`${colors.bright}https://powerbauer1337.github.io/NutriCalc${colors.reset}`);
    
  } catch (error) {
    log(`${colors.red}❌ Deployment failed${colors.reset}`);
    log(`${colors.yellow}💡 Trying alternative deployment method...${colors.reset}`);
    
    // Alternative: Manual git deployment
    try {
      execCommand('git checkout gh-pages || git checkout -b gh-pages', 'Switching to gh-pages branch');
      execCommand('cp -r dist/* .', 'Copying build files');
      execCommand('git add .', 'Adding files to git');
      execCommand('git commit -m "Deploy: $(date)" || echo "No changes to commit"', 'Committing changes');
      execCommand('git push origin gh-pages', 'Pushing to GitHub');
      execCommand('git checkout -', 'Returning to previous branch');
      
      log(`${colors.green}🎉 Alternative deployment completed!${colors.reset}`);
    } catch (altError) {
      log(`${colors.red}❌ All deployment methods failed${colors.reset}`);
      process.exit(1);
    }
  }
}

function generateDeploymentReport() {
  log(`${colors.cyan}📊 Generating deployment report...${colors.reset}`);
  
  const report = {
    timestamp: new Date().toISOString(),
    buildSize: getBuildSize(),
    files: getBuildFiles(),
    gitCommit: getGitCommit(),
    branch: getGitBranch()
  };
  
  fs.writeFileSync('deployment-report.json', JSON.stringify(report, null, 2));
  log(`${colors.green}✅ Deployment report saved to deployment-report.json${colors.reset}`);
}

function getBuildSize() {
  const distPath = 'dist';
  let totalSize = 0;
  
  function calculateSize(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        calculateSize(filePath);
      } else {
        totalSize += stat.size;
      }
    });
  }
  
  calculateSize(distPath);
  return Math.round(totalSize / 1024); // KB
}

function getBuildFiles() {
  return fs.readdirSync('dist').map(file => {
    const stat = fs.statSync(path.join('dist', file));
    return {
      name: file,
      size: Math.round(stat.size / 1024) // KB
    };
  });
}

function getGitCommit() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function getGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

// Main deployment process
async function main() {
  log(`${colors.bright}${colors.magenta}🚀 NutriCalc Deployment Script${colors.reset}`);
  log(`${colors.bright}================================${colors.reset}\n`);
  
  try {
    checkPrerequisites();
    runTests();
    buildProject();
    deployToGitHubPages();
    generateDeploymentReport();
    
    log(`\n${colors.bright}${colors.green}🎉 DEPLOYMENT SUCCESSFUL! 🎉${colors.reset}`);
    log(`${colors.bright}================================${colors.reset}`);
    
  } catch (error) {
    log(`\n${colors.bright}${colors.red}💥 DEPLOYMENT FAILED! 💥${colors.reset}`);
    log(`${colors.red}Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Run the deployment
main();
