/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration
 * Defines the design system and customizations for the application
 * 
 * Configuration includes:
 * - Content paths for processing
 * - Theme customizations
 * - Color palette with CSS variables
 * - Border radius utilities
 */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // Process all app directory files
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",  // Process all component files
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette using CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        // Custom border radius utilities
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],  // No additional plugins used
}
