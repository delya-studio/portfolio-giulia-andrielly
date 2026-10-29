import "./glass-page.css";
import { useInView } from "../../hooks/useInView";

export function GlassPage({ children }) {
    useInView();

    return (
        <>
            <div className="glass-page">{children}</div>
        </>
    );
}