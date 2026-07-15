"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "Priyal Chouhan",
    email: "priyal@example.com",
    phone: "+91 9876543210",
    role: "Admin",
    address: "",
    oldPassword: "",
    newPassword: "",
  });

  // Load saved data on page load
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const savedProfile = localStorage.getItem("profileData");

    if (savedImage) {
      setImage(savedImage);
    }

    if (savedProfile) {
      setForm((prev) => ({
        ...prev,
        ...JSON.parse(savedProfile),
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result as string;

      setImage(imageData);

      localStorage.setItem(
        "profileImage",
        imageData
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem(
      "profileData",
      JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        address: form.address,
      })
    );

    alert("Profile Updated Successfully!");
    setIsEditing(false);
  };

  const handlePasswordUpdate = () => {
    if (!form.oldPassword || !form.newPassword) {
      alert("Fill both password fields");
      return;
    }

    alert("Password Updated Successfully!");

    setForm({
      ...form,
      oldPassword: "",
      newPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#222222] p-6">
      <div className="max-w-2xl mx-auto border border-[#E0E0E0] rounded-xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            My Profile
          </h1>

          <button
            onClick={() =>
              setIsEditing(!isEditing)
            }
            className="px-4 py-2 rounded-lg bg-[#0B57D0] text-white"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              image ||
              "https://ui-avatars.com/api/?name=Priyal+Chouhan"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-3 text-sm"
            />
          )}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">
            Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">
            Email
          </label>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">
            Phone Number
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">
            Role
          </label>

          <div className="mt-1">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {form.role}
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="text-sm text-gray-500">
            Address
          </label>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter your address"
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full bg-[#0B57D0] text-white py-2 rounded-lg mb-8"
          >
            Save Profile
          </button>
        )}

        <div className="border-t border-[#E0E0E0] my-6"></div>

        {/* Password Section */}
        <h2 className="text-lg font-semibold mb-4">
          Change Password
        </h2>

        <div className="mb-3">
          <label className="text-sm text-gray-500">
            Last Password
          </label>

          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <button
          onClick={handlePasswordUpdate}
          className="w-full bg-[#D32F2F] text-white py-2 rounded-lg hover:opacity-90"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}