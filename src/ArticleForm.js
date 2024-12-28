import React, { useCallback, useState, useEffect, useContext } from 'react';
import * as Yup from 'yup'; // إضافة مكتبة Yup للتحقق من البيانات
import useDropdown from './useDropdown'; // استيراد الـ hook المخصص
import { FormContext, articleFormData } from './CvFormAutoEdit'; // استيراد FormContext و articleFormData

// Schema التحقق من البيانات باستخدام Yup
const validationSchema = Yup.object().shape({
    articleTitle: Yup.string().required('Article Title is required'),
    category: Yup.string().required('Category selection is required'),
    content: Yup.string().required('Content is required'),
    publishingDate: Yup.date()
        .nullable()
        .required('Publishing Date is required')
        .typeError('Invalid Date'),
    coverPhoto: Yup.mixed()
        .nullable()
        .required('Cover Photo is required') // التحقق من الحقل
});

const ArticleForm = () => {
    // استخدام FormContext بدلاً من useLocalStorage
    const { formData, setFormData } = useContext(FormContext);

    const [errors, setErrors] = useState({}); // State للأخطاء
    const [fileAdded, setFileAdded] = useState(false); // State لتتبع إضافة الملف
    const [uploadedFileName, setUploadedFileName] = useState(''); // State لاسم الملف
    const [isLoading, setIsLoading] = useState(false); // State للتحميل
    const [successMessage, setSuccessMessage] = useState(""); // State لرسالة النجاح

    const { dropdownStates, toggleDropdown, closeAllDropdowns, dropdownRef } = useDropdown({
        category: false,
    });

    // عند رفع الملف يدوياً
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: undefined
        }));

        setFormData({
            ...formData,
            articleForm: {
                ...formData.articleForm,
                [name]: value
            }
        });
    }, [formData, setFormData]);

    // لتحويل الملف إلى Base64 وتخزينه
    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    articleForm: {
                        ...formData.articleForm,
                        coverPhoto: reader.result,
                        coverPhotoName: file.name
                    }
                });
            };
            reader.readAsDataURL(file); // قراءة الملف وتحويله إلى Base64
            setUploadedFileName(file.name);
            setFileAdded(true);

            setErrors(prevErrors => ({
                ...prevErrors,
                coverPhoto: undefined
            }));
        }
    }, [formData, setFormData]);

    // للتعامل مع سحب الملفات وإسقاطها
    const handleDragOver = (e) => {
        e.preventDefault(); // منع الفعل الافتراضي للسحب
    };

    const handleDrop = (e) => {
        e.preventDefault(); // منع الفعل الافتراضي عند الإسقاط
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    articleForm: {
                        ...formData.articleForm,
                        coverPhoto: reader.result,
                        coverPhotoName: file.name
                    }
                });
            };
            reader.readAsDataURL(file);
            setUploadedFileName(file.name);
            setFileAdded(true);

            setErrors(prevErrors => ({
                ...prevErrors,
                coverPhoto: undefined
            }));
        }
    };

    useEffect(() => {
        if (!formData.articleForm) {
            setFormData({ ...formData, articleForm: { ...articleFormData } });
        } else {
            if (formData.articleForm.coverPhoto) {
                setFileAdded(true);
                setUploadedFileName(formData.articleForm.coverPhotoName || '');

                // إزالة الخطأ الخاص بحقل coverPhoto إذا كان هناك ملف
                setErrors(prevErrors => ({
                    ...prevErrors,
                    coverPhoto: undefined
                }));
            } else {
                setFileAdded(false);
                setUploadedFileName('');
            }
        }
    }, [formData, setFormData]);

    // دالة خاصة بزر "Publish" للتحقق من البيانات ثم إرسالها
    const handlePublish = useCallback((event) => {
        event.preventDefault();
        setIsLoading(true);

        validationSchema.validate(formData.articleForm, { abortEarly: false })
            .then(() => {
                setErrors({});
                console.log('Form data is valid:', formData.articleForm);

                // هنا يتم التعامل مع البيانات بعد الإرسال بنجاح
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccessMessage("Form submitted successfully!");

                    // إعادة تعيين البيانات إلى القيم الافتراضية
                    setFormData(prevState => ({
                        ...prevState,
                        articleForm: {
                            ...articleFormData
                        }
                    }));

                    setFileAdded(false);
                    setUploadedFileName('');

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

    const handleSelectOption = (selectedOption, field) => {
        setFormData({
            ...formData,
            articleForm: {
                ...formData.articleForm,
                [field]: selectedOption
            }
        });
        toggleDropdown(field); // إغلاق القائمة بعد الاختيار

        // مسح الخطأ عند اختيار الفئة
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: undefined
        }));
    };

    // حماية للتأكد من وجود `articleForm` قبل الرندر
    if (!formData.articleForm) {
        return <div>جاري التحميل...</div>;
    }

    return (
        <div className="mb-5 mt-5">
            {/* top bar */}
            <div className="px-0 px-md-3  d-flex align-items-center mb-2 me-auto ">
                <div className="col-12 col-md-6 text-md-start ">
                    <div className="header-title d-block">
                        Add Article Details
                        <div className="linee d-none d-md-block mx-md-0"></div>
                    </div>
                </div>
            </div>
            <form className="p-4 rounded shadow custom-form" onSubmit={handlePublish} ref={dropdownRef} onClick={(e) => {
                if (!e.target.closest('.dropdown-menu') && !e.target.closest('.dropdown-toggle')) {
                    closeAllDropdowns(); // إغلاق القوائم المنسدلة عند النقر خارجها
                }
            }}>

                <div className="row g-2">
                    <div className="col-md-7 ">
                        <div className="form-group mb-3">
                            <label htmlFor="articleTitle" className="text-white">Article Title</label>
                            <input
                                type="text"
                                name="articleTitle"
                                className={`form-control py-2 name-input ${errors.articleTitle ? 'is-invalid' : ''}`}
                                id="articleTitle"
                                placeholder="Enter Article Title"
                                value={formData.articleForm.articleTitle}
                                onChange={handleChange}
                            />
                            {errors.articleTitle && <div className="invalid-feedback">{errors.articleTitle}</div>}
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="form-group mb-3">
                            <label htmlFor="category" className="text-white">Category</label>
                            <div className="dropdown rounded">
                                <button
                                    className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.category ? 'is-invalid' : ''}`}
                                    type="button"
                                    id="dropdownCategoryButton"
                                    onClick={() => toggleDropdown('category')}
                                    aria-expanded={dropdownStates.category}
                                >
                                    <span className={formData.articleForm.category ? 'normal-text' : 'placeholder-text'}>
                                        {formData.articleForm.category || 'Select Category'}
                                    </span>
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                                <ul className={`dropdown-menu dropdownmenuForm ${dropdownStates.category ? 'show' : ''}`} aria-labelledby="dropdownCategoryButton">
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Category 1', 'category')}>Category 1</button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item" onClick={() => handleSelectOption('Category 2', 'category')}>Category 2</button>
                                    </li>
                                </ul>
                                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="content" className="text-white">Content</label>
                    <textarea
                        className={`form-control name-input ${errors.content ? 'is-invalid' : ''}`}
                        id="content"
                        name="content"
                        rows="6"
                        placeholder="Write content..."
                        value={formData.articleForm.content}
                        onChange={handleChange}
                    ></textarea>
                    {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                </div>

                <div className="form-group mb-3 col-md-4">
                    <label htmlFor="publishingDate" className="text-white">Publishing Date</label>
                    <input
                        type="date"
                        name="publishingDate"
                        className={`form-control py-2  ${errors.publishingDate ? 'is-invalid' : ''}`}
                        id="publishingDate"
                        value={formData.articleForm.publishingDate}
                        onChange={handleChange}
                        style={{ color: formData.articleForm.publishingDate ? '#fff' : '#a19d9d' }} // التحكم في لون الخلفية والنص
                    />
                    {errors.publishingDate && <div className="invalid-feedback">{errors.publishingDate}</div>}
                </div>

                <div
                    className="form-group mb-3 position-relative"
                    onDrop={handleDrop} // إضافة الإسقاط هنا
                    onDragOver={handleDragOver} // منع فتح الملف عند السحب
                >
                    <label htmlFor="coverPhoto" className="text-white">Upload Cover Photo</label>
                    <div className={`custom-file-upload py-5 ${errors.coverPhoto ? 'is-invalid' : ''}`}>
                        <input
                            type="file"
                            name="coverPhoto"
                            className="d-none"
                            id="coverPhoto"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="coverPhoto" className="text-center mb-0 w-100 d-flex flex-column px-2 px-md-0 py-0 justify-content-center">
                            <div className="upload-icon"><i className="fas fa-cloud-upload-alt fs-1"></i></div>
                            <div>Drag & drop files or <span className="Browse">Browse</span></div>
                            <small className="form-text text-muted">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</small>
                        </label>
                        {fileAdded && uploadedFileName && (
                            <div className=" text-white text-center mt-2">
                                <span className='badge bg-primary p-2'>  {uploadedFileName}</span>
                            </div>
                        )}
                    </div>
                    {errors.coverPhoto && <div className="invalid-feedback">{errors.coverPhoto}</div>}
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-end mt-5 mt-md-4">
                    <button
                        type="button"
                        className="bg-grey order-2 order-md-1 btn-gold rounded px-5 py-2 mt-3 mt-md-0 ms-md-2 text-uppercase text-white"
                        onClick={() => {
                            setFormData({
                                ...formData,
                                articleForm: {
                                    ...articleFormData
                                }
                            });
                            setErrors({});
                            setFileAdded(false);
                            setUploadedFileName('');
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-gold rounded order-1 order-md-2 px-5 py-md-2 text-white text-uppercase ms-md-2 w-md-auto"
                    >
                        {isLoading ? "Publish..." : "Publish"}
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

export default ArticleForm;
