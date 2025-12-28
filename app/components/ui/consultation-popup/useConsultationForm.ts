import { useState, useEffect } from 'react';
import { FormData } from './types';

export function useConsultationForm(onSuccess: () => void) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    course: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess();
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', course: '' });
    setIsSubmitted(false);
  };

  return {
    formData,
    isSubmitting,
    isSubmitted,
    handleSubmit,
    handleChange,
    resetForm
  };
}