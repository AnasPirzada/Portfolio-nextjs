/**
 * Share API utility for mobile devices
 * Falls back to copying link to clipboard if Share API is not available
 */
export const shareContent = async ({ title, text, url }) => {
  const shareData = {
    title: title || 'Anas Pirzada - Full Stack Developer & AI Expert',
    text: text || 'Check out this portfolio!',
    url: url || window.location.href,
  };

  try {
    // Check if Share API is available
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      await navigator.share(shareData);
      return { success: true, method: 'share' };
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareData.url);
      return { success: true, method: 'clipboard' };
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      // User cancelled or error occurred
      console.error('Error sharing:', error);
      // Try clipboard as fallback
      try {
        await navigator.clipboard.writeText(shareData.url);
        return { success: true, method: 'clipboard' };
      } catch (clipboardError) {
        return { success: false, error: clipboardError };
      }
    }
    return { success: false, error };
  }
};

/**
 * Check if Share API is supported
 */
export const isShareSupported = () => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
};
