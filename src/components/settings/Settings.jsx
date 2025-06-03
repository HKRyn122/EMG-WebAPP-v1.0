import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { database, auth } from '../../firebase';
import { ref, update } from 'firebase/database';
import { updatePassword, updateEmail } from 'firebase/auth';

function Settings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (formData.username !== user.username) {
        await update(ref(database, `users/${user.uid}`), {
          username: formData.username
        });
      }

      if (formData.email !== user.email) {
        await updateEmail(auth.currentUser, formData.email);
      }

      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await updatePassword(auth.currentUser, formData.newPassword);
      }

      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="medical-card">
          <div className="flex items-center mb-8">
            <img src="/V3 1200-01.png" alt="Logo" className="h-12 mr-6" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
            </div>
          </div>

          {message.text && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' 
                ? 'bg-green-50 border-l-4 border-green-400 text-green-700'
                : 'bg-red-50 border-l-4 border-red-400 text-red-700'
            }`}>
              <div className="flex items-center">
                <i className={`fas fa-${message.type === 'success' ? 'check-circle'
                  : 'exclamation-circle'} mr-3`}></i>
                {message.text}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20 transition-all duration-200"
                  placeholder="Your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20 transition-all duration-200"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20 transition-all duration-200"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00A79D] focus:ring-2 focus:ring-[#00A79D]/20 transition-all duration-200"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                  loading
                    ? 'bg-[#00A79D]/60 cursor-not-allowed'
                    : 'bg-[#00A79D] hover:bg-[#006B65] shadow-md hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;