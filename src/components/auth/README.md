# Auth Page

A modern, Kaggle-inspired authentication page for the ProHero application.

## Features

- **Unified Authentication**: Single page for both login and register with tab switching
- **Multiple Sign-in Options**: 
  - Google OAuth
  - Email/Password
- **Beautiful Design**: 
  - Gradient backgrounds
  - Smooth animations
  - Responsive layout
  - Dark mode support
- **User-Friendly**:
  - Password visibility toggle
  - Input validation
  - Error handling
  - Loading states

## Components

### Auth Page (`/pages/Auth.tsx`)
Main authentication page container that handles tab switching between login and register modes.

### LoginForm (`/components/auth/LoginForm.tsx`)
Handles user login with:
- Google sign-in
- Email/password authentication
- Forgot password link
- Back button to return to social options

### RegisterForm (`/components/auth/RegisterForm.tsx`)
Handles user registration with:
- Google sign-in
- Email/password registration
- Full name collection
- Newsletter opt-in
- Password validation (minimum 7 characters)
- Privacy disclaimer

## Styles

All styles are centralized in `/components/auth/style.module.css`:

- **Modular CSS**: Scoped styles using CSS modules
- **Theme Variables**: Uses CSS custom properties from `index.css`
- **Responsive**: Mobile-first design with breakpoints
- **Animations**: Smooth fade-in and slide-down effects
- **Dark Mode**: Automatic theme switching support

## Usage

```tsx
import { Auth } from '@src/pages';

// Use in your routes
<Route path="/login" element={<Auth />} />
<Route path={AUTH} element={<Auth />} />
```

## Key Features

### Two-Step Authentication
1. **Social Options View**: Shows Google and Email buttons
2. **Email Form View**: Displays detailed email/password form with back button

### Form Validation
- Email format validation
- Password minimum length (7 characters)
- Required field indicators
- Real-time error messages

### Security Features
- Password visibility toggle
- Secure password input
- Firebase authentication integration
- Error handling for failed auth attempts

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus states
- Screen reader friendly

## Design Inspiration

The design is inspired by Kaggle's clean and modern authentication flow:
- Centered card layout with decorative gradient background
- Tab-based navigation between login/register
- Social authentication buttons with icons
- Clean form inputs with icons
- Smooth transitions and animations

## Theme Support

The page automatically adapts to light/dark mode using theme variables:
- `--color-background`
- `--color-foreground`
- `--color-surface`
- `--color-border`
- `--color-primary-*`
- `--color-accent-*`

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
