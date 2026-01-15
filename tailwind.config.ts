/**
 * B.A.P Heating & Cooling - Tailwind Configuration
 *
 * Aesthetic Direction: Trustworthy Industrial Modern
 * "Your neighbor who happens to be an expert."
 *
 * This config maps all CSS custom properties from tokens.css to Tailwind utilities.
 * All visual values flow through tokens.css as the single source of truth.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    extend: {
      /* ================================================================
         COLORS
         All colors reference CSS custom properties from tokens.css
         ================================================================ */
      colors: {
        // Primary: Trust Blue - for trust, authority, links, secondary buttons
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary-500)',
        },

        // Accent: Action Orange - ONLY for primary CTAs, never decorative
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
          DEFAULT: 'var(--color-accent-500)',
        },

        // Emergency: Urgent Red - ONLY for 24/7 and emergency messaging
        emergency: {
          50: 'var(--color-emergency-50)',
          100: 'var(--color-emergency-100)',
          200: 'var(--color-emergency-200)',
          500: 'var(--color-emergency-500)',
          600: 'var(--color-emergency-600)',
          700: 'var(--color-emergency-700)',
          800: 'var(--color-emergency-800)',
          DEFAULT: 'var(--color-emergency-500)',
        },

        // Surface colors
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          tertiary: 'var(--color-surface-tertiary)',
          inverse: 'var(--color-surface-inverse)',
          warm: 'var(--color-surface-warm)',
        },

        // Text colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
          link: 'var(--color-text-link)',
          'link-hover': 'var(--color-text-link-hover)',
        },

        // Semantic colors
        success: {
          50: 'var(--color-success-50)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          DEFAULT: 'var(--color-success-500)',
        },

        warning: {
          50: 'var(--color-warning-50)',
          500: 'var(--color-warning-500)',
          600: 'var(--color-warning-600)',
          700: 'var(--color-warning-700)',
          DEFAULT: 'var(--color-warning-500)',
        },

        error: {
          50: 'var(--color-error-50)',
          500: 'var(--color-error-500)',
          600: 'var(--color-error-600)',
          700: 'var(--color-error-700)',
          DEFAULT: 'var(--color-error-500)',
        },

        info: {
          50: 'var(--color-info-50)',
          500: 'var(--color-info-500)',
          600: 'var(--color-info-600)',
          DEFAULT: 'var(--color-info-500)',
        },

        // Border colors
        border: {
          DEFAULT: 'var(--color-border-primary)',
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          focus: 'var(--color-border-focus)',
        },
      },

      /* ================================================================
         TYPOGRAPHY
         ================================================================ */
      fontFamily: {
        display: 'var(--font-family-display)',
        heading: 'var(--font-family-heading)',
        body: 'var(--font-family-body)',
        mono: 'var(--font-family-mono)',
      },

      fontSize: {
        // Display sizes - for hero headlines
        'display-hero': 'var(--font-size-display-hero)',
        'display-lg': 'var(--font-size-display-lg)',

        // Heading sizes
        '7xl': 'var(--font-size-7xl)',
        '6xl': 'var(--font-size-6xl)',
        '5xl': 'var(--font-size-5xl)',
        '4xl': 'var(--font-size-4xl)',
        '3xl': 'var(--font-size-3xl)',
        '2xl': 'var(--font-size-2xl)',
        xl: 'var(--font-size-xl)',
        lg: 'var(--font-size-lg)',

        // Body sizes
        base: 'var(--font-size-base)',
        sm: 'var(--font-size-sm)',
        xs: 'var(--font-size-xs)',
      },

      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
      },

      lineHeight: {
        none: 'var(--line-height-none)',
        tight: 'var(--line-height-tight)',
        snug: 'var(--line-height-snug)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
        loose: 'var(--line-height-loose)',
      },

      letterSpacing: {
        tighter: 'var(--letter-spacing-tighter)',
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
        widest: 'var(--letter-spacing-widest)',
      },

      /* ================================================================
         SPACING
         ================================================================ */
      spacing: {
        px: 'var(--space-px)',
        0: 'var(--space-0)',
        0.5: 'var(--space-0-5)',
        1: 'var(--space-1)',
        1.5: 'var(--space-1-5)',
        2: 'var(--space-2)',
        2.5: 'var(--space-2-5)',
        3: 'var(--space-3)',
        3.5: 'var(--space-3-5)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
        10: 'var(--space-10)',
        11: 'var(--space-11)',
        12: 'var(--space-12)',
        14: 'var(--space-14)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        28: 'var(--space-28)',
        32: 'var(--space-32)',
        36: 'var(--space-36)',
        40: 'var(--space-40)',

        // Section padding aliases
        'section-sm': 'var(--section-padding-sm)',
        'section-md': 'var(--section-padding-md)',
        'section-lg': 'var(--section-padding-lg)',
      },

      /* ================================================================
         CONTAINER
         ================================================================ */
      maxWidth: {
        'container-xs': 'var(--container-xs)',
        'container-sm': 'var(--container-sm)',
        'container-md': 'var(--container-md)',
        'container-lg': 'var(--container-lg)',
        'container-xl': 'var(--container-xl)',
        'container-2xl': 'var(--container-2xl)',
        'container-full': 'var(--container-full)',
      },

      /* ================================================================
         BORDER RADIUS
         ================================================================ */
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },

      /* ================================================================
         SHADOWS
         ================================================================ */
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',

        // CTA-specific shadows with color tints
        cta: 'var(--shadow-cta)',
        'cta-hover': 'var(--shadow-cta-hover)',
        emergency: 'var(--shadow-emergency)',
        'emergency-hover': 'var(--shadow-emergency-hover)',
        primary: 'var(--shadow-primary)',
        'primary-hover': 'var(--shadow-primary-hover)',

        // Remove default shadow
        none: 'none',
      },

      /* ================================================================
         TRANSITIONS
         ================================================================ */
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
        slowest: 'var(--duration-slowest)',
      },

      transitionTimingFunction: {
        DEFAULT: 'var(--ease-default)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        bounce: 'var(--ease-bounce)',
        spring: 'var(--ease-spring)',
        elastic: 'var(--ease-elastic)',
      },

      /* ================================================================
         Z-INDEX
         ================================================================ */
      zIndex: {
        base: 'var(--z-base)',
        docked: 'var(--z-docked)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        toast: 'var(--z-toast)',
        max: 'var(--z-max)',
      },

      /* ================================================================
         ICON SIZES
         ================================================================ */
      width: {
        'icon-xs': 'var(--icon-xs)',
        'icon-sm': 'var(--icon-sm)',
        'icon-md': 'var(--icon-md)',
        'icon-lg': 'var(--icon-lg)',
        'icon-xl': 'var(--icon-xl)',
        'icon-2xl': 'var(--icon-2xl)',
      },

      height: {
        'icon-xs': 'var(--icon-xs)',
        'icon-sm': 'var(--icon-sm)',
        'icon-md': 'var(--icon-md)',
        'icon-lg': 'var(--icon-lg)',
        'icon-xl': 'var(--icon-xl)',
        'icon-2xl': 'var(--icon-2xl)',

        // Touch target minimum
        'touch-min': 'var(--touch-target-min)',

        // Input heights
        'input-sm': 'var(--input-height-sm)',
        'input-md': 'var(--input-height-md)',
        'input-lg': 'var(--input-height-lg)',

        // Header heights
        'header-mobile': 'var(--header-height-mobile)',
        'header-desktop': 'var(--header-height-desktop)',
        topbar: 'var(--topbar-height)',
      },

      /* ================================================================
         ANIMATIONS
         ================================================================ */
      animation: {
        'fade-in': 'fadeIn var(--duration-normal) var(--ease-out)',
        'fade-up': 'fadeUp var(--duration-slow) var(--ease-out)',
        'slide-up': 'slideUp var(--duration-slow) var(--ease-out)',
        'slide-down': 'slideDown var(--duration-slow) var(--ease-out)',
        'slide-in-right': 'slideInRight var(--duration-slow) var(--ease-out)',
        'slide-in-left': 'slideInLeft var(--duration-slow) var(--ease-out)',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 1s var(--ease-bounce) infinite',
        spin: 'spin 1s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      /* ================================================================
         BACKDROP BLUR
         ================================================================ */
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },

      /* ================================================================
         ASPECT RATIO
         ================================================================ */
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/1': '2 / 1',
      },
    },
  },

  /* ================================================================
     PLUGINS
     ================================================================ */
  plugins: [],
};

export default config;
