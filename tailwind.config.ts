import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: {
					blue: 'hsl(var(--neon-blue))',
					purple: 'hsl(var(--neon-purple))',
					violet: 'hsl(var(--neon-violet))',
					cyan: 'hsl(var(--neon-cyan))',
					pink: 'hsl(var(--neon-pink))',
					green: 'hsl(var(--neon-green))'
				}
			},
			fontFamily: {
				'display': ['Inter', 'system-ui', 'sans-serif'],
				'body': ['Inter', 'system-ui', 'sans-serif'],
			},
			spacing: {
				'hero': 'var(--space-hero)',
				'section': 'var(--space-section)',
				'component': 'var(--space-component)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'flip-in': {
					'0%': {
						transform: 'rotateX(-90deg)',
						opacity: '0'
					},
					'100%': {
						transform: 'rotateX(0deg)',
						opacity: '1'
					}
				},
				'flip-out': {
					'0%': {
						transform: 'rotateX(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'rotateX(90deg)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flip-in': 'flip-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'flip-out': 'flip-out 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'slide-up': 'slide-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'slide-down': 'slide-down 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
