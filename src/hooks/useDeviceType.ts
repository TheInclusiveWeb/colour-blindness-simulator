import { useEffect, useState } from 'react';

export type DeviceType = 'mobile' | 'desktop';

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const ua = navigator.userAgent;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    setDeviceType(isMobile ? 'mobile' : 'desktop');
  }, []);

  return deviceType as DeviceType;
};

export default useDeviceType;
