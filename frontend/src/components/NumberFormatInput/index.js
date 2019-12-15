import React, { useRef, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import { useField } from '@rocketseat/unform';

export default function NumberFormatInput({ name, format, id, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(e) {
    const { value } = e.target;
    return setCurrentValue(value);
  }

  useEffect(() => {
    console.tron.log(defaultValue);
    setCurrentValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <NumberFormat
        name={fieldName}
        format={format}
        id={id}
        defaultValue={defaultValue}
        value={currentValue}
        onChange={e => handleChange(e)}
        ref={ref}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
