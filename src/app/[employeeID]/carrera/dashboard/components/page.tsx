import {
    PathHeader,
    ProgressSection,
    CertificationsSection,
    SkillsSection,
    StageInfo,
    JobOpportunity,
    SkillsRadar,
    SkillsDetails,
  } from "./index"
  
  export default function CarreraDashboard() {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Top section - Header and Stage Info side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6">
                <PathHeader />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <ProgressSection />
                  </div>
                  <div className="lg:col-span-1">
                    <CertificationsSection />
                  </div>
                  <div className="lg:col-span-1">
                    <SkillsSection />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <StageInfo />
            </div>
          </div>
  
          {/* Bottom section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <JobOpportunity />
              <SkillsRadar />
            </div>
            <SkillsDetails />
          </div>
        </div>
      </div>
    )
  }
  