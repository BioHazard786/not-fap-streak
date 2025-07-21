# No-Fap Streak Tracker 🔥

A beautiful, multi-user no-fap streak tracker with an animated flip clock design. Built with Next.js, deployed on Cloudflare, and powered by D1 database.

🌐 **Live Demo**: [https://no-fap-streak.biohazard786.workers.dev/](https://no-fap-streak.biohazard786.workers.dev/)

## ✨ Features

- **Beautiful Flip Clock**: Displays years, months, days, hours, minutes, and seconds
- **Multi-User Support**: Each user gets their own unique profile
- **Secure Reset System**: Users can only reset their own streak with a secret phrase
- **Profile Management**: Update display names
- **Responsive Design**: Works on all devices
- **Public Accountability**: Share your streak URL with friends and family
- **Leaderboard**: See top performers in the community
- **Precise Timing**: Track down to seconds with custom reset dates/times
- **Clean Interface**: Distraction-free design focused on your goals

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd no-fap-streak
npm install
```

### 2. Set up Environment Variables

Create a `.env.local` file in your project root for local development:

```bash
# Required for Drizzle migrations and local development
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id  
CLOUDFLARE_API_TOKEN=your_api_token
```

> **Note**: These environment variables are only needed for local development and running Drizzle migrations. The deployed app uses Cloudflare's built-in bindings.

### 3. Set up Cloudflare D1 Database

```bash
# Create a new D1 database
npx wrangler d1 create no-fap-db

# Update wrangler.jsonc with your database ID
# Copy the database_id from the output above
```

### 4. Generate and Run Migrations

```bash
npm run drizzle:generate
npm run drizzle:migrate
```

### 5. Development

```bash
npm run dev
```

### 6. Deploy to Cloudflare

```bash
npm run deploy
```

## 📱 How to Use

### For Users

1. **Visit the live app** - Go to [https://no-fap-streak.biohazard786.workers.dev/](https://no-fap-streak.biohazard786.workers.dev/)
2. **Create Account** - Click "Create New Account" and fill in:
   - Username (unique, 3-20 characters)
   - Display Name (what shows on your clock)
   - Secret Phrase (to reset your streak later)
3. **Share Your URL** - Your streak will be available at `no-fap-streak.biohazard786.workers.dev/username`
4. **Reset Streak** - Use your secret phrase if needed
5. **Update Profile** - Change your display name anytime

### For Visitors

- Anyone can view streaks by visiting `no-fap-streak.biohazard786.workers.dev/username`
- No account needed to view public streaks

## 🛠️ Project Structure

```typescript
src/
├── app/
│   ├── [username]/          # Dynamic user pages
│   ├── create/             # Account creation
│   ├── leaderboard/        # Community leaderboard
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles + flip clock CSS
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── DatePicker.tsx     # Custom date/time picker
│   ├── FlipClock.tsx      # Animated flip clock
│   ├── UsernameInput.tsx  # Username validation input
│   └── UserControls.tsx   # Reset/update forms
├── lib/
│   ├── db.ts             # Database connection
│   ├── streak-utils.ts   # Utility functions
│   └── utils.ts          # General utilities
├── server/
│   └── actions.ts        # Server actions
└── schemas/
    └── drizzle.ts        # Database schema
```

## � Features in Detail

### 🕐 Animated Flip Clock

- **Real-time updates** every second
- **Multiple time units**: Years, months, days, hours, minutes, seconds
- **Smooth animations** with CSS transitions
- **Responsive design** that works on all screen sizes

### 👥 Multi-User Support

- **Unique usernames** (3-20 characters, lowercase)
- **Custom display names** (up to 50 characters)
- **Public profile pages** for accountability
- **Individual streak tracking**

### 🔒 Security Features

- **Secret phrase protection** for streak resets
- **Hashed secrets** stored securely
- **Username validation** to prevent conflicts
- **Input sanitization** on all forms

### 📊 Community Features

- **Leaderboard** showing top streaks
- **Public accountability** through shareable URLs
- **Visitor-friendly** interface (no account needed to view)

## �🎨 Customization

### Flip Clock Styling

Edit `src/components/FlipClock.css` to customize:

- Colors and gradients
- Font sizes
- Animation timing
- Responsive breakpoints

### Database Schema

Modify `schemas/drizzle.ts` to add:

- Additional user fields
- Streak categories
- Achievement tracking

## 🔧 Environment Variables

For **local development only**, create a `.env.local` file:

```bash
# Required for Drizzle migrations and local development
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_API_TOKEN=your_api_token
```

> **Important**: These are only needed locally. The deployed app uses Cloudflare's built-in database bindings automatically.

## 📊 Database Schema

### Users Table

- `id` - Auto-incrementing primary key
- `username` - Unique username (3-20 chars)
- `name` - Display name (up to 50 chars)
- `streakStartDate` - When the current streak started
- `secret` - Hashed secret phrase for resets
- `createdAt` - Account creation timestamp
- `updatedAt` - Last modification timestamp

## � Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **Deployment**: Cloudflare Workers
- **Authentication**: Custom secret phrase system

## �🚀 Deployment

The app is optimized for Cloudflare deployment with:

- **OpenNext.js** for Cloudflare Workers compatibility
- **D1 Database** for fast, global data storage
- **Edge Runtime** for low-latency responses worldwide
- **Static Assets** served from Cloudflare CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- Original flip clock design inspiration
- shadcn/ui for beautiful components
- Cloudflare for hosting and database
- Next.js team for the amazing framework

---

## 🎯 Start Your Journey Today

Ready to track your progress and stay accountable? Visit the live app and begin your streak tracking journey!
