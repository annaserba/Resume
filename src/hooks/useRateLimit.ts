import { useState, useEffect } from 'react';

interface RateLimitOptions {
  maxRequests: number;  // Maximum number of requests allowed per day
  storageKey?: string;  // Key used for localStorage
}

interface RateLimitState {
  remainingRequests: number;
  isLimited: boolean;
  resetTime: Date;
}

/**
 * Hook to implement a simple rate limiting functionality using localStorage
 * This is a client-side fallback - ideally rate limiting should be implemented server-side
 */
export const useRateLimit = (options: RateLimitOptions = { maxRequests: 10 }) => {
  const { 
    maxRequests, 
    storageKey = 'chat_rate_limit' 
  } = options;
  
  const [state, setState] = useState<RateLimitState>({
    remainingRequests: maxRequests,
    isLimited: false,
    resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // Default to 24 hours from now
  });

  // Load rate limit data from localStorage on component mount
  useEffect(() => {
    const loadRateLimitData = () => {
      try {
        const storedData = localStorage.getItem(storageKey);
        
        if (storedData) {
          const data = JSON.parse(storedData);
          const now = new Date();
          const resetTime = new Date(data.resetTime);
          
          // If the reset time has passed, reset the counter
          if (now > resetTime) {
            setState({
              remainingRequests: maxRequests,
              isLimited: false,
              resetTime: new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now
            });
            saveRateLimitData({
              remainingRequests: maxRequests,
              isLimited: false,
              resetTime: new Date(now.getTime() + 24 * 60 * 60 * 1000)
            });
          } else {
            // Otherwise use the stored data
            setState({
              remainingRequests: data.remainingRequests,
              isLimited: data.remainingRequests <= 0,
              resetTime: resetTime
            });
          }
        }
      } catch (error) {
        console.error('Error loading rate limit data:', error);
        // If there's an error, reset to default values
        resetRateLimit();
      }
    };

    loadRateLimitData();
  }, [maxRequests, storageKey]);

  // Save rate limit data to localStorage
  const saveRateLimitData = (data: RateLimitState) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving rate limit data:', error);
    }
  };

  // Consume a request from the rate limit
  const consumeRequest = () => {
    const now = new Date();
    const resetTime = new Date(state.resetTime);
    
    // If reset time has passed, reset the counter
    if (now > resetTime) {
      const newState = {
        remainingRequests: maxRequests - 1,
        isLimited: maxRequests <= 1,
        resetTime: new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now
      };
      setState(newState);
      saveRateLimitData(newState);
      return true;
    }
    
    // If we're already limited, return false
    if (state.remainingRequests <= 0) {
      return false;
    }
    
    // Otherwise, consume a request
    const newState = {
      remainingRequests: state.remainingRequests - 1,
      isLimited: state.remainingRequests <= 1,
      resetTime: state.resetTime
    };
    setState(newState);
    saveRateLimitData(newState);
    return true;
  };

  // Reset the rate limit
  const resetRateLimit = () => {
    const now = new Date();
    const newState = {
      remainingRequests: maxRequests,
      isLimited: false,
      resetTime: new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now
    };
    setState(newState);
    saveRateLimitData(newState);
  };

  // Format the time until reset
  const getTimeUntilReset = (): string => {
    const now = new Date();
    const resetTime = new Date(state.resetTime);
    const diffMs = resetTime.getTime() - now.getTime();
    
    if (diffMs <= 0) return '0:00:00';
    
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    return `${diffHrs}:${diffMins.toString().padStart(2, '0')}:${diffSecs.toString().padStart(2, '0')}`;
  };

  return {
    remainingRequests: state.remainingRequests,
    isLimited: state.isLimited,
    resetTime: state.resetTime,
    timeUntilReset: getTimeUntilReset(),
    consumeRequest,
    resetRateLimit
  };
};

export default useRateLimit;
