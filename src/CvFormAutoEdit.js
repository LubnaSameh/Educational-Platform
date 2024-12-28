import React, { createContext, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : {};

      // دمج القيم المخزنة مع القيم الافتراضية بشكل عميق
      return {
        ...initialValue,
        ...parsedItem,
        courseForm: {
          ...initialValue.courseForm,
          ...parsedItem.courseForm,
        },
        certificateForm: {
          ...initialValue.certificateForm,
          ...parsedItem.certificateForm,
        },
        // كرر نفس العملية لباقي الفورمات لو موجودة
      };
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};



export const FormContext = createContext();
// بيانات الـ ExamForm
export const examFormData = {
  courseName: '',
  level: '',
  fullMark: '',
  date: '',
  time: '',
  duration: '',
  questions: [
    {
      questionText: '',
      type: 'Multiple choices', // النوع الافتراضي يكون هنا "Multiple choices"
      mark: '',
      imageUpload: null,
      options: [{ text: '', isCorrect: false }],
      shortAnswer: '',
    },
  ],
};



// بيانات كل فورم
// بيانات الـ CertificateForm
export const certificateFormData = {
  studentName: '',
  dateAcquired: '',
  uploadDate: '',
  course: '',
  certificate: null,
  certificateName: '',
};

// بيانات courseForm
export const courseFormData = {
  courseName: '',
  level: '',
  numberOfLessons: '',
  language: '',
  startDate: '',
  duration: '',
  certificate: '',
  courseIntroduction: '',
  courseAssessment: '',
  courseRequirements: '',
  courseMaterials: '',
  publishingDate: '', // تأكد إنها موجودة
  coverPhoto: null,
  coverPhotoName: '',
  lessons: [
    { title: '', description: '', lectureUrl: '' }, // درس واحد كبداية
  ]
};

// بيانات الـ UserForm
export const userFormData = {
  firstName: '',
  lastName: '',
  status: '',
  email: '',
  role: '',
  mobile: '',
  userId: '',
  password: '',
  confirmPassword: '',
};

// data article
export const articleFormData = {
  articleTitle: '',
  category: '',
  content: '',
  publishingDate: '',
  coverPhoto: null,
  coverPhotoName: '',
};


// بيانات الـ JobForm
export const jobFormData = {
  companyName: '',
  field: '',
  location: '',
  jobType: '',
  jobTypeRadio: '',
  position: '',
  salaryRangeFrom: '',
  salaryRangeTo: '',
  currency: '',
  aboutCompany: '',
  jobDescription: '',
  jobRequirements: '',
  skills: [],
  skillInput: '',
  logo: null,
  logoName: '',
};

// الـ provider الرئيسي اللي بيشمل كل البيانات
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useLocalStorage('formData', {
    firstName: '',
    lastName: '',
    profession: '',
    country: '',
    city: '',
    phone: '',
    email: '',
    certificateForm: {
      studentName: '',
      dateAcquired: '',
      uploadDate: '',
      course: '',
      certificate: null,
    },
    courseForm: courseFormData,  // استخدام بيانات courseForm
    userForm: userFormData,  
    articleForm: articleFormData,  
    certificateForm: { ...certificateFormData },
    jobForm: jobFormData, 
  examForm: examFormData,
    honorAward: [
      { awardName: '', year: '', description: '' },
    ],
    hobbies: '',
    website: '',
    photo: '',
    skills: [],
    experience: [
      {
        companyName: '',
        position: '',
        fromDate: '',
        toDate: '',
        companyLogo: '',
        description: '',
      },
    ],
    education: [
      {
        organizationName: '',
        degree: '',
        fromDate: '',
        toDate: '',
        description: '',
      }
    ],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
