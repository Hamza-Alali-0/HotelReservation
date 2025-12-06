import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hotelService, roomService } from "@/services/api";
import type { Hotel, Room } from "@/types";

export const ManageRooms: React.FC = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [hotelId]);

  const loadData = async () => {
    try {
      const hotelData = await hotelService.getHotelById(Number(hotelId));
      const roomsData = await roomService.getRoomsByHotel(Number(hotelId));
      setHotel(hotelData);
      setRooms(roomsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {hotel?.name} - Rooms
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate(`/admin/hotel/${hotelId}/create-room`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No rooms found</p>
            <button
              onClick={() => navigate(`/admin/hotel/${hotelId}/create-room`)}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Your First Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {room.type}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      room.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {room.available ? "Available" : "Occupied"}
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${room.price}/night
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>Capacity: {room.capacity} guests</p>
                  <p>Size: {room.size} m²</p>
                </div>
                <button
                  onClick={() => navigate(`/admin/room/${room.id}/edit`)}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Edit Room
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
