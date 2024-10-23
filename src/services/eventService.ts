import axios from 'axios';
import { Event } from '../types/Event';

const API_URL = 'http://localhost:5000/api/v1'; 

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching events');
  }
};

export const fetchEventById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/events/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching specific events');

    }
    
  };

export const fetchUserEvents = async (): Promise<Event[]> => {
  const token = localStorage.getItem('token'); 
  console.log(`Event TOKS: ${token}`)
  try {
    const response = await axios.get(`${API_URL}/events/my-events`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw error; 
  }
};



export const deleteEvent = async (id: string) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateEvent = async (id: string, updatedEvent: Event) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.patch(`http://localhost:5000/api/v1/events/${id}`, updatedEvent, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating event');
  }
};
