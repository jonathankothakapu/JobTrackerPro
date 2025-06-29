# JobTracker - Job Application Management System

A comprehensive job application tracking system built with React, TypeScript, and modern web technologies to help you manage your job search process efficiently.

## 🚀 Features

### 📊 Dashboard
- **Application Statistics**: Track total applications, interviews scheduled, offers received, and response rates
- **Status Overview**: Visual representation of application statuses with interactive charts
- **Recent Applications**: Quick view of your latest job applications

### 💼 Application Management
- **Add New Applications**: Comprehensive form to add job applications with all relevant details
- **Application List**: View and manage all your applications with filtering and sorting options
- **Application Cards**: Detailed cards showing company info, position, status, and priority
- **Status Tracking**: Monitor application progress through different stages
- **Priority Management**: Set and track application priorities

### 📅 Calendar & Interviews
- **Interview Scheduling**: Schedule and manage job interviews
- **Calendar View**: Visual calendar interface for tracking important dates
- **Interview Management**: Track interview details, preparation notes, and outcomes

### 📈 Analytics & Insights
- **Application Trends**: Track application patterns over time
- **Response Time Analysis**: Monitor how long companies take to respond
- **Conversion Funnel**: Visualize your job search conversion rates
- **Salary Analysis**: Analyze salary ranges and negotiations
- **Company Performance**: Track which companies respond faster or offer better opportunities

### 👥 Contact Management
- **Contact Database**: Store recruiter and company contact information
- **Contact Statistics**: Track communication frequency and success rates
- **Contact Cards**: Detailed contact profiles with interaction history

### ⚙️ Settings & Customization
- **Profile Management**: Manage your professional profile and preferences
- **Application Preferences**: Customize application tracking options
- **Notification Settings**: Configure alerts and reminders

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts (for analytics visualizations)
- **Date Management**: Modern date handling libraries
- **State Management**: React Hooks + Custom Hooks
- **Code Quality**: ESLint + TypeScript configuration

## 📁 Project Structure

```
src/
├── components/
│   ├── Analytics/          # Charts and analytics components
│   ├── Applications/       # Job application management
│   ├── Calendar/          # Interview scheduling
│   ├── Contacts/          # Contact management
│   ├── Dashboard/         # Main dashboard components
│   ├── Layout/           # Header, sidebar, and layout
│   └── Settings/         # Configuration and preferences
├── hooks/
│   ├── useAnalytics.ts    # Analytics data management
│   ├── useApplications.ts # Application state management
│   └── useSettings.ts     # Settings management
├── types/
│   └── index.ts          # TypeScript type definitions
└── styles/
    └── index.css         # Global styles and Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jobtracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📖 Usage Guide

### Adding a New Job Application

1. Navigate to the Applications section
2. Click "Add New Application"
3. Fill in the job details:
   - Company name and position
   - Application date and deadline
   - Salary range and requirements
   - Priority level
   - Application source (job board, referral, etc.)
4. Save the application

### Tracking Application Progress

1. Use the status badges to update application stages:
   - Applied
   - Under Review
   - Interview Scheduled
   - Offer Received
   - Rejected
   - Withdrawn

2. Add notes and updates as the process progresses

### Scheduling Interviews

1. Go to the Calendar section
2. Click on a date to add a new interview
3. Fill in interview details:
   - Company and position
   - Interview type (phone, video, in-person)
   - Interviewer information
   - Preparation notes

### Viewing Analytics

1. Access the Analytics dashboard
2. Review various metrics:
   - Application trends over time
   - Response rates by company
   - Salary analysis
   - Conversion funnel performance

### Managing Contacts

1. Add recruiter and company contacts
2. Track communication history
3. Set follow-up reminders
4. Monitor contact engagement

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the theme by modifying:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and custom CSS

### Adding New Features

1. Create new components in the appropriate directory
2. Add custom hooks for state management
3. Update TypeScript types as needed
4. Integrate with existing layout components

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=JobTracker
```

### Database Integration

To integrate with a backend database:

1. Set up your preferred backend (Node.js, Python, etc.)
2. Configure API endpoints in the custom hooks
3. Add authentication if required
4. Update the data models in `src/types/index.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs
4. Provide your environment details (OS, Node version, etc.)

## 🙏 Acknowledgments

- Built with React and modern web technologies
- UI components inspired by modern design systems
- Charts powered by Recharts library
- Styling with Tailwind CSS

---

**Happy Job Hunting! 🎯**

Keep track of your applications, stay organized, and land your dream job with JobTracker!