"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";

const QuillEditor = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    if (!editorRef.current) {
      editorRef.current = new Quill(containerRef.current, {
        theme: "snow",
        placeholder: placeholder || "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ direction: "rtl" }, { direction: "ltr" }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      // مقدار اولیه
      editorRef.current.root.innerHTML = value || "";

      // گوش بده به تغییرات
      editorRef.current.on("text-change", () => {
        onChange(editorRef.current!.root.innerHTML);
      });

      // پیش‌فرض RTL
      editorRef.current.root.setAttribute("dir", "rtl");
      editorRef.current.root.style.textAlign = "right";
    }
  }, [isMounted, value, onChange]);

  return <div ref={containerRef} className="w-full min-h-[200px]" />;
};

export default QuillEditor;
