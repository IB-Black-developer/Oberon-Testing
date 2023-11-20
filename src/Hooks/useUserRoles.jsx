import { useState, useEffect } from 'react';

const useUserRole = (org) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (org && org.permissions && org.permissions.length > 0) {
      const userPermission = org.permissions[0].text;

      switch (userPermission) {
        case 'general_user_non_line_manager':
          setUserRole('General User (Non Line Manager)');
          break;
        case 'general_user_line_manager':
          setUserRole('General User (Line Manager)');
          break;
        case 'super_admin':
          setUserRole('Super Admin');
          break;
        case 'admin_hr':
          setUserRole('Admin (HR)');
          break;
        case 'admin_non_hr':
          setUserRole('Admin (Non HR)');
          break;
        default:
          setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [org]);

  return userRole;
};

export default useUserRole;
