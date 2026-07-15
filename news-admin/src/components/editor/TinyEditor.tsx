"use client";

import { Editor } from "@tinymce/tinymce-react";

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TinyEditor({
  value,
  onChange,
}: TinyEditorProps) {
  return (
    <Editor
      apiKey="no-api-key"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 600,
        menubar: true,

        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],

        toolbar:
          "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image media | code fullscreen",

        content_style:
          "body { font-family:Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}