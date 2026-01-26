import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../../components/utils/NavBar'
import Footer from '../../components/utils/Footer'
import { portfolioAPI } from '../../api'

function CertificationsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertification();
  }, [id]);

  const fetchCertification = async () => {
    try {
      const data = await portfolioAPI.getCertification(parseInt(id));
      setCert(data);
    } catch (error) {
      console.error('Error fetching certification:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <div className="bg-base-200">
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="bg-base-200">
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Certification Not Found</h2>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Go Back Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-base-200">
      <NavBar />
      
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm mb-8 gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          {/* Certificate Details Card */}
          <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
            
            {/* Header */}
            <div className="p-8 pb-6 border-b border-base-300">
              <h1 className="text-3xl font-bold mb-3">{cert.title}</h1>
              <p className="text-primary font-medium text-xl mb-2">{cert.issuer}</p>
              <p className="text-base-content/60 text-lg">{formatDate(cert.date)}</p>
            </div>

            {/* Certificate Image */}
            <div className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
              {cert.image ? (
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-contain p-8"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <svg 
                  className="w-32 h-32 text-primary/40"
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

            {/* Details Content */}
            <div className="p-8">
              {cert.description && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">About This Certification</h2>
                  <p className="text-base-content/80 text-lg leading-relaxed">{cert.description}</p>
                </div>
              )}

              {/* Verify Link */}
              {cert.credentialUrl && (
                <div className="pt-4 border-t border-base-300">
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verify Certificate
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CertificationsDetails