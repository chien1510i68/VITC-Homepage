# LookupSection

Reusable section component for looking up exam scores and certificates.

## Features

- ✅ Score lookup with detailed results table
- ✅ Certificate lookup with filtering
- ✅ Fully customizable via props
- ✅ Type-safe with TypeScript
- ✅ Responsive design
- ✅ Loading states
- ✅ Empty states
- ✅ Keyboard support (Enter to search)

## Usage

### Basic Usage

```tsx
import { LookupSection } from '@/app/shared/sections';

export default function Page() {
  return <LookupSection />;
}
```

### Custom Configuration

```tsx
import { LookupSection } from '@/app/shared/sections';

export default function TinHocPage() {
  return (
    <LookupSection 
      title="Tra cứu kết quả thi tin học"
      subtitle="Tra cứu điểm thi và chứng chỉ tin học"
      sectionId="tra-cuu-tin-hoc"
      badge="Kết quả thi"
      contactEmail="tinhoc@visc.edu.vn"
      contactPhone="0123456789"
    />
  );
}
```

### Hide Tabs

```tsx
// Only show score lookup
<LookupSection 
  showScoreTab={true}
  showCertificateTab={false}
/>

// Only show certificate lookup
<LookupSection 
  showScoreTab={false}
  showCertificateTab={true}
/>
```

### With Callback

```tsx
<LookupSection 
  onSearch={(type, query) => {
    console.log(`Searching ${type} for ${query}`);
    // Track analytics, etc.
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Tra cứu điểm thi & Chứng chỉ"` | Section title |
| `subtitle` | `string` | `"Tra cứu kết quả..."` | Section subtitle |
| `sectionId` | `string` | `"tra-cuu"` | HTML id (for anchor links) |
| `badge` | `string` | `"Tra cứu thông tin"` | Badge text above title |
| `showScoreTab` | `boolean` | `true` | Show score lookup tab |
| `showCertificateTab` | `boolean` | `true` | Show certificate lookup tab |
| `contactEmail` | `string` | `"support@visc.edu.vn"` | Support email |
| `contactPhone` | `string` | `"0123456789"` | Support phone |
| `className` | `string` | `undefined` | Additional CSS classes |
| `onSearch` | `function` | `undefined` | Callback when search performed |

## TypeScript

```tsx
import type { LookupSectionProps } from '@/app/shared/sections/LookupSection/types';

const props: LookupSectionProps = {
  title: "Custom Title",
  // ...
};
```

## Examples

### For Different Pages

```tsx
// Tin học page
<LookupSection 
  sectionId="tra-cuu-tin-hoc"
  contactEmail="tinhoc@visc.edu.vn"
/>

// Kỹ năng mềm page
<LookupSection 
  sectionId="tra-cuu-ky-nang"
  contactEmail="kynangmem@visc.edu.vn"
  showScoreTab={false}
/>

// Dedicated lookup page
<LookupSection 
  title="Tra cứu toàn diện"
  subtitle="Tra cứu tất cả thông tin học tập của bạn"
/>
```

## Migration Guide

### Before (Duplicate Code)

```tsx
// app/tin-hoc/sections/LookupSection.tsx
export default function LookupSection() {
  // 315 lines of code
}

// app/components/sections/LookupSection.tsx  
export default function LookupSection() {
  // 315 lines of duplicate code
}
```

### After (Shared Component)

```tsx
// Delete both files above
// Use shared version:
import { LookupSection } from '@/app/shared/sections';

<LookupSection contactEmail="tinhoc@visc.edu.vn" />
```

## Benefits

- ✅ **-600 lines** of duplicate code eliminated
- ✅ **Single source of truth** - fix bugs once
- ✅ **Consistent UX** across all pages
- ✅ **Easy customization** via props
- ✅ **Type-safe** with full TypeScript support
