import React, { useEffect, useState } from "react";

export default function ArtisanProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState({ displayName: "", bio: "", location: "", instagram: "", website: "" });

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (!raw) return;
    const user = JSON.parse(raw);
    setCurrentUser(user);
    const profiles = JSON.parse(localStorage.getItem("artisanProfiles") || "{}");
    setProfile(profiles[user.id] || { displayName: user.fullName || "", bio: "", location: "", instagram: "", website: "" });
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((s) => ({ ...s, [name]: value }));
  };

  const save = () => {
    if (!currentUser) return;
    const profiles = JSON.parse(localStorage.getItem("artisanProfiles") || "{}");
    profiles[currentUser.id] = profile;
    localStorage.setItem("artisanProfiles", JSON.stringify(profiles));
    alert("Profile updated");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold text-amber-800 mb-4">Artisan Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Display Name</label>
          <input name="displayName" value={profile.displayName} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input name="location" value={profile.location} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea name="bio" rows={3} value={profile.bio} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instagram</label>
          <input name="instagram" value={profile.instagram} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input name="website" value={profile.website} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
      </div>
      <button onClick={save} className="mt-4 px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Save</button>
    </div>
  );
}
