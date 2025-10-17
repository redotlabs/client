export function formatTimer(distance: number | null) {
  if (!distance) return null;

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  if (minutes === 0) return paddedSeconds;
  return `${paddedMinutes}:${paddedSeconds}`;
}
