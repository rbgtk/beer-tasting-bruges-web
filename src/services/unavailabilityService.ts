import api from '@/axios';
import type { Unavailability } from '@/models/unavailability';

export async function createUnavailability(unavailability: Unavailability): Promise<Unavailability> {
  const response = await api.post('/api/unavailabilities', unavailability);
  return response.data;
}

export async function fetchUnavailabilities(): Promise<Unavailability[]> {
  const response = await api.get('/api/unavailabilities');
  return response.data;
}

export async function updateUnavailability(unavailability: Unavailability): Promise<Unavailability> {
  const response = await api.put(`/api/exeptions/${unavailability.id}`, unavailability);
  return response.data;
}

export async function deleteUnavailability(unavailability: Unavailability): Promise<void> {
  await api.delete(`/api/unavailabilities/${unavailability.id}`);
}
