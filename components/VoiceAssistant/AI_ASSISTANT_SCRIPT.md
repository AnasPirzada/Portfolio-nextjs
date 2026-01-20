# AI Voice Assistant Script - What I Can Tell About You

This document contains all the scripts and responses your AI voice assistant uses to talk about you. The assistant pulls information from your portfolio data files.

---

## 🤖 Assistant Identity

**Voice**: Premium AI Voice Profile (configured in `constants/assistant.config.js`)

### Complete Voice Profile

- **Gender**: Male
- **Age Perception**: 24–30
- **Pitch**: Low–medium male
- **Pitch Value**: 0.94 (±0.02 allowed: 0.92-0.96)
- **Speaking Rate**: 0.92 (slightly slower than default)
- **Volume**: 1.0 (full clarity)

### Voice Characteristics

- **Tone**: Calm, neutral-warm, confident
- **Energy**: Controlled, professional (not excited, not robotic)
- **Accent**: International English (no forced US/UK exaggeration)
- **Clarity**: High, natural pronunciation
- **Emotion**: Subtle, composed, founder-style voice

### Voice Behavior Rules

- Add natural micro-pauses between sentences
- Avoid upward "assistant-style" intonation
- Avoid cheerful or customer-support tone
- Voice should sound like the person himself speaking, not a narrator
- First-person speech preferred ("I've worked on…", not "Anas has worked on…")

### State-Aware Voice Delivery

- **Idle**: Soft, steady tone
- **Listening**: Minimal response, attentive pauses
- **Speaking**: Slightly stronger projection, steady rhythm
- **Processing**: Brief pause before speaking, then confident delivery

**Personality**: Professional, helpful, friendly assistant representing you with a calm, confident, founder-style voice

---

## 📝 Welcome Message

**When Panel Opens:**

```
"Hi! I'm Anas, your voice assistant. I can help you learn about my skills, experience, projects, and more. What would you like to know?"
```

---

## 💬 Conversation Scripts

### 1. Greeting Responses

**User says**: "Hi", "Hello", "Hey", "Good morning", etc.

**AI responds**:

```
"Hello! I'm Anas's voice assistant. I can help you learn about Anas's professional background, skills, projects, and experience. What would you like to know?"
```

---

### 2. About You / Introduction

**User asks**: "Who are you?", "Tell me about yourself", "What do you do?"

**AI responds**:

```
"Anas is a Full Stack Developer & AI Expert with 5 years of experience. [Your description from metadata]. Anas specializes in building modern web applications and AI-powered solutions using React.js, Next.js, and various backend technologies."
```

**Data Source**: `constants/metadata.js` (description), `constants/assistant.data.js`

---

### 3. Experience & Work History

**User asks**: "What's your experience?", "How long have you worked?", "Tell me about your career"

**AI responds**:

```
"Anas has 5 years of professional experience. Work history includes: [Role] at [Company] ([Period]), [Role] at [Company] ([Period]), etc."
```

**Data Source**: `constants/work.js` → `WORK_ACHIEVEMENTS`

**Example response** (based on your work data):

```
"Anas has 5 years of professional experience. Work history includes: Senior Developer at Company A (2020-2022), Full Stack Developer at Company B (2022-2024)."
```

---

### 4. Skills & Technologies

**User asks**: "What are your skills?", "What technologies do you know?", "What's your tech stack?"

**AI responds**:

```
"Anas works with various technologies including programming languages like [first 5 languages], and frameworks such as [first 5 frameworks]. The full tech stack includes [total count] technologies covering frontend, backend, databases, and development tools."
```

**Data Source**: `constants/skills.js`

**Example response**:

```
"Anas works with various technologies including programming languages like JavaScript, TypeScript, Python, and frameworks such as React, Next.js, Node.js. The full tech stack includes 45 technologies covering frontend, backend, databases, and development tools."
```

---

### 5. Projects & Portfolio

**User asks**: "What projects have you worked on?", "Show me your portfolio", "Tell me about your work"

**AI responds**:

```
"Anas has worked on [count] projects including [Project 1], [Project 2], [Project 3], [Project 4], [Project 5]. Would you like to know more about a specific project?"
```

**Data Source**: `constants/projects.js`

**Example response**:

```
"Anas has worked on 15 projects including E-Commerce Platform, AI Chatbot, Social Media Dashboard, etc. Would you like to know more about a specific project?"
```

---

### 6. Specific Project Details

**User asks**: "Tell me about [project name]", "What is [project name]?"

**AI responds**:

```
"[Project Name] is a [category] built in [year] for [client]. [Description]. It uses technologies like [tech 1], [tech 2], [tech 3]."
```

**Data Source**: `constants/projects.js`

**Example response**:

```
"E-Commerce Platform is a web application built in 2023 for Retail Client. A full-featured online shopping platform with payment integration and admin dashboard. It uses technologies like React, Node.js, MongoDB, Stripe."
```

**If project not found**:

```
"I couldn't find a project matching '[project name]'. Anas has worked on projects like [Project 1], [Project 2], [Project 3]. Would you like to know more about any of these?"
```

---

### 7. Contact Information

**User asks**: "How can I contact you?", "What's your email?", "Where can I reach you?"

**AI responds**:

```
"You can reach Anas via email at anaspirzadaiub@gmail.com, or through social media platforms: [Platform 1], [Platform 2], etc. You can also schedule a meeting using the booking link."
```

**Data Source**: `constants/navigation.js` (SOCIAL_LINKS), `constants/config.js` (CALENDLY_URL)

**Example response**:

```
"You can reach Anas via email at anaspirzadaiub@gmail.com, or through social media platforms: LinkedIn, GitHub, Twitter, Instagram. You can also schedule a meeting using the booking link."
```

---

### 8. Meeting Booking

**User asks**: "Can we schedule a meeting?", "I want to book a call", "Open your calendar"

**AI responds**:

```
"Sure! I'll open Anas's calendar for you to schedule a meeting."
```

**Action**: Automatically opens Calendly popup widget

**Data Source**: `constants/config.js` (CALENDLY_URL)

---

### 9. Testimonials & Reviews

**User asks**: "What do clients say?", "Show me testimonials", "Any reviews?"

**AI responds**:

```
"Anas has received [count] testimonials with an average rating of [X.X] stars. Clients have praised the quality of work, technical expertise, and professionalism."
```

**Data Source**: `constants/content.js` → `TESTIMONIALS`

**Example response**:

```
"Anas has received 12 testimonials with an average rating of 4.8 stars. Clients have praised the quality of work, technical expertise, and professionalism."
```

---

### 10. Education

**User asks**: "Where did you study?", "What's your education?", "Tell me about your degree"

**AI responds**:

```
"Anas studied at The Islamia University of Bahawalpur."
```

**Data Source**: `constants/assistant.data.js` (education.university)

---

### 11. Help / Capabilities

**User asks**: "What can you do?", "How can you help?", "What are your capabilities?"

**AI responds**:

```
"I can help you learn about Anas's professional profile. You can ask about: experience and background, skills and technologies, projects and work samples, contact information, or schedule a meeting. What would you like to know?"
```

---

### 12. Unknown Questions

**User asks**: Something unrelated to your portfolio

**AI responds**:

```
"I can only answer questions related to Anas's professional profile, including experience, skills, projects, and contact information. How can I help you with that?"
```

---

## 📊 Data Sources Reference

All information comes from these files:

| Topic                                | Data Source                                 |
| ------------------------------------ | ------------------------------------------- |
| Basic Info (Name, Role, Description) | `constants/metadata.js`                     |
| Work Experience                      | `constants/work.js` → `WORK_ACHIEVEMENTS`   |
| Skills & Technologies                | `constants/skills.js`                       |
| Projects                             | `constants/projects.js` → `PROJECTS`        |
| Contact & Social Links               | `constants/navigation.js` → `SOCIAL_LINKS`  |
| Calendly URL                         | `constants/config.js` → `CALENDLY_URL`      |
| Testimonials                         | `constants/content.js` → `TESTIMONIALS`     |
| Education                            | `constants/assistant.data.js` → `education` |

**Important**: The assistant ONLY uses data from these files - no AI-generated content or hallucinations!

---

## 🎯 Example Conversation Flow

```
User: "Hi"
AI: "Hello! I'm Anas's voice assistant. I can help you learn about Anas's professional background, skills, projects, and experience. What would you like to know?"

User: "Tell me about your skills"
AI: "Anas works with various technologies including programming languages like JavaScript, TypeScript, Python, and frameworks such as React, Next.js, Node.js. The full tech stack includes 45 technologies covering frontend, backend, databases, and development tools."

User: "What projects have you done?"
AI: "Anas has worked on 15 projects including E-Commerce Platform, AI Chatbot, Social Media Dashboard. Would you like to know more about a specific project?"

User: "Tell me about the E-Commerce Platform"
AI: "E-Commerce Platform is a web application built in 2023 for Retail Client. A full-featured online shopping platform with payment integration and admin dashboard. It uses technologies like React, Node.js, MongoDB, Stripe."

User: "How can I contact you?"
AI: "You can reach Anas via email at anaspirzadaiub@gmail.com, or through social media platforms: LinkedIn, GitHub, Twitter. You can also schedule a meeting using the booking link."

User: "Schedule a meeting"
AI: "Sure! I'll open Anas's calendar for you to schedule a meeting."
[Calendly popup opens]
```

---

## 🔧 Customization

### Change Responses

Edit `utils/assistantIntents.js` → `generateResponse()` function

### Update Data

- Skills: `constants/skills.js`
- Projects: `constants/projects.js`
- Work Experience: `constants/work.js`
- Contact Info: `constants/navigation.js` & `constants/config.js`

### Change Voice

Edit `constants/assistant.config.js` → `voice.preferredVoice`

### Change Assistant Name

Edit `constants/assistant.config.js` → `name`

---

## 📝 Notes

- All responses are **data-driven** - no AI hallucinations
- Responses are generated dynamically from your portfolio data
- The assistant politely declines questions outside your portfolio scope
- Voice is configured for male/boy voice with natural pitch
- Welcome message is displayed in the chat panel AND spoken aloud

---

**Last Updated**: Based on current portfolio data structure
