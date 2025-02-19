export const taskPrompts = [
  "Suggest a productive task that would help with personal development.",
  "Recommend a task that could improve work efficiency.",
  "What's a meaningful task for maintaining a healthy lifestyle?",
  "Suggest a task that would help with organization or decluttering.",
  "Recommend a task for learning something new.",
  "What's a task that could improve relationships or social connections?",
  "Suggest a task for mental wellbeing or stress reduction.",
  "What's a creative task that could be added to the todo list?",
  "Recommend a task for improving the home environment.",
  "Suggest a task that contributes to long-term goals.",
];

export function getRandomPrompt(): string {
  const randomIndex = Math.floor(Math.random() * taskPrompts.length);
  return taskPrompts[randomIndex];
} 