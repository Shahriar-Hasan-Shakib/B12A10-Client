import { useState } from 'react';
import { SunIcon, MoonIcon, PaletteIcon, MobileIcon, MagicIcon, SettingsIcon, BoltIcon, CheckIcon } from '@src/assets/icons';

/**
 * Minimal Theme Showcase
 * Demonstrates auto-switching dark mode and responsive HTML elements
 * Note: HTML elements use styles from index.css - no redundant class repetition
 */

export default function SimpleThemeDemo() {
    const [isDark, setIsDark] = useState(false);

    // Toggle dark mode
    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <div>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                {/* Header */}
                <header className="glass sticky top-0 z-50 border-b border-border">
                    <div className="container py-4">
                        <div className="flex-responsive items-center justify-between">
                            <div>
                                <h1 className="text-gradient">Design System</h1>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Minimal, Semantic, Auto-Switching Theme
                                </p>
                            </div>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="btn btn-outline flex items-center gap-2"
                                aria-label="Toggle theme"
                            >
                                {isDark ? (
                                    <>
                                        <SunIcon className="w-5 h-5" />
                                        <span>Light</span>
                                    </>
                                ) : (
                                    <>
                                        <MoonIcon className="w-5 h-5" />
                                        <span>Dark</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container section spacing-responsive">
                    {/* Typography Showcase */}
                    <section className="card spacing-responsive animate-fadeIn">
                        <h2>Responsive Typography</h2>
                        <p className="text-muted-foreground">
                            All headings automatically scale across breakpoints. No need to repeat classes!
                        </p>

                        <div className="spacing-responsive">
                            <div>
                                <h1>Heading 1</h1>
                                <code className="text-xs text-muted-foreground">
                                    Auto-scales: text-3xl → sm:text-4xl → md:text-5xl → lg:text-6xl
                                </code>
                            </div>

                            <div>
                                <h2>Heading 2</h2>
                                <code className="text-xs text-muted-foreground">
                                    Auto-scales: text-2xl → sm:text-3xl → md:text-4xl → lg:text-5xl
                                </code>
                            </div>

                            <div>
                                <h3>Heading 3</h3>
                                <code className="text-xs text-muted-foreground">
                                    Auto-scales: text-xl → sm:text-2xl → md:text-3xl → lg:text-4xl
                                </code>
                            </div>

                            <div>
                                <h4>Heading 4</h4>
                                <code className="text-xs text-muted-foreground">
                                    Auto-scales: text-lg → sm:text-xl → md:text-2xl
                                </code>
                            </div>

                            <div>
                                <h5>Heading 5</h5>
                                <code className="text-xs text-muted-foreground">
                                    Auto-scales: text-base → sm:text-lg → md:text-xl
                                </code>
                            </div>

                            <div>
                                <h6>Heading 6</h6>
                                <code className="text-xs text-muted-foreground">
                                    Auto-scales: text-sm → sm:text-base → md:text-lg
                                </code>
                            </div>
                        </div>

                        <div className="border-t border-border pt-6 mt-6">
                            <p>
                                This is a paragraph with <a href="#">an auto-styled link</a> that changes color
                                automatically in dark mode. The paragraph also has default responsive styling.
                            </p>
                            <p className="text-muted-foreground">
                                Secondary text uses the muted-foreground color for less emphasis.
                            </p>
                        </div>
                    </section>

                    {/* Color Showcase */}
                    <section className="card spacing-responsive animate-fadeIn">
                        <h2>Semantic Colors</h2>
                        <p className="text-muted-foreground">
                            Colors automatically switch between light and dark mode
                        </p>

                        <div className="grid-responsive">
                            <div className="card bg-primary-500 text-white p-6 text-center">
                                <h4>Primary</h4>
                                <p className="text-sm opacity-90">Main brand color</p>
                            </div>

                            <div className="card bg-secondary-500 text-white p-6 text-center">
                                <h4>Secondary</h4>
                                <p className="text-sm opacity-90">Accent color</p>
                            </div>

                            <div className="card bg-accent-500 text-white p-6 text-center">
                                <h4>Accent</h4>
                                <p className="text-sm opacity-90">Highlight color</p>
                            </div>
                        </div>

                        <div className="grid-responsive">
                            <div className="card border-2 border-success text-success p-4">
                                <h5>✓ Success</h5>
                                <p className="text-sm">Positive actions</p>
                            </div>

                            <div className="card border-2 border-warning text-warning p-4">
                                <h5>⚠ Warning</h5>
                                <p className="text-sm">Caution needed</p>
                            </div>

                            <div className="card border-2 border-danger text-danger p-4">
                                <h5>✕ Danger</h5>
                                <p className="text-sm">Critical alerts</p>
                            </div>
                        </div>
                    </section>

                    {/* Components Showcase */}
                    <section className="card spacing-responsive animate-fadeIn">
                        <h2>Responsive Components</h2>
                        <p className="text-muted-foreground">
                            All components scale automatically across breakpoints
                        </p>

                        {/* Buttons */}
                        <div>
                            <h3>Buttons</h3>
                            <div className="flex-responsive">
                                <button className="btn btn-primary">Primary Button</button>
                                <button className="btn btn-secondary">Secondary Button</button>
                                <button className="btn btn-outline">Outline Button</button>
                            </div>
                        </div>

                        {/* Badges */}
                        <div>
                            <h3>Badges</h3>
                            <div className="flex-responsive items-center">
                                <span className="badge badge-primary">Primary</span>
                                <span className="badge badge-success">Success</span>
                                <span className="badge badge-warning">Warning</span>
                                <span className="badge badge-danger">Danger</span>
                            </div>
                        </div>

                        {/* Cards */}
                        <div>
                            <h3>Cards</h3>
                            <div className="grid-responsive">
                                <div className="card">
                                    <h4>Basic Card</h4>
                                    <p className="text-muted-foreground">Simple card with border</p>
                                </div>

                                <div className="card-hover">
                                    <h4>Hover Card</h4>
                                    <p className="text-muted-foreground">Hover to see effect</p>
                                </div>

                                <div className="glass p-6 rounded-lg">
                                    <h4>Glass Card</h4>
                                    <p className="text-muted-foreground">Frosted glass effect</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Forms Showcase */}
                    <section className="card spacing-responsive animate-fadeIn">
                        <h2>Responsive Forms</h2>
                        <p className="text-muted-foreground">
                            Form elements automatically adapt to screen size and theme
                        </p>

                        <div className="max-w-2xl spacing-responsive">
                            <div>
                                <label className="block font-medium mb-2" htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Enter your name" />
                            </div>

                            <div>
                                <label className="block font-medium mb-2" htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="your@email.com" />
                            </div>

                            <div>
                                <label className="block font-medium mb-2" htmlFor="message">Message</label>
                                <textarea id="message" rows={4} placeholder="Your message here..."></textarea>
                            </div>

                            <div>
                                <label className="block font-medium mb-2" htmlFor="select">Select Option</label>
                                <select id="select">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                            </div>

                            <button className="btn btn-primary w-full">Submit Form</button>
                        </div>
                    </section>

                    {/* Grid Layouts */}
                    <section className="card spacing-responsive animate-fadeIn">
                        <h2>Responsive Grids</h2>
                        <p className="text-muted-foreground">
                            Pre-built responsive grid layouts
                        </p>

                        <div>
                            <h3>3-Column Grid</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                1 col on mobile → 2 cols on tablet → 3 cols on desktop
                            </p>
                            <div className="card bg-secondary-800 dark:bg-primary-900 p-6 text-center">
                                <h4>Item 100</h4>
                            </div>
                            <div className="grid-responsive">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="card bg-primary-800 dark:bg-secondary-800 p-6 text-center">
                                        <h4>Item {i}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3>4-Column Grid</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                1 col on mobile → 2 cols on tablet → 4 cols on desktop
                            </p>
                            <div className="grid-responsive-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="card bg-secondary-100 dark:bg-secondary-900 p-6 text-center">
                                        <h5>Item {i}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="spacing-responsive animate-fadeIn">
                        <div className="text-center mb-8">
                            <h2>Key Features</h2>
                            <p className="text-muted-foreground">
                                What makes this theme system special
                            </p>
                        </div>

                        <div className="grid-responsive">
                            <div className="card-hover text-center">
                                <PaletteIcon className="text-4xl mb-4 w-12 h-12 mx-auto" />
                                <h3>Auto Dark Mode</h3>
                                <p className="text-muted-foreground">
                                    Colors automatically switch when toggling dark mode
                                </p>
                            </div>

                            <div className="card-hover text-center">
                                <MobileIcon className="text-4xl mb-4 w-12 h-12 mx-auto" />
                                <h3>Fully Responsive</h3>
                                <p className="text-muted-foreground">
                                    All HTML elements adapt to screen size automatically
                                </p>
                            </div>

                            <div className="card-hover text-center">
                                <SettingsIcon className="text-4xl mb-4 w-12 h-12 mx-auto" />
                                <h3>Minimal Code</h3>
                                <p className="text-muted-foreground">
                                    No redundant classes - styles defined once in CSS
                                </p>
                            </div>

                            <div className="card-hover text-center">
                                <CheckIcon className="text-4xl mb-4 w-12 h-12 mx-auto" />
                                <h3>Semantic Names</h3>
                                <p className="text-muted-foreground">
                                    Easy-to-understand color variables and utilities
                                </p>
                            </div>

                            <div className="card-hover text-center">
                                <BoltIcon className="text-4xl mb-4 w-12 h-12 mx-auto" />
                                <h3>High Performance</h3>
                                <p className="text-muted-foreground">
                                    CSS-first approach with zero JavaScript overhead
                                </p>
                            </div>

                            <div className="card-hover text-center">
                                <MagicIcon className="text-4xl mb-4 w-12 h-12 mx-auto" />
                                <h3>Modern CSS</h3>
                                <p className="text-muted-foreground">
                                    OKLCH colors, cascade layers, custom variants
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="text-center pt-12 border-t border-border">
                        <h3 className="text-gradient mb-4">Built with Tailwind CSS v4</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A minimal, semantic theme system with auto-switching dark mode,
                            responsive HTML elements, and clean, readable code.
                        </p>
                        <div className="flex justify-center gap-3 mt-6 flex-wrap">
                            <span className="badge badge-primary">@theme</span>
                            <span className="badge badge-primary">@custom-variant</span>
                            <span className="badge badge-primary">@layer</span>
                            <span className="badge badge-primary">OKLCH</span>
                            <span className="badge badge-primary">Responsive</span>
                            <span className="badge badge-primary">Minimal</span>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
