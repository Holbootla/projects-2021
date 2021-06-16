const API_URL = 'http://127.0.0.1:3000';
const GARAGE = `${API_URL}/garage`;
const ENGINE = `${API_URL}/engine`;
const WINNERS = `${API_URL}/winners`;

export const getCars = async (
  page = 1,
  limit = 7
): Promise<{
  cars: { name: string; color: string; id: number }[];
  carsCount: string | null;
}> => {
  const response = await fetch(`${GARAGE}?_page=${page}&_limit=${limit}`);
  return {
    cars: await response.json(),
    carsCount: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (
  id: number
): Promise<{ name: string; color: string; id: number }> => {
  return (await fetch(`${GARAGE}/${id}`)).json();
};

export const createCar = async (body: {
  name: string;
  color: string;
}): Promise<void> => {
  (
    await fetch(`${GARAGE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  ).json();
};

export const deleteCar = async (id: number): Promise<void> => {
  (await fetch(`${GARAGE}/${id}`, { method: 'DELETE' })).json();
};

export const updateCar = async (
  id: number,
  body: { name: string; color: string }
): Promise<void> => {
  (
    await fetch(`${GARAGE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  ).json();
};

export const startEngine = async (
  id: number
): Promise<{ velocity: number; distance: number }> => {
  return (await fetch(`${ENGINE}?id=${id}&status=started`)).json();
};

export const stopEngine = async (id: number): Promise<void> => {
  return (await fetch(`${ENGINE}?id=${id}&status=stopped`)).json();
};

export const driveEngine = async (
  id: number
): Promise<{ success: boolean }> => {
  const response = await fetch(`${ENGINE}?id=${id}&status=drive`).catch();
  if (response.status !== 200) {
    return { success: false };
  }
  return response.json();
};

export type WinnersSort = 'id' | 'wins' | 'time';
export type WinnersOrder = 'ASC' | 'DESC';

export const getWinners = async (
  page = 1,
  limit = 10,
  sort: WinnersSort = 'time',
  order: WinnersOrder = 'ASC'
): Promise<{
  winners: { id: number; wins: number; time: number }[];
  winnersCount: string | null;
}> => {
  const response = await fetch(
    `${WINNERS}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );
  return {
    winners: await response.json(),
    winnersCount: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (
  id: number
): Promise<{ id: number; wins: number; time: number }> => {
  return (await fetch(`${WINNERS}/${id}`)).json();
};

export const createWinner = async (body: {
  id: number;
  wins: number;
  time: number;
}): Promise<void> => {
  (
    await fetch(`${WINNERS}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  ).json();
};

export const deleteWinner = async (id: number): Promise<void> => {
  (await fetch(`${WINNERS}/${id}`, { method: 'DELETE' })).json();
};

export const updateWinner = async (
  id: number,
  body: { wins: number; time: number }
): Promise<void> => {
  (
    await fetch(`${WINNERS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  ).json();
};
