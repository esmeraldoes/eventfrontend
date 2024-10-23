import React, { useEffect, useState } from 'react';
import { fetchUserEvents, deleteEvent, fetchEventById, updateEvent } from '../services/eventService';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { Event } from '../types/Event';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [editEventDetails, setEditEventDetails] = useState<Event | null>(null);


  useEffect(() => {
    const getUserEvents = async () => {
      try {
        const userEvents = await fetchUserEvents();
        setEvents(userEvents);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    getUserEvents();
  }, []);

  const handleDelete = (id: string) => {
    setSelectedEventId(id);
    setDeleteModalIsOpen(true); 
  };

  const confirmDelete = async () => {
    if (!selectedEventId) {
      return; 
    }

    try {
      await deleteEvent(selectedEventId);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id.toString() !== selectedEventId));
      closeModals(); 
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const eventDetails = await fetchEventById(id);
      setEditEventDetails(eventDetails);
      setSelectedEventId(id);
      setEditModalIsOpen(true); 
    } catch (err) {
      setError('Failed to load event details');
    }
  };

  const saveEdit = async () => {
    if (selectedEventId && editEventDetails) {
      try {
        await updateEvent(selectedEventId, editEventDetails);
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id.toString() === selectedEventId ? editEventDetails : event))
        );
        closeModals(); 
      } catch (err) {
        setError('Failed to update event');
      }
    }
  };

  const closeModals = () => {
    setDeleteModalIsOpen(false);
    setEditModalIsOpen(false);
    setSelectedEventId(null);
    setEditEventDetails(null);
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Events</h1>
      <Link
        to="/create-event"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-700 transition duration-300"
      >
        Create Event
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : events.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          
          events.map((event, index) => (
            <div key={event._id || index} className="relative">
              <EventCard event={{ ...event, id: event._id }}  />
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  onClick={() => handleEdit(event._id.toString())}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(event._id.toString())}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeModals}
        contentLabel="Delete Event Confirmation"
        className="bg-white p-4 rounded-lg max-w-sm mx-auto my-8 shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this event?</h2>
        <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded mr-2">Yes, Delete</button>
        <button onClick={closeModals} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeModals}
        contentLabel="Edit Event"
        className="bg-white p-4 rounded-lg max-w-md mx-auto my-8 shadow-lg"
      >

{editEventDetails && (
  <form>
    <h2 className="text-lg font-bold mb-4">Edit Event</h2>
    <label className="block mb-2">
      Event Name:
      <input
        type="text"
        value={editEventDetails.title || ""}  
        onChange={(e) => setEditEventDetails({ ...editEventDetails, title: e.target.value })}
        className="block w-full border rounded p-2 mb-2"
      />
    </label>
    <label className="block mb-4">
      Description:
      <textarea
        value={editEventDetails.description || ""} 
        onChange={(e) => setEditEventDetails({ ...editEventDetails, description: e.target.value })}
        className="block w-full border rounded p-2"
      />
    </label>
    <button
      type="button"
      onClick={saveEdit}
      className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
    >
      Save Changes
    </button>
    <button type="button" onClick={closeModals} className="bg-gray-400 text-white px-4 py-2 rounded">
      Cancel
    </button>
  </form>
)}
      </Modal>
    </div>
  );
};

export default Dashboard;

