import React, { useRef, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function NumberFormatInput({
  name,
  label,
  format,
  id,
  onChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [valueFormatted, setValueFormatted] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.numAsString',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleValueChange({ value, formattedValue }) {
    setValueFormatted(formattedValue);
    if (onChange) onChange({ value, formattedValue });
  }

  useEffect(() => {
    setValueFormatted(defaultValue);
  }, [defaultValue]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <NumberFormat
        name={fieldName}
        format={format}
        id={id}
        value={valueFormatted}
        onValueChange={values => handleValueChange(values)}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
