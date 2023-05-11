import React, {createContext, useContext, useState, useEffect} from "react";

const MetronicSplashScreenContext = createContext({} as any);

export function MetronicSplashScreenProvider({ children }) {
  const [count, setCount] = useState(0);
  let visible = count > 0;

  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");

    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove("hidden");

      return () => {
        splashScreen.classList.add("hidden");
      };
    }

    // Hide SplashScreen
    let timeout;
    if (splashScreen && !visible) {
      timeout = setTimeout(() => {
        splashScreen.classList.add("hidden");
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  console.log(`THIENNNNNN::::::::::::::`)

  return (
    <MetronicSplashScreenContext.Provider value={setCount}>
      {children}
    </MetronicSplashScreenContext.Provider>
  );
}

export function LayoutSplashScreen({ visible = true }) {
  // Everything are ready - remove splashscreen
  console.log(`LOADING::::::::::::::`)
  const setCount = useContext(MetronicSplashScreenContext);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setCount(prev => {
      return prev + 1;
    });

    return () => {
      setCount(prev => {
        return prev - 1;
      });
    };
  }, [setCount, visible]);

  return null;
}
