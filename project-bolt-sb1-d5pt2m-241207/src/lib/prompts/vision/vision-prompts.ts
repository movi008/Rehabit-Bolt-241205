export const visionPrompts = {
  title: {
    id: 'vision-title',
    name: 'Vision Title Generator',
    description: 'Creates a compelling title for the vision',
    template: `Create an inspiring and concise title for a vision about: {{description}}
    
    The title should:
    - Be memorable and impactful
    - Reflect the core theme
    - Be 3-6 words long
    - Not use quotes
    - Avoid clichés
    
    Format: Return only the title text`,
    variables: ['description'],
    category: 'vision',
    model: 'gpt-4'
  },
  description: {
    id: 'vision-description',
    name: 'Vision Description Enhancer',
    description: 'Enhances and structures the vision description',
    template: `Enhance and structure this vision description: {{description}}

    Create a well-structured vision that:
    - Maintains the original intent and emotion
    - Uses vivid, sensory language
    - Includes specific details and outcomes
    - Focuses on positive transformation
    - Balances practicality with inspiration
    
    Format: Return the enhanced description in clear paragraphs`,
    variables: ['description'],
    category: 'vision',
    model: 'gpt-4'
  },
  script: {
    id: 'vision-script',
    name: 'Vision Script Generator',
    description: 'Creates a narrative script for the vision video',
    template: `Create a compelling script for this vision: {{description}}
    
    The script should:
    - Have a clear beginning, middle, and end
    - Include powerful imagery descriptions
    - Use engaging narrative techniques
    - Be timed for approximately {{duration}} minutes
    - Match the {{tone}} tone
    
    Format: Return the script with scene descriptions and narration clearly marked`,
    variables: ['description', 'duration', 'tone'],
    category: 'vision',
    model: 'gpt-4'
  },
  voiceover: {
    id: 'vision-voiceover',
    name: 'Vision Voiceover Generator',
    description: 'Optimizes the script for voice narration',
    template: `Adapt this script for voiceover: {{script}}
    
    Optimize for:
    - Natural speech patterns
    - Clear pronunciation
    - Emotional resonance
    - Proper pacing
    - Strategic pauses
    
    Format: Return the voiceover script with timing and emphasis markers`,
    variables: ['script'],
    category: 'vision',
    model: 'eleven_monolingual_v1'
  },
  visuals: {
    id: 'vision-visuals',
    name: 'Vision Visuals Generator',
    description: 'Creates prompts for generating vision imagery',
    template: `Generate visual scenes for this vision: {{description}}
    
    Create detailed prompts for:
    - Opening scene
    - Key moments
    - Symbolic representations
    - Emotional highlights
    - Closing image
    
    Style: {{style}}
    Mood: {{mood}}
    
    Format: Return specific image generation prompts for each scene`,
    variables: ['description', 'style', 'mood'],
    category: 'vision',
    model: 'dall-e-3'
  }
};