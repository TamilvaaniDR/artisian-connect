import React, { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ fullName: "", email: "", address1: "", address2: "", city: "", state: "", pincode: "" });

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "{}");
    setProfile(profiles[u?.id] || { fullName: u?.fullName || "", email: u?.email || "", address1: "", address2: "", city: "", state: "", pincode: "" });
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((s) => ({ ...s, [name]: value }));
  };

  const save = () => {
    if (!user) return;
    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "{}");
    profiles[user.id] = profile;
    localStorage.setItem("userProfiles", JSON.stringify(profiles));
    alert("Profile updated");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold text-amber-800 mb-4">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input name="fullName" value={profile.fullName} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" value={profile.email} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
          <input name="address1" value={profile.address1} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
          <input name="address2" value={profile.address2} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input name="city" value={profile.city} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input name="state" value={profile.state} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PIN Code</label>
          <input name="pincode" value={profile.pincode} onChange={onChange} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </div>
      </div>
      <button onClick={save} className="mt-4 px-5 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Save</button>
    </div>
  );
}
