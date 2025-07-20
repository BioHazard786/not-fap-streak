#!/bin/bash

# No-Fap Streak Tracker Setup Script

echo "🚀 Setting up No-Fap Streak Tracker..."

# Generate Drizzle migrations
echo "📝 Generating database migrations..."
npm run drizzle:generate

# Run migrations
echo "🗄️ Running database migrations..."
npm run drizzle:migrate

echo "✅ Setup complete!"
echo ""
echo "🌟 Your No-Fap Streak Tracker is ready!"
echo ""
echo "To run the development server:"
echo "  npm run dev"
echo ""
echo "To deploy to Cloudflare:"
echo "  npm run deploy"
echo ""
echo "Don't forget to:"
echo "1. Set up your Cloudflare D1 database"
echo "2. Configure your environment variables"
echo "3. Update wrangler.jsonc with your database ID"
