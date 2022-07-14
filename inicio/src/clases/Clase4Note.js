export const Clase4Note = ({ content, date, important }) => {
    return (
        <div className="card p-1 mb-2 bg-primary text-white">
            <div className="card-body">
                <p className="card-title"><strong>{content}</strong></p>
            </div>
            <p className="card-text"><small><time>{date}</time></small></p>
            <p>Important : {important ? "True" : "False"}</p>

        </div>
    );
};

