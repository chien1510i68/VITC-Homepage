'use client';

import SharedThuVienSection from '@/app/shared/sections/ThuVienSection';
import { SAMPLE_LIBRARY } from '../constants/library';

export default function ThuVienSection() {
  return (
    <SharedThuVienSection
      id="resources"
      items={SAMPLE_LIBRARY}
      maxItems={6}
    />
  );
}
