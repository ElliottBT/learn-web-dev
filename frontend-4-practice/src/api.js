export async function fetchToday() {
  const response = await fetch('/api/booking/today');
  if (!response.ok) {
    throw new Error('Сервер вернул ошибку ' + response.status);
  }
  return response.json();
}

export async function fetchSlots(date) {
  const params = new URLSearchParams({
    day: date.day,
    month: date.month - 1,
    year: date.year
  });
  const response = await fetch('/api/slots?' + params.toString());
  if (!response.ok) {
    throw new Error('Сервер вернул ошибку ' + response.status);
  }
  return response.json();
}
