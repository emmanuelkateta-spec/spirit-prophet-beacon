import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "50%": { transform: "scale(1.15) translate(-2%, -1%)" },
          "100%": { transform: "scale(1.08) translate(1%, 2%)" },
        },
        "slide-fade": {
          "0%": { opacity: "0", transform: "scale(1.1)" },
          "10%, 90%": { opacity: "1", transform: "scale(1.15)" },
          "100%": { opacity: "0", transform: "scale(1.2)" },
        },
        "flame-flicker": {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(-12px)" },
          "50%": { transform: "translateY(12px)" },
        },
        "spin-3d": {
          "0%": { transform: "perspective(1200px) rotateY(0deg)" },
          "70%, 100%": { transform: "perspective(1200px) rotateY(360deg)" },
        },
        "spin-tilt": {
          "0%": { transform: "perspective(1200px) rotateY(0deg) rotateX(6deg)" },
          "70%, 100%": { transform: "perspective(1200px) rotateY(360deg) rotateX(6deg)" },
        },
        "logo-blink": {
          "0%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 18px hsl(var(--primary) / 0.85)) drop-shadow(0 0 36px hsl(var(--accent) / 0.6))",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.55",
            filter: "drop-shadow(0 0 4px hsl(var(--primary) / 0.2))",
            transform: "scale(0.96)",
          },
        },
        "heart-beat-color": {
          "0%, 100%": {
            transform: "scale(1)",
            backgroundColor: "hsl(var(--primary))",
            boxShadow: "0 0 0 0 hsl(var(--primary) / 0.6), 0 8px 24px -6px hsl(var(--primary) / 0.6)",
          },
          "20%": {
            transform: "scale(1.18)",
            backgroundColor: "hsl(var(--accent))",
            boxShadow: "0 0 0 10px hsl(var(--accent) / 0), 0 10px 30px -6px hsl(var(--accent) / 0.7)",
          },
          "40%": {
            transform: "scale(0.96)",
            backgroundColor: "hsl(var(--destructive))",
          },
          "60%": {
            transform: "scale(1.12)",
            backgroundColor: "hsl(var(--primary))",
            boxShadow: "0 0 0 16px hsl(var(--primary) / 0), 0 12px 32px -6px hsl(var(--primary) / 0.6)",
          },
          "80%": {
            transform: "scale(0.98)",
            backgroundColor: "hsl(var(--accent))",
          },
        },
        "beat-grow": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 hsl(var(--primary) / 0.7), 0 10px 30px -8px hsl(var(--primary) / 0.5)",
          },
          "30%": {
            transform: "scale(1.08)",
            boxShadow: "0 0 0 12px hsl(var(--primary) / 0), 0 14px 40px -8px hsl(var(--accent) / 0.7)",
          },
          "60%": {
            transform: "scale(1.14)",
            boxShadow: "0 0 0 22px hsl(var(--accent) / 0), 0 18px 50px -10px hsl(var(--primary) / 0.6)",
          },
        },
        "prophet-orbit": {
          "0%": { transform: "perspective(1400px) rotateY(0deg)" },
          "22%": { transform: "perspective(1400px) rotateY(180deg)" },
          "50%": { transform: "perspective(1400px) rotateY(180deg)" },
          "72%": { transform: "perspective(1400px) rotateY(360deg)" },
          "100%": { transform: "perspective(1400px) rotateY(360deg)" },
        },
        "camera-flash": {
          "0%, 92%, 100%": { opacity: "0" },
          "93%": { opacity: "0.95" },
          "94%": { opacity: "0.1" },
          "95%": { opacity: "0.85" },
          "96%": { opacity: "0" },
        },
        "flash-burst": {
          "0%, 100%": { opacity: "0", transform: "scale(0.4)" },
          "8%": { opacity: "1", transform: "scale(1)" },
          "20%": { opacity: "0", transform: "scale(1.6)" },
        },
        "shutter-blink": {
          "0%, 88%, 100%": { transform: "scaleY(0)", opacity: "0" },
          "90%": { transform: "scaleY(1)", opacity: "0.9" },
          "94%": { transform: "scaleY(0)", opacity: "0" },
        },
        "camera-shake": {
          "0%, 92%, 100%": { transform: "translate(0,0)" },
          "93%": { transform: "translate(-2px, 1px)" },
          "94%": { transform: "translate(2px, -1px)" },
          "95%": { transform: "translate(-1px, 2px)" },
          "96%": { transform: "translate(0,0)" },
        },
        "page-flip": {
          "0%": { transform: "perspective(1600px) rotateY(0deg)", zIndex: "2" },
          "45%": { transform: "perspective(1600px) rotateY(-150deg)", zIndex: "2" },
          "55%": { transform: "perspective(1600px) rotateY(-180deg)", zIndex: "1" },
          "100%": { transform: "perspective(1600px) rotateY(-180deg)", zIndex: "1" },
        },
        "logo-heart-glow": {
          "0%, 100%": {
            transform: "scale(1.08)",
            filter:
              "drop-shadow(0 0 22px hsl(var(--primary) / 0.95)) drop-shadow(0 0 44px hsl(var(--accent) / 0.85)) drop-shadow(0 0 70px hsl(var(--primary) / 0.6))",
          },
          "20%": {
            transform: "scale(0.94)",
            filter:
              "drop-shadow(0 0 4px hsl(var(--primary) / 0.25)) drop-shadow(0 0 8px hsl(var(--accent) / 0.15))",
          },
          "50%": {
            transform: "scale(1.12)",
            filter:
              "drop-shadow(0 0 26px hsl(var(--accent) / 1)) drop-shadow(0 0 50px hsl(var(--primary) / 0.9)) drop-shadow(0 0 80px hsl(var(--accent) / 0.55))",
          },
          "70%": {
            transform: "scale(0.96)",
            filter:
              "drop-shadow(0 0 5px hsl(var(--primary) / 0.3)) drop-shadow(0 0 10px hsl(var(--accent) / 0.2))",
          },
        },
        "wheel-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(var(--spin-end, 1440deg))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "ken-burns": "ken-burns 12s ease-in-out infinite",
        "slide-fade": "slide-fade 8s ease-in-out infinite",
        "flame-flicker": "flame-flicker 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "marquee": "marquee 28s linear infinite",
        "float-y": "float-y 5s ease-in-out infinite",
        "spin-3d": "spin-3d 16s linear infinite",
        "spin-tilt": "spin-tilt 16s linear infinite",
        "logo-blink": "logo-blink 1.6s ease-in-out infinite",
        "heart-beat-color": "heart-beat-color 1.2s ease-in-out infinite",
        "beat-grow": "beat-grow 1.4s ease-in-out infinite",
        "prophet-orbit": "prophet-orbit 26s ease-in-out infinite",
        "camera-flash": "camera-flash 4s ease-in-out infinite",
        "flash-burst": "flash-burst 4s ease-in-out infinite",
        "shutter-blink": "shutter-blink 4s ease-in-out infinite",
        "camera-shake": "camera-shake 4s ease-in-out infinite",
        "page-flip": "page-flip 4s ease-in-out forwards",
        "logo-heart-glow": "logo-heart-glow 1.4s ease-in-out infinite",
        "wheel-spin": "wheel-spin 5s cubic-bezier(0.17, 0.67, 0.16, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
