import React, { useCallback, useState, useContext, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import useDropdown from './useDropdown';
import { FormContext, examFormData } from './CvFormAutoEdit';

// Validation Schema
const validationSchema = Yup.object().shape({
    courseName: Yup.string().required('Course Name is required'),
    level: Yup.string().required('Level is required'),
    fullMark: Yup.number()
        .typeError('Please enter a valid number')
        .positive('Full Mark must be positive')
        .required('Full Mark is required'),
    date: Yup.date().required('Date is required').typeError('Invalid Date'),
    time: Yup.string().required('Time is required'),
    duration: Yup.number()
        .typeError('Please enter a valid number')
        .positive('Duration must be positive')
        .required('Duration is required'),
    questions: Yup.array()
        .of(
            Yup.object().shape({
                questionText: Yup.string().required('Question Text is required'),
                type: Yup.string().required('Question Type is required'),
                mark: Yup.number()
                    .typeError('Please enter a valid number')
                    .positive('Mark must be positive')
                    .required('Mark is required'),
                imageUpload: Yup.mixed(),
                options: Yup.array()
                    .of(
                        Yup.object().shape({
                            text: Yup.string().required('Option text is required'),
                            isCorrect: Yup.boolean(),
                        })
                    )
                    .min(1, 'At least one option is required'),
            })
        )
        .min(1, 'At least one question is required'),
});

const ExamForm = () => {
    const { formData, setFormData } = useContext(FormContext);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { dropdownStates, toggleDropdown, dropdownRef } = useDropdown({
        courseName: false,
        level: false,
        questionType: {},
    });

    // Ref to store file input references
    const fileInputRefs = useRef({});

    const handleSelectOption = (selectedOption, field) => {
        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                [field]: selectedOption,
            },
        });
        toggleDropdown(field);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    };

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
            setFormData({
                ...formData,
                examForm: {
                    ...formData.examForm,
                    [name]: value,
                },
            });
        },
        [formData, setFormData]
    );

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...formData.examForm.questions];
        updatedQuestions[index][name] = value;

        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                questions: updatedQuestions,
            },
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [`questions[${index}].${name}`]: undefined,
        }));
    };

    const handleOptionChange = (qIndex, oIndex, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...formData.examForm.questions];
        updatedQuestions[qIndex].options[oIndex][name] = value;

        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                questions: updatedQuestions,
            },
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [`questions[${qIndex}].options[${oIndex}].${name}`]: undefined,
        }));
    };

    const handleAddOption = (qIndex) => {
        const updatedQuestions = [...formData.examForm.questions];
        updatedQuestions[qIndex].options.push({ text: '', isCorrect: false });
        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                questions: updatedQuestions,
            },
        });
    };

    const handleAddQuestion = () => {
        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                questions: [
                    ...formData.examForm.questions,
                    {
                        questionText: '',
                        type: 'Multiple choices', // دي ممكن تبقى فارغة في الأول
                        mark: '',
                        imageUpload: null,
                        options: [{ text: '', isCorrect: false }],
                    },
                ],
            },
        });
    };
    

    const handleRemoveOption = (qIndex, oIndex) => {
        const updatedQuestions = [...formData.examForm.questions];

        // If it's the first option, clear the text
        if (oIndex === 0) {
            updatedQuestions[qIndex].options[oIndex].text = ''; // Clear the text
        } else {
            // Remove the option
            updatedQuestions[qIndex].options.splice(oIndex, 1);
        }

        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                questions: updatedQuestions,
            },
        });
    };

    // Function to remove a question
    const handleRemoveQuestion = (qIndex) => {
        const updatedQuestions = [...formData.examForm.questions];

        // If it's the first question, clear its fields
        if (qIndex === 0) {
            updatedQuestions[qIndex].questionText = ''; // Clear question text
            updatedQuestions[qIndex].mark = ''; // Clear mark
            updatedQuestions[qIndex].type = ''; // Clear type
            updatedQuestions[qIndex].imageUpload = null; // Clear imageUpload

            // Clear the file input
            if (fileInputRefs.current[qIndex]) {
                fileInputRefs.current[qIndex].value = '';
            }

            updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.map(option => ({
                ...option,
                text: '', // Clear option text
                isCorrect: false // Reset isCorrect
            }));
        } else {
            // Remove the entire question
            // Also delete the file input ref
            if (fileInputRefs.current[qIndex]) {
                delete fileInputRefs.current[qIndex];
            }
            updatedQuestions.splice(qIndex, 1);
        }

        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                questions: updatedQuestions,
            },
        });

        // Clear errors related to the removed question
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`questions[${qIndex}]`)) {
                delete newErrors[key];
            }
        });
        setErrors(newErrors);
    };

    const handleCorrectOptionChange = (qIndex, oIndex) => {
        const updatedQuestions = [...formData.examForm.questions];
        updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.map(
            (option, index) => ({
                ...option,
                isCorrect: index === oIndex,
            })
        );
        setFormData({
            ...formData,
            examForm: {
                ...formData.examForm,
                questions: updatedQuestions,
            },
        });
    };

    const handleFileChange = (qIndex, e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedQuestions = [...(formData.examForm.questions || [])];
            updatedQuestions[qIndex].imageUpload = file.name;
            setFormData({
                ...formData,
                examForm: {
                    ...formData.examForm,
                    questions: updatedQuestions,
                },
            });

            setErrors((prevErrors) => ({
                ...prevErrors,
                [`questions[${qIndex}].imageUpload`]: undefined,
            }));
        }
    };

    const handlePublish = useCallback(
        async (event) => {
            event.preventDefault();
            setIsLoading(true);
    
            try {
                await validationSchema.validate(formData.examForm, { abortEarly: false });
                setErrors({});
                console.log('Form data is valid:', formData.examForm);
    
                // Submit data to the server
                // Implement your submission logic here
    
                // Reset the form, بس نخلي سؤال فاضي
                setFormData({
                    ...formData,
                    examForm: {
                        ...examFormData,
                        questions: examFormData.questions.map(() => ({
                            questionText: '',
                            type: '',
                            mark: '',
                            imageUpload: null,
                            options: [{ text: '', isCorrect: false }],
                            shortAnswer: '',
                        })),
                    },
                });
    
                // Clear all file inputs
                Object.keys(fileInputRefs.current).forEach(qIndex => {
                    if (fileInputRefs.current[qIndex]) {
                        fileInputRefs.current[qIndex].value = '';
                    }
                });
    
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccessMessage('Exam submitted successfully!');
    
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                }, 1000);
            } catch (validationErrors) {
                if (validationErrors.name === 'ValidationError') {
                    const formattedErrors = {};
                    validationErrors.inner.forEach((error) => {
                        formattedErrors[error.path] = error.message;
                    });
                    setErrors(formattedErrors);
                } else {
                    console.error('Submission error:', validationErrors);
                }
    
                setIsLoading(false);
            }
        },
        [formData, setFormData]
    );
    

    const handleCancel = () => {
        // Reset the form data
        setFormData({
            ...formData,
            examForm: {
                ...examFormData,
                questions: examFormData.questions.map(() => ({
                    questionText: '',
                    type: '',
                    mark: '',
                    imageUpload: null,
                    options: [{ text: '', isCorrect: false }],
                    shortAnswer: '',
                })),
            },
        });
    
        setErrors({});
    
        // Clear all file inputs
        Object.keys(fileInputRefs.current).forEach(qIndex => {
            if (fileInputRefs.current[qIndex]) {
                fileInputRefs.current[qIndex].value = '';
            }
        });
    };
    useEffect(() => {
        if (!formData.examForm || !formData.examForm.questions) {
          setFormData({
            ...formData,
            examForm: {
              ...examFormData,
              questions: [
                {
                  questionText: '',
                  type: 'Multiple choices', // النوع الافتراضي هنا برضو
                  mark: '',
                  imageUpload: null,
                  options: [{ text: '', isCorrect: false }],
                  shortAnswer: '',
                },
              ],
            },
          });
        }
      }, [formData, setFormData]);
      

    return (
        <div className="mt-5 container">
            <form
                className="rounded"
                onSubmit={handlePublish}
                ref={dropdownRef}
            >
                <div className="row g-3 container mx-auto backgroundRightDiv ps-4 py-3">
                    {/* Dropdown for Course Name */}
                    <div className="col-md-4 form-group">
                        <label htmlFor="courseName">Course Name</label>
                        <div className="dropdown rounded">
                            <button
                                className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.courseName ? 'is-invalid' : ''
                                    }`}
                                type="button"
                                id="dropdownCourseNameButton"
                                onClick={() => toggleDropdown('courseName')}
                                aria-expanded={dropdownStates.courseName}
                            >
                                <span
                                    className={
                                        formData.examForm.courseName
                                            ? 'normal-text'
                                            : 'placeholder-text'
                                    }
                                >
                                    {formData.examForm.courseName ||
                                        'Select Course Name'}
                                </span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            <ul
                                className={`dropdown-menu dropdownmenuForm ${dropdownStates.courseName ? 'show' : ''
                                    }`}
                                aria-labelledby="dropdownCourseNameButton"
                            >
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleSelectOption(
                                                'Course 1',
                                                'courseName'
                                            )
                                        }
                                    >
                                        Course 1
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleSelectOption(
                                                'Course 2',
                                                'courseName'
                                            )
                                        }
                                    >
                                        Course 2
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleSelectOption(
                                                'Course 3',
                                                'courseName'
                                            )
                                        }
                                    >
                                        Course 3
                                    </button>
                                </li>
                            </ul>
                            {errors.courseName && (
                                <div className="invalid-feedback">
                                    {errors.courseName}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dropdown for Level */}
                    <div className="col-md-3 form-group">
                        <label htmlFor="level">Level</label>
                        <div className="dropdown rounded">
                            <button
                                className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors.level ? 'is-invalid' : ''
                                    }`}
                                type="button"
                                id="dropdownLevelButton"
                                onClick={() => toggleDropdown('level')}
                                aria-expanded={dropdownStates.level}
                            >
                                <span
                                    className={
                                        formData.examForm.level
                                            ? 'normal-text'
                                            : 'placeholder-text'
                                    }
                                >
                                    {formData.examForm.level || 'Select Level'}
                                </span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            <ul
                                className={`dropdown-menu dropdownmenuForm ${dropdownStates.level ? 'show' : ''
                                    }`}
                                aria-labelledby="dropdownLevelButton"
                            >
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleSelectOption(
                                                'Level 1',
                                                'level'
                                            )
                                        }
                                    >
                                        Level 1
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                            handleSelectOption(
                                                'Level 2',
                                                'level'
                                            )
                                        }
                                    >
                                        Level 2
                                    </button>
                                </li>
                            </ul>
                            {errors.level && (
                                <div className="invalid-feedback">
                                    {errors.level}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input for Full Mark */}
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="fullMark">Full Mark</label>
                            <input
                                type="number"
                                name="fullMark"
                                className={`form-control name-input py-2 ${errors.fullMark ? 'is-invalid' : ''
                                    }`}
                                id="fullMark"
                                placeholder="Enter Full Mark"
                                value={formData.examForm.fullMark}
                                onChange={handleChange}
                            />
                            {errors.fullMark && (
                                <div className="invalid-feedback">
                                    {errors.fullMark}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input for Date */}
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                name="date"
                                className={`form-control name-input py-2 ${errors.date ? 'is-invalid' : ''
                                    }`}
                                id="date"
                                placeholder="Select Date"
                                value={formData.examForm.date}
                                onChange={handleChange}
                                style={{
                                    color: formData.examForm.date
                                        ? '#000'
                                        : '#a19d9d',
                                }}
                            />
                            {errors.date && (
                                <div className="invalid-feedback">
                                    {errors.date}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input for Time */}
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="time">Time</label>
                            <input
                                type="time"
                                name="time"
                                className={`form-control name-input py-2 ${errors.time ? 'is-invalid' : ''
                                    }`}
                                id="time"
                                placeholder="Select Time"
                                value={formData.examForm.time}
                                onChange={handleChange}
                                style={{
                                    color: formData.examForm.time
                                        ? '#000'
                                        : '#a19d9d',
                                }}
                            />
                            {errors.time && (
                                <div className="invalid-feedback">
                                    {errors.time}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input for Duration */}
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="duration">Duration (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                className={`form-control name-input py-2 ${errors.duration ? 'is-invalid' : ''
                                    }`}
                                id="duration"
                                placeholder="Enter Duration"
                                value={formData.examForm.duration}
                                onChange={handleChange}
                            />
                            {errors.duration && (
                                <div className="invalid-feedback">
                                    {errors.duration}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="Questions" className="form-label text-white pt-4">
                        Questions
                    </label>

                    {formData.examForm.questions.map((question, qIndex) => (
                        <div key={qIndex} className="d-flex flex-column flex-md-row mt-2">
                            <div className="col-md-10 py-5 px-4 rounded custom-file-upload position-relative">
                                {/* Trash Icon في الأعلى */}
                                <button
                                    type="button"
                                    className="Iconslinks position-absolute"
                                    style={{ top: '10px', right: '10px' }}
                                    onClick={() => handleRemoveQuestion(qIndex)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>

                                <div className="row align-items-start g-3 form-label">
                                    <div className="col-md-8">
                                        <h6 className="form-group text-white text-start">
                                            Question {qIndex + 1}
                                        </h6>
                                        <input
                                            name="questionText"
                                            className={`form-control name-input py-2 ${errors[`questions[${qIndex}].questionText`] ? 'is-invalid' : ''}`}
                                            value={question.questionText || ''}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                            placeholder="Enter the question text here"
                                        />
                                        {errors[`questions[${qIndex}].questionText`] && (
                                            <div className="invalid-feedback text-start">
                                                {errors[`questions[${qIndex}].questionText`]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="mark" className="align-items-start form-group pb-1">
                                            Mark
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control name-input py-2 ${errors[`questions[${qIndex}].mark`] ? 'is-invalid' : ''}`}
                                            name="mark"
                                            value={question.mark || ''}
                                            onChange={(e) => handleQuestionChange(qIndex, e)}
                                            placeholder="Enter Mark"
                                        />
                                        {errors[`questions[${qIndex}].mark`] && (
                                            <div className="invalid-feedback text-start">
                                                {errors[`questions[${qIndex}].mark`]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row align-items-start g-3 pt-2">
                                    {/* Dropdown for Question Type */}
                                    <div className="col-md-6 form-group text-start">
                                        <label
                                            htmlFor={`questionType-${qIndex}`}
                                            className="form-label text-start d-block"
                                        >
                                            Question Type
                                        </label>
                                        <div className="dropdown rounded">
    <button
        className={`btn custom-select dropdown-toggle py-2 w-100 d-flex justify-content-between align-items-center ${errors[`questions[${qIndex}].type`] ? 'is-invalid' : ''}`}
        type="button"
        id={`dropdownQuestionTypeButton-${qIndex}`}
        onClick={() => toggleDropdown(`questionType-${qIndex}`)}
        aria-expanded={dropdownStates[`questionType-${qIndex}`]}
    >
       <span className={question.type ? 'normal-text' : 'placeholder-text'}>
  {question.type || 'Select Question Type'}
</span>

        <i className="fas fa-chevron-down"></i>
    </button>
    <ul
        className={`dropdown-menu dropdownmenuForm ${dropdownStates[`questionType-${qIndex}`] ? 'show' : ''}`}
        aria-labelledby={`dropdownQuestionTypeButton-${qIndex}`}
    >
        <li>
            <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                    handleQuestionChange(qIndex, {
                        target: { name: 'type', value: 'Multiple choices' },
                    });
                    toggleDropdown(`questionType-${qIndex}`);
                }}
            >
                Multiple choices
            </button>
        </li>
        <li>
            <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                    handleQuestionChange(qIndex, {
                        target: { name: 'type', value: 'Short Answer' },
                    });
                    toggleDropdown(`questionType-${qIndex}`);
                }}
            >
                Short Answer
            </button>
        </li>
    </ul>
    {errors[`questions[${qIndex}].type`] && (
        <div className="invalid-feedback">
            {errors[`questions[${qIndex}].type`]}
        </div>
    )}
</div>

                                    </div>

                                    <div className="col-md-6 text-start">
                                        <label htmlFor={`imageUpload-${qIndex}`} className="form-label text-start d-block">Image Upload</label>
                                        <div className="input-group upload-icon">
                                            {/* File input */}
                                            <input
                                                type="file"
                                                className="form-control file-input "
                                                id={`imageUpload-${qIndex}`}
                                                ref={el => fileInputRefs.current[qIndex] = el}
                                                onChange={(e) => handleFileChange(qIndex, e)}
                                            />

                                            {/* Label acting as button to upload */}
                                            <label className="input-group-text form-control rounded" htmlFor={`imageUpload-${qIndex}`} style={{ cursor: 'pointer' }}>
                                                <i className="fas fa-cloud-upload-alt fs-4 my-0 w-100 text-end"></i>
                                            </label>

                                            {/* Display file name */}
                                            <input
                                                type="text"
                                                className="form-control bg-transparent  text-white"
                                                value={question.imageUpload || 'No file chosen'}
                                                readOnly
                                            />
                                        </div>

                                        {/* Error for imageUpload */}
                                        {errors[`questions[${qIndex}].imageUpload`] && (
                                            <div className="invalid-feedback d-block">
                                                {errors[`questions[${qIndex}].imageUpload`]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Logic to switch between Multiple choices and Short Answer */}
                                {question.type === 'Multiple choices' ? (
                                    question.options.map((option, oIndex) => (
                                        <div key={`${qIndex}-${oIndex}`} className="d-flex flex-column flex-md-row align-items-end pt-3">
                                            <div className="col-12 col-md-8">
                                                <label htmlFor={`option-${qIndex}-${oIndex}`} className="form-label d-block text-start">Option</label>
                                                <div className="input-group rounded d-flex flex-column flex-md-row position-relative">
                                                    <input
                                                        id={`option-${qIndex}-${oIndex}`}
                                                        name="text"
                                                        type="text"
                                                        className={`form-control name-input py-2 w-100 rounded ${errors[`questions[${qIndex}].options[${oIndex}].text`] ? 'is-invalid' : ''}`}
                                                        value={option.text || ''}
                                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                                        placeholder="Enter option text"
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            type="button"
                                                            className={`btn Button ${option.isCorrect ? 'btn-success' : 'btn-danger'} col-md-4  py-1 my-auto position-absolute d-flex align-items-center justify-content-center custom-button`}
                                                            style={{
                                                                right: '3px',
                                                                top: '50%',
                                                                transform: 'translateY(-50%)'
                                                            }}
                                                            onClick={() => handleCorrectOptionChange(qIndex, oIndex)}
                                                        >
                                                            <i className={`fas ${option.isCorrect ? 'fa-check-circle' : 'fa-times-circle'} me-2`}></i>
                                                            {option.isCorrect ? ' Correct answer ' : 'Wrong answer'}
                                                        </button>
                                                    </div>
                                                </div>
                                                {errors[`questions[${qIndex}].options[${oIndex}].text`] && (
                                                    <div className="invalid-feedback text-start">
                                                        {errors[`questions[${qIndex}].options[${oIndex}].text`]}
                                                    </div>
                                                )}
                                            </div>

                                            <div className='d-flex pt-2 pt-md-0 pb-2'>
                                                <button
                                                    type="button"
                                                    className="Iconslinks ms-3"
                                                    onClick={() => handleRemoveOption(qIndex, oIndex)}
                                                >
                                                    <i className="fas fa-trash-alt fs-6"></i>
                                                </button>
                                                {oIndex === question.options.length - 1 && (
                                                    <button
                                                        type="button"
                                                        className="Iconslinks ms-3"
                                                        onClick={() => handleAddOption(qIndex)}
                                                    >
                                                        <i className="fas fa-plus fs-6"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="short-answer mb-3">
                                        <label className="form-label text-start d-block pt-3">Answer</label>
                                        <div className="input-group rounded d-flex flex-column flex-md-row position-relative">
                                            <textarea
                                                name="shortAnswer"
                                                className="form-control name-input py-2 w-100 rounded"
                                                placeholder="Enter the short answer"
                                                rows={4}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    type="button"
                                                    className={`btn Button btn-success col-md-2 px-0 py-1 my-auto position-absolute d-flex align-items-center justify-content-center custom-button`}
                                                    style={{
                                                        right: '3px',
                                                        top: '20%',
                                                        transform: 'translateY(-50%)'
                                                    }}
                                                >
                                                    <i className="fas fa-check-circle me-2"></i>
                                                    Correct answer
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>

                            {/* Add Question Button */}
                            <div className="col-md-2 d-flex align-items-start justify-content-end justify-content-md-center pt-2 ">
                                {qIndex === formData.examForm.questions.length - 1 && (
                                    <button
                                        type="button"
                                        className="Iconslinks mb-2"
                                        onClick={handleAddQuestion}
                                    >
                                        <span className='text-white'> Add Question </span>
                                        <i className="fas fa-plus ps-1 "></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}


                </div>

                {/* Buttons for Cancel and Publish */}
                <div className="d-flex flex-column flex-md-row justify-content-end mt-5 mt-md-4">
                    <button
                        type="button"
                        className="bg-grey order-2 order-md-1 btn-gold rounded px-5 py-2 mt-3 mt-md-0 ms-md-2 text-uppercase text-white"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-gold rounded order-1 order-md-2 px-5 py-md-2 text-white text-uppercase ms-md-2 w-md-auto"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </form>

            {/* Success Message */}
            <div className="container px-0  mt-2">
                {successMessage && (
                    <div className="alert alert-success text-center mt-2 mt-md-4 rounded">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamForm;
