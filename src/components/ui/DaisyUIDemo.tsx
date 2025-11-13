import { useState } from 'react';
import { Button, Input, Card, Modal, Dropdown, Spinner, ThemeToggle } from '@src/components/ui';

/**
 * DaisyUI Integration Demo
 * Showcases all updated components with dark mode support
 */
export const DaisyUIDemo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadingDemo = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-base-content">DaisyUI + Tailwind v4</h1>
                        <p className="text-base-content/70 mt-2">Complete dark mode integration demo</p>
                    </div>
                    <ThemeToggle showLabel />
                </div>

                {/* Buttons Section */}
                <Card title="Buttons" variant="bordered">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="accent">Accent</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="danger">Danger</Button>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                            <Button size="sm" variant="primary">Small</Button>
                            <Button size="md" variant="primary">Medium</Button>
                            <Button size="lg" variant="primary">Large</Button>
                        </div>

                        <Button
                            variant="primary"
                            isLoading={isLoading}
                            onClick={handleLoadingDemo}
                        >
                            {isLoading ? '' : 'Click to Load'}
                        </Button>
                    </div>
                </Card>

                {/* Forms Section */}
                <Card title="Form Inputs" variant="bordered">
                    <div className="space-y-4 max-w-md">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            variant="bordered"
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            variant="bordered"
                            helperText="Must be at least 8 characters"
                        />

                        <Input
                            label="Error Example"
                            type="text"
                            variant="bordered"
                            error="This field is required"
                        />

                        <div className="flex gap-2">
                            <Input inputSize="sm" placeholder="Small" variant="bordered" />
                            <Input inputSize="md" placeholder="Medium" variant="bordered" />
                            <Input inputSize="lg" placeholder="Large" variant="bordered" />
                        </div>
                    </div>
                </Card>

                {/* Cards Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-base-content mb-4">Card Variants</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card
                            title="Normal Card"
                            variant="normal"
                            actions={<Button variant="primary" size="sm">Action</Button>}
                        >
                            <p className="text-base-content/70">
                                This is a normal card with default styling.
                            </p>
                        </Card>

                        <Card
                            title="Bordered Card"
                            variant="bordered"
                            hoverable
                        >
                            <p className="text-base-content/70">
                                Hover over this card to see the effect!
                            </p>
                        </Card>

                        <Card
                            title="Compact Card"
                            variant="compact"
                            actions={
                                <>
                                    <Button variant="ghost" size="sm">Cancel</Button>
                                    <Button variant="primary" size="sm">Save</Button>
                                </>
                            }
                        >
                            <p className="text-base-content/70">
                                A more compact card layout.
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Modal & Dropdown Section */}
                <Card title="Interactive Components" variant="bordered">
                    <div className="flex flex-wrap gap-4">
                        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                            Open Modal
                        </Button>

                        <Dropdown
                            trigger={<Button variant="outline">Dropdown Menu</Button>}
                            items={[
                                { label: 'Profile', onClick: () => alert('Profile clicked') },
                                { label: 'Settings', onClick: () => alert('Settings clicked') },
                                { label: 'Help', onClick: () => alert('Help clicked') },
                                { label: 'Logout', onClick: () => alert('Logout clicked') }
                            ]}
                            position="bottom"
                            align="end"
                        />
                    </div>
                </Card>

                {/* Spinners Section */}
                <Card title="Loading Spinners" variant="bordered">
                    <div className="flex flex-wrap gap-8 items-center">
                        <div className="text-center">
                            <Spinner type="spinner" size="lg" color="primary" />
                            <p className="text-sm mt-2 text-base-content/70">Spinner</p>
                        </div>
                        <div className="text-center">
                            <Spinner type="dots" size="lg" color="secondary" />
                            <p className="text-sm mt-2 text-base-content/70">Dots</p>
                        </div>
                        <div className="text-center">
                            <Spinner type="ring" size="lg" color="accent" />
                            <p className="text-sm mt-2 text-base-content/70">Ring</p>
                        </div>
                        <div className="text-center">
                            <Spinner type="ball" size="lg" color="info" />
                            <p className="text-sm mt-2 text-base-content/70">Ball</p>
                        </div>
                        <div className="text-center">
                            <Spinner type="bars" size="lg" color="success" />
                            <p className="text-sm mt-2 text-base-content/70">Bars</p>
                        </div>
                    </div>
                </Card>

                {/* Color Palette */}
                <Card title="Color Palette (Auto-adapts to Theme)" variant="bordered">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-primary text-primary-content p-4 rounded-lg text-center">
                            <p className="font-bold">Primary</p>
                        </div>
                        <div className="bg-secondary text-secondary-content p-4 rounded-lg text-center">
                            <p className="font-bold">Secondary</p>
                        </div>
                        <div className="bg-accent text-accent-content p-4 rounded-lg text-center">
                            <p className="font-bold">Accent</p>
                        </div>
                        <div className="bg-neutral text-neutral-content p-4 rounded-lg text-center">
                            <p className="font-bold">Neutral</p>
                        </div>
                        <div className="bg-success text-success-content p-4 rounded-lg text-center">
                            <p className="font-bold">Success</p>
                        </div>
                        <div className="bg-warning text-warning-content p-4 rounded-lg text-center">
                            <p className="font-bold">Warning</p>
                        </div>
                        <div className="bg-error text-error-content p-4 rounded-lg text-center">
                            <p className="font-bold">Error</p>
                        </div>
                        <div className="bg-info text-info-content p-4 rounded-lg text-center">
                            <p className="font-bold">Info</p>
                        </div>
                    </div>
                </Card>

                {/* Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Example Modal"
                    actions={
                        <>
                            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                                Confirm
                            </Button>
                        </>
                    }
                >
                    <p className="text-base-content">
                        This is a DaisyUI modal component. It automatically adapts to the current theme
                        (light or dark mode) and provides a smooth user experience.
                    </p>
                    <p className="text-base-content/70 mt-4">
                        Try toggling the theme with the switch in the header to see how all components
                        seamlessly adapt!
                    </p>
                </Modal>
            </div>
        </div>
    );
};

export default DaisyUIDemo;
