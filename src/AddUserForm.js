// AddUserForm.js
import React, { useCallback, useState, useContext, useEffect } from 'react';
import * as Yup from 'yup'; // استخدام Yup للتحقق
import useDropdown from './useDropdown'; // استيراد useDropdown
import { FormContext, userFormData } from './CvFormAutoEdit'; // استيراد FormContext و userFormData

// Schema التحقق من البيانات باستخدام Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  status: Yup.string().required('Status is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  role: Yup.string().required('Role is required'),
  mobile: Yup.string().required('Mobile number is required'),
  userId: Yup.string().required('User ID is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const AddUserForm = () => {
  const { formData, setFormData } = useContext(FormContext);

  const [errors, setErrors] = useState({}); // State للأخطاء
  const [successMessage, setSuccessMessage] = useState(''); // State لرسالة النجاح
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل

  const { dropdownStates, toggleDropdown, closeAllDropdowns, dropdownRef } = useDropdown({
    status: false,
    role: false,
  });

  // دالة التعامل مع تغيير القيم في الحقول
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));

      setFormData({
        ...formData,
        userForm: {
          ...formData.userForm,
          [name]: value,
        },
      });
    },
    [formData, setFormData]
  );

  // دالة التعامل مع اختيار الخيارات من القوائم المنسدلة
  const handleSelectOption = (selectedOption, field) => {
    setFormData({
      ...formData,
      userForm: {
        ...formData.userForm,
        [field]: selectedOption,
      },
    });
    toggleDropdown(field); // إغلاق القائمة بعد الاختيار

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };

  // دالة لإغلاق جميع القوائم المنسدلة ثم فتح القائمة المطلوبة
  const toggleDropdownWithCloseOthers = (dropdown) => {
    closeAllDropdowns(); // إغلاق كل القوائم أولاً
    toggleDropdown(dropdown); // فتح القائمة المطلوبة
  };

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);

      validationSchema
        .validate(formData.userForm, { abortEarly: false })
        .then(() => {
          setErrors({});
          console.log('Form data is valid:', formData.userForm);

          setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Form submitted successfully!');

            // إعادة تعيين البيانات إلى القيم الافتراضية
            setFormData((prevState) => ({
              ...prevState,
              userForm: { ...userFormData },
            }));

            // مسح رسالة النجاح بعد فترة
            setTimeout(() => {
              setSuccessMessage('');
            }, 3000);
          }, 1000);
        })
        .catch((validationErrors) => {
          const formattedErrors = {};
          validationErrors.inner.forEach((error) => {
            formattedErrors[error.path] = error.message;
          });
          setErrors(formattedErrors);
          setIsLoading(false);
        });
    },
    [formData, setFormData]
  );

  // تأكد من تهيئة `userForm` لو مش موجودة
  useEffect(() => {
    if (!formData.userForm) {
      setFormData({
        ...formData,
        userForm: { ...userFormData },
      });
    }
  }, [formData, setFormData]);

  // حماية للتأكد من وجود `userForm` قبل الرندر
  if (!formData.userForm) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="mt-5">
      {/* شريط العنوان */}
      <div className="px-0 px-md-3 d-flex align-items-center mb-2 me-auto">
        <div className="col-12 col-md-6 text-md-start">
          <div className="header-title d-block">
            Add User Details
            <div className="linee d-none d-md-block mx-md-0"></div>
          </div>
        </div>
      </div>

      <form
        className="p-4 rounded text-white custom-form"
        onSubmit={handleSubmit}
        ref={dropdownRef}
        onClick={(e) => {
          if (!e.target.closest('.dropdown-menu') && !e.target.closest('.dropdown-toggle')) {
            closeAllDropdowns();
          }
        }}
      >
        <div className="row g-2">
          <div className="col-md-4 mb-3 form-group">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className={`form-control py-2 name-input ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.userForm.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
          <div className="col-md-4 form-group mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className={`form-control py-2 name-input ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.userForm.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
          <div className="col-md-4 form-group mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <div className="dropdown rounded">
              <button
                className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${
                  errors.status ? 'is-invalid' : ''
                }`}
                type="button"
                id="dropdownStatusButton"
                onClick={() => toggleDropdownWithCloseOthers('status')}
                aria-expanded={dropdownStates.status}
              >
                <span className={formData.userForm.status ? 'normal-text' : 'placeholder-text'}>
                  {formData.userForm.status || 'Select Status'}
                </span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <ul
                className={`dropdown-menu dropdownmenuForm ${dropdownStates.status ? 'show' : ''}`}
                aria-labelledby="dropdownStatusButton"
              >
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSelectOption('Active', 'status')}
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSelectOption('Inactive', 'status')}
                  >
                    Inactive
                  </button>
                </li>
              </ul>
              {errors.status && <div className="invalid-feedback">{errors.status}</div>}
            </div>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-7 form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control py-2 name-input ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.userForm.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-5 form-group mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <div className="dropdown rounded">
              <button
                className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${
                  errors.role ? 'is-invalid' : ''
                }`}
                type="button"
                id="dropdownRoleButton"
                onClick={() => toggleDropdownWithCloseOthers('role')}
                aria-expanded={dropdownStates.role}
              >
                <span className={formData.userForm.role ? 'normal-text' : 'placeholder-text'}>
                  {formData.userForm.role || 'Select Role'}
                </span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <ul
                className={`dropdown-menu dropdownmenuForm ${dropdownStates.role ? 'show' : ''}`}
                aria-labelledby="dropdownRoleButton"
              >
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSelectOption('Student', 'role')}
                  >
                    Student
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleSelectOption('Admin', 'role')}
                  >
                    Admin
                  </button>
                </li>
              </ul>
              {errors.role && <div className="invalid-feedback">{errors.role}</div>}
            </div>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-6 form-group mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              className={`form-control py-2 name-input ${errors.mobile ? 'is-invalid' : ''}`}
              id="mobile"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.userForm.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>

          <div className="col-md-6 form-group mb-3">
            <label htmlFor="userId" className="form-label">
              User ID
            </label>
            <input
              type="text"
              className={`form-control py-2 name-input ${errors.userId ? 'is-invalid' : ''}`}
              id="userId"
              name="userId"
              placeholder="Enter User ID"
              value={formData.userForm.userId}
              onChange={handleChange}
            />
            {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md-6 form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control py-2 name-input ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.userForm.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="col-md-6 form-group mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Password Confirmation
            </label>
            <input
              type="password"
              className={`form-control py-2 name-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter Password Confirmation"
              value={formData.userForm.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-end mt-5 mt-md-4">
          <button
            type="button"
            className="bg-grey order-2 order-md-1 btn-gold rounded px-5 py-2 mt-3 mt-md-0 ms-md-2 text-uppercase text-white"
            onClick={() => {
              setFormData({
                ...formData,
                userForm: { ...userFormData },
              });
              setErrors({});
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-gold rounded order-1 order-md-2 px-5 py-md-2 text-white text-uppercase ms-md-2 w-md-auto"
            disabled={isLoading}
          >
            {isLoading ? 'Publish...' : 'Publish'}
          </button>
        </div>
      </form>

      <div className="container px-0 px-md-4 mt-2">
        {successMessage && (
          <div className="alert alert-success text-center mt-2 mt-md-4 rounded">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserForm;
