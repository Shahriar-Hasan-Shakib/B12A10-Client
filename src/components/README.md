# Components Documentation

## Overview

This directory contains all the UI components for the **AI Model Inventory Manager** application. All components are designed using the `Layout` component pattern and follow the data-driven rendering approach as documented in `/docs`.

## Folder Structure

```
src/components/
├── home/           # Home page sections
├── models/         # Model management components
├── layout/         # Layout components (Header, Footer, Slider)
├── auth/           # Authentication components
├── features/       # Feature components (PrivateRoute, ModelForm, etc.)
└── ui/             # Reusable UI components
```

---

## Home Page Sections (`/home`)

### Hero.tsx

**Purpose:** Main hero banner for the homepage

**Features:**

- Large title with gradient background
- Descriptive subtitle
- Two CTA buttons: "Get Started Free" and "Explore Models"
- Responsive design with animations

**Usage:**

```tsx
import { Hero } from "@/components/home";
<Hero />;
```

**Data Structure:** Uses `Layout` component with gradient background, centered content, and button array for CTAs.

---

### FeaturedModels.tsx

**Purpose:** Display 6 most recently added AI models from the database

**Features:**

- Fetches models from `/models/recent?limit=6` API endpoint
- Loading skeleton while fetching
- Model cards with image, name, framework, use case, description, and purchase count
- Links to individual model detail pages
- Empty state when no models available

**Usage:**

```tsx
import { FeaturedModels } from "@/components/home";
<FeaturedModels />;
```

**API Integration:**

- `GET ${VITE_API_URL}/models/recent?limit=6`
- Returns array of AI Model objects

**Data Structure:** Dynamic data mapping with Layout component, grid layout for model cards.

---

### AboutAIModels.tsx

**Purpose:** Static section explaining AI models and their importance

**Features:**

- Introduction to AI models
- 4 information cards:
  - Neural Networks (🧠)
  - Natural Language Processing (💬)
  - Computer Vision (👁️)
  - Recommendation Systems (🎯)
- "Why AI Models Matter" section with key points

**Usage:**

```tsx
import { AboutAIModels } from "@/components/home";
<AboutAIModels />;
```

**Data Structure:** Static content with nested objects for cards, uses gradient backgrounds and hover effects.

---

### GetStarted.tsx

**Purpose:** Call-to-action section encouraging user registration

**Features:**

- Badge with "Start Your Journey" label
- Title and description
- 4 feature highlights in grid:
  - 📦 Add unlimited AI models
  - 🔍 Search and filter models
  - 🤝 Share with the community
  - 📊 Track model popularity
- Two CTA buttons: "Create Free Account" and "Sign In"

**Usage:**

```tsx
import { GetStarted } from "@/components/home";
<GetStarted />;
```

**Data Structure:** Gradient background with backdrop blur effects, centered content with feature grid.

---

## Model Management Components (`/models`)

### ModelsList.tsx

**Purpose:** Display all AI models with search and filter functionality

**Features:**

- Fetches all models from API
- Search by model name (case-insensitive)
- Filter by framework (dropdown select)
- Shows count of filtered results
- Loading skeleton during fetch
- Empty state with "Clear Filters" button
- Grid layout of model cards
- Each card links to model detail page

**Usage:**

```tsx
import { ModelsList } from "@/components/models";
<ModelsList />;
```

**State Management:**

- `models`: All models from database
- `filteredModels`: Models after search/filter applied
- `searchTerm`: Current search query
- `selectedFramework`: Selected framework filter
- `frameworks`: Array of unique frameworks extracted from models

**API Integration:**

- `GET ${VITE_API_URL}/models`
- Returns array of all AI models

**Search Logic:**

```typescript
// MongoDB $regex for case-insensitive search
db.models.find({ name: { $regex: searchTerm, $options: "i" } });
```

---

### SearchBar.tsx

**Purpose:** Reusable search input component

**Props:**

```typescript
{
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
```

**Features:**

- Input field with search icon
- Placeholder: "Search models by name..."
- Focus styles with purple ring
- Accessible with label (sr-only)

**Usage:**

```tsx
<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
```

---

### FilterBar.tsx

**Purpose:** Reusable filter dropdown for frameworks

**Props:**

```typescript
{
  selectedFramework: string;
  onFrameworkChange: (framework: string) => void;
  frameworks: string[];
}
```

**Features:**

- Select dropdown with label
- "All Frameworks" default option
- Dynamically populated from frameworks array
- Focus styles with purple ring

**Usage:**

```tsx
<FilterBar
  selectedFramework={selectedFramework}
  onFrameworkChange={setSelectedFramework}
  frameworks={frameworks}
/>
```

---

### ModelInfo.tsx

**Purpose:** Display detailed information about a single AI model

**Props:**

```typescript
{
  model: {
    name: string;
    framework: string;
    useCase: string;
    dataset: string;
    description: string;
    image: string;
    purchased: number;
    createdBy: string;
    createdAt: string;
  }
}
```

**Features:**

- Large model image
- Title with framework, use case, and purchase count badges
- Description section
- Training dataset information
- Metadata (created by, date added)
- Responsive layout

**Usage:**

```tsx
<ModelInfo model={modelData} />
```

**Data Structure:** Uses Layout component with nested sections for header, details, and metadata.

---

### ModelActions.tsx

**Purpose:** Action buttons for model (edit, delete, purchase)

**Props:**

```typescript
{
  modelId: string;
  isOwner: boolean;
  onDelete: () => void;
  onPurchase: () => void;
  onEdit: () => void;
}
```

**Features:**

- **For Owners:**
  - Edit button (blue) with edit icon
  - Delete button (red) with trash icon
  - Delete confirmation modal
- **For Non-Owners:**
  - Purchase button (gradient purple-pink) with shopping icon
- Responsive button layout

**Usage:**

```tsx
<ModelActions
  modelId={model._id}
  isOwner={user.email === model.createdBy}
  onDelete={handleDelete}
  onPurchase={handlePurchase}
  onEdit={() => navigate(`/update-model/${model._id}`)}
/>
```

**Delete Confirmation Modal:**

- Fixed overlay with backdrop
- Confirmation message
- "Yes, Delete" and "Cancel" buttons

---

## Layout Components (`/layout`)

### Header.tsx

**Purpose:** Main navigation header

**Props:**

```typescript
{
  user?: {
    photoURL: string;
    displayName: string;
    email: string;
  }
}
```

**Features:**

- Logo: "🤖 AI Model Inventory"
- Navigation links:
  - Home
  - Add Model
  - All Models
- **When logged out:**
  - Login button
- **When logged in:**
  - Profile image with dropdown
  - Dropdown shows:
    - Display name and email
    - Link to "Model Purchase" page
    - Link to "My Models" page
    - Logout button
- Mobile responsive with hamburger menu

**Usage:**

```tsx
<Header user={currentUser} />
```

---

### Footer.tsx

**Purpose:** Site footer with links and information

**Features:**

- Logo and tagline
- Social media icons (GitHub, Twitter/X, LinkedIn)
- Four link columns:
  - Quick Links (Home, All Models, Add Model, My Models, My Purchases)
  - Resources (Documentation, API, Tutorials, Blog, Support)
  - Legal (Privacy, Terms, Cookies, Licenses)
- Bottom section with copyright and badges
- Gradient background with hover effects

**Usage:**

```tsx
<Footer />
```

**Data Structure:** Uses Layout component with nested content structure, gradient backgrounds, and responsive grid.

---

### Slider.tsx

**Purpose:** Hero slider with 3 slides

**Features:**

- 3 slides with images and content:
  1. "Discover AI Models" → /models
  2. "Share Your Work" → /add-model
  3. "Track Performance" → /my-models
- Auto-play (5 seconds per slide)
- Previous/Next navigation buttons
- Indicator dots at bottom
- Gradient overlay on images
- Responsive design

**Usage:**

```tsx
<Slider />
```

**Slides Configuration:**

```typescript
const slides = [
  {
    title: string,
    description: string,
    image: string,
    cta: string,
    link: string,
  },
];
```

**Controls:**

- Previous button (left arrow)
- Next button (right arrow)
- Indicator dots (clickable)

---

## Design Patterns Used

### 1. Layout Component Pattern

All sections use the `Layout` component from `/src/shared/components/ui/Layout.tsx`:

- **Data object** defines structure
- **Style object** defines appearance
- Automatic type detection and rendering
- No repetitive JSX

### 2. Responsive Design

- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Grid layouts collapse to single column on mobile
- Hamburger menu for mobile navigation

### 3. Loading States

- Skeleton screens during data fetching
- Pulse animation for loading placeholders
- Prevents layout shift

### 4. Error Handling

- Empty states with helpful messages
- Clear filter buttons
- Fallback images

### 5. Accessibility

- Semantic HTML tags (header, nav, main, section)
- ARIA labels for icon buttons
- Screen reader text (sr-only)
- Keyboard navigation support

---

## API Integration

### Environment Variable

All API calls use: `${import.meta.env.VITE_API_URL}`

### Endpoints Used

| Endpoint                 | Method | Purpose               | Component      |
| ------------------------ | ------ | --------------------- | -------------- |
| `/models`                | GET    | Fetch all models      | ModelsList     |
| `/models/recent?limit=6` | GET    | Fetch 6 recent models | FeaturedModels |
| `/models/:id`            | GET    | Fetch single model    | ModelInfo      |
| `/models/:id`            | PUT    | Update model          | ModelForm      |
| `/models/:id`            | DELETE | Delete model          | ModelActions   |
| `/models/:id/purchase`   | POST   | Purchase model        | ModelActions   |

---

## Styling Approach

### Tailwind CSS

All components use Tailwind utility classes:

- Color palette: Purple/Pink gradients for primary actions
- Spacing: Consistent padding/margin scale
- Shadows: `shadow-lg`, `shadow-xl`, `shadow-2xl`
- Transitions: `transition-all duration-300`
- Hover effects: `hover:scale-105`, `hover:shadow-2xl`

### Module CSS

Header uses module CSS (`style.module.css`) for scoped styles.

### Common Patterns

- **Cards:** `bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all`
- **Buttons:** `px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all`
- **Gradients:** `bg-gradient-to-r from-purple-600 to-pink-600`
- **Backdrop effects:** `backdrop-blur-sm bg-white/20`

---

## Component Relationships

```
App
├── Header (user prop)
├── Slider (on home)
├── Home Page
│   ├── Hero
│   ├── FeaturedModels
│   ├── AboutAIModels
│   └── GetStarted
├── Models Page
│   └── ModelsList
│       ├── SearchBar
│       └── FilterBar
├── Model Details Page
│   ├── ModelInfo
│   └── ModelActions
└── Footer
```

---

## Future Enhancements

1. **Add Model Form Component** - For creating/editing models
2. **My Models Page** - Display user's created models
3. **My Purchases Page** - Display purchased models
4. **Auth Components** - Enhanced login/register forms
5. **Dark Mode Toggle** - Theme switching functionality
6. **Model Rating System** - Star ratings for models
7. **Comments Section** - User feedback on models
8. **Analytics Dashboard** - Charts for model performance

---

## Best Practices

1. **Always use Layout component** for consistent styling
2. **Extract reusable components** (SearchBar, FilterBar)
3. **Implement loading states** for better UX
4. **Handle empty states** gracefully
5. **Use TypeScript interfaces** for props
6. **Follow naming conventions** (PascalCase for components)
7. **Keep components focused** (single responsibility)
8. **Document complex logic** with comments

---

## Resources

- **Layout Component Docs:** `/docs/Layout.md`
- **useTabs Hook Docs:** `/docs/useTabs.md`
- **Project Requirements:** `/docs/B12-A10_category-0014.docx.md`
- **Example Sections:** `/src/shared/sections/`

---

**Last Updated:** November 13, 2025
**Maintained by:** Development Team
