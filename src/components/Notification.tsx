// components/Notification.tsx
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return visible ? (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  ) : null;
};

export default Notification;
