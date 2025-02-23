import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
    return <div className="border rounded-lg shadow-md p-4">{children}</div>;
}

export function CardHeader({ children }: { children: ReactNode }) {
    return <div className="border-b pb-2 mb-4">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
