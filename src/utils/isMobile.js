/* utility method for checking if we on mobile */

export const isMobile = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};