


# NutriCalc - Advanced Nutrient Calculator

A sophisticated web-based nutrient calculator designed for precision plant nutrition management, with specialized features for cannabis cultivation.

## 🚀 Quick Start

```bash
# Clone the repository
git clone [repository-url]
cd NutriCalc

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
npm run test:e2e
```

## 📋 Features

### ✅ Core Features
- **Precision Nutrient Calculation**: Real-time NPK and micronutrient calculations
- **Fertilizer Database**: 25+ pre-loaded commercial fertilizers + custom creation
- **Growth Stage Profiles**: 5 predefined stages with target values
- **Water Management**: Multiple water source mixing and custom profiles
- **AI Integration**: Google Gemini-powered assistant for guidance
- **Recipe Management**: Export/import complete nutrient recipes
- **Responsive Design**: Mobile-first approach with dark mode

### 🎯 Advanced Features
- **Visual Analysis**: Real-time charts and optimization indicators
- **Mixing Assistant**: Step-by-step nutrient mixing guide
- **Watering Scheduler**: Automated watering calendar
- **Community Features**: Recipe sharing and expert verification
- **Cloud Sync**: Cross-device recipe synchronization

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern UI framework
- **Tailwind CSS 3.3.6** - Utility-first styling
- **Vite 7.0.6** - Fast build tool and dev server
- **Lucide React** - Icon library

### Development
- **Jest** - Unit testing framework
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Backend (Optional)
- **Express.js** - API proxy for secure key management
- **Node.js 18+** - Runtime environment

## 📊 Growth Stages & Targets

| Stage | N (ppm) | P (ppm) | K (ppm) | EC (mS/cm) |
|-------|---------|---------|---------|------------|
| Early Veg | 100-150 | 30-50 | 100-150 | 0.8-1.2 |
| Late Veg | 150-200 | 50-70 | 150-200 | 1.2-1.6 |
| Early Flower | 100-150 | 70-90 | 200-250 | 1.4-1.8 |
| Mid Flower | 80-120 | 90-110 | 250-300 | 1.6-2.0 |
| Late Flower | 50-80 | 110-130 | 300-350 | 1.8-2.2 |

## 🏗️ Architecture

### Component Structure
```
src/
├── components/           # Reusable UI components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── utils/               # Business logic utilities
├── constants/           # Configuration constants
└── styles/              # Global styles
```

### Data Flow
```
User Input → Context State → Calculation Engine → Visual Output
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

### Environment Variables
Create a `.env` file for backend configuration:
```bash
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3001
```

## 🧪 Testing

### Unit Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### E2E Tests
```bash
npm run test:e2e      # Run E2E tests
```

## 🚀 Deployment

### Docker
```bash
# Build image
docker build -t nutricalc .

# Run container
docker run -p 80:80 nutricalc
```

### Manual Deployment
```bash
# Build for production
npm run build

# Serve static files
npm run preview
```

## 🔐 Security

### Current Security Measures
- ✅ No vulnerabilities in dependencies
- ✅ Input validation and sanitization
- ✅ CORS configuration

### Security Recommendations
- Use backend proxy for API keys
- Implement rate limiting
- Add Content Security Policy (CSP)
- Regular security audits

## 📈 Performance

### Bundle Analysis
- **Total Size**: ~210KB (gzipped)
- **JS Bundle**: ~64KB
- **CSS Bundle**: ~27KB

### Optimization Strategies
- Code splitting for routes
- Lazy loading for components
- Service worker for offline support
- Image optimization

## 🎯 Roadmap

### Phase 1: Security & Foundation ✅
- [x] Fix security vulnerabilities
- [x] Add comprehensive testing
- [x] Implement backend proxy

### Phase 2: Quality & Performance 🚧
- [ ] Add TypeScript support
- [ ] Implement code splitting
- [ ] Performance optimization

### Phase 3: Enhanced Features 📋
- [ ] User authentication
- [ ] Cloud synchronization
- [ ] Advanced analytics

### Phase 4: Community & Scale 🌟
- [ ] Recipe sharing platform
- [ ] Expert verification system
- [ ] Mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini team for AI capabilities
- React and Tailwind CSS communities
- Cannabis cultivation experts for nutrient data

## 📞 Support

For support, please open an issue on GitHub or contact the development team.


