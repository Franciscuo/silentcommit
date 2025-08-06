# Personal Developer Blog

A clean, minimalist blog platform designed to showcase technical expertise and thoughtful software development insights.

**Experience Qualities**:
1. **Professional** - Clean, distraction-free reading experience that lets content shine
2. **Credible** - Technical depth and attention to detail that signals expertise 
3. **Focused** - Purposeful design that prioritizes readability and content discovery

**Complexity Level**: Light Application (multiple features with basic state)
- Simple content management with persistent storage, readable layouts, and basic categorization

## Essential Features

**Blog Post Creation**
- Functionality: Create and edit blog posts with markdown support
- Purpose: Enable thoughtful technical writing with proper formatting
- Trigger: Click "New Post" button in dashboard
- Progression: Draft creation → Content writing → Preview → Publish → Archive view
- Success criteria: Posts save automatically, render markdown correctly, and display in feed

**Post Reading Experience** 
- Functionality: Clean, distraction-free post viewing with syntax highlighting
- Purpose: Showcase technical content in an easily digestible format
- Trigger: Click on post title from main feed
- Progression: Feed browse → Post selection → Full article view → Return to feed
- Success criteria: Fast loading, readable typography, and smooth navigation

**Content Organization**
- Functionality: Tag-based categorization and chronological post listing
- Purpose: Help visitors discover relevant content and see writing progression
- Trigger: Automatic on post creation, browseable via tag filters
- Progression: Post creation → Tag assignment → Filtered browsing → Content discovery
- Success criteria: Tags work as filters, posts sort chronologically, easy navigation

## Edge Case Handling
- **Empty States**: Welcoming placeholder content when no posts exist yet
- **Long Content**: Proper text wrapping and scrolling for lengthy technical posts
- **Code Blocks**: Syntax highlighting and copy functionality for code snippets
- **Mobile Reading**: Responsive typography that maintains readability on all devices

## Design Direction
The design should feel authoritative yet approachable - like a senior developer's personal space. Clean, minimal interface that gets out of the way of the content while subtly communicating technical sophistication through typography and spacing choices.

## Color Selection
Monochromatic with strategic accent - a sophisticated approach that emphasizes content over decoration.

- **Primary Color**: Deep charcoal `oklch(0.2 0 0)` - Professional foundation that doesn't compete with text
- **Secondary Colors**: Light grays `oklch(0.95 0 0)` for backgrounds, `oklch(0.7 0 0)` for subtle borders
- **Accent Color**: Electric blue `oklch(0.6 0.15 240)` - Trust and reliability for links and CTAs
- **Foreground/Background Pairings**: 
  - Background (Light Gray #F8F9FA): Dark text `oklch(0.15 0 0)` - Ratio 13.4:1 ✓
  - Primary (Deep Charcoal): White text `oklch(0.98 0 0)` - Ratio 12.8:1 ✓
  - Accent (Electric Blue): White text `oklch(0.98 0 0)` - Ratio 4.9:1 ✓

## Font Selection
Typography should convey technical precision and readability - choose a clean sans-serif that works well for both headings and body text, with a monospace font for code.

- **Typographic Hierarchy**:
  - H1 (Blog Title): Inter Bold/32px/tight letter spacing
  - H2 (Post Titles): Inter Semibold/24px/normal spacing  
  - H3 (Section Headers): Inter Medium/20px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Code: JetBrains Mono/14px/normal spacing
  - Metadata: Inter Regular/14px/muted color

## Animations
Subtle, purposeful micro-interactions that feel responsive without being distracting - hover states for buttons, smooth transitions between pages, and gentle loading states.

- **Purposeful Meaning**: Smooth page transitions communicate polish and attention to detail
- **Hierarchy of Movement**: Hover effects on interactive elements, gentle page transitions, typing indicators for new posts

## Component Selection
- **Components**: Cards for post previews, Dialog for post creation/editing, Tabs for draft/published states, Button variants for primary/secondary actions, Badge for tags
- **Customizations**: Custom markdown renderer component, code syntax highlighter, reading time calculator
- **States**: Buttons show hover/active states, post cards have subtle hover elevation, form inputs have clear focus states
- **Icon Selection**: Phosphor icons - Edit, Plus, Tag, Calendar, ArrowLeft for navigation
- **Spacing**: Consistent 4/8/16/32px spacing using Tailwind scale, generous whitespace around content
- **Mobile**: Single column layout, larger touch targets, collapsible navigation, optimized reading experience