import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import { useField } from '@rocketseat/unform';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ptBR', ptBR);

export default function DatePicker({ name, label, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleDateChangeRaw(e) {
    e.preventDefault();
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        locale={ptBR}
        dateFormat="dd/MM/yyyy"
        onChangeRaw={handleDateChangeRaw}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
