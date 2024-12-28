// CertificateForm.js
import React, { useCallback, useState, useContext, useEffect } from 'react';
import * as Yup from 'yup'; // إضافة مكتبة Yup للتحقق من البيانات
import useDropdown from './useDropdown'; // استيراد الـ hook المخصص
import { FormContext, certificateFormData } from './CvFormAutoEdit'; // استيراد FormContext و certificateFormData

// Schema التحقق من البيانات باستخدام Yup
const validationSchema = Yup.object().shape({
    studentName: Yup.string().required('Student Name is required'),
    dateAcquired: Yup.date()
        .nullable()
        .required('Date Acquired is required')
        .typeError('Invalid Date'),
    uploadDate: Yup.date()
        .nullable()
        .required('Upload Date is required')
        .typeError('Invalid Date'),
    course: Yup.string().required('Course selection is required'),
    certificate: Yup.mixed()
        .nullable()
        .required('Certificate is required'), // التحقق من الحقل
});

const CertificateForm = () => {
    // استخدام FormContext بدلاً من useLocalStorage
    const { formData, setFormData } = useContext(FormContext);

    const [errors, setErrors] = useState({}); // State للأخطاء
    const [fileAdded, setFileAdded] = useState(false); // State لتتبع إضافة الملف
    const [uploadedFileName, setUploadedFileName] = useState(''); // State لاسم الملف
    const [isLoading, setIsLoading] = useState(false); // State للتحميل
    const [successMessage, setSuccessMessage] = useState(""); // State لرسالة النجاح

    const { dropdownStates, toggleDropdown, closeAllDropdowns, dropdownRef } = useDropdown({
        course: false,
    });

    // دالة التعامل مع تغيير القيم في الحقول
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: undefined
        }));

        setFormData({
            ...formData,
            certificateForm: {
                ...formData.certificateForm,
                [name]: value,
            },
        });
    }, [formData, setFormData]);

    // دالة التعامل مع رفع الملفات يدوياً
    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                certificateForm: {
                    ...formData.certificateForm,
                    certificate: file,
                    certificateName: file.name,
                },
            });
            setUploadedFileName(file.name);
            setFileAdded(true);
            setErrors(prevErrors => ({
                ...prevErrors,
                certificate: undefined,
            }));
        }
    }, [formData, setFormData]);

    // دالة التعامل مع سحب الملفات وإسقاطها
    const handleDragOver = (e) => {
        e.preventDefault(); // منع الـ browser من الفعل الافتراضي عند السحب
    };

    const handleDrop = (e) => {
        e.preventDefault(); // منع الـ browser من فتح الملف
        const file = e.dataTransfer.files[0]; // التقاط الملف
        if (file) {
            setFormData({
                ...formData,
                certificateForm: {
                    ...formData.certificateForm,
                    certificate: file,
                    certificateName: file.name,
                },
            });
            setUploadedFileName(file.name);
            setFileAdded(true);
            setErrors(prevErrors => ({
                ...prevErrors,
                certificate: undefined, // مسح الخطأ الخاص بالشهادة
            }));
        }
    };

    // تأكد من تهيئة `certificateForm` لو مش موجودة
    useEffect(() => {
        if (!formData.certificateForm) {
            setFormData({
                ...formData,
                certificateForm: { ...certificateFormData },
            });
        } else {
            if (formData.certificateForm.certificate) {
                setFileAdded(true);
                setUploadedFileName(formData.certificateForm.certificateName || '');
            } else {
                setFileAdded(false);
                setUploadedFileName('');
            }
        }
    }, [formData, setFormData]);

    // دالة التعامل مع إرسال النموذج
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setIsLoading(true);

        validationSchema.validate(formData.certificateForm, { abortEarly: false })
            .then(() => {
                setErrors({});
                console.log('Form data is valid:', formData.certificateForm);

                // هنا يتم التعامل مع البيانات بعد الإرسال بنجاح
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccessMessage("Form submitted successfully!");

                    // إعادة تعيين البيانات إلى القيم الافتراضية
                    setFormData((prevState) => ({
                        ...prevState,
                        certificateForm: { ...certificateFormData },
                    }));

                    setFileAdded(false);
                    setUploadedFileName('');

                    // مسح رسالة النجاح بعد فترة
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 5000);
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

    // دالة التعامل مع اختيار الخيارات من القوائم المنسدلة
    const handleSelectOption = (selectedOption, field) => {
        setFormData({
            ...formData,
            certificateForm: {
                ...formData.certificateForm,
                [field]: selectedOption,
            },
        });
        toggleDropdown(field); // إغلاق القائمة بعد الاختيار

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: undefined,
        }));
    };

    return (
        <div className="mb-5 mt-5 mx-auto justify-content-center">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            {/* شريط العنوان */}
            <div className="px-0 px-md-3 d-flex align-items-center mb-2 me-auto">
                <div className="col-12 col-md-6 text-md-start">
                    <div className="header-title d-block">
                        Certificate Details
                        <div className="linee d-none d-md-block mx-md-0"></div>
                    </div>
                </div>
            </div>
            <form
                className="p-4 rounded shadow custom-form"
                onSubmit={handleSubmit}
                ref={dropdownRef}
                onClick={(e) => {
                    if (!e.target.closest('.dropdown-menu') && !e.target.closest('.dropdown-toggle')) {
                        closeAllDropdowns();
                    }
                }}
            >
                <div className="row g-2">
                    <div className="col-md-6 mb-3 form-group">
                        <label htmlFor="studentName" className="text-white">Student Name</label>
                        <input
                            type="text"
                            name="studentName"
                            className={`form-control py-2 name-input ${errors.studentName ? 'is-invalid' : ''}`}
                            id="studentName"
                            placeholder="Enter Student Name"
                            value={formData.certificateForm.studentName}
                            onChange={handleChange}
                        />
                        {errors.studentName && <div className="invalid-feedback">{errors.studentName}</div>}
                    </div>

                    <div className="col-md-3 mb-3 form-group">
                        <label htmlFor="dateAcquired" className="text-white">Date Acquired</label>
                        <input
                            type="date"
                            name="dateAcquired"
                            className={`form-control py-2 ${errors.dateAcquired ? 'is-invalid' : ''}`}
                            id="dateAcquired"
                            value={formData.certificateForm.dateAcquired}
                            onChange={handleChange}
                            style={{ color: formData.certificateForm.dateAcquired ? '#fff' : '#a19d9d' }} // التحكم في لون النص
                        />
                        {errors.dateAcquired && <div className="invalid-feedback">{errors.dateAcquired}</div>}
                    </div>

                    <div className="col-md-3 mb-3 form-group">
                        <label htmlFor="uploadDate" className="text-white">Upload Date</label>
                        <input
                            type="date"
                            name="uploadDate"
                            className={`form-control py-2 ${errors.uploadDate ? 'is-invalid' : ''}`}
                            id="uploadDate"
                            value={formData.certificateForm.uploadDate}
                            onChange={handleChange}
                            style={{ color: formData.certificateForm.uploadDate ? '#fff' : '#a19d9d' }} // التحكم في لون النص
                        />
                        {errors.uploadDate && <div className="invalid-feedback">{errors.uploadDate}</div>}
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="course" className="text-white">Course</label>
                    <div className="dropdown rounded">
                        <button
                            className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.course ? 'is-invalid' : ''}`}
                            type="button"
                            id="dropdownCourseButton"
                            onClick={() => toggleDropdown('course')}
                            aria-expanded={dropdownStates.course}
                        >
                            <span className={formData.certificateForm.course ? 'normal-text' : 'placeholder-text'}>
                                {formData.certificateForm.course || 'Select Course'}
                            </span>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        <ul className={`dropdown-menu dropdownmenuForm ${dropdownStates.course ? 'show' : ''}`} aria-labelledby="dropdownCourseButton">
                            <li>
                                <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Course 1', 'course')}>Course 1</button>
                            </li>
                            <li>
                                <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Course 2', 'course')}>Course 2</button>
                            </li>
                            <li>
                                <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Course 3', 'course')}>Course 3</button>
                            </li>
                        </ul>
                        {errors.course && <div className="invalid-feedback">{errors.course}</div>}
                    </div>
                </div>

                <div
                    className="form-group mb-3 position-relative"
                    onDrop={handleDrop} // للتعامل مع الإسقاط
                    onDragOver={handleDragOver} // منع الـ browser من فتح الملف
                >
                    <label htmlFor="certificate" className="text-white">Upload Certificate</label>
                    <div className={`custom-file-upload py-5 ${errors.certificate ? 'is-invalid' : ''}`}>
                        <input
                            type="file"
                            name="certificate"
                            className="d-none"
                            id="certificate"
                            onChange={handleFileChange} // رفع الملف عن طريق الضغط على Browse
                        />
                        <label htmlFor="certificate" className="text-center mb-0 w-100 d-flex flex-column justify-content-center px-2 px-md-0">
                            <div className="upload-icon"><i className="fas fa-cloud-upload-alt fs-1"></i></div>
                            <div>Drag & drop files or <span className="Browse">Browse</span></div>
                            <small className="form-text text-muted">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</small>
                        </label>

                        {/* عرض اسم الفايل بعد رفعه */}
                        {fileAdded && uploadedFileName && (
                            <div className="mt-2 text-white text-center">
                             <span className='badge bg-primary p-2'> {uploadedFileName}</span>  
                            </div>
                        )}
                    </div>
                    {errors.certificate && <div className="invalid-feedback">{errors.certificate}</div>}
                </div>

                <div className="container px-0 mt-4">
                    <div className="row justify-content-end g-2">
                        <div className="col-12 col-md-auto order-2 order-md-1 mb-2 mb-md-0">
                            <button
                                type="button"
                                className="bg-grey btn-gold rounded px-5 py-md-2 text-uppercase text-white w-100 mt-1 mt-md-0 w-md-auto"
                                onClick={() => {
                                    // إعادة تعيين الحقول في النموذج
                                    setFormData({
                                        ...formData,
                                        certificateForm: { ...certificateFormData },
                                    });

                                    // إزالة أي أخطاء حالية
                                    setErrors({});
                                    setFileAdded(false);
                                    setUploadedFileName('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="col-12 col-md-auto order-1 order-md-2">
                            <button
                                type="submit"
                                className="btn-gold rounded px-5 py-md-2 text-white text-uppercase w-100 w-md-auto"
                                disabled={isLoading}
                            >
                                {isLoading ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="container px-0 px-md-4 mt-2">
                {successMessage && (
                    <div className="alert alert-success text-center rounded">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificateForm;
