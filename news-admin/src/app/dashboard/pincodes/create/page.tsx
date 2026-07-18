"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import WordPressEditor from "@/components/editor/WordPressEditor";

type EditorMethods = {
  insertImage?: (url: string) => void;
  getHTML?: () => string;
  setHTML?: (html: string) => void;
};

type PincodeForm = {
  areaName: string;
  pincode: string;
  city: string;
};

type PincodeResponse = {
  areaName?: string;
  pincode?: string;
  city?: string;
  description?: string;
  image?: string;
};

type FormErrors = Partial<Record<keyof PincodeForm, string>>;

const EMPTY_FORM: PincodeForm = {
  areaName: "",
  pincode: "",
  city: "",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();

  if (!data?.url) {
    throw new Error("Upload response missing url");
  }

  return data.url as string;
}

function CreatePincodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pincodeId = searchParams.get("id");
  const isEditMode = Boolean(pincodeId);

  const [form, setForm] = useState<PincodeForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [featuredImg, setFeaturedImg] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(isEditMode);
  const [loadError, setLoadError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<EditorMethods | null>(null);

  const loadDescriptionIntoEditor = useCallback((html: string) => {
    let attempts = 0;

    const trySet = () => {
      if (editorRef.current?.setHTML) {
        editorRef.current.setHTML(html || "<p></p>");
        return;
      }

      attempts += 1;
      if (attempts < 10) {
        setTimeout(trySet, 200);
      }
    };

    trySet();
  }, []);

  useEffect(() => {
    if (!pincodeId) return;

    const fetchPincode = async () => {
      setLoadingPincode(true);
      setLoadError("");

      try {
        const res = await fetch(`/api/pincodes/${pincodeId}`);

        if (!res.ok) {
          throw new Error("Failed to load pin code");
        }

        const pincode: PincodeResponse = await res.json();

        setForm({
          areaName: pincode.areaName || "",
          pincode: pincode.pincode || "",
          city: pincode.city || "",
        });
        setFeaturedImg(pincode.image || "");
        loadDescriptionIntoEditor(pincode.description || "");
      } catch (error) {
        console.error("Failed to load pin code:", error);
        setLoadError("Failed to load pin code. Please try again.");
      } finally {
        setLoadingPincode(false);
      }
    };

    fetchPincode();
  }, [pincodeId, loadDescriptionIntoEditor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.areaName.trim()) {
      nextErrors.areaName = "Area name is required.";
    }

    if (!form.pincode.trim()) {
      nextErrors.pincode = "Pin code is required.";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSaving(true);
    setLoadError("");

    try {
      const description = editorRef.current?.getHTML?.() || "<p>No Content</p>";

      const res = await fetch(
        pincodeId ? `/api/pincodes/${pincodeId}` : "/api/pincodes",
        {
          method: pincodeId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            areaName: form.areaName,
            slug: slugify(form.areaName),
            pincode: form.pincode,
            city: form.city,
            description,
            image: featuredImg,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save pin code");
      }

      router.push("/dashboard/pincodes");
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
      setLoadError("Failed to save pin code. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditorFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadFile(file);
      editorRef.current?.insertImage?.(imageUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setLoadError("Image upload failed. Please try again.");
    } finally {
      e.target.value = "";
    }
  };

  const handleFeaturedImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadFile(file);
      setFeaturedImg(imageUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setLoadError("Image upload failed. Please try again.");
    } finally {
      e.target.value = "";
    }
  };

  const saveButtonLabel = saving
    ? isEditMode
      ? "Updating..."
      : "Saving..."
    : isEditMode
    ? "Update Pin Code"
    : "Save Pin Code";

  const sidebarSaveButtonLabel = saving
    ? isEditMode
      ? "Updating..."
      : "Saving..."
    : isEditMode
    ? "Update"
    : "Save Pin Code";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/pincodes"
            className="flex items-center justify-center text-gray-600 hover:text-black"
          >
            <ArrowLeft size={20} />
          </Link>

          <h1 className="text-2xl font-semibold leading-none">
            {isEditMode ? "Edit Pin Code" : "Create Pin Code"}
          </h1>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving || loadingPincode}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saveButtonLabel}
        </button>
      </div>

      {loadError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
          {loadError}
        </div>
      )}

      {loadingPincode ? (
        <div className="bg-white border rounded-lg p-10 text-center text-gray-500">
          Loading pin code...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border rounded-lg p-5">
              <input
                name="areaName"
                value={form.areaName}
                onChange={handleChange}
                placeholder="Enter Area Name"
                className="w-full text-3xl border-none outline-none px-0 py-2 leading-tight"
              />
              {errors.areaName && (
                <p className="text-red-600 text-sm mt-1">{errors.areaName}</p>
              )}
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="border-b px-4 py-3 bg-gray-50 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleMediaClick}
                  className="px-4 py-2 h-10 flex items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Upload From Device
                </button>

                <button
                  type="button"
                  onClick={() => window.open("/dashboard/media", "_blank")}
                  className="px-4 py-2 h-10 flex items-center bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Select From Media Library
                </button>
              </div>

              <div className="p-5">
                <WordPressEditor ref={editorRef} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-5">
              <h2 className="font-semibold mb-4">Publish</h2>

              <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {sidebarSaveButtonLabel}
              </button>
            </div>

            <div className="bg-white border rounded-lg p-5 space-y-4">
              <h2 className="font-semibold">Pin Code Details</h2>

              <div>
                <input
                  name="areaName"
                  value={form.areaName}
                  onChange={handleChange}
                  placeholder="Area Name"
                  className="w-full border rounded-lg p-2"
                />
                {errors.areaName && (
                  <p className="text-red-600 text-sm mt-1">{errors.areaName}</p>
                )}
              </div>

              <div>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pin Code"
                  className="w-full border rounded-lg p-2"
                />
                {errors.pincode && (
                  <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>
                )}
              </div>

              <div>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border rounded-lg p-2"
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-5">
              <h2 className="font-semibold mb-4">Featured Image</h2>

              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center text-center">
                <Upload className="text-gray-400 mb-2" size={24} />

                <p className="text-sm text-gray-500 mb-3">Upload Image</p>

                <input
                  type="file"
                  className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  accept="image/*"
                  onChange={handleFeaturedImageChange}
                />

                {featuredImg && (
                  <img
                    src={featuredImg}
                    alt="Featured Image"
                    className="mt-4 rounded-lg w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleEditorFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}

export default function CreatePincodePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center text-gray-500">
          Loading...
        </div>
      }
    >
      <CreatePincodeForm />
    </Suspense>
  );
}