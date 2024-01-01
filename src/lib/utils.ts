import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function formatTimeInSeconds(timeInSeconds: number): string {
  const hours = Math.trunc(timeInSeconds / 3600);
  const minutes = Math.trunc((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;
  return `${hours}:${minutes.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  })}:${seconds.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  })}`;
}
