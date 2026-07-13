'use client';

import TargetCursor from './ui/TargetCursor';

export default function CursorProvider() {
  return (
    <TargetCursor
      targetSelector="a, button, input[type='submit'], input[type='button'], .cursor-target"
      spinDuration={2}
      hideDefaultCursor={true}
      parallaxOn={true}
    />
  );
}
