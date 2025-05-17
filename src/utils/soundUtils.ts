
// Collection of game sound effects

// Sound effect URLs
const SOUNDS = {
  buttonClick: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
  unlock: 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3',
  alert: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/221/221-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/950/950-preview.mp3',
  startup: 'https://assets.mixkit.co/active_storage/sfx/218/218-preview.mp3'
};

// Cache audio objects
const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * Preload all sound effects
 */
export const preloadSounds = (): void => {
  Object.entries(SOUNDS).forEach(([key, url]) => {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audioCache[key] = audio;
  });
};

/**
 * Play a sound effect
 * @param soundName - Name of the sound to play
 * @param volume - Volume level (0 to 1)
 */
export const playSound = (soundName: keyof typeof SOUNDS, volume = 0.5): void => {
  try {
    let audio = audioCache[soundName];
    
    // Create audio if not in cache
    if (!audio) {
      audio = new Audio(SOUNDS[soundName]);
      audioCache[soundName] = audio;
    }
    
    // Reset audio and play
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(error => {
      console.error(`Error playing sound '${soundName}':`, error);
    });
  } catch (error) {
    console.error(`Error with sound '${soundName}':`, error);
  }
};

export const stopAllSounds = (): void => {
  Object.values(audioCache).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
};

export default {
  preloadSounds,
  playSound,
  stopAllSounds
};
