export const ROLES = {
    ADMIN: 'Admin',
    EDITOR: 'Editor',
    // VIEWER: 'Viewer'
  };
  
  export const CATEGORIES = [
    'Technology',
    'Travel',
    'Food',
    'Lifestyle',
    'Health',
    'Business'
  ];
  

  
  export const MOCK_USERS = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: ROLES.ADMIN
    },
    {
      id: 2,
      username: 'editor',
      password: 'editor123',
      role: ROLES.EDITOR
    },
    {
      id: 3,
      username: 'viewer',
      password: 'viewer123',
      role: ROLES.VIEWER
    }
  ];