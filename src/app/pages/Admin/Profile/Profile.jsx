import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin, Switch, InputNumber, Tabs } from 'antd';
import { EditOutlined, SaveOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import getTherapistProfile from '../../../modules/Admin/Employee/getTherapistProfile';
import updateTherapistProfile from '../../../modules/Admin/Employee/updateTherapistProfile';
import DecodeRoleId from '../../../components/DecodeRoleId';

const { TextArea } = Input;
const { TabPane } = Tabs;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("about");

  const therapistId = DecodeRoleId('__TheIden');

  useEffect(() => {
    fetchProfile();
  }, [therapistId]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getTherapistProfile(therapistId);
      setProfile(data);
      resetForm(data);
    } catch (err) {
      setError(err);
      message.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (data) => {
    form.setFieldsValue({
      bio: data.bio || '',
      personalStatement: data.personalStatement || '',
      education: data.education || '',
      certifications: data.certifications || '',
      specialties: data.specialties || '',
      languages: data.languages || '',
      yearsExperience: data.yearsExperience || 0,
      acceptsNewClients: data.acceptsNewClients || false,
    });
  };

  const handleSave = async (values) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      const updatedProfile = await updateTherapistProfile(therapistId, formData);
      setProfile(updatedProfile);
      setEditing(false);
      message.success('Profile updated successfully');
      fetchProfile(); // Refresh the profile data
    } catch (err) {
      message.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <Spin size="large" tip="Loading profile..." />
    </div>
  );

  if (error) return (
    <div className="p-6 text-red-500">
      Error loading profile: {error.message}
    </div>
  );

  if (!profile) {
    return (
      <div className="p-6 text-center text-red-500">
        Therapist profile not found
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 4);
    const hasHalfStar = (rating || 4) - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-500" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-500" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-lime-600">My Profile</h1>
          {!editing ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditing(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              danger
              onClick={() => {
                setEditing(false);
                resetForm(profile);
              }}
            >
              Cancel Editing
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image Card */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow overflow-hidden self-start">
              <img
                src={profile.profileImage || `https://ui-avatars.com/api/?name=${profile.therapist?.user?.fullName}`}
                alt="Therapist"
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{profile.therapist?.user?.fullName}</h2>
                
                <div className="flex items-center mt-2">
                  {renderStars(profile.therapist?.rating)}
                  <span className="ml-2 text-gray-600">
                    ({profile.therapist?.ratingCount || 0})
                  </span>
                </div>
                
                <div className="mt-4 text-gray-600">
                  <div className="flex items-center mt-2">
                    <MailOutlined className="mr-2" />
                    <span>{profile.therapist?.user?.email}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <PhoneOutlined className="mr-2" />
                    <span>{profile.therapist?.user?.phone}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Accepting clients:</span>
                    <span className={`font-medium ${profile.acceptsNewClients ? 'text-green-600' : 'text-red-600'}`}>
                      {profile.acceptsNewClients ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-700">Experience:</span>
                    <span className="font-medium">{profile.yearsExperience} years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content Card */}
          <div className="md:w-3/4 bg-white rounded-lg shadow">
            {editing ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                className="p-6"
              >
                <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
                  <TabPane tab="About" key="about">
                    <Form.Item
                      name="bio"
                      label="Biography"
                      rules={[{ required: true, message: 'Please enter your bio' }]}
                    >
                      <TextArea rows={4} placeholder="Share your professional background" maxLength={500} showCount />
                    </Form.Item>

                    <Form.Item
                      name="personalStatement"
                      label="Personal Statement"
                      rules={[{ required: true, message: 'Please enter your personal statement' }]}
                    >
                      <TextArea rows={5} placeholder="Share your approach to therapy" maxLength={1000} showCount />
                    </Form.Item>

                    <Form.Item
                      name="specialties"
                      label="Specialties"
                      rules={[{ required: true, message: 'Please enter your specialties' }]}
                    >
                      <TextArea rows={3} placeholder="E.g., Anxiety, Depression, Trauma" maxLength={500} showCount />
                    </Form.Item>

                    <Form.Item
                      name="languages"
                      label="Languages"
                      rules={[{ required: true, message: 'Please enter languages you speak' }]}
                    >
                      <Input placeholder="E.g., English, Spanish" />
                    </Form.Item>
                  </TabPane>

                  <TabPane tab="Credentials" key="credentials">
                    <Form.Item
                      name="education"
                      label="Education"
                      rules={[{ required: true, message: 'Please enter your education' }]}
                    >
                      <TextArea rows={3} placeholder="E.g., Master's in Psychology, University of Example" maxLength={500} showCount />
                    </Form.Item>

                    <Form.Item
                      name="certifications"
                      label="Certifications"
                    >
                      <TextArea rows={3} placeholder="E.g., Licensed Clinical Social Worker (LCSW)" maxLength={500} showCount />
                    </Form.Item>
                  </TabPane>
                </Tabs>

                <div className="flex justify-end mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={submitting}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            ) : (
              <div>
                <nav className="border-b">
                  <ul className="flex">
                    {[
                      { key: "about", label: "About" },
                      { key: "credentials", label: "Credentials" },
                    ].map((tab) => (
                      <li
                        key={tab.key}
                        className={`cursor-pointer px-6 py-3 ${
                          activeTab === tab.key
                            ? "border-b-2 border-green-500 text-green-500"
                            : "text W-gray-600"
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        {tab.label}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="p-6">
                  {activeTab === "about" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Biography</h3>
                      <p className="text-gray-700 mb-6">{profile.bio || "No biography provided yet."}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Personal Statement</h3>
                      <p className="text-gray-700 italic mb-6">"{profile.personalStatement || "No personal statement provided yet."}"</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Specialties</h3>
                      <p className="text-gray-700 mb-6">{profile.specialties || "No specialties provided yet."}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Languages</h3>
                      <p className="text-gray-700">{profile.languages || "No languages provided yet."}</p>
                    </div>
                  )}
                  
                  {activeTab === "credentials" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Education</h3>
                      <p className="text-gray-700 mb-6">{profile.education || "No education details provided yet."}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                      <p className="text-gray-700">{profile.certifications || "No certifications provided yet."}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        {editing && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Profile Preview (How clients will see you)</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <img
                    src={profile.profileImage || `https://ui-avatars.com/api/?name=${profile.therapist?.user?.fullName}`}
                    alt="Therapist"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold text-lime-600">{profile.therapist?.user?.fullName}</h3>
                  <div className="flex items-center mt-2">
                    {renderStars(profile.therapist?.rating)}
                    <span className="ml-2 text-gray-600">
                      ({profile.therapist?.ratingCount || 0} reviews)
                    </span>
                  </div>
                  <p className="text-gray-700 mt-4">{form.getFieldValue('bio') || profile.bio || "No biography provided yet."}</p>
                  <p className="text-gray-700 italic mt-4">"{form.getFieldValue('personalStatement') || profile.personalStatement || "No personal statement provided yet."}"</p>
                  <div className="mt-4">
                    <span className="font-bold">Specialties:</span> {form.getFieldValue('specialties') || profile.specialties || "None specified"}
                  </div>
                  <div className="mt-2">
                    <span className="font-bold">Experience:</span> {profile.yearsExperience || 0} years
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}