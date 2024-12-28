
import React, { useContext, useState } from 'react';
//npm install react-phone-input-2
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormContext } from './CvFormAutoEdit';

export const Form1 = () => {
  const { formData, setFormData } = useContext(FormContext);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

  };


  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (



    <form className="pt-4  ps-md-3  text-white rounded">
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="col-md-6 mt-3 mt-md-auto">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="profession" className="form-label">Profession</label>
          <input
            type="text"
            className="form-control"
            id="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Your Major"
          />
        </div>
        <div className="col-md-6 mt-3 mt-md-auto">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>
        <div className="col-md-6 mt-3 mt-md-auto">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
          <PhoneInput
            country={'eg'}
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Name@gmail.com"
          />
        </div>
      </div>

      {/* upload ur Personal Photo*/}
      <label htmlFor="PersonalPhoto" className="text-white">Personal Photo</label>
      <div className="rounded mt-2 custom-file-upload py-4">
        <input
          type="file"
          name="photo"
          className="d-none"
          id="PersonalPhoto"
          onChange={handlePhotoUpload}
        />
        <label htmlFor="PersonalPhoto" className="text-center mb-0 px-3 w-100 h-100 d-flex flex-column justify-content-center">
          <div className="upload-icon">
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <div>
            Drag & drop files or <span className="Browse">Browse</span>
          </div>
          <small className="form-text text-muted text-center mt-2">
            Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
          </small>
        </label>
      </div>
    </form>

  );
};



// Form 2 skill
export const Form2 = () => {
  const { formData, setFormData } = useContext(FormContext); 
  const [skill, setSkill] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);

  // Start editing the selected skill
  const handleEdit = (currentSkill, index) => {
    setIsEditing(true);
    setSkill(currentSkill);
    setEditedIndex(index);
  };

  // Add new skill or update an existing one
  const addSkill = () => {
    if (skill.trim()) {
      if (isEditing && editedIndex !== null) {

        const updatedSkills = [...formData.skills];
        updatedSkills[editedIndex] = skill;
        setFormData({ ...formData, skills: updatedSkills });
        setIsEditing(false);
        setEditedIndex(null);
      } else {

        setFormData({
          ...formData,
          skills: [...(formData.skills || []), skill],
        });
      }
      setSkill('');
    }
  };

  // Remove the selected skill
  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Handle skill input changes
  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };
  return (
    <form className="p-4">
      {/* skills */}
      <div className="mb-3 skills-input">
        <label htmlFor="skill" className="form-label text-white mb-3"> Skills</label>
        <div className="relative-container" style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skillInput"
            placeholder="Add a skill or edit"
            value={skill}
            onChange={handleSkillChange}

          />
          <button
            type="button"
            className=" btn-gold px-4 px-md-4 py-2 text-white"
            style={{ position: 'absolute', right: '0px', top: '0px', borderRadius: "17px 3px 3px 17px" }}
            onClick={addSkill}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>


        <div className="skills-list mt-3 w-100">
          {formData.skills && formData.skills.length > 0 ? (
            formData.skills.map((skill, index) => (
              <span
                key={index}
                className="skill-tag d-flex justify-content-between align-items-center flex-nowrap w-100 p-2 rounded"
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
    </form>

  );
};


// Form3 Component
export const Form3 = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [hobby, setHobby] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);

  const handleEdit = (currentHobby, index) => {
    setIsEditing(true);
    setHobby(currentHobby);
    setEditedIndex(index);
  };


  const addHobby = () => {
    if (hobby.trim()) {
      if (isEditing && editedIndex !== null) {

        const updatedHobbies = [...formData.hobbies];
        updatedHobbies[editedIndex] = hobby;
        setFormData({ ...formData, hobbies: updatedHobbies });
        setIsEditing(false);
        setEditedIndex(null);
      } else {

        setFormData({
          ...formData,
          hobbies: [...(formData.hobbies || []), hobby],
        });
      }
      setHobby('');
    }
  };


  const handleRemoveHobby = (hobbyToRemove) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter((hobby) => hobby !== hobbyToRemove),
    });
  };


  const handleHobbyChange = (e) => {
    setHobby(e.target.value);
  };

  return (
    <form className="p-4">

      <div className="mb-3 hobbies-input">
        <label htmlFor="hobby" className="form-label text-white mb-3">
          Hobbies & Interests
        </label>
        <div className="relative-container" style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            id="hobbies"
            name="hobbyInput"
            placeholder="Add a Hobby or Interest"
            value={hobby}
            onChange={handleHobbyChange}
          />
          <button
            type="button"
            className="btn btn-gold px-4 px-md-4 py-2 text-white"
            style={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              borderRadius: '17px 3px 3px 17px',
            }}
            onClick={addHobby}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>


        <div className="hobbies-list mt-3 w-100">
          {formData.hobbies && formData.hobbies.length > 0 ? (
            formData.hobbies.map((hobby, index) => (
              <span
                key={index}
                className="skill-tag mt-2 d-flex justify-content-between align-items-center flex-nowrap w-100 p-2 rounded"
                style={{
                  border: '1px solid #BF9530',

                }}
              >
                <span
                  className="text-break me-2 flex-grow-1"
                  onClick={() => handleEdit(hobby, index)}
                  style={{ cursor: 'pointer' }}
                >
                  {hobby}
                </span>
                <i
                  className="fas fa-times flex-shrink-0"
                  onClick={() => handleRemoveHobby(hobby)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </span>
            ))
          ) : (
            <p className="text-muted">No Hobbies & Interests added yet</p>
          )}
        </div>
      </div>
    </form>
  );
};

export const Form4 = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [about, setAbout] = useState(formData.about || '');



  const handleAboutChange = (e) => {
    setAbout(e.target.value);
    setFormData({ ...formData, about: e.target.value });
  };

  return (
    <form className="p-4">

      <div className="mb-3">
        <label htmlFor="about" className="form-label text-white mb-3">
          About
        </label>
        <textarea
          id="about"
          className="form-control"
          name="aboutInput"
          placeholder="Write something about yourself"
          rows="5"
          value={about}
          onChange={handleAboutChange}
        />
      </div>
    </form>
  );
};

export const Form5 = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [tempExperience, setTempExperience] = useState(formData.experience || [{ companyName: '', position: '', fromDate: '', toDate: '', companyLogo: '', description: '' }]);

  
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;

    const updatedExperience = [...tempExperience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };

    setTempExperience(updatedExperience);

  
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

 
  const handleAddExperience = () => {
    setTempExperience([...tempExperience, { companyName: '', position: '', fromDate: '', toDate: '', companyLogo: '', description: '' }]);
  };


  const handleRemoveExperience = (index) => {
    let updatedExperience;
    if (tempExperience.length === 1) {
     
      updatedExperience = [{ companyName: '', position: '', fromDate: '', toDate: '', companyLogo: '', description: '' }];
    } else {
      updatedExperience = tempExperience.filter((_, i) => i !== index);
    }

    setTempExperience(updatedExperience);

    // Update formData when removing
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  // Handle logo upload
  const handleLogoUpload = (index, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedExperience = [...tempExperience];
      updatedExperience[index] = { ...updatedExperience[index], companyLogo: reader.result };
      setTempExperience(updatedExperience);

    
      setFormData({
        ...formData,
        experience: updatedExperience,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='ps-0 ps-md-3'>
      <label htmlFor="Experience" className="form-label text-white mb-3 pt-3 pt-md-5">
        Experience
      </label>

      {tempExperience.map((exp, index) => (
        <div key={index} className="experience-form-container">
          <form className="py-3 px-3 text-white rounded custom-file-cv-upload">
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="companyName" className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={exp.companyName || ''}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Enter Company Name"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="position" className="form-label">Position</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  value={exp.position || ''}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Enter Position"
                />
              </div>
            </div>

            <div className='row mb-4 g-md-1 g-lg-3'>
              <div className="col-md-6">
                <label htmlFor="fromDate" className="form-label">From</label>
                <input
                  type="date"
                  className="form-control"
                  name="fromDate"
                  value={exp.fromDate || ''}
                  onChange={(e) => handleExperienceChange(index, e)}
                  style={{ color: '#a19d9d' }}  // لون النص المدخل
                />
              </div>
              <div className="col-md-6 mt-3 mt-md-auto">
                <label htmlFor="toDate" className="form-label">To</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  value={exp.toDate || ''}
                  onChange={(e) => handleExperienceChange(index, e)}
                  style={{ color: '#a19d9d' }} 
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-5 mb-3 mb-md-0">
                <label htmlFor="companyLogo" className="text-white">Company Logo</label>
                <div className="rounded mt-2 custom-file-upload px-0 h-75 ">
                  <input
                    type="file"
                    name="photo"
                    className="d-none"
                    id={`companyLogo-${index}`}
                    onChange={(e) => handleLogoUpload(index, e)}
                  />
                  <label htmlFor={`companyLogo-${index}`} className="text-center  px-1 px-xl-2 w-100 d-flex py-4 flex-column justify-content-center">
                    <div className="upload-icon">
                      <i className="fas fa-cloud-upload-alt fs-lg-3 fs-xl-1"></i>
                    </div>
                    <div style={{ fontSize: '12px' }}>
                      Drag & drop files or <span className="Browse">Browse</span>
                    </div>
                    <small className="form-text text-muted text-center mt-1" style={{ fontSize: '10px' }}>
                      Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                    </small>
                  </label>
                </div>
              </div>

              <div className="col-lg-7">
                <label htmlFor="description " className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  value={exp.description || ''}
                  onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Enter description of your role"
                />
              </div>
            </div>
          </form>

          {/* Icons for Add and Delete */}
          <div className='w-100 d-flex justify-content-end pt-3 mb-4'>
            {index === tempExperience.length - 1 && (
              <button type="button" className="Iconslinks me-3" onClick={handleAddExperience}>
                <i className="fas fa-plus"></i>
              </button>
            )}

          
            <button type="button" className="Iconslinks " onClick={() => handleRemoveExperience(index)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};



export const Form6 = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [tempEducation, setTempEducation] = useState(formData.education || [{ organizationName: '', degree: '', fromDate: '', toDate: '', description: '' }]);

 
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;

    const updatedEducation = [...tempEducation];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };

    setTempEducation(updatedEducation);


    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  // Handle adding a new education entry
  const handleAddEducation = () => {
    setTempEducation([...tempEducation, { organizationName: '', degree: '', fromDate: '', toDate: '', description: '' }]);
  };

 
  const handleRemoveEducation = (index) => {
    let updatedEducation;
    if (tempEducation.length === 1) {
     
      updatedEducation = [{ organizationName: '', degree: '', fromDate: '', toDate: '', description: '' }];
    } else {
      updatedEducation = tempEducation.filter((_, i) => i !== index);
    }

    setTempEducation(updatedEducation);

    // Update formData when removing
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  return (
    <div className='ps-0 ps-md-3'>
      <label htmlFor="Education" className="form-label text-white mb-3 pt-3 pt-md-5">
        Education
      </label>

      {tempEducation.map((edu, index) => (
        <div key={index} className="education-form-container">
          <form className="py-3 px-3 text-white rounded custom-file-cv-upload">
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="organizationName" className="form-label">Organization Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="organizationName"
                  value={edu.organizationName || ''}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter Organization Name"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="degree" className="form-label">Degree</label>
                <input
                  type="text"
                  className="form-control"
                  name="degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter Degree"
                />
              </div>
            </div>

            <div className='row mb-4 g-md-1 g-lg-3'>
              <div className="col-md-6">
                <label htmlFor="fromDate" className="form-label">From</label>
                <input
                  type="text"
                  className="form-control"
                  name="fromDate"
                  value={edu.fromDate || ''}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter Year YYYY"
                />
              </div>
              <div className="col-md-6 mt-3 mt-md-auto">
                <label htmlFor="toDate" className="form-label">To</label>
                <input
                  type="text"
                  className="form-control"
                  name="toDate"
                  value={edu.toDate || ''}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter Year YYYY"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  value={edu.description || ''}
                  onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Enter description of your education"
                />
              </div>
            </div>
          </form>

        
          <div className='w-100 d-flex justify-content-end mt-3 mb-4'>
            {index === tempEducation.length - 1 && (
              <button type="button" className="Iconslinks me-3" onClick={handleAddEducation}>
                <i className="fas fa-plus"></i>
              </button>
            )}

          
            <button type="button" className="Iconslinks " onClick={() => handleRemoveEducation(index)}>
              <i className="fas fa-trash-alt"></i>
            </button>

         


          </div>
        </div>
      ))}
    </div>
  );
};









export const Form7 = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [links, setLinks] = useState(formData.links || [{ websiteName: '', url: '' }]);


  // Handle change in input fields
  const handleLinkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLinks = [...links];
    updatedLinks[index][name] = value;
    setLinks(updatedLinks);

    // Update formData
    setFormData({
      ...formData,
      links: updatedLinks,
    });
  };

  // Add a new link field
  const handleAddLink = () => {
    const newLink = { websiteName: '', url: '' };
    setLinks([...links, newLink]);

    // Update formData
    setFormData({
      ...formData,
      links: [...links, newLink],
    });
  };

  // Remove a link field or clear the first one
  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];

    if (index === 0) {

      updatedLinks[0] = { websiteName: '', url: '' };
    } else {

      updatedLinks.splice(index, 1);
    }

    setLinks(updatedLinks);

    // Update formData
    setFormData({
      ...formData,
      links: updatedLinks,
    });
  };

  return (
    <div className="ps-0 ps-md-3">
      <label htmlFor="links" className="form-label text-white mb-3 pt-3 pt-md-5">
        Links
      </label>

      <form className="py-3 px-3 pt-4 text-white rounded custom-file-upload">
        {links.map((link, index) => (
          <div key={index} className="row mb-3 g-2 align-items-center">
            <div className="col-md-4">
              <label htmlFor="websiteName" className="form-label fs-6 d-flex align-items-start">Website Name</label>
              <input
                type="text"
                className="form-control"
                name="websiteName"
                value={link.websiteName}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="Website Name"
              />
            </div>

            <div className="col-md-7 ">
              <label htmlFor="url" className="form-label d-flex align-items-start  text-start ">URL</label>
              <input
                type="text"
                className="form-control"
                name="url"
                value={link.url}
                onChange={(e) => handleLinkChange(index, e)}
                placeholder="Enter URL"

              />

            </div>

            <div className="col-md-1 d-flex justify-content-end  align-items-end mt-auto">
              {index === links.length - 1 && ( 
                <button
                  type="button"
                  className="Iconslinks me-2 mt-3 mt-md-0  mb-2 mb-md-0"
                  onClick={handleAddLink}
                >
                  <i className="fas fa-plus"></i>
                </button>
              )}

              <button
                type="button"
                className="Iconslinks"
                onClick={() => handleRemoveLink(index)}
              >
                <i className="fas fa-trash-alt mt-3 mt-md-0 mb-3 mb-md-0"></i>
              </button>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export const Form8 = () => {
  const { formData, setFormData } = useContext(FormContext);


  const handleHonorChange = (index, e) => {
    const { name, value } = e.target;

   
    const updatedHonors = [...formData.honorAward];
    updatedHonors[index] = { ...updatedHonors[index], [name]: value };

    setFormData({
      ...formData,
      honorAward: updatedHonors,
    });
  };



  const handleAddHonor = () => {
    const newHonor = { awardName: '', year: '', description: '' };
    setFormData({
      ...formData,
      honorAward: [...formData.honorAward, newHonor],
    });
  };

 
  const handleRemoveHonor = (index) => {
    if (index === 0) {
      const updatedHonors = [...formData.honorAward];
      updatedHonors[0] = { awardName: '', year: '', description: '' };
      setFormData({
        ...formData,
        honorAward: updatedHonors,
      });
    } else {
      const updatedHonors = formData.honorAward.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        honorAward: updatedHonors,
      });
    }
  };

  return (
    <div className="ps-0 ps-md-3">
      <label htmlFor="honors" className="form-label text-white mb-3 pt-3 pt-md-5">
        Honors & awards
      </label>

      {formData.honorAward.map((honor, index) => (
        <div key={index}>
          {/* Form content */}
          <form className="py-3 px-3 pt-4 text-white rounded custom-file-upload">
            <div className="row mb-3 g-2 align-items-center">
              <div className="col-md-7">
                <label htmlFor="awardName" className="form-label align-items-start">Award Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="awardName"
                  value={honor.awardName || ''}
                  onChange={(e) => handleHonorChange(index, e)}
                  placeholder="Enter Award Name"
                />
              </div>

              <div className="col-md-5">
                <label htmlFor="year" className="form-label align-items-start">Year</label>
                <input
                  type="text"
                  className="form-control"
                  name="year"
                  value={honor.year || ''}
                  onChange={(e) => handleHonorChange(index, e)}
                  placeholder="Enter Year"
                />
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="description" className="form-label align-items-start">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  value={honor.description || ''}
                  onChange={(e) => handleHonorChange(index, e)}
                  placeholder="Enter Description"
                />
              </div>
            </div>
          </form>

         
          <div className="col-md-12 mt-3 d-flex justify-content-end mb-4">
            {/* Delete Icon */}
            <button
              type="button"
              className="Iconslinks me-3"
              onClick={() => handleRemoveHonor(index)}
            >
              <i className="fas fa-trash-alt "></i>
            </button>

            {/* Add Icon */}
            {index === formData.honorAward.length - 1 && (
              <button
                type="button"
                className="Iconslinks"
                onClick={handleAddHonor}
              >
                <i className="fas fa-plus"></i>
              </button>
            )}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Form8;



