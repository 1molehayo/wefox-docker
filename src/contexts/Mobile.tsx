import React, { useState, createContext } from 'react';
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';

export const MobileContext = createContext({
  isMobile: false,
  isTab: false
});

interface IMobile {
  children: React.ReactNode;
}

const MobileContextProvider = ({ children }: IMobile) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  const updateWindowDimensions = () => {
    setIsTab(window.innerWidth <= 990);
    setIsMobile(window.innerWidth <= 600);
  };

  useEventListener('resize', updateWindowDimensions);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    updateWindowDimensions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MobileContext.Provider
      value={{
        isMobile,
        isTab
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export default MobileContextProvider;
