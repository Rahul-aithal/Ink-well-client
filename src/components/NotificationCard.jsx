import React, { useEffect, useState } from "react";
import { deleteNotifications, getNotifications } from "../apis/user";

function NotificationCard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await getNotifications();
        setNotifications(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array means this runs once on mount

  const handleRemove = async (id) => {
    setNotifications(
      notifications.filter((notification) => notification._id !== id)
    );
    console.log(id)
    await deleteNotifications(id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 mt-4">
      {notifications.map((notification) => (
        <div
          key={notification._id}
          onDoubleClick={() => handleRemove(notification._id)}
          className="grid-cols-2 gap-5 place-items-center justify-between text-xs md:text-sm text-gray-500  p-2 rounded-md"
        >
          <span>{notification.message}</span>
        </div>
      ))}
    </div>
  );
}

export default NotificationCard;
