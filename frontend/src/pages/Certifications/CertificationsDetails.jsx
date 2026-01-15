import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../../components/utils/NavBar'
import Footer from '../../components/utils/Footer'

function CertificationsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // This should match the data from CertificationPage
  const certificationsData = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "/certificates/aws-cert.png",
      credentialId: "AWS-12345678",
      skills: ["Cloud Architecture", "AWS Services", "System Design"],
      description: "Professional certification demonstrating expertise in designing distributed systems on AWS platform.",
      verifyLink: "#"
    },
    {
      id: 2,
      title: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2023",
      image: "/certificates/scrum-cert.png",
      credentialId: "PSM-87654321",
      skills: ["Agile", "Scrum", "Team Leadership"],
      description: "Certification validating understanding of Scrum framework and ability to apply it in real-world scenarios.",
      verifyLink: "#"
    },
    {
      id: 3,
      title: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2023",
      image: "/certificates/mongodb-cert.png",
      credentialId: "MONGO-11223344",
      skills: ["MongoDB", "NoSQL", "Database Design"],
      description: "Certification proving proficiency in MongoDB database development and administration.",
      verifyLink: "#"
    },
    {
      id: 4,
      title: "Docker Certified Associate",
      issuer: "Docker Inc.",
      date: "2022",
      image: "/certificates/docker-cert.png",
      credentialId: "DOCKER-99887766",
      skills: ["Docker", "Containerization", "DevOps"],
      description: "Certification demonstrating skills in Docker containerization and orchestration.",
      verifyLink: "#"
    }
  ];

  const cert = certificationsData.find(c => c.id === parseInt(id));

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
              <p className="text-base-content/60 text-lg">{cert.date}</p>
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
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Certification</h2>
                <p className="text-base-content/80 text-lg leading-relaxed">{cert.description}</p>
              </div>

              {/* Credential ID */}
              {cert.credentialId && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Credential ID</h3>
                  <div className="bg-base-200 px-4 py-3 rounded-lg">
                    <code className="text-base font-mono">{cert.credentialId}</code>
                  </div>
                </div>
              )}

              {/* Skills */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Skills Demonstrated</h3>
                  <div className="flex flex-wrap gap-3">
                    {cert.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="badge badge-lg badge-primary badge-outline px-4 py-3"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verify Link */}
              {cert.verifyLink && cert.verifyLink !== "#" && (
                <div className="pt-4 border-t border-base-300">
                  <a 
                    href={cert.verifyLink}
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