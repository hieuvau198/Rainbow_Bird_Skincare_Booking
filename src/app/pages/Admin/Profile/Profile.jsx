import React, { useEffect, useState } from 'react';
import getTherapistProfile from '../../../modules/Admin/Employee/getTherapistProfile';
import DecodeRoleId from '../../../components/DecodeId';

export default function ProfileTherapist() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const therapistId = DecodeRoleId('__TheId');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getTherapistProfile(therapistId);
        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [therapistId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white dark:bg-slate-600 rounded-md shadow-md min-h-[640px]">
        <h1 className="text-2xl font-bold mb-4">Therapist Profile</h1>
        <div className="flex">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mr-4"
          />
          <div>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <p><strong>Personal Statement:</strong> {profile.personalStatement}</p>
            <p><strong>Education:</strong> {profile.education}</p>
            <p><strong>Certifications:</strong> {profile.certifications}</p>
            <p><strong>Specialties:</strong> {profile.specialties}</p>
            <p><strong>Languages:</strong> {profile.languages}</p>
            <p><strong>Years Experience:</strong> {profile.yearsExperience}</p>
            <p>
              <strong>Rating:</strong> {profile.therapist?.rating ?? 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> {profile.therapist?.user?.email ?? 'N/A'}
            </p>
            <p>
              <strong>Phone:</strong> {profile.therapist?.user?.phone ?? 'N/A'}
            </p>
            <p>
              <strong>Full Name:</strong> {profile.therapist?.user?.fullName ?? 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
