import { m, useReducedMotion } from 'framer-motion';
import { forwardRef } from 'react';
import { useMotionTier } from '@/lib/motionTier';
import {
  defaultViewport,
  fadeIn,
  fadeUp,
  instantStaggerContainer,
  instantVisible,
  pickFadeInVariant,
  pickFadeUpVariant,
  pickStaggerContainer,
  staggerContainer,
} from '@/lib/motionVariants';

/**
 * Scroll-triggered stagger container. Children should use RevealItem.
 */
export const RevealStagger = forwardRef(function RevealStagger(
  {
    as: Tag = m.div,
    children,
    className,
    viewport = defaultViewport,
    premium = true,
    ...rest
  },
  ref
) {
  const reduce = useReducedMotion();
  const tier = useMotionTier();
  const containerVariants = !premium
    ? reduce
      ? instantStaggerContainer
      : staggerContainer
    : pickStaggerContainer(tier === 'reduced' || reduce ? 'reduced' : tier);

  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={viewport}
      variants={containerVariants}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/**
 * Child of RevealStagger — inherits stagger timing.
 */
export const RevealItem = forwardRef(function RevealItem(
  {
    as: Tag = m.div,
    children,
    className,
    variant = 'fadeUp',
    premium = true,
    ...rest
  },
  ref
) {
  const reduce = useReducedMotion();
  const tier = useMotionTier();
  const effectiveTier = reduce ? 'reduced' : tier;

  let vars;
  if (variant === 'none') {
    vars = instantVisible;
  } else if (!premium) {
    vars = variant === 'fadeIn' ? fadeIn : fadeUp;
  } else if (variant === 'fadeIn') {
    vars = pickFadeInVariant(effectiveTier);
  } else {
    vars = pickFadeUpVariant(effectiveTier);
  }

  return (
    <Tag ref={ref} className={className} variants={vars} {...rest}>
      {children}
    </Tag>
  );
});

/**
 * Single block fade-up / fade-in in view (no parent stagger).
 */
export const RevealFade = forwardRef(function RevealFade(
  {
    as: Tag = m.div,
    children,
    className,
    variant = 'fadeUp',
    viewport = defaultViewport,
    premium = true,
    ...rest
  },
  ref
) {
  const reduce = useReducedMotion();
  const tier = useMotionTier();
  const effectiveTier = reduce ? 'reduced' : tier;

  let vars;
  if (variant === 'none') {
    vars = instantVisible;
  } else if (!premium) {
    vars = variant === 'fadeIn' ? fadeIn : fadeUp;
  } else if (variant === 'fadeIn') {
    vars = pickFadeInVariant(effectiveTier);
  } else {
    vars = pickFadeUpVariant(effectiveTier);
  }

  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={viewport}
      variants={vars}
      {...rest}
    >
      {children}
    </Tag>
  );
});
