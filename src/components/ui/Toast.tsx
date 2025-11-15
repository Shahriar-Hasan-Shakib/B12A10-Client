import { Toaster } from "react-hot-toast";

export function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: "var(--color-primary-600)",
                    color: "#fff",
                },
                success: {
                    iconTheme: {
                        primary: "var(--color-primary-600)",
                        secondary: "#fff",
                    },
                },
            }}
        />
    );
}