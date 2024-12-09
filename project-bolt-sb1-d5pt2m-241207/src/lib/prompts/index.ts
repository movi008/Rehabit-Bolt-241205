import { UserProfile } from '../../types';

export function generateAvatarPrompt(profile: UserProfile, style: 'professional' | 'creative'): string {
  const basePrompt = `Generate a high-quality ${style === 'professional' ? 'professional headshot' : 'creative portrait'} of a ${profile.gender} with ${profile.hairColor} hair and ${profile.eyeColor} eyes`;
  
  const styleModifiers = style === 'professional' 
    ? 'wearing ${profile.preferredClothing}, well-lit studio setting, neutral background'
    : 'artistic style, vibrant colors, creative lighting, expressive pose';
  
  const moodModifier = `expressing ${profile.mood} energy`;
  
  return `${basePrompt}, ${styleModifiers}, ${moodModifier}. High-quality, photorealistic, detailed facial features.`;
}