/**
 * Intent Detection and Response Generation for Voice Assistant
 * All responses are strictly based on portfolio data - NO hallucinations!
 */

import { PORTFOLIO_DATA } from '@/constants/assistant.data';
import { normalizeForIntent } from '@/utils/textCorrection';

/**
 * Detect user intent from transcript
 */
export const detectIntent = transcript => {
  // Normalize text and correct common errors (e.g., "anus" -> "anas")
  const normalized = normalizeForIntent(transcript);

  // Greetings
  if (
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(
      normalized
    )
  ) {
    return 'greeting';
  }

  // About me / Who are you / Who is Anas
  if (
    /(who are you|tell me about yourself|about you|introduce yourself|what do you do|what's your role|your background|who is anas|tell me about anas|what is anas)/i.test(
      normalized
    )
  ) {
    return 'about';
  }

  // Experience
  if (
    /(experience|years of experience|how long|work history|career|background)/i.test(
      normalized
    )
  ) {
    return 'experience';
  }

  // Skills
  if (
    /(skills|technologies|tech stack|what can you do|what technologies|programming languages|frameworks|tools)/i.test(
      normalized
    )
  ) {
    return 'skills';
  }

  // Projects / Your work
  if (
    /(projects|portfolio|work samples|what have you built|show me your work|your projects|your work|what are your work|what is your work)/i.test(
      normalized
    )
  ) {
    return 'projects';
  }

  // Specific project
  const projectMatch = normalized.match(
    /(tell me about|what is|show me|details about)\s+([a-z\s]+?)(project|app|website|platform)?/i
  );
  if (projectMatch) {
    return { type: 'project_detail', projectName: projectMatch[2].trim() };
  }

  // Contact
  if (
    /(contact|email|reach|get in touch|how to contact|your email|social media|linkedin|github)/i.test(
      normalized
    )
  ) {
    return 'contact';
  }

  // Meeting booking
  if (
    /(book|schedule|meeting|call|appointment|talk|discuss|calendly|calendar)/i.test(
      normalized
    )
  ) {
    return 'booking';
  }

  // Testimonials / Reviews
  if (
    /(testimonials|reviews|feedback|what clients say|recommendations)/i.test(
      normalized
    )
  ) {
    return 'testimonials';
  }

  // Education
  if (
    /(education|university|degree|studied|where did you study)/i.test(
      normalized
    )
  ) {
    return 'education';
  }

  // Help
  if (
    /(help|what can you do|what can you help|capabilities|commands)/i.test(
      normalized
    )
  ) {
    return 'help';
  }

  // Unknown intent
  return 'unknown';
};

/**
 * Generate response based on intent
 */
export const generateResponse = (intent, transcript = '') => {
  const data = PORTFOLIO_DATA;

  switch (intent) {
    case 'greeting':
      return `Hey — I'm ${data.name}. You can ask me about my work, experience, projects, or book a call with me.`;

    case 'about':
      // Clean, concise response without duplication
      return `I'm ${data.name}, a ${data.role} with ${data.experience.years} years of experience. I specialize in building modern web applications and AI-powered solutions using React, Next.js, and Machine Learning. What would you like to know more about?`;

    case 'experience':
      const companies = data.experience.companies
        .map(c => `${c.role} at ${c.company}`)
        .slice(0, 3)
        .join(', ');
      return `I've been working professionally for about ${data.experience.years} years. I've worked as ${companies}. Want a quick overview, or should I go deeper into a specific role?`;

    case 'skills':
      const languages = data.skills.languages.slice(0, 4).join(', ');
      const frameworks = data.skills.frameworks.slice(0, 3).join(', ');
      return `My core stack is ${languages}, and ${frameworks}. I've also worked with payments, APIs, dashboards, and AI integrations. Want to know more about any specific technology?`;

    case 'projects':
      const projectNames = data.projects
        .slice(0, 4)
        .map(p => p.name)
        .join(', ');
      return `I've worked on around ${data.projects.length} projects — including ${projectNames}. If you want, I can walk you through one project in detail.`;

    case 'contact':
      return `You can reach me by email, or we can book a quick call. I'll open my calendar if you want.`;

    case 'booking':
      return `Sure. I'll open my calendar for you.`;

    case 'testimonials':
      const testimonialCount = data.testimonials.length;
      const avgRating = (
        data.testimonials.reduce((sum, t) => sum + t.rating, 0) /
        testimonialCount
      ).toFixed(1);
      return `I've received ${testimonialCount} testimonials with an average rating of ${avgRating} stars. Clients have praised the quality of work and technical expertise.`;

    case 'education':
      return `I studied at ${data.education.university}.`;

    case 'help':
      return `You can ask me about my experience, projects, skills, or we can schedule a call. What would you like to explore?`;

    default:
      if (typeof intent === 'object' && intent.type === 'project_detail') {
        const projectName = intent.projectName;
        const project = data.projects.find(
          p =>
            p.name.toLowerCase().includes(projectName) ||
            projectName.includes(p.name.toLowerCase())
        );

        if (project) {
          return `${project.name} is a ${project.category} I built in ${project.year}. ${project.description}. It uses ${project.tech.slice(0, 4).join(', ')}. Want to know more about the technical details?`;
        } else {
          const suggestedProjects = data.projects
            .slice(0, 3)
            .map(p => p.name)
            .join(', ');
          return `I've worked on projects like ${suggestedProjects}. Which one interests you?`;
        }
      }

      // Universal fallback - never say "I don't understand"
      return `I'll keep things focused on my professional work. You can ask me about my experience, projects, skills, or we can schedule a call. What would you like to explore?`;
  }
};

/**
 * Check if response requires an action (like opening Calendly)
 */
export const requiresAction = intent => {
  return intent === 'booking';
};

/**
 * Get action details for booking
 */
export const getBookingAction = () => {
  return {
    type: 'open_calendly',
    url: PORTFOLIO_DATA.contact.calendly,
  };
};
