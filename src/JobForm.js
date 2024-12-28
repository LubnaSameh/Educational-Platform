// JobForm.js
import React, { useCallback, useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import useDropdown from './useDropdown';
import { FormContext, jobFormData } from './CvFormAutoEdit'; // استيراد FormContext و jobFormData

// Schema التحقق من البيانات باستخدام Yup
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  field: Yup.string().required('Field selection is required'),
  location: Yup.string().required('Location selection is required'),
  jobType: Yup.string().required('Job Type selection is required'),
  jobTypeRadio: Yup.string()
    .oneOf(['Remote', 'On site'], 'Please select either Remote or On site'),
  position: Yup.string().required('Position is required'),
  salaryRangeFrom: Yup.number()
    .required('Salary Range From is required')
    .typeError('Must be a number'),
  salaryRangeTo: Yup.number()
    .required('Salary Range To is required')
    .typeError('Must be a number'),
  currency: Yup.string().required('Currency selection is required'),
  aboutCompany: Yup.string().required('About Company is required'),
  jobDescription: Yup.string().required('Job Description is required'),
  jobRequirements: Yup.string().required('Job Requirements is required'),
  skills: Yup.array().min(1, 'At least one skill is required'),
  logo: Yup.mixed()
    .nullable()
    .required('Company Logo is required'),
});

const JobForm = () => {
  // استخدام FormContext بدلاً من useLocalStorage
  const { formData, setFormData } = useContext(FormContext);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [dragging, setDragging] = useState(false); // حالة السحب

  const { dropdownStates, toggleDropdown, closeAllDropdowns, dropdownRef } = useDropdown({
    field: false,
    location: false,
    jobType: false,
    currency: false,
  });

  // State variables for editing skills
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(null);

  // دالة التعامل مع تغيير القيم في الحقول
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined,
    }));

    setFormData({
      ...formData,
      jobForm: {
        ...formData.jobForm,
        [name]: value,
      },
    });
  }, [formData, setFormData]);

  // دالة التعامل مع اختيار الخيارات من القوائم المنسدلة
  const handleSelectOption = useCallback((option, field) => {
    setFormData({
      ...formData,
      jobForm: {
        ...formData.jobForm,
        [field]: option,
      },
    });
    toggleDropdown(field);

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: undefined,
    }));
  }, [formData, setFormData, toggleDropdown]);

  // دالة التعامل مع رفع الملفات يدوياً
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          jobForm: {
            ...formData.jobForm,
            logo: reader.result,
            logoName: file.name,
          },
        });
      };
      reader.readAsDataURL(file);

      setErrors(prevErrors => ({
        ...prevErrors,
        logo: undefined,
      }));
    }
  }, [formData, setFormData]);

  // دالة التعامل مع سحب الملفات وإسقاطها
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          jobForm: {
            ...formData.jobForm,
            logo: reader.result,
            logoName: file.name,
          },
        });
      };
      reader.readAsDataURL(file);

      setErrors(prevErrors => ({
        ...prevErrors,
        logo: undefined,
      }));
    }
  }, [formData, setFormData]);

  // دالة التعامل مع إضافة مهارة جديدة أو تحديث مهارة موجودة
  const handleAddSkill = useCallback((e) => {
    e.preventDefault();
    const trimmedSkill = formData.jobForm.skillInput.trim();
    if (trimmedSkill !== '') {
      if (isEditing && currentSkillIndex !== null) {
        const updatedSkills = [...formData.jobForm.skills];
        updatedSkills[currentSkillIndex] = trimmedSkill;
        setFormData({
          ...formData,
          jobForm: {
            ...formData.jobForm,
            skills: updatedSkills,
            skillInput: '',
          },
        });
        setIsEditing(false);
        setCurrentSkillIndex(null);
      } else {
        setFormData({
          ...formData,
          jobForm: {
            ...formData.jobForm,
            skills: [...formData.jobForm.skills, trimmedSkill],
            skillInput: '',
          },
        });
      }
      setErrors(prevErrors => ({
        ...prevErrors,
        skills: undefined,
      }));
    }
  }, [formData, setFormData, isEditing, currentSkillIndex]);

  // دالة التعامل مع إزالة مهارة
  const handleRemoveSkill = useCallback((skill) => {
    setFormData({
      ...formData,
      jobForm: {
        ...formData.jobForm,
        skills: formData.jobForm.skills.filter(s => s !== skill),
      },
    });
  }, [formData, setFormData]);

  // دالة التعامل مع تعديل مهارة
  const handleEdit = useCallback((skill, index) => {
    setFormData({
      ...formData,
      jobForm: {
        ...formData.jobForm,
        skillInput: skill,
      },
    });
    setIsEditing(true);
    setCurrentSkillIndex(index);
  }, [formData, setFormData]);

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setIsLoading(true);

    validationSchema.validate(formData.jobForm, { abortEarly: false })
      .then(() => {
        setErrors({});
        console.log('Form data is valid:', formData.jobForm);

        // هنا يتم التعامل مع البيانات بعد الإرسال بنجاح
        setTimeout(() => {
          setIsLoading(false);
          setSuccessMessage("Form submitted successfully!");

          // إعادة تعيين البيانات إلى القيم الافتراضية
          setFormData((prevState) => ({
            ...prevState,
            jobForm: { ...jobFormData },
          }));

          setIsEditing(false);
          setCurrentSkillIndex(null);

          // مسح رسالة النجاح بعد فترة
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        }, 1000);
      })
      .catch((validationErrors) => {
        const formattedErrors = {};
        validationErrors.inner.forEach(error => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
        setIsLoading(false);
      });
  }, [formData, setFormData]);

  // تأكد من تهيئة `jobForm` لو مش موجودة
  useEffect(() => {
    if (!formData.jobForm) {
      setFormData({
        ...formData,
        jobForm: { ...jobFormData },
      });
    }
  }, [formData, setFormData]);

  // حماية للتأكد من وجود `jobForm` قبل الرندر
  if (!formData.jobForm) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="mb-5 mt-5">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      {/* شريط العنوان */}
      <div className="px-0 px-md-3 d-flex align-items-center mb-4 me-auto">
        <div className="col-12 col-md-6 text-md-start">
          <div className="header-title d-block">
            Add Job Details
            <div className="linee d-none d-md-block mx-md-0"></div>
          </div>
        </div>
      </div>

      {/* form */}
      <form
        className="p-3 rounded shadow custom-form"
        onSubmit={handleSubmit}
        ref={dropdownRef}
        onClick={(e) => {
          if (!e.target.closest('.dropdown-menu') && !e.target.closest('.dropdown-toggle')) {
            closeAllDropdowns();
          }
        }}
      >
        <div className='d-flex flex-column flex-md-row justify-content-between m-0 p-0 gap-3'>
          <div className='d-flex flex-column w-100 gap-3'>
            <div className="d-flex flex-column flex-lg-row gap-3 gap-md-2 col-md-12">
              <div className="form-group w-100">
                <label htmlFor="companyName" className="text-white">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  className={`form-control name-input py-2 ${errors.companyName ? 'is-invalid' : ''}`}
                  id="companyName"
                  placeholder="Company Name"
                  value={formData.jobForm.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
              </div>
            </div>

            <div className="d-flex flex-column flex-lg-row gap-3 gap-md-2 col-md-12">
              <div className="form-group col-lg-6">
                <label htmlFor="field" className="text-white mb-2">Field</label>
                <div className="dropdown rounded">
                  <button
                    className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.field ? 'is-invalid' : ''}`}
                    type="button"
                    id="dropdownFieldButton"
                    onClick={() => toggleDropdown('field')}
                    aria-expanded={dropdownStates.field}
                  >
                    <span className={formData.jobForm.field ? 'normal-text' : 'placeholder-text'}>
                      {formData.jobForm.field || 'Select Field'}
                    </span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={`dropdown-menu dropdownmenuForm ${dropdownStates.field ? 'show' : ''}`} aria-labelledby="dropdownFieldButton">
                    <li>
                      <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Field 1', 'field')}>Field 1</button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Field 2', 'field')}>Field 2</button>
                    </li>
                  </ul>
                  {errors.field && <div className="invalid-feedback">{errors.field}</div>}
                </div>
              </div>

              <div className="form-group col-lg-6">
                <label htmlFor="location" className="text-white">Location</label>
                <div className="dropdown">
                  <button
                    className={`btn custom-select dropdown-toggle w-100 py-2 d-flex justify-content-between align-items-center ${errors.location ? 'is-invalid' : ''}`}
                    type="button"
                    id="dropdownLocationButton"
                    onClick={() => toggleDropdown('location')}
                    aria-expanded={dropdownStates.location}
                  >
                    <span className={formData.jobForm.location ? '' : 'placeholder-text'}>
                      {formData.jobForm.location || 'Select Location'}
                    </span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul
                    className={`dropdown-menu dropdownmenuForm w-100 ${dropdownStates.location ? 'show' : ''}`}
                    aria-labelledby="dropdownLocationButton"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSelectOption('Location 1', 'location')}
                      >
                        Location 1
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSelectOption('Location 2', 'location')}
                      >
                        Location 2
                      </button>
                    </li>
                  </ul>
                  {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group col-md-5 my-auto my-lg-0">
            <label htmlFor="companyLogo" className="text-white">Company Logo</label>
            <div
              className={`rounded d-flex align-items-center flex-column justify-content-center custom-file-upload py-4 ${errors.logo ? 'is-invalid' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                name="logo"
                className="d-none"
                id="companyLogoInput"
                onChange={handleFileChange}
              />
              <label htmlFor="companyLogoInput" className="text-center mb-0 px-3 w-100 py-md-3 h-100 d-flex flex-column justify-content-center">
                <div className="upload-icon">
                  <i className="fas fa-cloud-upload-alt fs-1"></i>
                </div>
                <div>
                  Drag & drop files or <span className="Browse">Browse</span>
                </div>
                <small className="form-text text-muted text-center mt-2">
                  Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                </small>
              </label>
              {formData.jobForm.logoName && (
                <div className="text-white text-center">
                  <span className='bg-primary p-1 rounded'> {formData.jobForm.logoName}</span>
                </div>
              )}
            </div>
            {errors.logo && <div className="invalid-feedback">{errors.logo}</div>}
          </div>
        </div>

        <div className="textArea form-row">
          <div className="form-group col-md-12">
            <label htmlFor="aboutCompany" className="text-white">About The Company</label>
            <textarea
              className={`form-control custom-textarea ${errors.aboutCompany ? 'is-invalid' : ''}`}
              id="aboutCompany"
              name="aboutCompany"
              rows="4"
              placeholder="Write about the company..."
              value={formData.jobForm.aboutCompany}
              onChange={handleChange}
            ></textarea>
            {errors.aboutCompany && <div className="invalid-feedback">{errors.aboutCompany}</div>}
          </div>
        </div>

        <div className="form-group col-md-12 mt-3">
          <div className="d-block d-md-flex">
            <div className="form-group col-12 col-md-3 col-lg-4 me-md-2">
              <label htmlFor="position" className="text-white">Position</label>
              <input
                type="text"
                name="position"
                className={`form-control py-2 name-input ${errors.position ? 'is-invalid' : ''}`}
                id="position"
                placeholder="Enter Position"
                value={formData.jobForm.position}
                onChange={handleChange}
              />
              {errors.position && <div className="invalid-feedback">{errors.position}</div>}
            </div>

            <div className="form-group col-12 col-md-3 col-lg-4 mt-3 mt-md-0">
              <label htmlFor="jobType" className="text-white">Job Type</label>
              <div className="dropdown">
                <button
                  className={`btn custom-select dropdown-toggle w-100 py-2 d-flex justify-content-between align-items-center ${errors.jobType ? 'is-invalid' : ''}`}
                  type="button"
                  id="dropdownJobTypeButton"
                  onClick={() => toggleDropdown('jobType')}
                  aria-expanded={dropdownStates.jobType}
                >
                  <span className={formData.jobForm.jobType ? '' : 'placeholder-text'}>
                    {formData.jobForm.jobType || 'Select Job Type'}
                  </span>
                  <i className="fas fa-chevron-down me-2"></i>
                </button>
                <ul className={`dropdown-menu dropdownmenuForm w-100 ${dropdownStates.jobType ? 'show' : ''}`} aria-labelledby="dropdownJobTypeButton">
                  <li>
                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Full Time', 'jobType')}>Full Time</button>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Part Time', 'jobType')}>Part Time</button>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Contract', 'jobType')}>Contract</button>
                  </li>
                </ul>
                {errors.jobType && <div className="invalid-feedback">{errors.jobType}</div>}
              </div>
            </div>

            {/* جزء الراديو الخاص بـ 'Remote' و 'On site' */}
            <div className="d-flex flex-column w-100 justify-content-center mt-4 mt-md-0 col-12 col-md-5">
              <div className="d-flex align-items-center mt-4">
                <div className="form-check align-items-start mt-0 justify-content-center">
                  <input
                    className={`form-check-input ${errors.jobTypeRadio ? 'is-invalid' : ''}`}
                    type="radio"
                    name="jobTypeRadio"
                    id="remote"
                    value="Remote"
                    checked={formData.jobForm.jobTypeRadio === 'Remote'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label text-white" htmlFor="remote">
                    <i className="far fa-dot-circle" id="remote-icon"></i> Remote
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className={`form-check-input ${errors.jobTypeRadio ? 'is-invalid' : ''}`}
                    type="radio"
                    name="jobTypeRadio"
                    id="onsite"
                    value="On site"
                    checked={formData.jobForm.jobTypeRadio === 'On site'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label text-white" htmlFor="onsite">
                    <i className="far fa-dot-circle" id="onsite-icon"></i> On site
                  </label>
                </div>
              </div>
              {errors.jobTypeRadio && (
                <div className="invalid-feedback d-block">
                  {errors.jobTypeRadio}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group col-md-12 mt-3">
          <div className="d-block d-md-flex gap-3">
            <div className="form-group col-12 col-md-6">
              <label htmlFor="salaryRangeFrom" className="text-white">Salary Range</label>
              <div className="d-flex">
                <input
                  type="text"
                  name="salaryRangeFrom"
                  className={`form-control py-2 name-input ${errors.salaryRangeFrom ? 'is-invalid' : ''}`}
                  id="salaryRangeFrom"
                  placeholder="From"
                  value={formData.jobForm.salaryRangeFrom}
                  onChange={handleChange}
                />
                <span className="text-white my-auto px-2">To</span>
                <input
                  type="text"
                  name="salaryRangeTo"
                  className={`form-control name-input py-2 ${errors.salaryRangeTo ? 'is-invalid' : ''}`}
                  id="salaryRangeTo"
                  placeholder="To"
                  value={formData.jobForm.salaryRangeTo}
                  onChange={handleChange}
                />
              </div>
              {(errors.salaryRangeFrom || errors.salaryRangeTo) && (
                <div className="invalid-feedback d-block">
                  {errors.salaryRangeFrom || errors.salaryRangeTo}
                </div>
              )}
            </div>

            <div className="form-group col-12 col-md-3 mt-3 mt-md-0">
              <label className="text-white">Currency</label>
              <div className="dropdown">
                <button
                  className={`btn custom-select dropdown-toggle w-100 py-2 d-flex justify-content-between align-items-center ${errors.currency ? 'is-invalid' : ''}`}
                  type="button"
                  id="dropdownCurrencyButton"
                  onClick={() => toggleDropdown('currency')}
                  aria-expanded={dropdownStates.currency}
                >
                  <span className={formData.jobForm.currency ? '' : 'placeholder-text'}>
                    {formData.jobForm.currency || 'Select Currency'}
                  </span>
                  <i className="fas fa-chevron-down me-2"></i>
                </button>
                <ul className={`dropdown-menu dropdownmenuForm w-100 ${dropdownStates.currency ? 'show' : ''}`} aria-labelledby="dropdownCurrencyButton">
                  <li>
                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('USD', 'currency')}>USD</button>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('EUR', 'currency')}>EUR</button>
                  </li>
                  <li>
                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('GBP', 'currency')}>GBP</button>
                  </li>
                </ul>
                {errors.currency && <div className="invalid-feedback">{errors.currency}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="textArea form-row mt-3">
          <div className="form-group col-md-12">
            <label htmlFor="jobDescription" className="text-white">Job Description</label>
            <textarea
              className={`form-control custom-textarea ${errors.jobDescription ? 'is-invalid' : ''}`}
              id="jobDescription"
              name="jobDescription"
              rows="4"
              placeholder="Write the job description..."
              value={formData.jobForm.jobDescription}
              onChange={handleChange}
            ></textarea>
            {errors.jobDescription && <div className="invalid-feedback">{errors.jobDescription}</div>}
          </div>
        </div>

        <div className="textArea form-row mt-3">
          <div className="form-group col-md-12">
            <label htmlFor="jobRequirements" className="text-white">Job Requirements</label>
            <textarea
              className={`form-control custom-textarea ${errors.jobRequirements ? 'is-invalid' : ''}`}
              id="jobRequirements"
              name="jobRequirements"
              rows="4"
              placeholder="List the job requirements..."
              value={formData.jobForm.jobRequirements}
              onChange={handleChange}
            ></textarea>
            {errors.jobRequirements && <div className="invalid-feedback">{errors.jobRequirements}</div>}
          </div>
        </div>

        <div className="form-group col-md-12 mt-3">
          <div className="mb-3 skills-input">
            <label htmlFor="skill" className="form-label text-white mb-3">Skills</label>
            <div className="relative-container" style={{ position: 'relative' }}>
              <input
                type="text"
                className={`form-control ${errors.skills ? 'is-invalid' : ''}`}
                id="skills"
                name="skillInput"
                placeholder="Add a skill or edit"
                value={formData.jobForm.skillInput}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn-gold px-4 px-md-5 py-2 text-white"
                style={{ position: 'absolute', right: '0px', top: '0px', borderRadius: "17px 3px 3px 17px" }}
                onClick={handleAddSkill}
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>

            {errors.skills && <div className="invalid-feedback d-block">{errors.skills}</div>}

            <div className="skills-list mt-3">
              {formData.jobForm.skills && formData.jobForm.skills.length > 0 ? (
                formData.jobForm.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="skill-tag d-flex justify-content-between align-items-center flex-nowrap p-2 rounded"
                    style={{
                      border: '1px solid #BF9530',
                    }}
                  >
                    <span
                      className="text-break me-2 flex-grow-1"
                      onClick={() => handleEdit(skill, index)}
                      style={{ cursor: 'pointer' }}
                    >
                      {skill}
                    </span>
                    <i
                      className="fas fa-times flex-shrink-0"
                      onClick={() => handleRemoveSkill(skill)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </span>
                ))
              ) : (
                <p className="text-muted">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-end mt-5 mt-md-4">
          <button
            type="button"
            className="bg-grey order-2 order-md-1 btn-gold rounded px-5 py-2 mt-3 mt-md-0 ms-md-2 text-uppercase text-white"
            onClick={() => {
              // إعادة تعيين الحقول في النموذج
              setFormData({
                ...formData,
                jobForm: { ...jobFormData },
              });
              setErrors({});
              setIsEditing(false);
              setCurrentSkillIndex(null);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-gold rounded order-1 order-md-2 px-5 py-md-2 text-white text-uppercase ms-md-2 w-md-auto"
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>

      <div className="container px-0 px-md-4 mt-2">
        <div className="row">
          {successMessage && (
            <div className="alert alert-success text-center rounded">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobForm;
