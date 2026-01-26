import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { portfolioAPI } from '../../api'

function CertificationPage({ certificationsData }) {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await portfolioAPI.getAllCertifications();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    }
  };

  const certificationsList = certificationsData || certifications;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const viewDetails = (certId) => {
    navigate(`/certifications/${certId}`);
  };

  if (certificationsList.length === 0) {
    return null;
  }

  return (
    <div id="certifications" className="bg-base-200 py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Certifications</h2>
          <p className="text-sm sm:text-base text-base-content/60">Professional certifications and achievements</p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {certificationsList.map((cert) => (
            <div 
              key={cert.id}
              onClick={() => viewDetails(cert.id)}
              className="bg-base-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Certificate Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                {cert.image ? (
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <svg 
                    className="w-16 h-16 text-primary/40"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                    />
                  </svg>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-primary text-sm font-medium mb-1">{cert.issuer}</p>
                <p className="text-base-content/60 text-sm mb-4">{formatDate(cert.date)}</p>
                
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary text-sm mb-4 inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Credential →
                  </a>
                )}

                <div className="mt-4 text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CertificationPage