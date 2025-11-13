/**
 * Theme Showcase Component
 * Demonstrates all design system elements including colors, typography, components, etc.
 * Useful for testing and previewing the theme
 */

export default function ThemeShowcase() {
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container-custom space-y-24">
                {/* Header */}
                <header className="text-center space-y-6">
                    <h1 className="text-gradient-primary">Theme Design System</h1>
                    <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                        A comprehensive, modern, and professional design system built with Tailwind CSS v4
                    </p>
                </header>

                {/* Color Palette */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Color Palette</h2>

                    {/* Primary Colors */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Primary - Blue to Cyan</h3>
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                                <div key={shade} className="space-y-2">
                                    <div
                                        className={`h-20 rounded-xl bg-primary-${shade} border border-border shadow-sm`}
                                    />
                                    <p className="text-xs text-center font-mono">{shade}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Colors */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Secondary - Purple Magenta</h3>
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                                <div key={shade} className="space-y-2">
                                    <div
                                        className={`h-20 rounded-xl bg-secondary-${shade} border border-border shadow-sm`}
                                    />
                                    <p className="text-xs text-center font-mono">{shade}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Accent Colors */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Accent - Rose Gold Coral</h3>
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                                <div key={shade} className="space-y-2">
                                    <div
                                        className={`h-20 rounded-xl bg-accent-${shade} border border-border shadow-sm`}
                                    />
                                    <p className="text-xs text-center font-mono">{shade}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Typography</h2>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Heading 1 - 5xl (48px)</p>
                            <h1>The quick brown fox jumps over the lazy dog</h1>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Heading 2 - 4xl (36px)</p>
                            <h2>The quick brown fox jumps over the lazy dog</h2>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Heading 3 - 3xl (30px)</p>
                            <h3>The quick brown fox jumps over the lazy dog</h3>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Heading 4 - 2xl (24px)</p>
                            <h4>The quick brown fox jumps over the lazy dog</h4>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Body Text - base (16px)</p>
                            <p>
                                The quick brown fox jumps over the lazy dog. This is body text that demonstrates
                                the default font family, size, and line height for readable paragraph content.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Small Text - sm (14px)</p>
                            <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
                        </div>
                    </div>
                </section>

                {/* Gradient Text */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Gradient Text</h2>
                    <div className="space-y-6">
                        <h2 className="text-gradient-primary">Primary Gradient Text</h2>
                        <h2 className="text-gradient-secondary">Secondary Gradient Text</h2>
                        <h2 className="text-gradient-accent">Accent Gradient Text</h2>
                    </div>
                </section>

                {/* Buttons */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Buttons</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="btn-primary">Primary Button</button>
                        <button className="btn-secondary">Secondary Button</button>
                        <button className="btn-accent">Accent Button</button>
                        <button className="btn-outline">Outline Button</button>
                        <button className="btn-ghost">Ghost Button</button>
                    </div>
                </section>

                {/* Badges */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Badges</h2>
                    <div className="flex flex-wrap gap-4">
                        <span className="badge badge-primary">Primary</span>
                        <span className="badge badge-secondary">Secondary</span>
                        <span className="badge badge-success">Success</span>
                        <span className="badge badge-warning">Warning</span>
                        <span className="badge badge-error">Error</span>
                    </div>
                </section>

                {/* Cards */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card-elevated p-6">
                            <h3 className="text-xl font-bold mb-3">Elevated Card</h3>
                            <p className="text-foreground/80">
                                Static card with elevation shadow. Perfect for content display.
                            </p>
                            <span className="badge badge-primary mt-4">New</span>
                        </div>

                        <div className="card-interactive p-6">
                            <h3 className="text-xl font-bold mb-3">Interactive Card</h3>
                            <p className="text-foreground/80">
                                Scales on hover. Great for clickable items like products or articles.
                            </p>
                            <span className="badge badge-secondary mt-4">Featured</span>
                        </div>

                        <div className="card-glow p-6">
                            <h3 className="text-xl font-bold mb-3">Glow Card</h3>
                            <p className="text-foreground/80">
                                Subtle glow effect on hover. Perfect for special highlights.
                            </p>
                            <span className="badge badge-accent mt-4">Premium</span>
                        </div>
                    </div>
                </section>

                {/* Glass Effect */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Glassmorphism</h2>
                    <div className="bg-gradient-primary p-12 rounded-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3">Glass Effect</h3>
                                <p className="text-foreground/80">
                                    Semi-transparent background with backdrop blur for modern aesthetics.
                                </p>
                            </div>
                            <div className="glass-heavy p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-3">Heavy Glass</h3>
                                <p className="text-foreground/80">
                                    More opaque with stronger blur for better content visibility.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Elements */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Form Elements</h2>
                    <div className="max-w-2xl space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                className="input-base"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                className="input-base"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Error State</label>
                            <input
                                type="text"
                                className="input-error"
                                placeholder="This field has an error"
                            />
                            <p className="text-error-600 dark:text-error-400 text-sm mt-2">
                                This field is required
                            </p>
                        </div>
                        <button className="btn-primary w-full">Submit Form</button>
                    </div>
                </section>

                {/* Background Gradients */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Background Gradients</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-primary p-12 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-3">Primary Gradient</h3>
                            <p>Blue to cyan gradient background</p>
                        </div>
                        <div className="bg-gradient-secondary p-12 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-3">Secondary Gradient</h3>
                            <p>Purple to coral gradient background</p>
                        </div>
                    </div>
                </section>

                {/* Shadows */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Shadow System</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <p className="text-center font-medium">Shadow SM</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-base border border-border">
                            <p className="text-center font-medium">Shadow Base</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-md border border-border">
                            <p className="text-center font-medium">Shadow MD</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                            <p className="text-center font-medium">Shadow LG</p>
                        </div>
                    </div>
                </section>

                {/* Animations */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Animations</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="card-elevated p-6 text-center animate-fade-in">
                            <p className="font-medium">Fade In</p>
                        </div>
                        <div className="card-elevated p-6 text-center animate-slide-up">
                            <p className="font-medium">Slide Up</p>
                        </div>
                        <div className="card-elevated p-6 text-center animate-slide-down">
                            <p className="font-medium">Slide Down</p>
                        </div>
                        <div className="card-elevated p-6 text-center animate-scale-in">
                            <p className="font-medium">Scale In</p>
                        </div>
                    </div>
                </section>

                {/* Semantic Colors */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-bold">Semantic Colors</h2>
                    <div className="space-y-4">
                        <div className="bg-success-100 dark:bg-success-950 border border-success-300 dark:border-success-700 p-4 rounded-xl">
                            <p className="text-success-700 dark:text-success-300 font-medium">
                                ✓ Success message - Action completed successfully
                            </p>
                        </div>
                        <div className="bg-warning-100 dark:bg-warning-950 border border-warning-300 dark:border-warning-700 p-4 rounded-xl">
                            <p className="text-warning-700 dark:text-warning-300 font-medium">
                                ⚠ Warning message - Please review this carefully
                            </p>
                        </div>
                        <div className="bg-error-100 dark:bg-error-950 border border-error-300 dark:border-error-700 p-4 rounded-xl">
                            <p className="text-error-700 dark:text-error-300 font-medium">
                                ✕ Error message - Something went wrong
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-12 border-t border-border">
                    <p className="text-muted-foreground">
                        Built with Tailwind CSS v4 • OKLCH Color Space • Modern Design System
                    </p>
                </footer>
            </div>
        </div>
    );
}
