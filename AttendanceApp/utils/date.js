export function formatDate(value) {
  return new Date(value).toLocaleDateString('he-IL');
}

export function formatTime(value) {
  return new Date(value).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function formatDuration(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} שעות ו-${minutes} דקות`;
}
