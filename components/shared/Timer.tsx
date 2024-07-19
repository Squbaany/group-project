"use client";

import { time } from "console";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

const Timer = ({ countDownto }: { countDownto: Date }) => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date(countDownto);
  targetDate.setDate(targetDate.getDate() + 1);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = Math.max(
        Number(targetDate) - Number(currentTime),
        0
      );

      console.log(timeDifference);

      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTime({ hours, minutes, seconds });

      if (timeDifference === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
    return (
      <div className="border p-4 rounded-xl">
        <p className="p-bold-16">Loading...</p>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-xl">
      <p className="p-bold-16">
        {time.hours} : {time.minutes} : {time.seconds}
      </p>
    </div>
  );
};

export default Timer;
