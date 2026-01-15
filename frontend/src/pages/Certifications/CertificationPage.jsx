import React from 'react'
import { useNavigate } from 'react-router-dom'

function CertificationPage({ certificationsData }) {
  const navigate = useNavigate();

  // Default certifications data - can be overridden by passing certificationsData prop
  const defaultCertifications = [
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

  const certifications = certificationsData || defaultCertifications;

  const viewDetails = (certId) => {
    navigate(`/certifications/${certId}`);
  };

  return (
    <div id="certifications" className="bg-base-200 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-3">Certifications</h2>
          <p className="text-base-content/60">Professional certifications and achievements</p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
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
                <p className="text-base-content/60 text-sm mb-4">{cert.date}</p>
                
                <div className="flex flex-wrap gap-2">
                  {cert.skills?.slice(0, 2).map((skill, idx) => (
                    <span 
                      key={idx}
                      className="badge badge-sm badge-outline"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills?.length > 2 && (
                    <span className="badge badge-sm badge-outline">
                      +{cert.skills.length - 2}
                    </span>
                  )}
                </div>

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