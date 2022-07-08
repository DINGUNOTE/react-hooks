import { useEffect, useRef, useState } from 'react';

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
