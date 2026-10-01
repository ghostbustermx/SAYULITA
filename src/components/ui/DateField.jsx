'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const DatePicker = dynamic(() => import('./DatePickerInner'), { ssr: false });

let preloadStarted = false;

function preloadDatePicker() {
  if (preloadStarted) return;
  preloadStarted = true;
  import('./DatePickerInner');
}

function formatSelected(selected) {
  if (!selected) return '';
  return selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function DateField({
  selected,
  placeholderText,
  dateFormat,
  onFocus,
  onBlur,
  ...rest
}) {
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // El swap se hace en una tarea posterior: si se reemplaza el input a mitad
  // de la secuencia pointerdown/up/click, el clic que cierra el calendario
  // aterriza en el input nuevo y lo cierra al instante.
  const activate = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setMounted(true);
    }, 0);
  }, []);

  const activatePicker = useCallback((picker) => {
    if (!picker) return;
    if (typeof picker.setOpen === 'function') picker.setOpen(true);
    if (typeof picker.setFocus === 'function') picker.setFocus();
  }, []);

  const handleFocus = useCallback(
    (event) => {
      if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) {
        activate();
      }
      if (onFocus) onFocus(event);
    },
    [activate, onFocus]
  );

  return (
    <span style={{ display: 'contents' }}>
      {mounted ? (
        <DatePicker
          ref={activatePicker}
          selected={selected}
          placeholderText={placeholderText}
          dateFormat={dateFormat}
          onFocus={handleFocus}
          onBlur={onBlur}
          {...rest}
        />
      ) : (
        <div className="react-datepicker-wrapper" onFocus={handleFocus}>
          <div className="react-datepicker__input-container">
            <input
              type="text"
              readOnly
              id={rest.id}
              value={formatSelected(selected)}
              placeholder={placeholderText}
              className="lazy-datepicker-trigger"
              onPointerDown={preloadDatePicker}
              onPointerEnter={preloadDatePicker}
              onClick={activate}
            />
          </div>
        </div>
      )}
    </span>
  );
}
