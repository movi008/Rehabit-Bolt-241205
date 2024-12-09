export const meditationPrompts = {
  title: {
    id: 'meditation-title',
    name: 'Meditation Title Generator',
    description: 'Creates a calming title for the meditation',
    template: `Create a peaceful title for a meditation focused on: {{theme}}
    
    The title should:
    - Be calming and inviting
    - Reflect the meditation's purpose
    - Be memorable yet gentle
    
    Format: Return a concise meditation title`,
    variables: ['theme'],
    category: 'mindset',
    model: 'gpt-4'
  },
  script: {
    id: 'meditation-script',
    name: 'Meditation Script Generator',
    description: 'Creates a guided meditation script',
    template: `Create a guided meditation script for: {{theme}}
    
    Duration: {{duration}} minutes
    Style: {{style}}
    
    Include:
    - Opening centering
    - Breathing guidance
    - Visualization elements
    - Affirmations
    - Gentle closing
    
    Format: Return a properly paced meditation script with timing markers`,
    variables: ['theme', 'duration', 'style'],
    category: 'mindset',
    model: 'gpt-4'
  },
  voiceover: {
    id: 'meditation-voiceover',
    name: 'Meditation Voiceover Generator',
    description: 'Optimizes the meditation for voice guidance',
    template: `Adapt this meditation for voiceover: {{script}}
    
    Voice characteristics:
    - Calm and soothing
    - Steady pace
    - Gentle tone
    - Clear pronunciation
    - Strategic pauses
    
    Format: Return the voiceover script with timing and breathing markers`,
    variables: ['script'],
    category: 'mindset',
    model: 'eleven_monolingual_v1'
  },
  music: {
    id: 'meditation-music',
    name: 'Meditation Music Generator',
    description: 'Creates ambient music for the meditation',
    template: `Generate ambient music for meditation:
    
    Theme: {{theme}}
    Duration: {{duration}}
    Style: {{style}}
    
    Requirements:
    - Calming atmosphere
    - Gentle progression
    - Binaural elements
    - Seamless loops
    
    Format: Return meditation music parameters`,
    variables: ['theme', 'duration', 'style'],
    category: 'mindset',
    model: 'gpt-4'
  }
};