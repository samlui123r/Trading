# TikTok Scraper

A powerful TikTok scraper built with Playwright that extracts video information from profiles and hashtags.

## Features

- ✅ Scrape TikTok profiles by username
- ✅ Scrape TikTok hashtags
- ✅ Extract video metadata (views, likes, comments, shares)
- ✅ Get video descriptions, author info, and music details
- ✅ Automatic scrolling to load more content
- ✅ Export results to JSON
- ✅ Stealth mode with realistic browser fingerprinting

## Installation

```bash
cd tiktok-scraper
npm install
```

**Note:** You'll need to install Playwright browsers:

```bash
npx playwright install chromium
```

If you encounter space issues, you can use the system's existing Chrome/Chromium:

```bash
npx playwright install-deps chromium
```

## Usage

### Command Line

```bash
# Scrape a user profile (scrapes 20 videos by default)
node tiktok-scraper.js profile charlidamelio

# Scrape a specific number of videos from a profile
node tiktok-scraper.js profile charlidamelio 10

# Scrape a hashtag
node tiktok-scraper.js hashtag fyp

# Scrape a custom URL
node tiktok-scraper.js url "https://www.tiktok.com/@username"
```

### As a Module

```javascript
const { scrapeProfile, scrapeHashtag, saveToJson } = require('./tiktok-scraper');

async function main() {
    // Scrape a profile
    const videos = await scrapeProfile('charlidamelio', 15);
    
    // Save to JSON
    saveToJson(videos, 'charli-videos.json');
    
    // Scrape a hashtag
    const hashtagVideos = await scrapeHashtag('dance', 30);
    saveToJson(hashtagVideos, 'dance-videos.json');
}

main();
```

## Output Format

The scraper returns an array of video objects with the following structure:

```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890",
  "description": "Video description text",
  "likes": 1500000,
  "comments": 25000,
  "shares": 50000,
  "views": 10000000,
  "author": "@username",
  "music": "Original Sound - Artist Name",
  "createdAt": "2024-01-15"
}
```

## Important Notes

⚠️ **Rate Limiting**: TikTok has strict anti-bot measures. The scraper includes delays between requests, but:
- Don't scrape too many videos in quick succession
- Consider adding longer delays for production use
- Use proxies if scraping at scale

⚠️ **Terms of Service**: Make sure you comply with TikTok's Terms of Service when using this scraper. This tool is for educational purposes only.

⚠️ **Dynamic Selectors**: TikTok frequently changes their HTML structure. If the scraper stops working, you may need to update the CSS selectors in the code.

## Troubleshooting

### "No space left on device" error

If you encounter disk space issues when installing Playwright browsers:

1. Clean up disk space:
```bash
df -h
```

2. Use headless mode without downloading browsers (if Chrome is already installed):
```bash
# Modify the launch options in the code to use existing Chrome
```

### Scrapers not finding videos

TikTok may be blocking automated access. Try:
- Running in non-headless mode for debugging
- Adding longer delays between actions
- Using residential proxies
- Updating user agent strings

## Advanced Configuration

You can customize the scraper by modifying these parameters in the code:

- `viewport`: Change browser window size
- `userAgent`: Use different browser signatures
- `maxScrollAttempts`: Control how many times to scroll
- `timeout`: Adjust page load timeouts

## License

MIT License - Use at your own risk and ensure compliance with TikTok's Terms of Service.
