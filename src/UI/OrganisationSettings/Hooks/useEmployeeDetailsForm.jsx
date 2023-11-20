import { useState } from 'react';

const useForm = () => {
  const [formData, setFormData] = useState({
    dateOfEmployment: '',
    jobTitle: '',
    employmentType: '',
    contractType: '',
    salaryFrequency: '',
    basicSalary: '',
    allowance: '',
    department: '',
  });

  const [formErrors, setFormErrors] = useState({
    dateOfEmployment: '',
    jobTitle: '',
    employmentType: '',
    contractType: '',
    salaryFrequency: '',
    basicSalary: '',
    allowance: '',
    department: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleChange = (field, value) => {
    const capitalizedValue = field === 'jobTitle' || field === 'basicSalary' || field === 'allowance'
      ? capitalizeFirstLetter(value)
      : value;

    setFormData({
      ...formData,
      [field]: capitalizedValue,
    });

    setFormErrors({
      ...formErrors,
      [field]: '',
    });
  };

  const handleSubmit = (event, navigate) => {
    event.preventDefault();

    const fields = ['dateOfEmployment', 'jobTitle', 'employmentType', 'contractType', 'salaryFrequency', 'basicSalary', 'allowance', 'department'];
    
    const newFormErrors = {};

    fields.forEach((field) => {
      if (!formData[field]) {
        newFormErrors[field] = `Please enter ${field === 'dateOfEmployment' ? 'a' : 'an'} ${field}`;
      }
    });

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length > 0) {
      setError('Fill in all the required fields to proceed');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate('/admin-login-details', {
        state: formData,
      });
    }, 6000);
  };

  return {
    formData,
    formErrors,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
