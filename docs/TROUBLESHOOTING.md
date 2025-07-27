# NutriCalc Troubleshooting Guide

## Table of Contents
1. [Common Issues and Solutions](#common-issues-and-solutions)
2. [Nutrient Calculation Problems](#nutrient-calculation-problems)
3. [AI Assistant Issues](#ai-assistant-issues)
4. [Data Management Problems](#data-management-problems)
5. [Interface and Display Issues](#interface-and-display-issues)
6. [Performance Problems](#performance-problems)
7. [Browser Compatibility](#browser-compatibility)
8. [Security and Privacy Concerns](#security-and-privacy-concerns)
9. [Advanced Troubleshooting](#advanced-troubleshooting)
10. [Contact Support](#contact-support)

## Common Issues and Solutions

### Application Not Loading
**Problem**: The application appears blank or doesn't load properly.

**Solutions**:
1. **Check Browser Compatibility**: Ensure you're using a supported browser (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
2. **Clear Browser Cache**: Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac) and clear cached images and files
3. **Disable Browser Extensions**: Temporarily disable ad blockers or other extensions that might interfere
4. **Check File Integrity**: Ensure the HTML file hasn't been corrupted during download
5. **Try Another Browser**: Test with a different supported browser

### Slow Performance
**Problem**: The application is responding slowly or freezing.

**Solutions**:
1. **Close Other Tabs**: Reduce memory usage by closing unnecessary browser tabs
2. **Restart Browser**: Completely close and reopen your browser
3. **Check System Resources**: Ensure your computer has sufficient RAM and CPU available
4. **Update Browser**: Use the latest version of your browser
5. **Reduce Data**: Clear some custom fertilizers or watering events if you have many

### Unexpected Behavior
**Problem**: Components aren't behaving as expected.

**Solutions**:
1. **Refresh Page**: Press F5 or Ctrl+R (Cmd+R on Mac) to reload the application
2. **Check Console**: Press F12 and look for error messages in the Console tab
3. **Reset Settings**: Clear LocalStorage data (see Data Management section)
4. **Re-download**: Obtain a fresh copy of the application file

## Nutrient Calculation Problems

### Incorrect Nutrient Values
**Problem**: Calculated nutrient values seem incorrect or unexpected.

**Solutions**:
1. **Verify Inputs**: Double-check all input values (water volume, fertilizer amounts, etc.)
2. **Check Water Type**: Ensure the correct water type is selected
3. **Validate Fertilizer Data**: Confirm fertilizer composition values are accurate
4. **Review Growth Stage**: Make sure the appropriate growth stage is selected
5. **Compare with Manual Calculation**: Verify calculations with independent computation

### EC Values Too High/Low
**Problem**: Electrical conductivity values are outside expected ranges.

**Solutions**:
1. **Check Fertilizer Concentrations**: Verify fertilizer amounts are correct
2. **Review Water Quality**: Confirm water type and custom profile settings
3. **Consider Dilution**: High EC might require dilution with RO water
4. **Add Supplements**: Low EC might require additional fertilizers
5. **Consult References**: Use the Referenzen tab for target EC ranges

### Missing Nutrients
**Problem**: Certain nutrients are showing zero or unexpectedly low values.

**Solutions**:
1. **Check Fertilizer Selection**: Ensure fertilizers containing those nutrients are selected
2. **Verify Activation**: Confirm fertilizers are activated (checkbox checked)
3. **Review Amounts**: Check that fertilizer amounts are greater than zero
4. **Inspect Composition**: Verify fertilizer composition includes the missing nutrients
5. **Add Supplements**: Consider adding specific nutrient supplements

### pH Imbalance
**Problem**: Calculated or actual pH levels are outside optimal ranges.

**Solutions**:
1. **Check Water pH**: Verify base water pH settings
2. **Review Fertilizer Impact**: Some fertilizers affect pH; adjust accordingly
3. **Use pH Adjusters**: Add pH up/down solutions as needed
4. **Monitor Over Time**: pH can drift; check regularly
5. **Consult Guidelines**: Refer to pH recommendations in the References tab

## AI Assistant Issues

### No Response from AI
**Problem**: The AI assistant isn't providing responses to questions.

**Solutions**:
1. **Check API Key**: Ensure a valid Google Gemini API key is entered in Settings
2. **Verify Internet Connection**: Confirm stable internet connectivity
3. **Test API Key**: Try the API key in Google's AI Studio to verify it works
4. **Check Quotas**: Ensure you haven't exceeded API usage limits
5. **Review Firewall**: Confirm your network allows connections to Google APIs

### Irrelevant Responses
**Problem**: AI responses don't seem relevant to your questions.

**Solutions**:
1. **Be Specific**: Ask more detailed questions with context
2. **Include Details**: Mention your current setup (growth stage, fertilizers, etc.)
3. **Rephrase Questions**: Try asking the same question differently
4. **Check Context**: Ensure your current setup accurately reflects your question
5. **Use Suggestions**: Try the suggested questions for better results

### Error Messages
**Problem**: Receiving error messages from the AI assistant.

**Solutions**:
1. **Invalid API Key**: "API Key ungültig" - Enter a valid Google Gemini API key
2. **Rate Limiting**: "Zu viele Anfragen" - Wait before sending more requests
3. **Network Issues**: "Netzwerkfehler" - Check internet connection
4. **Blocked Content**: "Anfrage blockiert" - Rephrase your question to avoid sensitive topics
5. **Server Errors**: "Server-Fehler" - Try again later; the service may be temporarily unavailable

### Slow AI Responses
**Problem**: AI responses are taking too long to appear.

**Solutions**:
1. **Check Connection**: Verify internet speed and stability
2. **Reduce Complexity**: Ask simpler, more focused questions
3. **Try Again**: Network congestion may be temporary
4. **Check Google Status**: Visit Google Cloud status page for service issues
5. **Use Cached Responses**: For repeated questions, refer to previous responses

## Data Management Problems

### Data Not Saving
**Problem**: Custom fertilizers, settings, or schedules aren't persisting.

**Solutions**:
1. **Check LocalStorage**: Ensure your browser allows LocalStorage for file:// URLs
2. **Private Browsing**: Exit private/incognito mode which may restrict storage
3. **Browser Settings**: Verify LocalStorage isn't disabled in browser settings
4. **Storage Space**: Ensure sufficient disk space is available
5. **Browser Update**: Use a recent browser version with proper storage support

### Lost Custom Data
**Problem**: Previously created fertilizers or schedules have disappeared.

**Solutions**:
1. **Different Browser**: Check if you're using a different browser
2. **Cleared Data**: Verify you haven't cleared browser data recently
3. **File Location**: Ensure you're opening the same HTML file
4. **Backup Restoration**: Restore from exported backup files
5. **Browser Sync**: Check if browser sync settings affect LocalStorage

### Import/Export Issues
**Problem**: Unable to import/export data or receiving errors.

**Solutions**:
1. **File Format**: Ensure files are in valid JSON format
2. **File Corruption**: Try exporting fresh data and importing that
3. **Browser Permissions**: Check file access permissions for your browser
4. **File Size**: Very large files may cause issues; try smaller batches
5. **Encoding**: Ensure files are UTF-8 encoded without BOM

### Synchronization Problems
**Problem**: Data not syncing between browser tabs or windows.

**Solutions**:
1. **Same Origin**: Ensure all tabs are using the same file:// URL
2. **Browser Support**: Verify your browser supports storage events
3. **Manual Refresh**: Refresh other tabs manually after changes
4. **Browser Limitations**: Some browsers have limitations with file:// storage events
5. **Alternative Approach**: Close other tabs and work in a single tab

## Interface and Display Issues

### Layout Problems
**Problem**: Interface elements are misaligned or overlapping.

**Solutions**:
1. **Zoom Level**: Reset browser zoom to 100% (Ctrl+0 or Cmd+0)
2. **Window Size**: Adjust browser window dimensions
3. **CSS Issues**: Clear browser cache to reload stylesheets
4. **Browser Compatibility**: Try a different supported browser
5. **Extensions**: Disable CSS-modifying browser extensions

### Dark Mode Issues
**Problem**: Dark mode not working or causing display problems.

**Solutions**:
1. **Toggle Theme**: Switch between light and dark modes
2. **System Preferences**: Check your OS dark mode settings
3. **Browser Support**: Ensure your browser supports CSS variables
4. **Cache Clear**: Clear browser cache to reload theme files
5. **Manual Override**: Use browser developer tools to force theme

### Chart Visualization Problems
**Problem**: Nutrient charts not displaying correctly or showing wrong data.

**Solutions**:
1. **Data Validation**: Ensure all input data is valid and complete
2. **Refresh View**: Switch tabs and return to trigger re-render
3. **Browser Compatibility**: Check canvas/SVG support in your browser
4. **Zoom Issues**: Reset browser zoom level
5. **JavaScript Errors**: Check console for charting library errors

### Mobile Responsiveness
**Problem**: Interface doesn't adapt properly to mobile screens.

**Solutions**:
1. **Viewport Meta**: Ensure proper viewport meta tag in HTML
2. **Browser DevTools**: Test with device simulation in developer tools
3. **Orientation**: Try rotating device to different orientations
4. **Zoom Reset**: Reset browser zoom to default
5. **Touch Support**: Ensure browser supports touch events

## Performance Problems

### Slow Calculations
**Problem**: Nutrient calculations taking too long to complete.

**Solutions**:
1. **Reduce Fertilizers**: Fewer selected fertilizers mean faster calculations
2. **Close Tabs**: Reduce memory pressure by closing other tabs
3. **Browser Restart**: Fresh browser instance with clean memory
4. **Hardware Upgrade**: More RAM or faster CPU improves performance
5. **Simplify Inputs**: Use round numbers instead of complex decimals

### Memory Leaks
**Problem**: Application becomes progressively slower over time.

**Solutions**:
1. **Page Refresh**: Regularly refresh the page to reset memory
2. **Tab Management**: Close and reopen the application tab periodically
3. **Browser Restart**: Completely restart browser to clear memory
4. **Extension Management**: Disable memory-intensive extensions
5. **System Resources**: Monitor system memory usage

### Freezing Interface
**Problem**: UI becomes unresponsive during interactions.

**Solutions**:
1. **Wait Patiently**: Some operations may take time to complete
2. **Task Manager**: Use browser task manager to identify resource hogs
3. **Force Refresh**: Hard refresh (Ctrl+F5) to restart application
4. **Browser Update**: Use latest browser version with performance fixes
5. **System Maintenance**: Restart computer to clear system resources

## Browser Compatibility

### Chrome Issues
**Problem**: Specific problems when using Google Chrome.

**Solutions**:
1. **Update Chrome**: Ensure you're using the latest version
2. **Incognito Mode**: Test in incognito to rule out extension conflicts
3. **Clear Data**: Delete cookies and cached files for the application
4. **Hardware Acceleration**: Try disabling/enabling hardware acceleration
5. **Profile Issues**: Test with a new Chrome profile

### Firefox Issues
**Problem**: Specific problems when using Mozilla Firefox.

**Solutions**:
1. **Update Firefox**: Use the latest Firefox version
2. **Safe Mode**: Test in safe mode to disable extensions
3. **Preferences**: Check Firefox privacy and security settings
4. **Profile Reset**: Create a new Firefox profile for testing
5. **Add-on Conflicts**: Disable Firefox add-ons temporarily

### Safari Issues
**Problem**: Specific problems when using Apple Safari.

**Solutions**:
1. **Update Safari**: Ensure macOS and Safari are up to date
2. **Preferences**: Check Safari preferences for security settings
3. **Develop Menu**: Enable Develop menu for debugging options
4. **Private Browsing**: Test in private browsing mode
5. **Reset Safari**: Reset Safari settings to defaults

### Edge Issues
**Problem**: Specific problems when using Microsoft Edge.

**Solutions**:
1. **Update Edge**: Use the latest Chromium-based Edge version
2. **InPrivate Mode**: Test in InPrivate browsing window
3. **Extensions**: Disable Edge extensions temporarily
4. **Reset Settings**: Reset Edge settings to defaults
5. **Compatibility Mode**: Disable IE mode compatibility

## Security and Privacy Concerns

### API Key Security
**Problem**: Concerns about API key safety or exposure.

**Solutions**:
1. **LocalStorage Only**: Keys stored only in your browser's LocalStorage
2. **No Server Storage**: Keys never sent to any server except Google
3. **Encryption**: Keys are encrypted before storage
4. **User Control**: You control your own API key
5. **Regular Rotation**: Change API keys periodically for security

### Data Privacy
**Problem**: Worries about personal data being collected or shared.

**Solutions**:
1. **Zero Server Communication**: No data leaves your browser except API requests
2. **No Analytics**: No tracking or analytics code included
3. **Client-Side Only**: All processing happens locally
4. **Transparent Code**: Open-source code available for review
5. **Data Ownership**: You own all your data

### Malware Concerns
**Problem**: Suspicions that the application contains malware.

**Solutions**:
1. **Source Verification**: Download only from official sources
2. **Code Inspection**: Review source code for suspicious activities
3. **Security Scan**: Run antivirus scan on downloaded files
4. **Browser Security**: Use browser security features
5. **Sandboxing**: Run in isolated environment if concerned

## Advanced Troubleshooting

### Developer Tools Debugging
Using browser developer tools for advanced troubleshooting:

1. **Console Errors**: Press F12 and check the Console tab for error messages
2. **Network Activity**: Monitor API requests in the Network tab
3. **Element Inspection**: Inspect UI elements in the Elements tab
4. **LocalStorage View**: Check stored data in the Application tab
5. **Performance Profiling**: Analyze performance bottlenecks

### Error Message Interpretation
Common error messages and their meanings:

1. **"Cannot read property 'x' of undefined"**: Missing data or initialization issue
2. **"Unexpected token in JSON"**: Corrupted or invalid JSON data
3. **"localStorage is not available"**: Browser storage restrictions
4. **"Network error"**: Internet connectivity or firewall issues
5. **"Maximum call stack size exceeded"**: Infinite loop or recursion problem

### Log Analysis
Steps to analyze application logs:

1. **Enable Logging**: Add console.log statements to track execution
2. **Error Boundaries**: Implement React error boundaries for component errors
3. **Performance Marks**: Use performance.mark for timing analysis
4. **Storage Events**: Monitor localStorage changes with event listeners
5. **API Interception**: Log API requests and responses for debugging

### Environment Testing
Testing in different environments:

1. **Different Operating Systems**: Test on Windows, macOS, Linux
2. **Various Browsers**: Check compatibility across all supported browsers
3. **Mobile Devices**: Test on actual mobile devices
4. **Network Conditions**: Simulate slow or unreliable networks
5. **Low Resources**: Test with limited memory or CPU

## Contact Support

If you've tried all troubleshooting steps and still experience issues:

### Community Support
1. **GitHub Issues**: Submit detailed bug reports to the project repository
2. **Discussion Forums**: Participate in community discussions
3. **Documentation Updates**: Suggest improvements to this documentation
4. **Pull Requests**: Contribute fixes for identified issues

### Reporting Guidelines
When reporting issues, include:

1. **Detailed Description**: Clear explanation of the problem
2. **Steps to Reproduce**: Exact steps to recreate the issue
3. **Expected vs Actual**: What you expected vs. what actually happened
4. **Environment Information**: Browser version, OS, device details
5. **Screenshots/Video**: Visual evidence of the problem
6. **Console Output**: Any error messages from developer tools
7. **Tested Solutions**: What you've already tried to fix the issue

### Emergency Procedures
For critical issues affecting your growing operations:

1. **Manual Calculations**: Use traditional calculation methods as backup
2. **Professional Consultation**: Seek advice from agricultural experts
3. **Alternative Tools**: Use other nutrient calculators temporarily
4. **Documentation Reference**: Refer to printed materials and guides
5. **Community Help**: Reach out to experienced growers in forums

Remember that NutriCalc is provided as-is without warranty, and the community relies on user contributions to improve the application. Your detailed bug reports and suggested solutions help make the tool better for everyone.