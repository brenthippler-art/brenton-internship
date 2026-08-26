import React, { useState, useEffect } from "react";

const getTimeRemaining = (expiryDate) => {
  const total = expiryDate - Date.now();
  if (total <= 0) {
    return null;
  }
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { hours, minutes, seconds };
};

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(expiryDate));

  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) {
    return null;
  }

  if (!timeLeft) {
    return <div className="de_countdown">Expired</div>;
  }

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

export default CountdownTimer;