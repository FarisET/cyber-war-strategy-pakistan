
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
				military: {
					DEFAULT: '#1A1F2C',
					light: '#2A3040',
					dark: '#10141C',
					red: '#ea384c',
					accent: '#4a7c59',
					yellow: '#f0c04c',
				},
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
				}
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
				'radar-sweep': {
					'0%': { 
						transform: 'rotate(0deg)',
						opacity: '0.5'
					},
					'100%': { 
						transform: 'rotate(360deg)',
						opacity: '0.5'
					}
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.3' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'radar-sweep': 'radar-sweep 4s linear infinite',
				'blink': 'blink 2s ease-in-out infinite'
			},
			backgroundImage: {
				'camo-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMxMDE0MUMiIG9wYWNpdHk9IjAuMiI+PC9yZWN0PjxyZWN0IHg9IjI1IiB5PSIwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMxQTFGMkMiIG9wYWNpdHk9IjAuMSI+PC9yZWN0PjxyZWN0IHg9IjUwIiB5PSIwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMyQTMwNDAiIG9wYWNpdHk9IjAuMiI+PC9yZWN0PjxyZWN0IHg9Ijc1IiB5PSIwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMxQTFGMkMiIG9wYWNpdHk9IjAuMSI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjI1IiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMxQTFGMkMiIG9wYWNpdHk9IjAuMSI+PC9yZWN0PjxyZWN0IHg9IjI1IiB5PSIyNSIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1IiBmaWxsPSIjMkEzMDQwIiBvcGFjaXR5PSIwLjIiPjwvcmVjdD48cmVjdCB4PSI1MCIgeT0iMjUiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgZmlsbD0iIzFBMUYyQyIgb3BhY2l0eT0iMC4xIj48L3JlY3Q+PHJlY3QgeD0iNzUiIHk9IjI1IiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMxMDE0MUMiIG9wYWNpdHk9IjAuMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjUwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMyQTMwNDAiIG9wYWNpdHk9IjAuMiI+PC9yZWN0PjxyZWN0IHg9IjI1IiB5PSI1MCIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1IiBmaWxsPSIjMUExRjJDIiBvcGFjaXR5PSIwLjEiPjwvcmVjdD48cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgZmlsbD0iIzEwMTQxQyIgb3BhY2l0eT0iMC4yIj48L3JlY3Q+PHJlY3QgeD0iNzUiIHk9IjUwIiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMyQTMwNDAiIG9wYWNpdHk9IjAuMSI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9Ijc1IiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMxQTFGMkMiIG9wYWNpdHk9IjAuMSI+PC9yZWN0PjxyZWN0IHg9IjI1IiB5PSI3NSIgd2lkdGg9IjI1IiBoZWlnaHQ9IjI1IiBmaWxsPSIjMTAxNDFDIiBvcGFjaXR5PSIwLjIiPjwvcmVjdD48cmVjdCB4PSI1MCIgeT0iNzUiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgZmlsbD0iIzJBMzA0MCIgb3BhY2l0eT0iMC4xIj48L3JlY3Q+PHJlY3QgeD0iNzUiIHk9Ijc1IiB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIGZpbGw9IiMxQTFGMkMiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
