const playwright = require('playwright');

/**
 * TikTok Scraper using Playwright
 * 
 * This scraper extracts video information from TikTok profiles and hashtags.
 * Note: TikTok has strict anti-bot measures, so this scraper includes
 * evasion techniques and should be used responsibly.
 * 
 * @param {string} url - TikTok URL (profile or hashtag)
 * @param {number} maxVideos - Maximum number of videos to scrape
 * @returns {Promise<Array>} - Array of video data
 */
async function scrapeTikTok(url, maxVideos = 20) {
    let browser;
    
    try {
        // Launch browser with stealth options
        browser = await playwright.chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });

        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            locale: 'en-US',
            timezoneId: 'America/New_York'
        });

        const page = await context.newPage();

        // Add extra headers to appear more legitimate
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0'
        });

        console.log(`Navigating to: ${url}`);
        
        // Navigate to the URL
        await page.goto(url, {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        // Wait for initial content to load
        await page.waitForSelector('[data-e2e="posts-list"], [data-e2e="user-post-item"]', {
            timeout: 10000
        }).catch(() => {
            console.log('Initial posts not found immediately, continuing...');
        });

        // Scroll to load more videos
        const videos = new Set();
        let previousCount = 0;
        let scrollAttempts = 0;
        const maxScrollAttempts = 10;

        console.log('Scrolling to load videos...');

        while (videos.size < maxVideos && scrollAttempts < maxScrollAttempts) {
            // Scroll to bottom
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });

            // Wait for content to load
            await page.waitForTimeout(2000);

            // Extract video URLs
            const videoElements = await page.$$eval('[data-e2e="user-post-item"] a, [data-e2e="posts-list"] a', (elements) => {
                return elements
                    .map(el => el.href)
                    .filter(href => href && href.includes('/video/'));
            });

            videoElements.forEach(videoUrl => videos.add(videoUrl));

            console.log(`Found ${videos.size} unique videos after ${scrollAttempts + 1} scrolls`);

            // Check if we've loaded enough or if scrolling is no longer effective
            if (videos.size === previousCount && scrollAttempts > 2) {
                console.log('No new videos loaded, stopping scroll');
                break;
            }

            previousCount = videos.size;
            scrollAttempts++;
        }

        // Collect detailed video information
        const videoData = [];
        const videoUrls = Array.from(videos).slice(0, maxVideos);

        console.log(`Collecting details for ${videoUrls.length} videos...`);

        for (const videoUrl of videoUrls) {
            try {
                // Navigate to individual video page
                await page.goto(videoUrl, {
                    waitUntil: 'domcontentloaded',
                    timeout: 30000
                });

                // Wait for video info to load
                await page.waitForTimeout(1500);

                // Extract video information
                const videoInfo = await page.evaluate(() => {
                    const extractText = (selector) => {
                        const el = document.querySelector(selector);
                        return el ? el.textContent.trim() : null;
                    };

                    const extractCount = (selector) => {
                        const text = extractText(selector);
                        if (!text) return 0;
                        // Convert "1.5M" to 1500000, etc.
                        const match = text.match(/([\d.]+)([KMB])?/i);
                        if (!match) return parseInt(text.replace(/\D/g, '')) || 0;
                        
                        const value = parseFloat(match[1]);
                        const multiplier = match[2] ? match[2].toUpperCase() : '';
                        
                        switch (multiplier) {
                            case 'K': return Math.round(value * 1000);
                            case 'M': return Math.round(value * 1000000);
                            case 'B': return Math.round(value * 1000000000);
                            default: return Math.round(value);
                        }
                    };

                    return {
                        url: window.location.href,
                        description: extractText('[data-e2e="video-desc"]') || extractText('.tiktok-1o8a8kp-DivPostContainer') || '',
                        likes: extractCount('[data-e2e="like-count"]'),
                        comments: extractCount('[data-e2e="comment-count"]'),
                        shares: extractCount('[data-e2e="share-count"]'),
                        views: extractCount('[data-e2e="view-count"]'),
                        author: extractText('[data-e2e="video-author"]') || extractText('.tiktok-1rpgai6-DivPostAuthorLink') || '',
                        music: extractText('[data-e2e="music-name"]') || extractText('.tiktok-1jvqk9h-DivMusicTitle') || '',
                        createdAt: extractText('[data-e2e="video-date"]') || ''
                    };
                });

                videoData.push(videoInfo);
                console.log(`✓ Scraped: ${videoInfo.url.substring(0, 50)}...`);

            } catch (error) {
                console.error(`Error scraping video ${videoUrl}:`, error.message);
                // Add basic info even if detailed scraping fails
                videoData.push({
                    url: videoUrl,
                    description: '',
                    likes: 0,
                    comments: 0,
                    shares: 0,
                    views: 0,
                    author: '',
                    music: '',
                    createdAt: '',
                    error: error.message
                });
            }

            // Small delay between requests to avoid rate limiting
            await page.waitForTimeout(1000);
        }

        console.log(`\nSuccessfully scraped ${videoData.length} videos!`);
        return videoData;

    } catch (error) {
        console.error('Scraper error:', error.message);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

/**
 * Scrape TikTok profile by username
 * @param {string} username - TikTok username (without @)
 * @param {number} maxVideos - Maximum number of videos to scrape
 */
async function scrapeProfile(username, maxVideos = 20) {
    const url = `https://www.tiktok.com/@${username}`;
    console.log(`\n🎬 Scraping TikTok Profile: @${username}`);
    console.log('=' .repeat(50));
    return await scrapeTikTok(url, maxVideos);
}

/**
 * Scrape TikTok hashtag
 * @param {string} hashtag - Hashtag (with or without #)
 * @param {number} maxVideos - Maximum number of videos to scrape
 */
async function scrapeHashtag(hashtag, maxVideos = 20) {
    const cleanHashtag = hashtag.replace(/^#/, '');
    const url = `https://www.tiktok.com/tag/${cleanHashtag}`;
    console.log(`\n🏷️  Scraping TikTok Hashtag: #${cleanHashtag}`);
    console.log('=' .repeat(50));
    return await scrapeTikTok(url, maxVideos);
}

/**
 * Save results to JSON file
 * @param {Array} data - Video data array
 * @param {string} filename - Output filename
 */
function saveToJson(data, filename = 'tiktok-results.json') {
    const fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`\n💾 Results saved to ${filename}`);
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
🎬 TikTok Scraper

Usage:
  node tiktok-scraper.js profile <username> [maxVideos]
  node tiktok-scraper.js hashtag <hashtag> [maxVideos]
  node tiktok-scraper.js url <url> [maxVideos]

Examples:
  node tiktok-scraper.js profile charlidamelio 10
  node tiktok-scraper.js hashtag fyp 20
  node tiktok-scraper.js url "https://www.tiktok.com/@username" 15
        `);
        return;
    }

    const [type, target, maxVideosStr] = args;
    const maxVideos = parseInt(maxVideosStr) || 20;

    try {
        let results;

        switch (type.toLowerCase()) {
            case 'profile':
                results = await scrapeProfile(target, maxVideos);
                break;
            case 'hashtag':
                results = await scrapeHashtag(target, maxVideos);
                break;
            case 'url':
                console.log(`\n🔗 Scraping URL: ${target}`);
                console.log('=' .repeat(50));
                results = await scrapeTikTok(target, maxVideos);
                break;
            default:
                console.error('Invalid type. Use: profile, hashtag, or url');
                return;
        }

        // Display summary
        console.log('\n📊 Summary:');
        console.log('-' .repeat(50));
        results.forEach((video, index) => {
            console.log(`${index + 1}. ${video.description?.substring(0, 60) || 'No description'}...`);
            console.log(`   👁️ ${video.views.toLocaleString()} views | ❤️ ${video.likes.toLocaleString()} likes | 💬 ${video.comments.toLocaleString()} comments`);
            console.log(`   🎵 ${video.music || 'Unknown music'}`);
            console.log('');
        });

        // Save to JSON
        saveToJson(results);

    } catch (error) {
        console.error('\n❌ Fatal error:', error.message);
        process.exit(1);
    }
}

// Export functions for use as module
module.exports = {
    scrapeTikTok,
    scrapeProfile,
    scrapeHashtag,
    saveToJson
};

// Run if executed directly
if (require.main === module) {
    main();
}
