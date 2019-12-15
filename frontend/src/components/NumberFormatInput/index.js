import React, { useRef, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function NumberFormatInput({
  name,
  label,
  format,
  id,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [formattedValue, setFormattedValue] = useState(defaultValue);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.realvalue',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(e) {
    const { value } = e.target;
    return setFormattedValue(value);
  }

  function handleValueChange({ value }) {
    return setCurrentValue(value);
  }

  useEffect(() => {
    setFormattedValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <NumberFormat
        name={fieldName}
        format={format}
        id={id}
        defaultValue={defaultValue}
        value={formattedValue}
        realvalue={currentValue}
        onChange={e => handleChange(e)}
        onValueChange={values => handleValueChange(values)}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
