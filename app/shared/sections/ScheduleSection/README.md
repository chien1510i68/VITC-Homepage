# ScheduleSection Component

A reusable section component for displaying class schedules in a table format with optional CTA button.

## Features

- 📅 Display class schedules in a clean table format
- 🎨 Customizable title, subtitle, and badge
- 🔧 Configurable table columns
- 🔗 Optional CTA button
- 📱 Fully responsive design
- 🎯 TypeScript support with comprehensive types

## Usage

### Basic Usage

```tsx
import { ScheduleSection } from '@/app/shared/sections';

export default function Page() {
  return <ScheduleSection />;
}
```

### Custom Title and Data

```tsx
import { ScheduleSection } from '@/app/shared/sections';

const customSchedules = [
  {
    id: '1',
    className: 'KNM-101',
    time: 'Thứ 2/4/6 (18:00-20:30)',
    startDate: '2025-12-15',
    location: 'Phòng 201',
    subject: 'Kỹ năng giao tiếp',
  },
  // ... more schedules
];

export default function Page() {
  return (
    <ScheduleSection
      title="Lịch học Kỹ năng mềm"
      subtitle="Đăng ký ngay để không bỏ lỡ cơ hội"
      schedules={customSchedules}
      ctaLink="/ky-nang-mem"
    />
  );
}
```

### Advanced Customization

```tsx
<ScheduleSection
  title="Lịch khai giảng tháng 12"
  badge="Mới nhất"
  sectionId="lich-thang-12"
  schedules={decemberSchedules}
  ctaText="Xem thêm lịch học →"
  ctaLink="/khoa-hoc/lich-hoc"
  bgClassName="bg-gray-50"
  columns={{
    className: true,
    time: true,
    startDate: true,
    location: false, // Hide location column
    subject: true,
  }}
/>
```

### Without CTA Button

```tsx
<ScheduleSection
  title="Lịch học hiện tại"
  showCta={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Lịch khai giảng"` | Section title |
| `subtitle` | `string` | `"Tra cứu lịch khai giảng..."` | Section subtitle |
| `sectionId` | `string` | `"lich-khai-giang"` | HTML id attribute for anchor links |
| `badge` | `string` | `undefined` | Optional badge text above title |
| `schedules` | `Schedule[]` | Default VISC schedules | Array of schedule data |
| `ctaText` | `string` | `"Xem tất cả lịch khai giảng →"` | CTA button text |
| `ctaLink` | `string` | `"/khoa-hoc"` | CTA button link |
| `showCta` | `boolean` | `true` | Show/hide CTA button |
| `bgClassName` | `string` | `"bg-white"` | Background CSS class |
| `columns` | `object` | All `true` | Configure visible columns |

## Schedule Type

```typescript
interface Schedule {
  id: string;              // Unique identifier
  className: string;       // Class name/code
  time: string;           // Schedule time
  startDate: string;      // Start date (YYYY-MM-DD)
  location: string;       // Venue/location
  subject: string;        // Course subject
  status?: string;        // Optional status
}
```

## Migration Guide

### Before (Duplicate Code)

```tsx
// app/tin-hoc/sections/ScheduleSection.tsx
import ScheduleSection from "./sections/ScheduleSection";

<ScheduleSection />
```

### After (Shared Component)

```tsx
// Use shared component
import { ScheduleSection } from '@/app/shared/sections';

// With custom props if needed
<ScheduleSection
  title="Lịch khai giảng Tin học"
  ctaLink="/tin-hoc"
/>
```

## Default Data

The component comes with default VISC schedule data. See [constants.ts](./constants.ts) for the full default dataset.

## Related Components

- `LookupSection` - For exam score/certificate lookup
- `HeroSection` - For hero banners with slides

## Notes

- Dates are automatically formatted to Vietnamese locale (dd/mm/yyyy)
- Empty state is handled automatically when `schedules` array is empty
- All columns are optional and can be hidden via the `columns` prop
- Component is client-side rendered for interactive features
