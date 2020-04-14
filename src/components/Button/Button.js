import React from 'react';
import clsx from 'clsx';
import classes from './Button.module.scss';

const Button = React.forwardRef((props, ref) => {
  const { className, icon, children, ...other } = props;
  return (
    <button className={clsx(classes.Button, className)} ref={ref} {...other}>
      {children}
      {icon}
    </button>
  );
});

export default Button;
