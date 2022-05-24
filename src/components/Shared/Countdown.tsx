import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

const Countdown = ({ endDate }: { endDate?: string }) => {
  const [countdown, setCountdown] = useState(0);

  const countdownStart = useMemo(() => {
    const _date_end = endDate?.toString() || '';
    const _seconds = dayjs(_date_end).diff(dayjs(), 'milliseconds');
    return _seconds;
  }, [endDate]);

  useEffect(() => {
    if (countdownStart === 0) {
      setCountdown(0);
    } else {
      setCountdown(countdownStart);
    }
  }, [countdownStart]);

  useEffect(() => {
    const _interval = 1000;
    if (countdown > _interval) {
      const _timeout = setTimeout(() => {
        setCountdown((prevVal) => prevVal - _interval);
        clearTimeout(_timeout);
      }, _interval);
    }
  }, [countdown]);

  const countdownDisplay = useMemo(() => {
    const _toSeconds = countdown / 1000;
    const cd = 24 * 60 * 60;
    const d = Math.floor(_toSeconds / cd);
    const h = Math.floor((_toSeconds / 3600) % 24);
    const m = Math.floor(((_toSeconds - h * 3600) / 60) % 60);
    const s = Math.floor(_toSeconds % 60);
    return `${d}d ${h}hr ${m}m ${s}s`;
  }, [countdown]);

  return <div>{countdownDisplay}</div>;
};

export default Countdown;
