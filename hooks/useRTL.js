import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

/**
 * Custom hook for RTL-aware styling and utilities
 * @returns {Object} RTL utilities and helper functions
 */
export const useRTL = () => {
  const { isRTL, dir, language } = useLanguage();

  const rtlUtils = useMemo(() => ({
    // Direction
    isRTL,
    dir,
    language,
    
    // Flexbox direction helpers
    flexRow: isRTL ? 'flex-row-reverse' : 'flex-row',
    flexRowReverse: isRTL ? 'flex-row' : 'flex-row-reverse',
    
    // Text alignment
    textStart: isRTL ? 'text-right' : 'text-left',
    textEnd: isRTL ? 'text-left' : 'text-right',
    
    // Margin/Padding start/end
    marginStart: (value) => isRTL ? `mr-${value}` : `ml-${value}`,
    marginEnd: (value) => isRTL ? `ml-${value}` : `mr-${value}`,
    paddingStart: (value) => isRTL ? `pr-${value}` : `pl-${value}`,
    paddingEnd: (value) => isRTL ? `pl-${value}` : `pr-${value}`,
    
    // Position helpers
    start: isRTL ? 'right' : 'left',
    end: isRTL ? 'left' : 'right',
    startClass: (value) => isRTL ? `right-${value}` : `left-${value}`,
    endClass: (value) => isRTL ? `left-${value}` : `right-${value}`,
    
    // Transform helpers
    translateXStart: (value) => isRTL ? `translate-x-${value}` : `-translate-x-${value}`,
    translateXEnd: (value) => isRTL ? `-translate-x-${value}` : `translate-x-${value}`,
    
    // Border radius helpers
    roundedStart: (size = 'lg') => isRTL ? `rounded-r-${size}` : `rounded-l-${size}`,
    roundedEnd: (size = 'lg') => isRTL ? `rounded-l-${size}` : `rounded-r-${size}`,
    
    // Icon rotation for directional icons (arrows, chevrons)
    iconRotation: isRTL ? 'rotate-180' : '',
    
    // Conditional class helper
    rtlClass: (ltrClass, rtlClass) => isRTL ? rtlClass : ltrClass,
    
    // Style object helper for inline styles
    rtlStyle: (ltrStyle, rtlStyle) => isRTL ? rtlStyle : ltrStyle,
  }), [isRTL, dir, language]);

  return rtlUtils;
};

export default useRTL;
