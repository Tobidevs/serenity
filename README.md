# Serenity - Modern Bible Study Application

**Serenity** is a comprehensive, modern web application designed for Bible study, reading, and interactive learning. Built with Next.js 15, React 19, and powered by Supabase, Serenity provides users with an intuitive platform for spiritual growth and Bible engagement.

## 🌟 Features

### 📖 Bible Study Platform

- **Multi-Translation Support**: Access multiple Bible translations including KJV, ESV, NIV, NLT, NASB, CSB, and NKJV
- **Interactive Bible Reader**: Chapter-by-chapter navigation with easy book and chapter selection
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Beautiful Typography**: Uses Merriweather font for enhanced reading experience

### 🎯 Interactive Bible Quiz System

- **Topic-Based Quizzes**: Choose from various biblical themes (Faith, Love, Forgiveness, Grace, etc.)
- **Book Filtering**: Filter questions by Old Testament, New Testament, or specific books like Proverbs
- **Dynamic Question Generation**: Questions generated based on user preferences and topics of interest
- **Progress Tracking**: Track quiz performance and spiritual learning journey

### 👤 User Authentication & Personalization

- **Secure Authentication**: Email/password authentication powered by Supabase
- **Email Verification**: Secure account verification process
- **Personalized Onboarding**: Multi-step setup process to customize user experience
- **User Preferences**: Save preferred Bible translation and topics of interest

### 📊 Personalized Dashboard

- **User Profile Management**: Manage personal information and preferences
- **Study Plan Creation**: Create and manage custom Bible study plans
- **Progress Tracking**: Monitor reading progress and quiz performance
- **Quick Navigation**: Easy access to all app features

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Custom Color Schemes**: Each Bible translation has its own visual theme
- **Smooth Animations**: Enhanced user experience with AOS (Animate On Scroll) animations
- **Clean Interface**: Minimalist design focused on content and usability

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with modern hooks and features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI** - Beautiful UI components for Tailwind CSS

### State Management

- **Zustand** - Lightweight state management with persistence
- **Custom Stores**: Separate stores for Bible data, quiz system, user accounts, and sessions

### Backend & Database

- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Authentication** - Supabase Auth for secure user management
- **Real-time Features** - Real-time updates and synchronization

### UI Components

- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful & consistent icons
- **React Icons** - Popular icon libraries
- **Custom Components** - Built with shadcn/ui patterns

### External APIs

- **Bolls.life Bible API** - Fetching Bible text and verses in multiple translations
- **Bible Search API** - Advanced verse search and filtering capabilities

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **TypeScript** - Static type checking

## 📱 App Structure

```
serenity/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── bible-quiz/        # Quiz functionality
│   ├── bible-study/       # Bible reading interface
│   ├── dashboard/         # User dashboard
│   ├── help-serenity/     # Help and feedback
│   ├── my-stuff/          # User's saved content
│   ├── onboarding/        # User setup flow
│   ├── quiz-menu/         # Quiz configuration
│   └── study-plan/        # Study plan management
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── bible-drawer.tsx  # Bible navigation component
│   ├── navbar.tsx        # Main navigation
│   ├── quiz.tsx          # Quiz interface
│   └── ...               # Other components
├── data/                 # Static data and configurations
│   ├── bible-data.tsx    # Bible books and topics
│   └── translation-data.tsx # Bible translation configs
├── db/                   # Database configuration
│   └── supabase-client.ts # Supabase client setup
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # Zustand state stores
│   ├── useAccountStore.ts    # User account management
│   ├── useBibleQuizStore.ts  # Quiz state management
│   ├── useBibleStore.ts      # Bible reading state
│   └── useSessionStore.ts    # Authentication state
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tobidevs/serenity.git
   cd serenity
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_API_KEY=your_supabase_anon_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

The app requires a Supabase database with an `account` table. The table should include:

- `user_id` (UUID, references auth.users)
- `email` (text)
- `name` (text)
- `preferred_translation` (text)
- `topics_of_interest` (text array)
- `study_plan` (text)
- `books` (text array)
- `onboarding_complete` (boolean)

## 📚 Key Features Explained

### Bible Study Interface

- Navigate through 66 books of the Bible
- Switch between multiple translations instantly
- Clean, readable typography optimized for long reading sessions
- Chapter navigation with previous/next controls

### Quiz System

- Dynamic question generation based on user interests
- Multiple choice questions with instant feedback
- Topic filtering (Faith, Love, Prayer, etc.)
- Book filtering (Old Testament, New Testament, specific books)
- Visual feedback with custom styling per translation

### User Onboarding

- Multi-step personalization process
- Name and preferred translation selection
- Topics of interest selection
- Custom study plan creation
- Book selection for personalized content

### State Management

- Persistent state across browser sessions
- Separate stores for different app domains
- Optimistic updates for better UX
- Real-time synchronization with backend

## 🎨 Design System

### Color Scheme

- **Primary Colors**: Custom grey palette for clean, readable interface
- **Translation Themes**: Each Bible translation has unique color scheme
- **Accessibility**: High contrast ratios for optimal readability

### Typography

- **Primary Font**: Heebo for UI elements
- **Reading Font**: Merriweather for Bible text
- **Responsive Typography**: Scales appropriately across devices

### Components

- **Consistent Design Language**: Based on shadcn/ui patterns
- **Accessible Components**: Built with Radix UI primitives
- **Mobile-First**: Responsive design approach

## 🔧 Configuration

### Bible Translations

Supported translations with custom themes:

- King James Version (KJV)
- New King James Version (NKJV)
- English Standard Version (ESV)
- New International Version (NIV)
- New American Standard Bible (NASB)
- New Living Translation (NLT)
- Christian Standard Bible (CSB)

### Customization

- **Themes**: Modify translation themes in `data/translation-data.tsx`
- **Topics**: Update Bible topics in `data/bible-data.tsx`
- **Styling**: Customize colors and components in `app/globals.css`

## 📖 API Integration

### Bolls.life Bible API

- **Get Books**: Fetch available books for each translation
- **Get Text**: Retrieve chapter text with verse numbers
- **Search Verses**: Find verses based on topics and keywords
- **Multiple Translations**: Support for various Bible versions

### Endpoints Used

- `GET /get-books/{translation}/` - Fetch available books
- `GET /get-text/{translation}/{book}/{chapter}/` - Get chapter text
- `GET /v2/find/{translation}?search={topic}&book={filter}` - Search verses

## 🤝 Contributing

We welcome contributions to Serenity! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Areas for Contribution

- **New Features**: Study plans, reading streaks, community features
- **UI/UX Improvements**: Enhanced mobile experience, accessibility
- **Performance**: Optimization and caching strategies
- **Testing**: Unit tests, integration tests, E2E tests
- **Documentation**: Improved documentation and tutorials

## 📋 Roadmap

### Upcoming Features

- **Study Plans**: Guided reading plans and devotionals
- **Community Features**: Share insights and favorite verses
- **Advanced Search**: Cross-reference search and commentary integration
- **Offline Support**: Download content for offline reading
- **Multi-language Support**: Interface translations
- **Reading Statistics**: Detailed analytics and progress tracking
- **Audio Bible**: Integration with audio Bible readings
- **Note-taking**: Personal notes and highlights system

### Technical Improvements

- **Performance Optimization**: Lazy loading and caching
- **PWA Support**: Progressive Web App capabilities
- **Enhanced Testing**: Comprehensive test coverage
- **CI/CD Pipeline**: Automated testing and deployment

## 👨‍💻 Author

**Tobi Akere**

- GitHub: [@Tobidevs](https://github.com/Tobidevs)
- LinkedIn: [Tobi Akere](https://linkedin.com/in/tobiakere)
- Email: tobiakere50@gmail.com

## 🙏 Acknowledgments

- **Bolls.life** for providing the comprehensive Bible API
- **Supabase** for the excellent backend infrastructure
- **Vercel** for hosting and deployment platform
- **shadcn/ui** for the beautiful component library
- **The open-source community** for the amazing tools and libraries

## 📞 Support

If you encounter any issues or have questions:

- Create an issue on [GitHub](https://github.com/Tobidevs/serenity/issues)
- Visit the [Help section](https://yourapp.com/help-serenity) in the app
- Email: tobiakere50@gmail.com

---

**Serenity** - Bringing peace and clarity to your Bible study journey. 🕊️
