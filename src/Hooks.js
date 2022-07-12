import { useEffect, useRef, useState } from 'react';
import defaultAxios from 'axios';

// useInput
export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

// useTabs
export const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

// useTitle
export const useTitle = initialTitle => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

// useClick
export const useClick = onClick => {
  const element = useRef();
  useEffect(() => {
    if (typeof onClick !== 'function') {
      return;
    }
    if (element.current) {
      element.current.addEventListener('click', onClick);
    }
    return () => {
      if (element.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        element.current.removeEventListener('click', onClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return element;
};

// useConfirm
export const useConfirm = (message = '', onConfirm, onCancel) => {
  if (onConfirm && typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

// usePreventLeave
export const usePreventLeave = () => {
  const listener = event => {
    event.preventDefault();
    event.returnValue = '';
  };
  const enablePrevent = () => window.addEventListener('beforeunload', listener);
  const disablePrevent = () =>
    window.removeEventListener('beforeunload', listener);
  return { enablePrevent, disablePrevent };
};

// useBeforeLeave
export const useBeforeLeave = onBefore => {
  const handle = event => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    if (typeof onBefore !== 'function') {
      return;
    }
    document.addEventListener('mouseleave', handle);
    return () => document.removeEventListener('mouseleave', handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// useFadeIn
export const useFadeIn = (duration = 1, delay = 0, animate = 'ease') => {
  const element = useRef();
  useEffect(() => {
    if (
      typeof duration !== 'number' ||
      typeof delay !== 'number' ||
      typeof animate !== 'string'
    ) {
      return;
    }
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ${animate} ${delay}s`;
      current.style.opacity = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

// useNetwork
export const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === 'function') {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener('online', handleChange);
    window.addEventListener('offline', handleChange);
    return () => {
      window.removeEventListener('online', handleChange);
      window.removeEventListener('offline', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return status;
};

// useScroll
export const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = () => {
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
};

// useFullscreen
export const useFullscreen = () => {
  const element = useRef();
  const trigger = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullScreen) {
        element.current.mozRequestFullScreen();
      } else if (element.current.webkitRequestFullscreen) {
        element.current.webkitRequestFullscreen();
      } else if (element.current.msRequestFullscreen) {
        element.current.msRequestFullscreen();
      }
    }
  };
  const exitFull = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };
  return { element, trigger, exitFull };
};

// useNotification
export const useNotification = (title, options) => {
  if (!('Notification' in window)) {
    return;
  }
  const fierNotif = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fierNotif;
};

// useAxios
export const useAxios = (options, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  const reFetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  };

  useEffect(() => {
    if (!options.url) {
      return;
    }
    axiosInstance(options)
      .then(data => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch(error => {
        setState({ ...state, loading: false, error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return { ...state, reFetch };
};
