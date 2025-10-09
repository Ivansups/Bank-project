'use client'
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface LoginInterseptopClientProps {
    children: React.ReactNode;
}

export default function LoginInterseptopClient({ children }: LoginInterseptopClientProps) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal();
      }, []);
    return (
        <dialog 
        ref={dialogRef}
        onClose={() => router.back()}
        onClick={(e) => {
            if (e.target === e.currentTarget) {
                router.back();
            }
        }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4">
                {children}
            </div>
        </dialog>
    )
}