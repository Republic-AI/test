import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
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
		fontSize: {
			'xs': ['1.125rem', { lineHeight: '1.5rem' }],      // 12px * 1.5 = 18px
			'sm': ['1.3125rem', { lineHeight: '1.75rem' }],    // 14px * 1.5 = 21px
			'base': ['1.5rem', { lineHeight: '2rem' }],        // 16px * 1.5 = 24px
			'lg': ['1.6875rem', { lineHeight: '2.25rem' }],    // 18px * 1.5 = 27px
			'xl': ['1.875rem', { lineHeight: '2.5rem' }],      // 20px * 1.5 = 30px
			'2xl': ['2.25rem', { lineHeight: '2.75rem' }],     // 24px * 1.5 = 36px
			'3xl': ['2.8125rem', { lineHeight: '3rem' }],      // 30px * 1.5 = 45px
			'4xl': ['3.375rem', { lineHeight: '3.5rem' }],     // 36px * 1.5 = 54px
			'5xl': ['4.5rem', { lineHeight: '1' }],            // 48px * 1.5 = 72px
			'6xl': ['5.625rem', { lineHeight: '1' }],          // 60px * 1.5 = 90px
			'7xl': ['7.5rem', { lineHeight: '1' }],            // 72px * 1.5 = 108px
			'8xl': ['9rem', { lineHeight: '1' }],              // 96px * 1.5 = 144px
			'9xl': ['12rem', { lineHeight: '1' }],             // 128px * 1.5 = 192px
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// DraMai specific colors
				drama: {
					lavender: '#E5DEFF',
					pink: '#FFDEE2',
					peach: '#FDE1D3',
					blue: '#D3E4FD',
					gray: '#F1F0FB'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-10px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'card-hover': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-8px)' }
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'card-hover': 'card-hover 0.3s ease-out forwards',
				blink: 'blink 1s step-end infinite',
			},
			fontFamily: {
				'sans': ['BitCell', 'system-ui'],
				'serif': ['BitCell', 'Georgia'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
