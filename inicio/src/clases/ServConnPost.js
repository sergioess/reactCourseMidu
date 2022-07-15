export const ServConnPost = ({ title, body }) => {
    return (
        <div className="card p-1 mb-2 bg-primary text-white">
            <div className="card-body">
                <p className="card-title"><strong>{title}</strong></p>
            </div>
            <p className="card-text"><small>{body}</small></p>

        </div>
    );
};

