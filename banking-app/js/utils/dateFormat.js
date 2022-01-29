function dateFormat(date = new Date()) {
  const localeDate = date.toLocaleDateString("ro-RO");

  const hour = formatSmallValues(date.getHours());
  const minute = formatSmallValues(date.getMinutes());

  return `${localeDate}[${hour}:${minute}]`;
}

function formatSmallValues(value) {
  return value < 10 ? `0${value}` : value;
}

export default dateFormat;
