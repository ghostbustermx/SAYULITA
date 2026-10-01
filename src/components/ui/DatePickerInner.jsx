'use client';

import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInner = forwardRef(function DatePickerInner(props, ref) {
  return <DatePicker ref={ref} {...props} />;
});

export default DatePickerInner;
