export const ServConnPost = ({ title, body }) => {
    return (
        <div className="card p-0 mb-2 bg-primary text-white">
            <span className="row"><strong>{title}</strong></span>
            <span className="row"><small>{body}</small></span>

        </div>
    );
};

