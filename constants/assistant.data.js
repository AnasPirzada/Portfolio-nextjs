/**
 * Portfolio Data for Voice AI Assistant
 * This data is used to generate responses - NO hallucinations allowed!
 * All responses must be based ONLY on this data.
 */

import {
  METADATA,
  SKILLS,
  PROJECTS,
  WORK_ACHIEVEMENTS,
  SOCIAL_LINKS,
  CALENDLY_URL,
  PERFORMANCE_METRICS,
  TESTIMONIALS,
} from './index';

export const PORTFOLIO_DATA = {
  // Basic Information
  name: METADATA.author,
  role: 'Full Stack Developer & AI Expert',
  title: METADATA.title,
  description: METADATA.description,
  email: 'anaspirzadaiub@gmail.com',
  location: 'Pakistan',

  // Experience
  experience: {
    years: 5,
    summary:
      '5+ years of experience in full stack development and AI integration',
    companies: WORK_ACHIEVEMENTS.map(work => ({
      company: work.company,
      role: work.role,
      period: work.period,
      location: work.location,
      achievements: work.achievements,
      skills: work.skills,
    })),
  },

  // Skills
  skills: {
    languages: SKILLS.languagesAndTools,
    frameworks: SKILLS.librariesAndFrameworks,
    databases: SKILLS.databases,
    other: SKILLS.other,
    all: [
      ...SKILLS.languagesAndTools,
      ...SKILLS.librariesAndFrameworks,
      ...SKILLS.databases,
      ...SKILLS.other,
    ],
  },

  // Projects
  projects: PROJECTS.map(project => ({
    name: project.name,
    description: project.description,
    tech: project.tech,
    category: project.category,
    year: project.year,
    client: project.client,
    url: project.url,
    caseStudy: project.caseStudy,
  })),

  // Contact Information
  contact: {
    email: 'anaspirzadaiub@gmail.com',
    social: SOCIAL_LINKS.map(link => ({
      platform: link.name,
      url: link.url,
    })),
    calendly: CALENDLY_URL,
  },

  // Performance Metrics
  metrics: PERFORMANCE_METRICS,

  // Testimonials
  testimonials: TESTIMONIALS.map(testimonial => ({
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    text: testimonial.text,
    rating: testimonial.rating,
  })),

  // Education (if available)
  education: {
    university: 'The Islamia University of Bahawalpur',
  },
};
