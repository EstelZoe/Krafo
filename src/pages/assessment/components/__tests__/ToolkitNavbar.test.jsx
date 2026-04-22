import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ToolkitNavbar from '../ToolkitNavbar';

describe('ToolkitNavbar - Navigation Enhancements', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <ToolkitNavbar />
      </BrowserRouter>
    );
  };

  describe('Desktop Navigation Link Effects (Task 4.1)', () => {
    it('should have hover text color transition classes', () => {
      const { container } = renderNavbar();
      const desktopLinks = container.querySelectorAll('.hidden.md\\:flex a');
      
      // Check navigation links (not the button)
      const navLinks = Array.from(desktopLinks).slice(0, 4);
      
      navLinks.forEach(link => {
        expect(link.className).toContain('hover:text-orange-500');
        expect(link.className).toContain('transition-colors');
        expect(link.className).toContain('duration-200');
      });
    });

    it('should have underline animation using after pseudo-element', () => {
      const { container } = renderNavbar();
      const desktopLinks = container.querySelectorAll('.hidden.md\\:flex a');
      
      // Check navigation links (not the button)
      const navLinks = Array.from(desktopLinks).slice(0, 4);
      
      navLinks.forEach(link => {
        expect(link.className).toContain('after:absolute');
        expect(link.className).toContain('after:bottom-0');
        expect(link.className).toContain('after:left-0');
        expect(link.className).toContain('after:w-0');
        expect(link.className).toContain('after:h-0.5');
        expect(link.className).toContain('after:bg-orange-500');
        expect(link.className).toContain('hover:after:w-full');
      });
    });
  });

  describe('Mobile Menu Animations (Task 4.2)', () => {
    it('should have opacity and translate-y transitions on mobile menu container', () => {
      const { container } = renderNavbar();
      const mobileMenu = container.querySelector('.md\\:hidden.bg-black');
      
      expect(mobileMenu.className).toContain('transition-all');
      expect(mobileMenu.className).toContain('duration-300');
    });

    it('should toggle mobile menu visibility with proper classes', () => {
      const { container } = renderNavbar();
      const menuButton = screen.getByLabelText('Open menu');
      const mobileMenu = container.querySelector('.md\\:hidden.bg-black');
      
      // Initially closed
      expect(mobileMenu.className).toContain('opacity-0');
      expect(mobileMenu.className).toContain('-translate-y-4');
      expect(mobileMenu.className).toContain('pointer-events-none');
      
      // Open menu
      fireEvent.click(menuButton);
      
      expect(mobileMenu.className).toContain('opacity-100');
      expect(mobileMenu.className).toContain('translate-y-0');
      expect(mobileMenu.className).not.toContain('pointer-events-none');
    });

    it('should apply staggered fade-in delays to menu items', () => {
      const { container } = renderNavbar();
      const menuButton = screen.getByLabelText('Open menu');
      
      // Open menu
      fireEvent.click(menuButton);
      
      const mobileMenuLinks = container.querySelectorAll('.md\\:hidden.bg-black a');
      
      // Check staggered delays (0ms, 50ms, 100ms, 150ms, 200ms)
      const expectedDelays = ['0ms', '50ms', '100ms', '150ms', '200ms'];
      
      mobileMenuLinks.forEach((link, index) => {
        const style = link.getAttribute('style');
        expect(style).toContain(`transition-delay: ${expectedDelays[index]}`);
      });
    });
  });

  describe('Mobile Menu Toggle Button (Task 4.3)', () => {
    it('should have hover and active scale effects', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Open menu');
      
      expect(menuButton.className).toContain('hover:bg-gray-900');
      expect(menuButton.className).toContain('hover:scale-110');
      expect(menuButton.className).toContain('active:scale-95');
      expect(menuButton.className).toContain('transition-all');
      expect(menuButton.className).toContain('duration-200');
    });

    it('should have proper ARIA labels', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Open menu');
      
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      // Click to open
      fireEvent.click(menuButton);
      
      const closeButton = screen.getByLabelText('Close menu');
      expect(closeButton).toHaveAttribute('aria-label', 'Close menu');
      expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
