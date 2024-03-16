import React, { useEffect, useState } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const calculateTimeLeft = (expiryDate) => {
    if (!expiryDate) {
      return null;
    }
    const expiryTimestamp = expiryDate / 1000;
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTimeInSeconds = expiryTimestamp - currentTime;
    if (remainingTimeInSeconds <= 0) {
      return null;
    }
    const remainingHours = Math.floor(remainingTimeInSeconds / 3600);
    const remainingMinutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
    const remainingSeconds = Math.floor(remainingTimeInSeconds % 60);

    return {
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = calculateTimeLeft(expiryDate);
      setTimeLeft(remainingTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return (
    <div className="de_countdown">
      {timeLeft && (
        <>
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
