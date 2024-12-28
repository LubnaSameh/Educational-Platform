import React, { useCallback, useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import useDropdown from './useDropdown';
import { FormContext, courseFormData } from './CvFormAutoEdit';

// تحديث الـ Validation Schema لو مش متغير قبل كده
const validationSchema = Yup.object().shape({
    courseName: Yup.string()
        .min(4, 'Course Name must be at least 4 characters')
        .max(150, 'Course Name must be at most 150 characters')
        .required('Course Name is required'),

    level: Yup.string()
        .oneOf(['LEV.1', 'LEV.2', 'LEV.3'], 'Invalid Level')
        .required('Level is required'),

    numberOfLessons: Yup.number()
        .typeError('Please enter a valid number')
        .integer('Number of Lessons must be an integer')
        .positive('Number of Lessons must be positive')
        .required('Number of Lessons is required'),

    language: Yup.string()
        .oneOf(['English', 'Arabic'], 'Invalid Language')
        .required('Language is required'),

    startDate: Yup.date()
        .required('Start Date is required')
        .typeError('Invalid Date'),

    duration: Yup.string()
        .required('Duration is required')
        .matches(/^\d+ hours?, \d+ mins?$/, 'Duration must be in the format "X hours, Y mins"'),

    certificate: Yup.boolean()
        .required('Certificate selection is required'),

    courseIntroduction: Yup.string()
        .required('Course Introduction is required'),

    courseAssessment: Yup.string()
        .required('Course Assessment is required'),

    courseRequirements: Yup.string()
        .required('Course Requirements are required'),

    courseMaterials: Yup.string()
        .required('Course Materials are required'),

    publishingDate: Yup.date()
        .required('Publishing Date is required')
        .typeError('Invalid Date'),

    coverPhoto: Yup.mixed()
        .required('Cover Photo is required'),

    lessons: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().required('Lesson Title is required'),
                description: Yup.string().required('Lesson Description is required'),
                lectureUrl: Yup.string().url('Lecture URL must be a valid URL').required('Lecture URL is required'),
            })
        )
});

const CourseForm = () => {
    const { formData, setFormData } = useContext(FormContext);
    const [errors, setErrors] = useState({});
    const [fileAdded, setFileAdded] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // تحديث الـ useDropdown Hook لإضافة حالات جديدة للـ language و level
    const { dropdownStates, toggleDropdown, dropdownRef } = useDropdown({
        courseName: false,
        language: false,  // حالة الـ Language
        level: false,     // حالة الـ Level
    });

    const handleLessonChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLessons = [...formData.courseForm.lessons];
        updatedLessons[index][name] = value;

        setFormData({
            ...formData,
            courseForm: {
                ...formData.courseForm,
                lessons: updatedLessons,
            },
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [`lessons[${index}].${name}`]: undefined,
        }));
    };

    const handleAddLesson = () => {
        setFormData({
            ...formData,
            courseForm: {
                ...formData.courseForm,
                lessons: [...formData.courseForm.lessons, { title: '', description: '', lectureUrl: '' }],
            },
        });
    };

    const handleRemoveLesson = (index) => {
        if (index === 0) {
            const updatedLessons = [...formData.courseForm.lessons];
            updatedLessons[0] = { title: '', description: '', lectureUrl: '' };
            setFormData({
                ...formData,
                courseForm: {
                    ...formData.courseForm,
                    lessons: updatedLessons,
                },
            });
        } else {
            const updatedLessons = formData.courseForm.lessons.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                courseForm: {
                    ...formData.courseForm,
                    lessons: updatedLessons,
                },
            });
        }
    };

    const handleSelectOption = (selectedOption, field) => {
        setFormData({
            ...formData,
            courseForm: {
                ...formData.courseForm,
                [field]: selectedOption
            }
        });
        toggleDropdown(field);
        setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        setFormData({
            ...formData,
            courseForm: {
                ...formData.courseForm,
                [name]: value
            }
        });
    }, [formData, setFormData]);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    courseForm: {
                        ...formData.courseForm,
                        coverPhoto: reader.result,
                        coverPhotoName: file.name
                    }
                });
                setUploadedFileName(file.name);
                setFileAdded(true);
                setErrors(prevErrors => ({ ...prevErrors, coverPhoto: undefined }));
            };
            reader.readAsDataURL(file);
        }
    }, [formData, setFormData]);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    courseForm: {
                        ...formData.courseForm,
                        coverPhoto: reader.result,
                        coverPhotoName: file.name
                    }
                });
                setUploadedFileName(file.name);
                setFileAdded(true);
                setErrors(prevErrors => ({ ...prevErrors, coverPhoto: undefined }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    // دالة للـ Cancel
    const handleCancel = () => {
        setFormData({ ...formData, courseForm: { ...courseFormData } });
        setErrors({});
        setFileAdded(false);
        setUploadedFileName('');
    };

    const handlePublish = useCallback((event) => {
        event.preventDefault();
        setIsLoading(true);

        validationSchema.validate(formData.courseForm, { abortEarly: false })
            .then(() => {
                setErrors({});
                console.log('Form data is valid:', formData.courseForm);

                // هنا ممكن تبعت البيانات للسيرفر

                // بعد نجاح الـ Publish، نرجع البيانات للـ courseFormData
                setFormData(prevState => ({
                    ...prevState,
                    courseForm: {
                        ...courseFormData
                    }
                }));
                setFileAdded(false);
                setUploadedFileName('');

                setTimeout(() => {
                    setIsLoading(false);
                    setSuccessMessage('Form submitted successfully!');

                    setTimeout(() => {
                        setSuccessMessage('');
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

    useEffect(() => {
        if (!formData.courseForm) {
            setFormData({ ...formData, courseForm: { ...courseFormData } });
        } else {
            if (formData.courseForm.coverPhoto) {
                setFileAdded(true);
                setUploadedFileName(formData.courseForm.coverPhotoName || '');
            }
        }
    }, [formData, setFormData]);

    if (!formData.courseForm) {
        return <div>جاري التحميل...</div>;
    }

    return (
        <div className="mt-5">
            <form className="p-4 rounded shadow custom-form" onSubmit={handlePublish} ref={dropdownRef}>
                <div className="row g-2">
                    {/* Dropdown لـ Course Name */}
                    <div className="col-md-5 form-group">
                        <label htmlFor="courseName">Course Name</label>
                        <div className="dropdown rounded">
                            <button
                                className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.courseName ? 'is-invalid' : ''}`}
                                type="button"
                                id="dropdownCourseNameButton"
                                onClick={() => toggleDropdown('courseName')}
                                aria-expanded={dropdownStates.courseName}
                            >
                                <span className={formData.courseForm.courseName ? 'normal-text' : 'placeholder-text'}>
                                    {formData.courseForm.courseName || 'Select Course Name'}
                                </span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            <ul className={`dropdown-menu dropdownmenuForm ${dropdownStates.courseName ? 'show' : ''}`} aria-labelledby="dropdownCourseNameButton">
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Course 1', 'courseName')}>Course 1</button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Course 2', 'courseName')}>Course 2</button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Course 3', 'courseName')}>Course 3</button>
                                </li>
                            </ul>
                            {errors.courseName && <div className="invalid-feedback">{errors.courseName}</div>}
                        </div>
                    </div>

                    {/* Dropdown لـ Level */}
                    <div className="col-md-3 form-group">
                        <label htmlFor="level">Level</label>
                        <div className="dropdown rounded">
                            <button
                                className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.level ? 'is-invalid' : ''}`}
                                type="button"
                                id="dropdownLevelButton"
                                onClick={() => toggleDropdown('level')}
                                aria-expanded={dropdownStates.level}
                            >
                                <span className={formData.courseForm.level ? 'normal-text' : 'placeholder-text'}>
                                    {formData.courseForm.level || 'Select Level'}
                                </span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            <ul className={`dropdown-menu dropdownmenuForm ${dropdownStates.level ? 'show' : ''}`} aria-labelledby="dropdownLevelButton">
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('LEV.1', 'level')}>LEV.1</button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('LEV.2', 'level')}>LEV.2</button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('LEV.3', 'level')}>LEV.3</button>
                                </li>
                            </ul>
                            {errors.level && <div className="invalid-feedback">{errors.level}</div>}
                        </div>
                    </div>

                    {/* Input لـ Number of Lessons */}
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="numberOfLessons">Number of Lessons</label>
                            <input
                                type="number"
                                name="numberOfLessons"
                                className={`form-control name-input py-2  ${errors.numberOfLessons ? 'is-invalid' : ''}`}
                                id="numberOfLessons"
                                placeholder="positive number"
                                value={formData.courseForm.numberOfLessons}
                                onChange={handleChange}
                            />
                            {errors.numberOfLessons && <div className="invalid-feedback">{errors.numberOfLessons}</div>}
                        </div>
                    </div>
                </div>

                <div className="row g-2">
                    {/* Dropdown لـ Language */}
                    <div className="col-md-3 form-group">
                        <label htmlFor="language">Language</label>
                        <div className="dropdown rounded">
                            <button
                                className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.language ? 'is-invalid' : ''}`}
                                type="button"
                                id="dropdownLanguageButton"
                                onClick={() => toggleDropdown('language')}
                                aria-expanded={dropdownStates.language}
                            >
                                <span className={formData.courseForm.language ? 'normal-text' : 'placeholder-text'}>
                                    {formData.courseForm.language || 'Select Language'}
                                </span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            <ul className={`dropdown-menu dropdownmenuForm ${dropdownStates.language ? 'show' : ''}`} aria-labelledby="dropdownLanguageButton">
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('English', 'language')}>English</button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Arabic', 'language')}>Arabic</button>
                                </li>
                                {/* ممكن تضيف لغات تانية هنا لو حبيت */}
                            </ul>
                            {errors.language && <div className="invalid-feedback">{errors.language}</div>}
                        </div>
                    </div>

                    {/* Input لـ Start Date */}
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                className={`form-control  name-input py-2 ${errors.startDate ? 'is-invalid' : ''}`}
                                id="startDate"
                                placeholder="Select Start Date"
                                value={formData.courseForm.startDate}
                                onChange={handleChange}
                                style={{
                                    color: formData.courseForm.startDate ? '#fff' : '#a19d9d',
                                }}
                            />
                            {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                        </div>
                    </div>

                    {/* Input لـ Duration */}
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="duration">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                className={`form-control name-input py-2  ${errors.duration ? 'is-invalid' : ''}`}
                                id="duration"
                                placeholder="5 hours, 30 mins"
                                value={formData.courseForm.duration}
                                onChange={handleChange}
                            />
                            {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
                        </div>
                    </div>

                    {/* Input لـ Certificate */}
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="certificate">Certificate</label>
                            <input
                                type="text"
                                name="certificate"
                                className={`form-control name-input py-2 ${errors.certificate ? 'is-invalid' : ''}`}
                                id="certificate"
                                placeholder="true or false"
                                value={formData.courseForm.certificate}
                                onChange={handleChange}
                            />
                            {errors.certificate && <div className="invalid-feedback">{errors.certificate}</div>}
                        </div>
                    </div>
                </div>

                {/* Textarea لـ Course Introduction */}
                <div className="form-group mb-3">
                    <label htmlFor="courseIntroduction">Course Introduction</label>
                    <textarea
                        name="courseIntroduction"
                        className={`form-control name-input ${errors.courseIntroduction ? 'is-invalid' : ''}`}
                        id="courseIntroduction"
                        placeholder="Provide a brief introduction to the course."
                        value={formData.courseForm.courseIntroduction}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>
                    {errors.courseIntroduction && <div className="invalid-feedback">{errors.courseIntroduction}</div>}
                </div>

                <div className="row g-2">
                    {/* Textarea لـ Course Assessment */}
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="courseAssessment">Course Assessment</label>
                            <textarea
                                name="courseAssessment"
                                className={`form-control name-input ${errors.courseAssessment ? 'is-invalid' : ''}`}
                                id="courseAssessment"
                                placeholder="Describe how the course will be assessed."
                                value={formData.courseForm.courseAssessment}
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                            {errors.courseAssessment && <div className="invalid-feedback">{errors.courseAssessment}</div>}
                        </div>
                    </div>

                    {/* Textarea لـ Course Requirements */}
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="courseRequirements">Course Requirements</label>
                            <textarea
                                name="courseRequirements"
                                className={`form-control name-input ${errors.courseRequirements ? 'is-invalid' : ''}`}
                                id="courseRequirements"
                                placeholder="List the requirements needed to take the course."
                                value={formData.courseForm.courseRequirements}
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                            {errors.courseRequirements && <div className="invalid-feedback">{errors.courseRequirements}</div>}
                        </div>
                    </div>
                </div>

                {/* Textarea لـ Course Materials */}
                <div className="form-group  mb-3">
                    <label htmlFor="courseMaterials">Course Materials</label>
                    <textarea
                        name="courseMaterials"
                        className={`form-control name-input ${errors.courseMaterials ? 'is-invalid' : ''}`}
                        id="courseMaterials"
                        placeholder="List the materials that will be provided or needed for the course."
                        value={formData.courseForm.courseMaterials}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>
                    {errors.courseMaterials && <div className="invalid-feedback">{errors.courseMaterials}</div>}
                </div>

                {/* Input لـ Publishing Date */}
                <div className="form-group  col-md-4 mb-3">
                    <label htmlFor="publishingDate">Publishing Date</label>
                    <input
                        type="date"
                        name="publishingDate"
                        className={`form-control name-input py-2 ${errors.publishingDate ? 'is-invalid' : ''}`}
                        id="publishingDate"
                        placeholder="Select Publishing Date"
                        value={formData.courseForm.publishingDate}
                        onChange={handleChange}
                        style={{
                            color: formData.courseForm.publishingDate ? '#fff' : '#a19d9d',
                        }}
                    />
                    {errors.publishingDate && <div className="invalid-feedback">{errors.publishingDate}</div>}
                </div>

                {/* Upload Cover Photo */}
                <div className="form-group mb-3">
                    <label htmlFor="coverPhoto">Upload Cover Photo</label>
                    <div
                        className={`custom-file-upload form-control py-5 d-flex flex-column align-items-center justify-content-center ${isDragging ? 'dragging' : ''}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <input
                            type="file"
                            name="coverPhoto"
                            className="d-none"
                            id="coverPhoto"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="coverPhoto" className="text-center mb-0 w-100 d-flex flex-column px-2 px-md-0 py-0 justify-content-center cursor-pointer">
                            <div className="upload-icon"><i className="fas fa-cloud-upload-alt fs-1"></i></div>

                            <div>Drag & drop files or <span className="Browse">Browse</span></div>
                            <small className="form-text text-muted">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</small>
                        </label>
                        {fileAdded && uploadedFileName && (
                            <div className="text-center mt-2">
                                <span className="badge bg-primary p-2">{uploadedFileName}</span>
                            </div>
                        )}
                    </div>
                    {errors.coverPhoto && <div className="invalid-feedback d-block">{errors.coverPhoto}</div>}
                </div>

                {/* Lessons Section */}
                <div>
                    <label htmlFor="Lessons" className="form-label text-white pt-3">
                        Lessons
                    </label>
                    {formData.courseForm.lessons.map((lesson, index) => (
                        <div key={index}>
                            <div className="row mt-2">
                                <div className="col-md-10 position-relative">
                                    <div className="py-3 px-3 pt-4 text-white rounded custom-file-upload w-100 position-relative">
                                        <h6 className="form-label fw-bold text-white text-start pb-2">
                                            Lesson {index + 1}
                                        </h6>
                                        <div className="col-md-12">
                                            <label htmlFor="title" className="form-label align-items-start">Title</label>
                                            <input
                                                type="text"
                                                className={`form-control  name-input ${errors[`lessons[${index}].title`] ? 'is-invalid' : ''}`}
                                                name="title"
                                                value={lesson.title || ''}
                                                onChange={(e) => handleLessonChange(index, e)}
                                                placeholder="Enter Lesson Title"
                                            />
                                            {errors[`lessons[${index}].title`] && (
                                                <div className="invalid-feedback text-start">{errors[`lessons[${index}].title`]}</div>
                                            )}
                                        </div>

                                        <div className="col-md-12 mt-3">
                                            <label htmlFor="description" className="form-label align-items-start">Description</label>
                                            <textarea
                                                name="description"
                                                className={`form-control  name-input ${errors[`lessons[${index}].description`] ? 'is-invalid' : ''}`}
                                                rows="5"
                                                value={lesson.description || ''}
                                                onChange={(e) => handleLessonChange(index, e)}
                                                placeholder="Enter Lesson Description"
                                            />
                                            {errors[`lessons[${index}].description`] && (
                                                <div className="invalid-feedback text-start">{errors[`lessons[${index}].description`]}</div>
                                            )}
                                        </div>

                                        <div className="col-md-12 mt-3">
                                            <label htmlFor="lectureUrl" className="form-label align-items-start">Lecture URL</label>
                                            <input
                                                type="text"
                                                className={`form-control name-input ${errors[`lessons[${index}].lectureUrl`] ? 'is-invalid' : ''}`}
                                                name="lectureUrl"
                                                value={lesson.lectureUrl || ''}
                                                onChange={(e) => handleLessonChange(index, e)}
                                                placeholder="https://www.example.com/lecture"
                                            />
                                            {errors[`lessons[${index}].lectureUrl`] && (
                                                <div className="invalid-feedback text-start">{errors[`lessons[${index}].lectureUrl`]}</div>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            className="Iconslinks position-absolute top-0 end-0 m-2"
                                            onClick={() => handleRemoveLesson(index)}
                                        >
                                            <i className="fas fa-trash-alt pe-2 pt-2"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-2 d-flex align-items-start">
                                    {index === formData.courseForm.lessons.length - 1 && (
                                        <button
                                            type="button"
                                            className="Iconslinks"
                                            onClick={handleAddLesson}
                                        >
                                            <span className='text-white'> Add Lesson </span>  <i className="fas fa-plus ps-1 pt-3"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* أزرار الـ Cancel و Publish */}
                <div className="d-flex flex-column flex-md-row justify-content-end mt-5 mt-md-4">
                    <button type="button" className="bg-grey order-2 order-md-1 btn-gold rounded px-5 py-2 mt-3 mt-md-0 ms-md-2 text-uppercase text-white" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-gold rounded order-1 order-md-2 px-5 py-md-2 text-white text-uppercase ms-md-2 w-md-auto" disabled={isLoading}>
                        {isLoading ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </form>

            {/* رسالة النجاح */}
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

export default CourseForm;
