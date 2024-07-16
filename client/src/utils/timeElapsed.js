// Calulates number of hours elapsed from post creation till the current time
export default function calculateElapsedHours(timestamp) {
  const timestampDate = new Date(timestamp);
  const currentDate = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds(),
      new Date().getUTCMilliseconds()
    )
  );
  const differenceInMs = currentDate - timestampDate;

  const hoursElapsed = differenceInMs / (1000 * 60 * 60);
  return Math.round(hoursElapsed);
}
