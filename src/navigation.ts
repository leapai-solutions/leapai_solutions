import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
      megaMenu: [
        {
          title: 'Data Services',
          href: getPermalink('/services/data'),
          items: [
            {
              text: 'Data Platform Services',
              href: getPermalink('/services/data/data-platform'),
              description: 'Design & implement modern cloud data platforms ready for AI and analytics'
            },
            {
              text: 'Data Integration Services',
              href: getPermalink('/services/data/data-integration'),
              description: 'Design & implement ETL/ELT pipelines that turn raw data into business assets'
            },
          ],
        },
        {
          title: 'AI Services',
          href: getPermalink('/services/ai'),
          items: [
            {
              text: 'AI Adoption Acceleration Services',
              href: getPermalink('/services/ai#ai-adoption'),
              description: 'Rapid deployment and scaled integration of AI tools for business processes'
            },
            {
              text: 'AI Integration Services',
              href: getPermalink('/services/ai#ai-integration'),
              description: 'Seamlessly integrate AI tools into existing business systems'
            },
          ],
        },
      ],
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Get Started', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Data Platform Services', href: getPermalink('/services/data/data-platform') },
        { text: 'AI Adoption Acceleration', href: getPermalink('/services/ai#ai-adoption') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Blog', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'AI Transformation Guide', href: getPermalink('ai-transformation-guide', 'post') },
        { text: 'Data-Driven Decisions', href: getPermalink('data-driven-decision-making', 'post') },
        { text: 'ML ROI Strategies', href: getPermalink('machine-learning-roi', 'post') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Twitter', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © 2024 LeapAI Solutions. All rights reserved.
  `,
};
