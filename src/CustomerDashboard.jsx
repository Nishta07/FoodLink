import React, { useState } from 'react';
import './CustomerDashboard.css';

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showDonationForm, setShowDonationForm] = useState(false);
  
  // User state
  const [user] = useState({
    name: 'Abhishek Kumar',
    email: 'abhishek@email.com',
    userType: 'Restaurant',
    location: 'Downtown, Delhi',
    memberSince: 'Jan 2024',
    avatar: 'JS'
  });

  // Donation form state
  const [donationForm, setDonationForm] = useState({
    foodType: '',
    quantity: '',
    unit: 'portions',
    description: '',
    expiryTime: '',
    pickupLocation: '',
    contactNumber: '',
    specialInstructions: '',
    foodCategory: 'cooked',
    imagePreview: null
  });

  // User's impact stats
  const [userStats] = useState({
    totalDonations: 47,
    foodDonated: '156 kg',
    peopleFed: 234,
    co2Saved: '312 kg',
    activeDonations: 2,
    completedDonations: 45
  });

  // User's donation history
  const [donationHistory] = useState([
    {
      id: 1,
      foodType: 'Vegetable Curry & Rice',
      quantity: '25 portions',
      date: '2024-10-03',
      status: 'completed',
      ngo: 'Hope Foundation',
      pickupTime: '6:30 PM',
      impact: '25 people fed'
    },
    {
      id: 2,
      foodType: 'Fresh Bread & Pastries',
      quantity: '15 items',
      date: '2024-10-02',
      status: 'completed',
      ngo: 'Food For All',
      pickupTime: '8:00 PM',
      impact: '15 people fed'
    },
    {
      id: 3,
      foodType: 'Mixed Salads',
      quantity: '12 portions',
      date: '2024-10-01',
      status: 'completed',
      ngo: 'Meals on Wheels',
      pickupTime: '7:45 PM',
      impact: '12 people fed'
    },
    {
      id: 4,
      foodType: 'Grilled Chicken & Sides',
      quantity: '20 portions',
      date: '2024-09-30',
      status: 'completed',
      ngo: 'Hope Foundation',
      pickupTime: '9:00 PM',
      impact: '20 people fed'
    }
  ]);

  // Active donations
  const [activeDonations] = useState([
    {
      id: 1,
      foodType: 'Paneer Tikka & Naan',
      quantity: '18 portions',
      status: 'picked-up',
      ngo: 'Community Kitchen',
      volunteer: 'Rahul Sharma',
      estimatedDelivery: '30 mins'
    },
    {
      id: 2,
      foodType: 'Fresh Vegetables',
      quantity: '8 kg',
      status: 'assigned',
      ngo: 'Green Earth NGO',
      volunteer: 'Priya Singh',
      estimatedPickup: '15 mins'
    }
  ]);

  // Available NGOs
  const [nearbyNGOs] = useState([
    {
      id: 1,
      name: 'Hope Foundation',
      location: 'Downtown, 2.5 km away',
      rating: 4.9,
      pickups: 156,
      focus: 'Homeless shelters'
    },
    {
      id: 2,
      name: 'Food For All',
      location: 'Central Delhi, 3.2 km away',
      rating: 4.8,
      pickups: 203,
      focus: 'Community kitchens'
    },
    {
      id: 3,
      name: 'Meals on Wheels',
      location: 'East Delhi, 4.1 km away',
      rating: 4.7,
      pickups: 178,
      focus: 'Elderly care'
    }
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDonationForm(prev => ({
          ...prev,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmitDonation = (e) => {
    e.preventDefault();
    console.log('Donation submitted:', donationForm);
    // Here you would send data to backend
    alert('Thank you! Your food donation has been listed successfully. NGOs in your area will be notified.');
    setShowDonationForm(false);
    // Reset form
    setDonationForm({
      foodType: '',
      quantity: '',
      unit: 'portions',
      description: '',
      expiryTime: '',
      pickupLocation: '',
      contactNumber: '',
      specialInstructions: '',
      foodCategory: 'cooked',
      imagePreview: null
    });
  };

  // Get status badge class
  const getStatusClass = (status) => {
    const classes = {
      'completed': 'status-completed',
      'picked-up': 'status-pickup',
      'assigned': 'status-assigned',
      'pending': 'status-pending'
    };
    return classes[status] || 'status-default';
  };

  // Render Dashboard Tab
  const renderDashboard = () => (
    <div className="dashboard-content">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h2>Welcome back, {user.name}!</h2>
          <p>Together we're fighting hunger and reducing food waste, one meal at a time.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowDonationForm(true)}>
          + Donate Food Now
        </button>
      </div>

      {/* Impact Stats */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">🍽️</div>
          <div className="stat-details">
            <h3>{userStats.totalDonations}</h3>
            <p>Total Donations</p>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon">⚖️</div>
          <div className="stat-details">
            <h3>{userStats.foodDonated}</h3>
            <p>Food Donated</p>
          </div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon">❤️</div>
          <div className="stat-details">
            <h3>{userStats.peopleFed}</h3>
            <p>People Fed</p>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon">🌱</div>
          <div className="stat-details">
            <h3>{userStats.co2Saved}</h3>
            <p>CO₂ Saved</p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mission-section">
        <h3>Our Mission: Zero Hunger, Zero Waste</h3>
        <div className="mission-content">
          <div className="mission-card">
            <div className="mission-icon">🌍</div>
            <h4>The Global Challenge</h4>
            <p>Food wastage is one of the most pressing global issues, with millions of tons of edible food being discarded every day, while millions of people continue to suffer from hunger and malnutrition.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">🤝</div>
            <h4>Bridging The Gap</h4>
            <p>FoodLink connects food donors with NGOs and volunteers through real-time listings, image uploads, and location-based matching to ensure timely redistribution of excess food.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">🎯</div>
            <h4>UN SDG Alignment</h4>
            <p>Our initiative promotes sustainability and social welfare, directly supporting SDG 2: Zero Hunger and SDG 12: Responsible Consumption and Production.</p>
          </div>
        </div>
      </div>

      {/* Active Donations */}
      {activeDonations.length > 0 && (
        <div className="active-donations-section">
          <h3>Your Active Donations</h3>
          <div className="active-donations-list">
            {activeDonations.map(donation => (
              <div key={donation.id} className="active-donation-card">
                <div className="donation-info">
                  <h4>{donation.foodType}</h4>
                  <p className="quantity">📦 {donation.quantity}</p>
                  <p className="ngo">🏢 {donation.ngo}</p>
                  <p className="volunteer">👤 Volunteer: {donation.volunteer}</p>
                </div>
                <div className="donation-status">
                  <span className={`status-badge ${getStatusClass(donation.status)}`}>
                    {donation.status === 'picked-up' ? '🚚 Picked Up' : '📍 Assigned'}
                  </span>
                  <p className="eta">
                    {donation.status === 'picked-up' 
                      ? `Delivery in ${donation.estimatedDelivery}`
                      : `Pickup in ${donation.estimatedPickup}`
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Impact */}
      <div className="recent-impact">
        <h3>Recent Donations</h3>
        <div className="impact-list">
          {donationHistory.slice(0, 3).map(donation => (
            <div key={donation.id} className="impact-item">
              <div className="impact-icon success">✅</div>
              <div className="impact-details">
                <h4>{donation.foodType}</h4>
                <p>{donation.quantity} donated to {donation.ngo}</p>
                <span className="impact-date">{donation.date} at {donation.pickupTime}</span>
              </div>
              <div className="impact-result">
                <span className="impact-badge">{donation.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Donate Tab
  const renderDonateTab = () => (
    <div className="donate-content">
      <div className="donate-header">
        <h2>Make a Food Donation</h2>
        <p>Help reduce waste and feed those in need by donating your surplus food</p>
      </div>

      {!showDonationForm ? (
        <div className="donation-info">
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📝</div>
              <h3>List Your Food</h3>
              <p>Provide details about the surplus food you want to donate</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📸</div>
              <h3>Upload Image</h3>
              <p>Add a photo to help NGOs understand what you're offering</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location Matching</h3>
              <p>We'll connect you with nearby NGOs and volunteers</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🚚</div>
              <h3>Quick Pickup</h3>
              <p>Volunteers will collect the food and deliver it to those in need</p>
            </div>
          </div>
          <button className="btn-primary btn-large" onClick={() => setShowDonationForm(true)}>
            Start Donation Process
          </button>
        </div>
      ) : (
        <div className="donation-form-container">
          <form onSubmit={handleSubmitDonation} className="donation-form">
            <div className="form-section">
              <h3>Food Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Food Category *</label>
                  <select 
                    name="foodCategory" 
                    value={donationForm.foodCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="cooked">Cooked Food</option>
                    <option value="raw">Raw Ingredients</option>
                    <option value="packaged">Packaged Food</option>
                    <option value="bakery">Bakery Items</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Food Type/Name *</label>
                  <input 
                    type="text" 
                    name="foodType"
                    value={donationForm.foodType}
                    onChange={handleInputChange}
                    placeholder="e.g., Vegetable Biryani, Fresh Vegetables"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity *</label>
                  <input 
                    type="number" 
                    name="quantity"
                    value={donationForm.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Unit *</label>
                  <select 
                    name="unit" 
                    value={donationForm.unit}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="portions">Portions</option>
                    <option value="kg">Kilograms</option>
                    <option value="items">Items</option>
                    <option value="plates">Plates</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea 
                  name="description"
                  value={donationForm.description}
                  onChange={handleInputChange}
                  placeholder="Describe the food items (ingredients, spice level, dietary info, etc.)"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Upload Food Image</label>
                <div className="image-upload">
                  <input 
                    type="file" 
                    id="foodImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="foodImage" className="image-upload-label">
                    {donationForm.imagePreview ? (
                      <img src={donationForm.imagePreview} alt="Food preview" className="image-preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <span className="upload-icon">📷</span>
                        <span>Click to upload image</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Pickup Information</h3>
              
              <div className="form-group">
                <label>Best Before Time *</label>
                <input 
                  type="datetime-local" 
                  name="expiryTime"
                  value={donationForm.expiryTime}
                  onChange={handleInputChange}
                  required
                />
                <small>When should this food be picked up by?</small>
              </div>

              <div className="form-group">
                <label>Pickup Location *</label>
                <input 
                  type="text" 
                  name="pickupLocation"
                  value={donationForm.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="Enter your address or location"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number *</label>
                <input 
                  type="tel" 
                  name="contactNumber"
                  value={donationForm.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Your contact number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Special Instructions</label>
                <textarea 
                  name="specialInstructions"
                  value={donationForm.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any special instructions for pickup? (e.g., parking info, gate code)"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowDonationForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Submit Donation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  // Render History Tab
  const renderHistoryTab = () => (
    <div className="history-content">
      <div className="history-header">
        <h2>Donation History</h2>
        <div className="history-stats">
          <span>Total: {userStats.totalDonations}</span>
          <span>Completed: {userStats.completedDonations}</span>
          <span>Active: {userStats.activeDonations}</span>
        </div>
      </div>

      <div className="history-list">
        {donationHistory.map(donation => (
          <div key={donation.id} className="history-card">
            <div className="history-main">
              <div className="history-info">
                <h4>{donation.foodType}</h4>
                <p className="history-quantity">📦 {donation.quantity}</p>
                <div className="history-meta">
                  <span>📅 {donation.date}</span>
                  <span>🕐 {donation.pickupTime}</span>
                  <span>🏢 {donation.ngo}</span>
                </div>
              </div>
              <div className="history-status">
                <span className={`status-badge ${getStatusClass(donation.status)}`}>
                  ✅ {donation.status}
                </span>
                <div className="history-impact">
                  <span className="impact-label">Impact:</span>
                  <span className="impact-value">{donation.impact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render NGOs Tab
  const renderNGOsTab = () => (
    <div className="ngos-content">
      <div className="ngos-header">
        <h2>Partner NGOs</h2>
        <p>Connect with verified NGOs working to eliminate hunger in your community</p>
      </div>

      <div className="ngos-grid">
        {nearbyNGOs.map(ngo => (
          <div key={ngo.id} className="ngo-card">
            <div className="ngo-header">
              <div className="ngo-avatar">🏢</div>
              <div className="ngo-info">
                <h3>{ngo.name}</h3>
                <p className="ngo-location">📍 {ngo.location}</p>
              </div>
            </div>
            <div className="ngo-details">
              <div className="ngo-stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">⭐ {ngo.rating}</span>
              </div>
              <div className="ngo-stat">
                <span className="stat-label">Pickups</span>
                <span className="stat-value">🚚 {ngo.pickups}</span>
              </div>
            </div>
            <div className="ngo-focus">
              <span className="focus-label">Focus Area:</span>
              <span className="focus-value">{ngo.focus}</span>
            </div>
            <button className="btn-outline btn-block">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Profile Tab
  const renderProfileTab = () => (
    <div className="profile-content">
      <div className="profile-header">
        <h2>Your Profile</h2>
      </div>

      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar-large">{user.avatar}</div>
          <button className="btn-secondary">Change Photo</button>
        </div>

        <div className="profile-info-section">
          <div className="profile-field">
            <label>Full Name</label>
            <input type="text" value={user.name} readOnly />
          </div>
          <div className="profile-field">
            <label>Email Address</label>
            <input type="email" value={user.email} readOnly />
          </div>
          <div className="profile-field">
            <label>User Type</label>
            <input type="text" value={user.userType} readOnly />
          </div>
          <div className="profile-field">
            <label>Location</label>
            <input type="text" value={user.location} readOnly />
          </div>
          <div className="profile-field">
            <label>Member Since</label>
            <input type="text" value={user.memberSince} readOnly />
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-primary">Edit Profile</button>
          <button className="btn-secondary">Change Password</button>
        </div>
      </div>

      <div className="profile-achievements">
        <h3>Your Achievements</h3>
        <div className="achievements-grid">
          <div className="achievement-badge">
            <div className="badge-icon">🏆</div>
            <h4>First Donor</h4>
            <p>Made your first donation</p>
          </div>
          <div className="achievement-badge">
            <div className="badge-icon">⭐</div>
            <h4>Regular Contributor</h4>
            <p>10+ donations completed</p>
          </div>
          <div className="achievement-badge">
            <div className="badge-icon">💚</div>
            <h4>Impact Maker</h4>
            <p>Fed 100+ people</p>
          </div>
          <div className="achievement-badge locked">
            <div className="badge-icon">👑</div>
            <h4>Community Champion</h4>
            <p>100 donations (47/100)</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="customer-dashboard">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🌱</span>
            <span className="logo-text">FoodLink</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'donate' ? 'active' : ''}`}
            onClick={() => setActiveTab('donate')}
          >
            <span className="nav-icon">🍽️</span>
            <span className="nav-text">Donate Food</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-text">My Donations</span>
            <span className="nav-badge">{userStats.totalDonations}</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'ngos' ? 'active' : ''}`}
            onClick={() => setActiveTab('ngos')}
          >
            <span className="nav-icon">🤝</span>
            <span className="nav-text">Partner NGOs</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-text">Profile</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.userType}</p>
            </div>
          </div>
          <button className="logout-btn">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-content">
            <h1>Customer Dashboard</h1>
            <p>Track your impact and manage your food donations</p>
          </div>
        </header>

        <div className="content-wrapper">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'donate' && renderDonateTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'ngos' && renderNGOsTab()}
          {activeTab === 'profile' && renderProfileTab()}
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;