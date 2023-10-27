export function formatAMPM(unadjusted: Date) {
  const date = new Date(unadjusted).toLocaleTimeString("en-US").toString();
  const timeOfTheDay = date.split(" ")[1].toLowerCase();
  const times = date.split(":");
  const time = `${times[0]}:${times[1]}${timeOfTheDay}`;
  return time;
}
function appendZero(t: string) {
  if (parseInt(t) > 9) return t;
  return `0${t}`;
}

export function formatDayMonth(unadjusted: Date) {
  const date = new Date(unadjusted).toLocaleDateString("en-US");
  const times = date.split("/");
  return `${appendZero(times[0])}.${appendZero(times[1])}`;
}

export function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
