import { ReactNode } from "react";

interface cardProps {
    children: ReactNode;
}

function Card (props: cardProps) {
    const { children } = props;
    return (
        <div
            className="card"
                style={{
                    width:"250px"
                }}
        >
            <div className="card-body">{children}</div>
        </div>
    );
}

interface CardBodyProps {
    title: string;
    text: string;
}
export function CardBody(props: CardBodyProps) {
        const { title, text } = props;
    return(
        <>
            <h5 className="card-title">{title}</h5>
            <p className="card-tex">{text}</p>
            <a href="#" className="btn btn-primay">solo se trata de estar enfocado</a>
        </>
    );
}

export default Card;