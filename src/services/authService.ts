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
    // First, verify we can connect to NocoDB
    // For v0.262.4, we need to use the correct API endpoint format
    const testConnectionUrl = `${NOCODB_CONFIG.host}api/v1/db/meta/projects/${NOCODB_CONFIG.baseId}/tables`;
    
    console.log('Testing connection to:', testConnectionUrl);
    
    const testResponse = await fetch(testConnectionUrl, {
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
    
    // Now find the user by email using the correct v0.262.4 API format
    const apiUrl = `${NOCODB_CONFIG.host}api/v1/db/data/v1/${NOCODB_CONFIG.baseId}/${NOCODB_CONFIG.tableId}`;
    const whereClause = `(${NOCODB_CONFIG.emailFieldId},eq,${encodeURIComponent(credentials.email)})`;
    
    console.log('API URL:', `${apiUrl}?where=${whereClause}`);
    
    const response = await fetch(`${apiUrl}?where=${whereClause}`, {
      method: 'GET',
      headers: {
        'xc-token': NOCODB_CONFIG.apiToken,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const responseData = await response.json();
    console.log('Response data:', responseData);
    
    // In v0.262.4, the response format might be different
    const users = Array.isArray(responseData) ? responseData : (responseData.list || []);
    
    // Check if user exists
    if (users.length === 0) {
      console.log('No user found with email:', credentials.email);
      return {
        success: false,
        message: 'User not found'
      };
    }
    
    // Get the first matching user
    const userData = users[0];
    
    // Log the actual field values for debugging
    console.log('Found user:', userData);
    console.log('Email field value:', userData[NOCODB_CONFIG.emailFieldId]);
    console.log('Password field value:', userData[NOCODB_CONFIG.passwordFieldId]);
    console.log('Provided password:', credentials.password);
    
    // Get the password field from the response
    const storedPassword = userData[NOCODB_CONFIG.passwordFieldId];
    
    // Check if password field exists in the response
    if (storedPassword === undefined) {
      console.error('Password field not found in response');
      return {
        success: false,
        message: 'Authentication error: Password field not found'
      };
    }
    
    // Compare the provided password with the stored password
    if (storedPassword === credentials.password) {
      // Password matches, login successful
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return {
        success: true,
        message: 'Login successful',
        user: userData
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
