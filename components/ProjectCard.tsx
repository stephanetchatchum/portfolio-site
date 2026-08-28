type ProjectCardProps = {
    title: string;
    description: string;
};

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
      <p className="text-gray-600">{props.description}</p>
    </div>
  );
}