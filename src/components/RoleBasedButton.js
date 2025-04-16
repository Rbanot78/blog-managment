import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RoleBasedButton = ({ role, onClick, children, as: Component = 'button', ...props }) => {
  const { hasRole } = useContext(AuthContext);

  if (!hasRole(role)) {
    return null;
  }

  return (
    <Component onClick={onClick} {...props}>
      {children}
    </Component>
  );
};

export default RoleBasedButton;
