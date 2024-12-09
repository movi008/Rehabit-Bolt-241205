import { visionPrompts } from './vision-prompts';
import { avatarPrompts } from './avatar-prompts';
import { personaPrompts } from './persona-prompts';
import { affirmationPrompts } from './affirmation-prompts';
import { visualizationPrompts } from './visualization-prompts';
import { meditationPrompts } from './meditation-prompts';
import { mantraPrompts } from './mantra-prompts';
import { manifestoPrompts } from './manifesto-prompts';
import { scenePrompts } from './scene-prompts';
import { shotPrompts } from './shot-prompts';
import { clipPrompts } from './clip-prompts';
import { trailerPrompts } from './trailer-prompts';

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
  category: 'vision' | 'identity' | 'mindset' | 'content';
  model: 'gpt-4' | 'dall-e-3' | 'eleven_monolingual_v1';
}

export interface ProductPrompts {
  title: PromptTemplate;
  description: PromptTemplate;
  script: PromptTemplate;
  voiceover: PromptTemplate;
  visuals: PromptTemplate;
  music?: PromptTemplate;
}

export const productPrompts = {
  vision: visionPrompts,
  avatar: avatarPrompts,
  persona: personaPrompts,
  affirmation: affirmationPrompts,
  visualization: visualizationPrompts,
  meditation: meditationPrompts,
  mantra: mantraPrompts,
  manifesto: manifestoPrompts,
  scene: scenePrompts,
  shot: shotPrompts,
  clip: clipPrompts,
  trailer: trailerPrompts
};