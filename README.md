# No-Fap Streak Tracker 🔥

A beautiful, multi-user no-fap streak tracker with an animated flip clock design. Built with Next.js, deployed on Cloudflare, and powered by D1 database.

## ✨ Features

- **Beautiful Flip Clock**: Displays years, months, days, hours, minutes, and seconds
- **Multi-User Support**: Each user gets their own unique profile
- **Secure Reset System**: Users can only reset their own streak with a secret phrase
- **Profile Management**: Update display names
- **Responsive Design**: Works on all devices
- **Fast & Secure**: Deployed on Cloudflare with D1 database

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd no-fap-streak
npm install
```

### 2. Set up Cloudflare D1 Database

```bash
# Create a new D1 database
npx wrangler d1 create no-fap-db

# Update wrangler.jsonc with your database ID
# Copy the database_id from the output above
```

### 3. Generate and Run Migrations

```bash
npm run drizzle:generate
npm run drizzle:migrate
```

### 4. Development

```bash
npm run dev
```

### 5. Deploy to Cloudflare

```bash
npm run deploy
```

## 📱 How to Use

### For Users

1. **Visit the homepage** - Go to your deployed URL
2. **Create Account** - Click "Create New Account" and fill in:
   - Username (unique, 3-20 characters)
   - Display Name (what shows on your clock)
   - Secret Phrase (to reset your streak later)
3. **Share Your URL** - Your streak will be available at `yourdomain.com/username`
4. **Reset Streak** - Use your secret phrase if needed
5. **Update Profile** - Change your display name anytime

### For Visitors

- Anyone can view streaks by visiting `yourdomain.com/username`
- No account needed to view public streaks

## 🛠️ Project Structure

```
src/
├── app/
│   ├── [username]/          # Dynamic user pages
│   ├── create/             # Account creation
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles + flip clock CSS
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── FlipClock.tsx      # Animated flip clock
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

## 🎨 Customization

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

Set these in your Cloudflare dashboard:

```bash
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_DATABASE_TOKEN=your_api_token
```

## 📊 Database Schema

### Users Table

- `id` - Auto-incrementing primary key
- `username` - Unique username (3-20 chars)
- `name` - Display name (up to 50 chars)
- `streakStartDate` - When the current streak started
- `secret` - Hashed secret phrase for resets
- `createdAt` - Account creation timestamp
- `updatedAt` - Last modification timestamp

## 🚀 Deployment

The app is configured for Cloudflare deployment with:

- **OpenNext.js** for Cloudflare compatibility
- **D1 Database** for user data
- **Worker** for serverless functions
- **Assets** for static files

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

**Start your journey today! 💪**
