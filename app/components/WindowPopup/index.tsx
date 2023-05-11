/**
 *
 * ToggleOption
 *
 */

import { useEffect, useState, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface WindowPopupProps {
  children?: ReactNode;
}

const WindowPopup = (props: WindowPopupProps) => {
  const [container, setContainer] = useState<any>(null);
  const newWindow = useRef<any>(null);

  useEffect(() => {
    // Create container element on client-side
    setContainer(document.createElement('div'));
  }, []);

  useEffect(() => {
    // When container is ready
    if (container) {
      // Create window
      newWindow.current = window.open(
        '',
        '',
        'width=600,height=400,left=200,top=200',
      );
      // Append container
      newWindow.current?.document.body.appendChild(container);

      // Save reference to window for cleanup
      const curWindow = newWindow.current;

      // Return cleanup function
      return () => curWindow.close();
    }
    return;
  }, [container]);

  return container && createPortal(props.children, container);
};

export default WindowPopup;
