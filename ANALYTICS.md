# Google Analytics Setup

This blog is configured with Google Analytics 4 (GA4) for tracking site performance and user engagement.

## Setup Instructions

1. **Create a Google Analytics 4 Property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property for your website
   - Copy your Measurement ID (format: G-XXXXXXXXXX)

2. **Update the Measurement ID:**
   - Open `index.html`
   - Replace `GA_MEASUREMENT_ID` with your actual measurement ID in both places:
     ```html
     <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script>
     ```
     ```javascript
     gtag('config', 'YOUR_MEASUREMENT_ID');
     ```
   - Also update it in `src/hooks/useAnalytics.ts`:
     ```javascript
     window.gtag('config', 'YOUR_MEASUREMENT_ID', {
     ```

## What's Being Tracked

### Page Views
- Landing page visits
- Blog post list views
- Individual post views

### User Interactions
- **Post Engagement:**
  - Post views (with post ID and title)
  - Post edits
  - New post creation

- **Navigation:**
  - Tag filtering
  - Social media link clicks (LinkedIn, GitHub)

- **Content Discovery:**
  - Which posts are most popular
  - Which tags are most used
  - Reading patterns and user flow

### Events Structure

All events follow this structure:
- **Action:** What the user did (view_post, edit_post, etc.)
- **Category:** Type of interaction (engagement, content, social, navigation)
- **Label:** Additional context (post title, tag name, platform)
- **Value:** Numeric value when applicable

## Privacy Considerations

- No personal information is tracked
- Only anonymous usage patterns and interactions
- Complies with standard web analytics practices
- Users can disable analytics through browser settings

## Viewing Analytics Data

1. Log into your Google Analytics dashboard
2. Go to **Reports > Engagement > Events** to see custom events
3. Use **Reports > Engagement > Pages and screens** for page view data
4. Set up custom reports and goals based on your blog's objectives

## Removing Analytics

To remove analytics tracking:
1. Delete the Google Analytics script tags from `index.html`
2. Remove analytics imports and calls from components
3. Delete `src/hooks/useAnalytics.ts`