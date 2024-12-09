export const avatarPrompts = {
  title: {
    id: 'avatar-title',
    name: 'Avatar Title Generator',
    description: 'Creates a title for the avatar profile',
    template: `Create a title for an avatar representing: {{description}}
    
    Consider:
    - Personal brand
    - Professional context
    - Key characteristics
    
    Format: Return a concise, professional title`,
    variables: ['description'],
    category: 'identity',
    model: 'gpt-4'
  },
  description: {
    id: 'avatar-description',
    name: 'Avatar Description Generator',
    description: 'Creates a detailed avatar description',
    template: `Create a detailed avatar description based on:
    
    Profile:
    - Gender: {{gender}}
    - Style: {{style}}
    - Context: {{context}}
    - Personality: {{personality}}
    
    Include:
    - Physical characteristics
    - Expression and pose
    - Clothing and accessories
    - Background elements
    
    Format: Return a detailed, clear description`,
    variables: ['gender', 'style', 'context', 'personality'],
    category: 'identity',
    model: 'gpt-4'
  },
  visuals: {
    id: 'avatar-visuals',
    name: 'Avatar Image Generator',
    description: 'Generates the avatar image',
    template: `Create a professional avatar image:
    
    Person:
    - Gender: {{gender}}
    - Hair: {{hair}}
    - Eyes: {{eyes}}
    - Style: {{style}}
    
    Requirements:
    - Professional lighting
    - High-quality render
    - Clean background
    - Professional pose
    
    Format: Return a photorealistic avatar image`,
    variables: ['gender', 'hair', 'eyes', 'style'],
    category: 'identity',
    model: 'dall-e-3'
  }
};