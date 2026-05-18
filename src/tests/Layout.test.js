import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SiteHeader from '$lib/components/Layout/SiteHeader.svelte';
import SiteFooter from '$lib/components/Layout/SiteFooter.svelte';
import ButtonPair from '$lib/components/Layout/ButtonPair.svelte';

describe('SiteHeader', () => {
  it('renders the top nav brand', () => {
    render(SiteHeader);
    expect(screen.getByText('[JACK-WALK]')).toBeTruthy();
  });

  it('renders default navigation links', () => {
    render(SiteHeader);
    expect(screen.getByText('LinkedIn')).toBeTruthy();
    expect(screen.getByText('Github')).toBeTruthy();
  });

  it('renders the bunny image', () => {
    render(SiteHeader);
    expect(screen.getByAltText('Bunnies')).toBeTruthy();
  });

  it('links the brand text instead of the bunny image', () => {
    render(SiteHeader);

    expect(screen.getByText('[JACK-WALK]').closest('a')).toBeTruthy();
    expect(screen.getByAltText('Bunnies').closest('a')).toBeNull();
  });

  it('renders custom navigation links', () => {
    render(SiteHeader, {
      props: {
        linkedinLabel: 'Portfolio',
        linkedinHref: 'https://example.com',
      },
    });
    expect(screen.getByText('Portfolio')).toBeTruthy();
  });

  it('renders the nav element', () => {
    render(SiteHeader);
    expect(screen.getByLabelText('Site navigation')).toBeTruthy();
  });
});

describe('ButtonPair', () => {
  it('renders navigation buttons', () => {
    render(ButtonPair, {
      props: {
        buttons: [
          { label: 'COMPARE ZIP CODES', href: '/compare' },
          { label: 'ABOUT THIS DATA', href: '/about' },
        ],
      },
    });

    expect(screen.getByText('COMPARE ZIP CODES')).toBeTruthy();
    expect(screen.getByText('ABOUT THIS DATA')).toBeTruthy();
  });
});

describe('SiteFooter', () => {
  it('renders the CUNY logo', () => {
    render(SiteFooter);
    expect(
      screen.getByLabelText(
        'Craig Newmark Graduate School of Journalism at CUNY'
      )
    ).toBeTruthy();
  });

  it('renders footer navigation links', () => {
    render(SiteFooter);
    expect(screen.getByText('ABOUT US')).toBeTruthy();
    expect(screen.getByText('CONTACT US')).toBeTruthy();
  });
});
