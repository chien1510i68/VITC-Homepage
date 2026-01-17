/**
 * Input Validation Utilities
 * 
 * Zod schemas and validation utilities for form inputs and API data
 * 
 * @module lib/validation
 */

import { z } from 'zod';

/**
 * Common validation messages in Vietnamese
 */
export const validationMessages = {
  required: 'Trường này là bắt buộc',
  email: 'Email không hợp lệ',
  phone: 'Số điện thoại không hợp lệ',
  minLength: (min: number) => `Tối thiểu ${min} ký tự`,
  maxLength: (max: number) => `Tối đa ${max} ký tự`,
  invalidFormat: 'Định dạng không hợp lệ',
} as const;

/**
 * Vietnamese phone number regex
 * Supports: 0xxx-xxx-xxx, +84-xxx-xxx-xxx, 84-xxx-xxx-xxx
 */
const phoneRegex = /^(\+84|84|0)(\d{9}|\d{10})$/;

/**
 * Vietnamese CCCD/CMND regex
 * 9 or 12 digits
 */
const cccdRegex = /^\d{9}$|^\d{12}$/;

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, validationMessages.minLength(2))
    .max(100, validationMessages.maxLength(100)),
  
  email: z
    .string()
    .email(validationMessages.email),
  
  phone: z
    .string()
    .regex(phoneRegex, validationMessages.phone)
    .optional()
    .or(z.literal('')),
  
  subject: z
    .string()
    .min(5, validationMessages.minLength(5))
    .max(200, validationMessages.maxLength(200))
    .optional(),
  
  message: z
    .string()
    .min(10, validationMessages.minLength(10))
    .max(1000, validationMessages.maxLength(1000)),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Consultation form validation schema
 */
export const consultationFormSchema = z.object({
  name: z
    .string()
    .min(2, validationMessages.minLength(2))
    .max(100, validationMessages.maxLength(100)),
  
  phone: z
    .string()
    .regex(phoneRegex, validationMessages.phone),
  
  email: z
    .string()
    .email(validationMessages.email)
    .optional()
    .or(z.literal('')),
  
  courseName: z
    .string()
    .min(1, validationMessages.required),
  
  message: z
    .string()
    .max(500, validationMessages.maxLength(500))
    .optional(),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;

/**
 * Certificate lookup validation schema
 */
export const certificateLookupSchema = z.object({
  certificateId: z
    .string()
    .min(1, validationMessages.required)
    .max(50, validationMessages.maxLength(50)),
});

export type CertificateLookupData = z.infer<typeof certificateLookupSchema>;

/**
 * Student lookup validation schema
 */
export const studentLookupSchema = z.object({
  studentId: z
    .string()
    .min(1, validationMessages.required),
  
  cccd: z
    .string()
    .regex(cccdRegex, 'CCCD/CMND phải có 9 hoặc 12 chữ số')
    .optional(),
});

export type StudentLookupData = z.infer<typeof studentLookupSchema>;

/**
 * Course registration validation schema
 * Aligned with backend API: POST /api/v1/register/
 */
export const courseRegistrationSchema = z.object({
  username: z
    .string()
    .min(1, 'Vui lòng nhập họ tên')
    .min(3, 'Họ tên phải có ít nhất 3 ký tự')
    .max(100, 'Họ tên không được quá 100 ký tự'),
  
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email(validationMessages.email),
  
  phoneNumber: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại')
    .regex(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số'),
  
  dob: z
    .string()
    .min(1, 'Vui lòng nhập ngày sinh')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày sinh phải theo định dạng YYYY-MM-DD'),
  
  address: z
    .string()
    .min(1, 'Vui lòng nhập địa chỉ')
    .max(200, 'Địa chỉ không được quá 200 ký tự'),
  
  course: z
    .string()
    .min(1, 'Vui lòng chọn chương trình học')
    .uuid('ID chương trình không hợp lệ'),
  
  type: z
    .string()
    .optional()
    .default(''),
  
  note: z
    .string()
    .max(500, 'Ghi chú không được quá 500 ký tự')
    .optional()
    .default(''),
});

export type CourseRegistrationData = z.infer<typeof courseRegistrationSchema>;

/**
 * Newsletter subscription validation schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email(validationMessages.email),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Search query validation schema
 */
export const searchQuerySchema = z.object({
  query: z
    .string()
    .min(1, 'Vui lòng nhập từ khóa tìm kiếm')
    .max(100, validationMessages.maxLength(100)),
  
  category: z
    .string()
    .optional(),
  
  page: z
    .number()
    .positive()
    .default(1),
  
  limit: z
    .number()
    .positive()
    .max(100)
    .default(10),
});

export type SearchQueryData = z.infer<typeof searchQuerySchema>;

/**
 * Utility: Validate data against a schema
 * 
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with data or errors
 * 
 * @example
 * ```typescript
 * const result = validateData(contactFormSchema, formData);
 * if (result.success) {
 *   console.log('Valid data:', result.data);
 * } else {
 *   console.log('Errors:', result.errors);
 * }
 * ```
 */
export function validateData<T extends z.ZodType>(
  schema: T,
  data: unknown
): 
  | { success: true; data: z.infer<T>; errors: null }
  | { success: false; data: null; errors: Record<string, string[]> } 
{
  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: null,
    };
  }
  
  const errors: Record<string, string[]> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(issue.message);
  });
  
  return {
    success: false,
    data: null,
    errors,
  };
}

/**
 * Utility: Format validation errors for display
 * 
 * @param errors - Validation errors from validateData
 * @returns Formatted error messages
 */
export function formatValidationErrors(
  errors: Record<string, string[]>
): string[] {
  return Object.entries(errors).flatMap(([field, messages]) => 
    messages.map(msg => `${field}: ${msg}`)
  );
}

/**
 * Utility: Check if email is valid
 */
export function isValidEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

/**
 * Utility: Check if phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

/**
 * Utility: Check if CCCD is valid
 */
export function isValidCCCD(cccd: string): boolean {
  return cccdRegex.test(cccd);
}

/**
 * Utility: Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .slice(0, 1000); // Limit length
}

/**
 * Utility: Sanitize HTML to prevent XSS
 */
export function sanitizeHTML(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
