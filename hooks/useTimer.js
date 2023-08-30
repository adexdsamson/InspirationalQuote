import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const useTimer = (props) => {
  const {
    initialHour = 0,
    initialMinute = 0,
    initialSeconds = 0,
    interval = 1000,
    onCompleted,
  } = props;

  const [hours, setHours] = useState(initialHour);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (seconds === 0 && hours === 0 && minutes === 0) {
      setIsCompleted(true);
      onCompleted?.();
    }
  }, [seconds, hours, minutes, onCompleted]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(myInterval);
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, interval);
    return () => {
      clearInterval(myInterval);
    };
  });

  const Timer = () => {
    const Typography = "p";
    return (
      <div>
        {minutes === 0 && seconds === 0 ? null : (
          <Text
            style={{
              color: "#ED1000",
              fontSize: 15.3952,
              lineHeight: 19,
              fontWeight: 700,
            }}
          >
            {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}
      </div>
    );
  };

  return {
    Timer,
    isCompleted,
    timeOptions: { hours, minutes, seconds },
  };
};

export default useTimer;
