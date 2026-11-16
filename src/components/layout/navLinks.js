// Single source of truth for primary navigation.
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Find Universities', to: '/find' },
  { label: 'Compare', to: '/compare' },
  { label: 'International', to: '/international' },
  { label: 'Preparation', to: '/preparation' },
  { label: 'About', to: '/about' },
];

export const footerLinks = {
  Platform: [
    { label: 'Find Universities', to: '/find' },
    { label: 'Compare', to: '/compare' },
    { label: 'International', to: '/international' },
    { label: 'Admission Prep', to: '/preparation' },
  ],
  Account: [
    { label: 'Log in', to: '/login' },
    { label: 'Sign up', to: '/signup' },
    { label: 'Student Dashboard', to: '/dashboard' },
    { label: 'Admin', to: '/admin' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Privacy Policy', to: '/privacy' },
  ],
};
