import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventById } from '../services/eventService';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await fetchEventById(id!); 
        setEvent(response);
      } catch (err) {
        setError('Event not found');
        console.error('Error fetching event details:', err);
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {event ? (
        <>
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">{event.date}</p>
            <p className="text-lg text-gray-600">{event.location}</p>
          </div>
          <div className="mt-6">
            <Link
              to="/"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Back to Events
            </Link>
          </div>
        </>
      ) : (
        <p>Event details could not be found.</p>
      )}
    </div>
  );
};

export default EventDetails;
