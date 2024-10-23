import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string; 
  description: string;
}

interface EventCardProps {
  event: Event;
}

const formatDateTime = (dateTime: string) => {
  const dateObj = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return dateObj.toLocaleDateString(undefined, options);
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p className="text-gray-600">{formatDateTime(event.date)}</p>
      <p className="text-gray-800">{event.description}</p>
    </div>
  );
};

export default EventCard;
