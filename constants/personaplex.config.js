/**
 * NVIDIA PersonaPlex Configuration
 * Full-duplex conversational AI with customizable voice and role
 * 
 * Resources:
 * - GitHub: https://github.com/NVIDIA/personaplex
 * - Hugging Face: https://huggingface.co/nvidia/personaplex-7b-v1
 * - Research Page: https://research.nvidia.com/labs/adlr/personaplex/
 */

import { ASSISTANT_CONFIG } from './assistant.config';

export const PERSONAPLEX_CONFIG = {
  // Hugging Face Inference API Configuration
  huggingFaceModel: 'nvidia/personaplex-7b-v1',
  // API key should be set in .env.local as NEXT_PUBLIC_PERSONAPLEX_HF_API_KEY
  
  // Custom API Endpoint (alternative to Hugging Face)
  customApiUrl: null, // Set in NEXT_PUBLIC_PERSONAPLEX_API_URL if hosting yourself
  
  // Text Prompt Configuration
  textPrompt: {
    default: `You are a professional portfolio assistant named ${ASSISTANT_CONFIG.name}. 
You help visitors learn about professional background, skills, projects, and experience. 
You are friendly, knowledgeable, and concise. Answer questions clearly and professionally.`,
    
    greeting: `You are a friendly portfolio assistant. Greet visitors warmly and offer to help them learn about the portfolio.`,
    
    projects: `You are a portfolio assistant discussing projects. Be enthusiastic but professional when describing technical projects and achievements.`,
    
    experience: `You are a portfolio assistant discussing professional experience. Provide clear, confident information about work history and expertise.`,
    
    contact: `You are a portfolio assistant helping with contact information. Be approachable and helpful when discussing ways to connect.`,
    
    technical: `You are a portfolio assistant explaining technical details. Be precise and clear when discussing technologies and technical concepts.`,
  },

  // Model Settings
  model: {
    temperature: 0.7,
    maxLength: 500,
    sampleRate: 24000, // PersonaPlex operates at 24kHz
  },
};
