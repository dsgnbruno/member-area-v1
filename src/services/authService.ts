// NocoDB configuration
const NOCODB_CONFIG = {
  host: 'https://nocodb.bbtqj1.easypanel.host/',
  baseId: 'pzezd6u18bjbe4r',
  tableId: 'm1pjssubll7aqlh',
  apiToken: 'ugotnKik_E0FBXkZsdwdARlwWvNTqQg7R2Kirriy',
  emailFieldId: 'cv9q51c8djt9uw9',
  passwordFieldId: 'cpcsmtdxachjpg9'
};

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: any;
}

export const loginWithNocoDB = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    console.log('Attempting login with:', credentials.email);
    
    // For v0.262.4, the correct data API endpoint format
    const apiUrl = `${NOCODB_CONFIG.host}api/v1/db/data/noco/${NOCODB_CONFIG.baseId}/${NOCODB_CONFIG.tableId}`;
    
    // First, try to get all records to verify connection and see the actual data structure
    console.log('Testing connection to:', apiUrl);
    
    const testResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'xc-token': NOCODB_CONFIG.apiToken,
        'Accept': 'application/json'
      }
    });
    
    if (!testResponse.ok) {
      console.error('NocoDB connection test failed:', testResponse.status, await testResponse.text());
      return {
        success: false,
        message: 'Could not connect to authentication service'
      };
    }
    
    const allData = await testResponse.json();
    console.log('All data structure:', allData);
    
    // Check if we got a list property in the response (v0.262.4 format)
    const allUsers = allData.list || allData;
    
    if (!Array.isArray(allUsers)) {
      console.error('Unexpected response format:', allData);
      return {
        success: false,
        message: 'Unexpected response format from authentication service'
      };
    }
    
    // Log the first user to see the actual field structure
    if (allUsers.length > 0) {
      console.log('Sample user structure:', allUsers[0]);
    }
    
    // Find the user by email manually from all users
    const user = allUsers.find(u => 
      u[NOCODB_CONFIG.emailFieldId] === credentials.email || 
      u.email === credentials.email
    );
    
    if (!user) {
      console.log('No user found with email:', credentials.email);
      return {
        success: false,
        message: 'User not found'
      };
    }
    
    // Log the found user for debugging
    console.log('Found user:', user);
    
    // Try both the field ID and common field names for password
    const storedPassword = user[NOCODB_CONFIG.passwordFieldId] || user.password;
    
    if (storedPassword === undefined) {
      console.error('Password field not found in user data');
      console.log('Available fields:', Object.keys(user));
      return {
        success: false,
        message: 'Authentication error: Password field not found'
      };
    }
    
    console.log('Comparing passwords:', {
      provided: credentials.password,
      stored: storedPassword
    });
    
    // Compare the provided password with the stored password
    if (credentials.password === storedPassword) {
      // Password matches, login successful
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(user));
      
      return {
        success: true,
        message: 'Login successful',
        user: user
      };
    } else {
      // Password doesn't match
      console.log('Password mismatch');
      return {
        success: false,
        message: 'Invalid password'
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    };
  }
};

export const logout = (): void => {
  // Clear authentication data
  localStorage.removeItem('userLoggedIn');
  sessionStorage.removeItem('userLoggedIn');
  localStorage.removeItem('userData');
};
