const decodedString = (text: string) => decodeURIComponent(text);

const capitalized = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const TextUtility = {
  capitalized,
  decodedString,
};
