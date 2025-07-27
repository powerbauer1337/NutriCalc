# NutriCalc API Integrations and External Services

## Overview

NutriCalc integrates with external services to enhance functionality while maintaining user privacy and data security. This document details all API integrations, their purposes, implementation details, and security considerations.

## 1. Google Gemini AI API

### Service Description
The Google Gemini AI API provides the artificial intelligence capabilities for NutriCalc's chat assistant feature. It enables contextual help, nutrient recommendations, and educational content about plant nutrition.

### API Endpoint
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
```

### Authentication
- **Method**: API Key in HTTP header
- **Header**: `x-goog-api-key: YOUR_API_KEY`
- **Security**: Keys stored only in browser LocalStorage, never transmitted to third parties

### Request Format
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "User's question or message"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.6,
    "maxOutputTokens": 150
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}
```

### Response Format
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "AI-generated response"
          }
        ]
      }
    }
  ]
}
```

### Implementation Details
- **Component**: `src/components/ChatBar.tsx`
- **Handler**: `src/App.tsx` (handleSendAI function)
- **Model**: `gemini-1.5-flash-latest`
- **Configuration**: Temperature 0.6 for balanced creativity, 150 max tokens for concise responses

### Context Integration
The AI receives contextual information about the user's current setup:
- Selected growth stage
- Water type and volume
- Chosen fertilizers and amounts
- Current nutrient calculations
- Environmental parameters

### Error Handling
- **Network Errors**: Timeout after 30 seconds
- **Authentication Errors**: Invalid/expired API key detection
- **Rate Limiting**: Handling of quota exceeded errors
- **Safety Blocks**: Management of content filtering responses
- **General Failures**: Graceful degradation with user-friendly error messages

### Security Measures
- **Client-Side Only**: API keys never leave the user's browser
- **Encryption**: Keys stored in encrypted form in LocalStorage
- **HTTPS Only**: All communications encrypted in transit
- **Minimal Data**: Only necessary context sent with requests
- **User Control**: Users manage their own API keys

### Usage Guidelines
- **Quota Management**: Respect Google's free tier limitations
- **Request Optimization**: Send only essential context to minimize token usage
- **Caching**: Avoid redundant requests for identical queries
- **Error Recovery**: Implement retry logic for transient failures

## 2. Browser APIs

### LocalStorage API
#### Purpose
Persistent client-side storage for user preferences and data.

#### Usage
- **Settings Storage**: User preferences and default values
- **Custom Data**: User-created fertilizers and watering schedules
- **Recipe Management**: Saved nutrient solution configurations
- **API Keys**: Secure storage of Gemini API key

#### Implementation
- **Location**: `src/hooks/useLocalStorage.ts`
- **Security**: Encryption for sensitive data
- **Validation**: JSON parsing with error handling
- **Sync**: Cross-tab synchronization using storage events

#### Data Structure
```javascript
// Settings
{
  "unit": "liter",
  "waterAmount": "10",
  "growthPhase": "early_veg",
  "waterType": "ro"
}

// Custom Fertilizers
[
  {
    "id": "custom_fertilizer_1234567890",
    "name": "My Custom Blend",
    "type": "liquid",
    "unit": "ml",
    "composition": {
      "n": 5.0,
      "p": 3.0,
      "k": 7.0
    },
    "concentration": "100",
    "description": "Special blend for flowering"
  }
]

// Watering Events
[
  {
    "id": "event_1234567890",
    "date": "2023-06-15",
    "time": "08:00",
    "amount": "5",
    "notes": "Morning watering"
  }
]
```

### Clipboard API
#### Purpose
Copy functionality for sharing data and recipes.

#### Usage
- **Recipe Export**: Copy JSON data for sharing
- **Settings Transfer**: Share configuration between devices
- **Quick Actions**: Copy individual values or settings

#### Implementation
- **Location**: Various components with copy functionality
- **Permissions**: Request clipboard-write permissions when needed
- **Fallback**: Text area method for older browsers

### Fetch API
#### Purpose
HTTP client for external API communications.

#### Usage
- **AI Requests**: Communication with Google Gemini API
- **Future Extensions**: Potential integration with external databases
- **Data Validation**: Checking resource availability

#### Implementation
- **Location**: `src/App.tsx` (handleSendAI function)
- **Configuration**: Timeout control with AbortController
- **Error Handling**: Comprehensive error categorization
- **Security**: CORS-compliant requests

## 3. External Resource Integration

### CDN Resources
NutriCalc uses Content Delivery Networks for efficient resource loading:

#### Fonts and Icons
- **Source**: Google Fonts and inline SVG icons
- **Caching**: Long-term caching strategies
- **Fallback**: System fonts when CDN unavailable

#### JavaScript Libraries
- **React**: Core UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management
- **Clsx/Tailwind-Merge**: Class name utility functions

### Asset Management
- **Static Assets**: Images and icons bundled with application
- **Dynamic Loading**: Component-based code splitting
- **Compression**: Gzip/Brotli compression for faster delivery
- **Preloading**: Critical resource prioritization

## 4. Third-Party Service Integration

### Analytics and Monitoring
Currently, NutriCalc does not integrate with any analytics or monitoring services to preserve user privacy.

### Future Integration Possibilities
Potential services that could be integrated in future versions:

#### Payment Processing
- **Stripe**: For premium features or subscription model
- **PayPal**: Alternative payment processing
- **Security**: PCI compliance and secure transaction handling

#### Cloud Storage
- **Firebase**: Real-time database for user accounts
- **AWS S3**: Cloud storage for recipe sharing
- **Security**: End-to-end encryption and access controls

#### Social Features
- **OAuth Providers**: Google, Facebook, Twitter login
- **Sharing APIs**: Native sharing capabilities
- **Privacy**: Granular permission controls

## 5. API Security and Privacy

### Data Protection Principles
1. **Zero Server Storage**: No user data stored on external servers
2. **Client-Side Processing**: All calculations performed locally
3. **Minimal Data Transmission**: Only necessary data sent to APIs
4. **User Control**: Users manage their own API keys and data

### Encryption Standards
- **API Keys**: AES encryption before LocalStorage storage
- **Sensitive Data**: Encryption for user preferences
- **Communication**: TLS 1.3 for all external communications

### Privacy Compliance
- **GDPR**: Data protection regulation compliance
- **CCPA**: California Consumer Privacy Act adherence
- **COPPA**: Children's privacy protection (not applicable)
- **Transparency**: Clear disclosure of data usage

### Security Best Practices
1. **Input Validation**: Sanitization of all user inputs
2. **Output Encoding**: Prevention of XSS attacks
3. **Rate Limiting**: Client-side request throttling
4. **Error Handling**: Secure error messaging without data exposure
5. **Dependency Management**: Regular security audits of third-party libraries

## 6. API Performance Optimization

### Request Optimization
- **Batching**: Combining multiple requests when possible
- **Caching**: Storing responses for repeated queries
- **Compression**: Minimizing payload size
- **Prioritization**: Critical requests first

### Response Handling
- **Streaming**: Progressive response processing
- **Parsing**: Efficient JSON processing
- **Storage**: IndexedDB for large dataset caching
- **Updates**: Incremental data synchronization

### Error Recovery
- **Retry Logic**: Exponential backoff for failed requests
- **Fallbacks**: Graceful degradation strategies
- **Monitoring**: Error rate tracking and alerting
- **User Feedback**: Clear error messages and recovery options

## 7. Integration Testing

### API Mocking
- **Development**: Mock API responses for testing
- **Staging**: Simulated production environments
- **Edge Cases**: Error condition simulation

### Performance Testing
- **Latency**: Response time measurement
- **Throughput**: Concurrent request handling
- **Resource Usage**: Memory and CPU consumption
- **Scalability**: Load testing under various conditions

### Security Testing
- **Penetration Testing**: Vulnerability assessment
- **Compliance Audits**: Regulatory requirement verification
- **Dependency Scanning**: Third-party library security checks
- **Code Reviews**: Security-focused code examination

## 8. API Documentation and Standards

### Interface Documentation
- **OpenAPI Specification**: Machine-readable API contracts
- **Interactive Documentation**: Swagger UI for API exploration
- **Examples**: Real-world usage scenarios
- **Versioning**: Clear API version management

### Industry Standards Compliance
- **REST Principles**: Resource-based API design
- **JSON Format**: Standardized data exchange format
- **HTTP Status Codes**: Proper error signaling
- **Authentication Standards**: OAuth, API keys, JWT

### Monitoring and Logging
- **Request Logging**: Audit trail of API usage
- **Performance Metrics**: Response time and error rate tracking
- **Security Events**: Suspicious activity detection
- **Compliance Reports**: Regulatory requirement fulfillment

This comprehensive API integration documentation ensures that all external service interactions are secure, efficient, and maintain user privacy while providing valuable functionality to enhance the NutriCalc experience.