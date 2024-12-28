import React, { useContext } from 'react';
import { FormContext } from './CvFormAutoEdit';

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
};

export const CVPreview = () => {
  const { formData } = useContext(FormContext); // Get form data from context



  return (
  
    <div className="container cv-preview d-flex justify-content-center  align-items-center mx-auto w-100 py-4 ps-0 ps-md-2 pe-0">
    <div className="row w-100 mx-auto ">
        <div className=" col-lg-5 col-xxl-4 left-panel text-white d-flex flex-column align-items-start py-4">

          <div className="rounded-circle mb-4" style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
            {formData.photo ? (
              <img src={formData.photo} alt="Personal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="bg-white" style={{ width: '120px', height: '120px' }}></div>
            )}
          </div>

          {/* Display form data dynamically */}
          <h2 className="fs-5 "> {formData.firstName} {formData.lastName}</h2>
          <p className="text-muted "> {formData.profession}</p>

          <ul className="list-group list-group-flush w-100 ">
            <li className="list-group-item bg-light text-dark custom-font-size rounded mb-2">
              {formData.city && formData.city}
              {formData.city && formData.country && ', '}
              {formData.country && formData.country}
            </li>

            <li className="list-group-item bg-light text-dark rounded mb-2 py-2">{formData.phone}</li>
            <li className="list-group-item bg-light text-dark rounded mb-2 py-2">{formData.email}</li>
          </ul>

          <div className="mt-4  text-start w-100 ">

            <div className=' px-0'>
              <h5>Skills</h5>
              <ul className="list-unstyled mb-4">
                {(formData.skills || []).map((skill, index) => (
                  <li key={index} className="d-flex ps-2 align-items-start  text-white">
                    <span className="fw-bold me-2">•</span>
                    <span className="text-break ">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>


            <div>
              <h5 className='mb-0'>Honor & Award</h5>
              {formData.honorAward && formData.honorAward.length > 0 ? (
                formData.honorAward.map((honor, index) => (
                  <div className='d-flex flex-column w-100 '>
                    <div key={index} className="d-flex justify-content-between w-100 mt-2 align-items-start ">
                      <div>
                        <h5 >{honor.awardName || ''}</h5>
                      </div>

                      <div className="text-end">
                        <p className="mb-0 ">{honor.year || ''}</p>
                      </div>

                    </div>

                    <p className="subtitleCv text-break  text-white-50 mb-4 w-100 ">{honor.description.split('\n').map((str, index) => (
                      <React.Fragment key={index}>
                        {str}
                        <br />
                      </React.Fragment>
                    ))}</p>



                  </div>



                ))
              )   : null}

            </div>


           
              <h5 className='mt-0'>Hobbies & Interest</h5>
              <ul className="list-unstyled mb-4">
                {(formData.hobbies || []).map((hobby, index) => (
                  <li key={index} className="d-flex ps-2 align-items-start text-white">
                    <span className="fw-bold me-2">•</span>
                    <span className="text-break ">{hobby}</span>
                  </li>
                ))}
              </ul>
            


          </div>

          <div className="mt-4 w-100 px-2">

            <div className="d-flex flex-wrap gap-3">
           
              {formData.links && formData.links.length > 0 && formData.links.map((link, index) => (
                link.url && (
                  <div key={index} className="d-flex align-items-center">
                
                    {link.websiteName.toLowerCase().includes('linkedin') && (
                      <i className="fab fa-linkedin text-white me-2"></i>
                    )}
                    {link.websiteName.toLowerCase().includes('github') && (
                      <i className="fab fa-github text-white me-2"></i>
                    )}
                    {link.websiteName.toLowerCase().includes('twitter') && (
                      <i className="fab fa-twitter text-white me-2"></i>
                    )}
                    {link.websiteName.toLowerCase().includes('facebook') && (
                      <i className="fab fa-facebook text-white me-2"></i>
                    )}
                    {link.websiteName.toLowerCase().includes('instagram') && (
                      <i className="fab fa-instagram text-white me-2"></i>
                    )}
                    {!link.websiteName.toLowerCase().includes('linkedin') &&
                      !link.websiteName.toLowerCase().includes('github') &&
                      !link.websiteName.toLowerCase().includes('twitter') &&
                      !link.websiteName.toLowerCase().includes('facebook') &&
                      !link.websiteName.toLowerCase().includes('instagram') && (
                        <i className="fas fa-globe text-white me-2"></i>
                      )}
                    <a href={link.url} className="text-white" target="_blank" rel="noopener noreferrer">
                      {link.websiteName || 'Website'}
                    </a>
                  </div>
                )
              ))}

            </div>

          </div>


        </div>

        <div className=" col-lg-7 col-xxl-8 right-panel bg-light p-4">
          <h3 className="customtitleCvPreview mb-4">About</h3>
          {formData.about && formData.about.trim() !== '' ? (  
    <p className="subtitleCv">
      {formData.about.split('\n').map((str, index) => (
        <React.Fragment key={index}>
          {str}
          <br />
        </React.Fragment>
      ))}
    </p>
  ) : null}



          <hr />
          {/* Education Section */}
          <h3 className="customtitleCvPreview mb-4">Education</h3>
  
{formData.education && formData.education.length > 0 ? (
  formData.education.map((edu, index) => (
   
    (edu.organizationName || edu.degree || edu.fromDate || edu.toDate || edu.description) ? (
      <div key={index} className="education-item w-100">
        <div className="d-flex align-items-start w-100">
          {/* Date Section */}
          <div className="me-1 smallLeftContent text-muted" style={{ minWidth: '100px' }}>
            <p className="mb-1 ">
              {edu.fromDate || 'N/A'} &ndash; {edu.toDate || 'Present'}
            </p>
          </div>

         
          <div className="w-100">
            <h5 className="mb-1 text-break">{edu.organizationName || 'No Organization Name'}</h5>
            <p className="mb-1 text-break">
              <strong>{edu.degree }</strong>
            </p>
            <p className="mb-3 text-break mt-2  subtitleCv w-100">
              {edu.description?.split('\n').map((str, idx) => (
                <React.Fragment key={idx}>
                  {str}
                  <br />
                </React.Fragment>
              )) || 'No Description'}
            </p>
          </div>
        </div>
      </div>
    ) : null
  ))
)   : null}


          <hr />


          {/* Experience Section */}
          <h3 className="customtitleCvPreview mb-4">Experience</h3>
 {formData.experience && formData.experience.length > 0 && formData.experience.some(exp => exp.companyName || exp.position) ? (
  formData.experience.map((exp, index) => (
    (exp.companyName || exp.position) && (
      <div key={index} className="experience-item w-100">
        <div className="d-flex flex-column flex-xxl-row layoutExperience align-items-start w-100">
          {exp.companyLogo && (
            <div className="me-3 smallLeftContent mb-3 mb-xxl-0" style={{ width: '70px', height: '60px' }}>
              <img
                src={exp.companyLogo}
                alt={exp.companyName}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}

          <div>
            <h5 className="mb-1 flex-grow-1 text-break">{exp.companyName}</h5>
            <p className="mb-1 w-100 text-break">
              {exp.position} | 
              {/* التحقق من وجود التواريخ */}
              {exp.fromDate ? formatDate(exp.fromDate) : 'N/A'} &ndash; {exp.toDate ? formatDate(exp.toDate) : 'Present'}
            </p>

            {exp.description && (
              <p className="mb-0 text-break mt-2 subtitleCv mb-4 w-100">
                {exp.description.split('\n').map((str, idx) => (
                  <React.Fragment key={idx}>
                    {str}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  ))
) : null}




        </div>







      </div>
    </div>
  
  );
};
