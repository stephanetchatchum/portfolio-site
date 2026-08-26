type ProjectCardProps = {
    title: string;
    description: string;
};

export default function ProjectCard(props: ProjectCardProps) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}