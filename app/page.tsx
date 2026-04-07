'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Redirect to Step 1 immediately
    window.location.href = '/diagnostic/step1';
  }, []);

  return null;
}
