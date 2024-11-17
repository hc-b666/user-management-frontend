export const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

export function calculateDiff(date: Date): string {
  const currentDate = new Date();
  const lastSeen = new Date(date);

  const diff = currentDate.getTime() - lastSeen.getTime();

  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  let answer = "";

  if (diffSeconds < 60) answer = `${diffSeconds} seconds ago`;
  else if (diffMinutes < 60) answer = `${diffMinutes} minutes ago`;
  else if (diffHours < 24) answer = `${diffHours} hours ago`;
  else if (diffDays < 7) answer = `${diffDays} days ago`;
  else answer = `Last seen more than a week ago`;

  return answer;
};

export function getDate(date: Date): string {
  const lastSeen = new Date(date);

  const month = lastSeen.getMonth();
  const day = lastSeen.getDate();
  const year = lastSeen.getFullYear();
  const hours = lastSeen.getHours().toString().padStart(2, "0");
  const minutes = lastSeen.getMinutes().toString().padStart(2, "0");
  const seconds = lastSeen.getSeconds().toString().padStart(2, "0");

  return `${months[month]} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
};
