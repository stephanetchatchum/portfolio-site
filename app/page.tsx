import ProjectCard from "@/components/ProjectCard";

export default function Home(){
  return (
    <div>
      <h1>Stephane Tchatchum Chassem</h1>
      <p>Software Engineer building for African technological independence</p>
      <ProjectCard
        title="TalentScreen"
        description="AI resume screening platform built during my Irembo internship, evolved into a Chrome extension based on direct user feedback."
      />
      <ProjectCard
        title="Exoplanet Classifier"
        description="A random forest model detecting real exoplanets from NASA Kepler data, deployed and live."
      />
      <ProjectCard
        title="ISS Orbit Predictor"
        description="Real-time satellite tracking using orbital mechanics, predicting visible passes from any location on Earth."
      />
    </div>
  )
}