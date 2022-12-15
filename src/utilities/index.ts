export const formatTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  }

  return time;
};

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const mins = date.getMinutes();

  return `${day}-${month}-${year} ${formatTime(hrs)}:${formatTime(mins)}`;
};

export const truncateText = (str: string, maxLength = 150) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
};
