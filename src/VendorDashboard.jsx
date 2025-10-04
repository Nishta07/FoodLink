import React, { useState } from 'react';
import './VendorDashboard.css';

function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDonationModal, setShowDonationModal] = useState(false);
  
  // Vendor user state
  const [vendor] = useState({
    name: 'The Green Kitchen',
    type: 'Restaurant',
    email: 'contact@greenkitchen.com',
    phone: '+91 98765 43210',
    address: 'Downtown, Delhi',
    memberSince: 'Jan 2024',
    verified: true,
    rating: 4.8,
    avatar: 'GK'
  });

  // Donation form state
  const [donationForm, setDonationForm] = useState({
    foodType: '',
    category: 'cooked-food',
    quantity: '',
    unit: 'portions',
    description: '',
    expiryTime: '',
    preparationTime: '',
    dietaryInfo: [],
    spiceLevel: 'medium',
    storageInstructions: '',
    pickupInstructions: '',
    contactPerson: '',
    contactNumber: '',
    imagePreview: null
  });

  // Vendor stats
  const [vendorStats] = useState({
    totalDonations: 89,
    activeDonations: 5,
    completedDonations: 84,
    foodDonated: '342 kg',
    peopleFed: 1256,
    co2Saved: '685 kg',
    partneredNGOs: 12,
    volunteers: 23,
    avgResponseTime: '18 mins',
    successRate: '96%'
  });

  // Active donations
  const [activeDonations] = useState([
    {
      id: 1,
      foodType: 'Vegetable Biryani & Raita',
      quantity: '30 portions',
      status: 'in-transit',
      ngo: 'Hope Foundation',
      volunteer: 'Rahul Sharma',
      pickupTime: '7:30 PM',
      expiryTime: '10:00 PM',
      eta: '15 mins'
    },
    {
      id: 2,
      foodType: 'Fresh Bread & Butter',
      quantity: '25 loaves',
      status: 'assigned',
      ngo: 'Food For All',
      volunteer: 'Priya Singh',
      pickupTime: '8:00 PM',
      expiryTime: '11:00 PM',
      eta: 'Arriving soon'
    },
    {
      id: 3,
      foodType: 'Dal Makhani & Roti',
      quantity: '40 portions',
      status: 'pending',
      ngo: 'Pending Assignment',
      volunteer: 'Not Assigned',
      pickupTime: 'ASAP',
      expiryTime: '9:30 PM',
      eta: 'Waiting for NGO'
    }
  ]);

  // Donation history
  const [donationHistory] = useState([
    {
      id: 1,
      foodType: 'Mixed Veg Curry & Rice',
      quantity: '35 portions',
      date: '2024-10-03',
      time: '8:45 PM',
      status: 'delivered',
      ngo: 'Community Kitchen',
      volunteer: 'Amit Kumar',
      feedback: 'Excellent quality, helped 35 families',
      rating: 5
    },
    {
      id: 2,
      foodType: 'Paneer Tikka & Naan',
      quantity: '28 portions',
      date: '2024-10-02',
      time: '7:30 PM',
      status: 'delivered',
      ngo: 'Hope Foundation',
      volunteer: 'Neha Gupta',
      feedback: 'Fresh and tasty, quick pickup',
      rating: 5
    },
    {
      id: 3,
      foodType: 'Pasta & Garlic Bread',
      quantity: '20 portions',
      date: '2024-10-01',
      time: '9:00 PM',
      status: 'delivered',
      ngo: 'Meals on Wheels',
      volunteer: 'Vikram Singh',
      feedback: 'Great packaging, well received',
      rating: 4
    }
  ]);

  // NGO Partners
  const [ngoPartners] = useState([
    {
      id: 1,
      name: 'Hope Foundation',
      pickups: 34,
      rating: 4.9,
      focus: 'Homeless shelters',
      lastPickup: '2 days ago',
      responseTime: '12 mins'
    },
    {
      id: 2,
      name: 'Community Kitchen',
      pickups: 28,
      rating: 4.8,
      focus: 'Community meals',
      lastPickup: '1 day ago',
      responseTime: '15 mins'
    },
    {
      id: 3,
      name: 'Food For All',
      pickups: 27,
      rating: 4.7,
      focus: 'School programs',
      lastPickup: 'Today',
      responseTime: '20 mins'
    }
  ]);

  // Volunteers
  const [volunteers] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      status: 'active',
      pickups: 45,
      rating: 4.9,
      location: 'Downtown'
    },
    {
      id: 2,
      name: 'Priya Singh',
      status: 'active',
      pickups: 38,
      rating: 4.8,
      location: 'Central'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      status: 'offline',
      pickups: 52,
      rating: 5.0,
      location: 'Eastside'
    }
  ]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle dietary info checkboxes
  const handleDietaryChange = (e) => {
    const { value, checked } = e.target;
    setDonationForm(prev => ({
      ...prev,
      dietaryInfo: checked 
        ? [...prev.dietaryInfo, value]
        : prev.dietaryInfo.filter(item => item !== value)
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

  // Submit donation
  const handleSubmitDonation = (e) => {
    e.preventDefault();
    console.log('Donation submitted:', donationForm);
    alert('Donation listed successfully! NGOs in your area have been notified.');
    setShowDonationModal(false);
    // Reset form
    setDonationForm({
      foodType: '',
      category: 'cooked-food',
      quantity: '',
      unit: 'portions',
      description: '',
      expiryTime: '',
      preparationTime: '',
      dietaryInfo: [],
      spiceLevel: 'medium',
      storageInstructions: '',
      pickupInstructions: '',
      contactPerson: '',
      contactNumber: '',
      imagePreview: null
    });
  };

  // Get status class
  const getStatusClass = (status) => {
    const classes = {
      'delivered': 'status-delivered',
      'in-transit': 'status-transit',
      'assigned': 'status-assigned',
      'pending': 'status-pending'
    };
    return classes[status] || 'status-default';
  };

  // Render Overview Tab
  const renderOverview = () => (
    <div className="overview-content">
      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-card primary" onClick={() => setShowDonationModal(true)}>
          <span className="action-icon">➕</span>
          <div className="action-text">
            <h3>List Food Donation</h3>
            <p>Add surplus food for redistribution</p>
          </div>
        </button>
        <button className="action-card success">
          <span className="action-icon">📊</span>
          <div className="action-text">
            <h3>View Analytics</h3>
            <p>Track your impact and metrics</p>
          </div>
        </button>
        <button className="action-card info">
          <span className="action-icon">🤝</span>
          <div className="action-text">
            <h3>Partner NGOs</h3>
            <p>Manage NGO relationships</p>
          </div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">🍽️</span>
            <span className="stat-trend positive">+12%</span>
          </div>
          <h3>{vendorStats.totalDonations}</h3>
          <p>Total Donations</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">⚖️</span>
            <span className="stat-trend positive">+8%</span>
          </div>
          <h3>{vendorStats.foodDonated}</h3>
          <p>Food Donated</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">❤️</span>
            <span className="stat-trend positive">+15%</span>
          </div>
          <h3>{vendorStats.peopleFed}</h3>
          <p>People Fed</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">🌱</span>
            <span className="stat-trend positive">+10%</span>
          </div>
          <h3>{vendorStats.co2Saved}</h3>
          <p>CO₂ Saved</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="performance-section">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-icon">⚡</span>
            <div className="metric-info">
              <h4>{vendorStats.avgResponseTime}</h4>
              <p>Avg Response Time</p>
            </div>
          </div>
          <div className="metric-card">
            <span className="metric-icon">✅</span>
            <div className="metric-info">
              <h4>{vendorStats.successRate}</h4>
              <p>Success Rate</p>
            </div>
          </div>
          <div className="metric-card">
            <span className="metric-icon">🏢</span>
            <div className="metric-info">
              <h4>{vendorStats.partneredNGOs}</h4>
              <p>Partner NGOs</p>
            </div>
          </div>
          <div className="metric-card">
            <span className="metric-icon">🙋</span>
            <div className="metric-info">
              <h4>{vendorStats.volunteers}</h4>
              <p>Active Volunteers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Donations */}
      {activeDonations.length > 0 && (
        <div className="active-section">
          <div className="section-header">
            <h3>Active Donations ({activeDonations.length})</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="active-list">
            {activeDonations.map(donation => (
              <div key={donation.id} className="active-card">
                <div className="active-header">
                  <div className="active-info">
                    <h4>{donation.foodType}</h4>
                    <p className="quantity">📦 {donation.quantity}</p>
                  </div>
                  <span className={`status-badge ${getStatusClass(donation.status)}`}>
                    {donation.status === 'in-transit' && '🚚 In Transit'}
                    {donation.status === 'assigned' && '📍 Assigned'}
                    {donation.status === 'pending' && '⏳ Pending'}
                  </span>
                </div>
                <div className="active-details">
                  <div className="detail-row">
                    <span className="label">NGO:</span>
                    <span className="value">{donation.ngo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Volunteer:</span>
                    <span className="value">{donation.volunteer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Pickup:</span>
                    <span className="value">{donation.pickupTime}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Expires:</span>
                    <span className="value urgent">{donation.expiryTime}</span>
                  </div>
                </div>
                <div className="active-footer">
                  <span className="eta">{donation.eta}</span>
                  <button className="btn-sm btn-outline">Track</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-timeline">
          <div className="timeline-item">
            <div className="timeline-marker success"></div>
            <div className="timeline-content">
              <h4>Donation Delivered</h4>
              <p>35 portions delivered to Community Kitchen</p>
              <span className="timeline-time">2 hours ago</span>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker info"></div>
            <div className="timeline-content">
              <h4>Volunteer Assigned</h4>
              <p>Priya Singh assigned for bread pickup</p>
              <span className="timeline-time">3 hours ago</span>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker warning"></div>
            <div className="timeline-content">
              <h4>New Donation Listed</h4>
              <p>40 portions of Dal Makhani available</p>
              <span className="timeline-time">4 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Donations Tab
  const renderDonations = () => (
    <div className="donations-content">
      <div className="section-header">
        <h2>Manage Donations</h2>
        <button className="btn-primary" onClick={() => setShowDonationModal(true)}>
          + New Donation
        </button>
      </div>

      {/* Tabs for active/history */}
      <div className="donation-tabs">
        <button className="tab-btn active">Active ({activeDonations.length})</button>
        <button className="tab-btn">History ({donationHistory.length})</button>
      </div>

      {/* Active Donations List */}
      <div className="donations-list">
        {activeDonations.map(donation => (
          <div key={donation.id} className="donation-card">
            <div className="donation-header">
              <div className="donation-main">
                <h4>{donation.foodType}</h4>
                <p className="donation-quantity">📦 {donation.quantity}</p>
              </div>
              <span className={`status-badge ${getStatusClass(donation.status)}`}>
                {donation.status}
              </span>
            </div>
            <div className="donation-body">
              <div className="donation-grid">
                <div className="donation-field">
                  <span className="field-label">NGO</span>
                  <span className="field-value">{donation.ngo}</span>
                </div>
                <div className="donation-field">
                  <span className="field-label">Volunteer</span>
                  <span className="field-value">{donation.volunteer}</span>
                </div>
                <div className="donation-field">
                  <span className="field-label">Pickup Time</span>
                  <span className="field-value">{donation.pickupTime}</span>
                </div>
                <div className="donation-field">
                  <span className="field-label">Expiry Time</span>
                  <span className="field-value urgent">{donation.expiryTime}</span>
                </div>
              </div>
            </div>
            <div className="donation-actions">
              <button className="btn-outline btn-sm">View Details</button>
              <button className="btn-outline btn-sm">Contact Volunteer</button>
              <button className="btn-danger btn-sm">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render History Tab
  const renderHistory = () => (
    <div className="history-content">
      <div className="section-header">
        <h2>Donation History</h2>
        <div className="filter-group">
          <select className="filter-select">
            <option>All Time</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
          </select>
        </div>
      </div>

      <div className="history-list">
        {donationHistory.map(donation => (
          <div key={donation.id} className="history-card">
            <div className="history-header">
              <div className="history-main">
                <h4>{donation.foodType}</h4>
                <p>{donation.quantity}</p>
              </div>
              <div className="history-rating">
                <span className="rating-stars">{'⭐'.repeat(donation.rating)}</span>
                <span className="rating-value">{donation.rating}.0</span>
              </div>
            </div>
            <div className="history-body">
              <div className="history-meta">
                <span>📅 {donation.date}</span>
                <span>🕐 {donation.time}</span>
                <span>🏢 {donation.ngo}</span>
                <span>👤 {donation.volunteer}</span>
              </div>
              {donation.feedback && (
                <div className="history-feedback">
                  <p className="feedback-label">Feedback:</p>
                  <p className="feedback-text">"{donation.feedback}"</p>
                </div>
              )}
            </div>
            <div className="history-footer">
              <span className={`status-badge ${getStatusClass(donation.status)}`}>
                ✅ {donation.status}
              </span>
              <button className="btn-text">View Receipt</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Partners Tab
  const renderPartners = () => (
    <div className="partners-content">
      <div className="section-header">
        <h2>Partner NGOs</h2>
        <p className="section-subtitle">Organizations you've worked with</p>
      </div>

      <div className="partners-grid">
        {ngoPartners.map(ngo => (
          <div key={ngo.id} className="partner-card">
            <div className="partner-header">
              <div className="partner-avatar">🏢</div>
              <div className="partner-info">
                <h3>{ngo.name}</h3>
                <p className="partner-focus">{ngo.focus}</p>
              </div>
            </div>
            <div className="partner-stats">
              <div className="partner-stat">
                <span className="stat-value">{ngo.pickups}</span>
                <span className="stat-label">Pickups</span>
              </div>
              <div className="partner-stat">
                <span className="stat-value">⭐ {ngo.rating}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="partner-stat">
                <span className="stat-value">{ngo.responseTime}</span>
                <span className="stat-label">Response</span>
              </div>
            </div>
            <div className="partner-footer">
              <span className="last-pickup">Last pickup: {ngo.lastPickup}</span>
              <button className="btn-outline btn-sm">Contact</button>
            </div>
          </div>
        ))}
      </div>

      {/* Volunteers Section */}
      <div className="volunteers-section">
        <h3>Frequent Volunteers</h3>
        <div className="volunteers-grid">
          {volunteers.map(volunteer => (
            <div key={volunteer.id} className="volunteer-card">
              <div className="volunteer-status-indicator" data-status={volunteer.status}></div>
              <div className="volunteer-info">
                <h4>{volunteer.name}</h4>
                <p>{volunteer.location}</p>
              </div>
              <div className="volunteer-stats">
                <span>🚚 {volunteer.pickups} pickups</span>
                <span>⭐ {volunteer.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Settings Tab
  const renderSettings = () => (
    <div className="settings-content">
      <div className="section-header">
        <h2>Vendor Settings</h2>
      </div>

      <div className="settings-sections">
        {/* Business Information */}
        <div className="settings-card">
          <h3>Business Information</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>Business Name</label>
              <input type="text" value={vendor.name} readOnly />
            </div>
            <div className="form-group">
              <label>Business Type</label>
              <input type="text" value={vendor.type} readOnly />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={vendor.email} readOnly />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" value={vendor.phone} readOnly />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" value={vendor.address} readOnly />
            </div>
          </div>
          <button className="btn-primary">Edit Information</button>
        </div>

        {/* Notification Preferences */}
        <div className="settings-card">
          <h3>Notification Preferences</h3>
          <div className="settings-options">
            <label className="settings-checkbox">
              <input type="checkbox" defaultChecked />
              <span>Email notifications for new pickups</span>
            </label>
            <label className="settings-checkbox">
              <input type="checkbox" defaultChecked />
              <span>SMS alerts for urgent donations</span>
            </label>
            <label className="settings-checkbox">
              <input type="checkbox" defaultChecked />
              <span>Weekly impact reports</span>
            </label>
            <label className="settings-checkbox">
              <input type="checkbox" />
              <span>Marketing communications</span>
            </label>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="settings-card">
          <h3>Operating Hours</h3>
          <div className="hours-grid">
            <div className="hours-row">
              <span>Monday - Friday</span>
              <span>11:00 AM - 11:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Saturday</span>
              <span>11:00 AM - 12:00 AM</span>
            </div>
            <div className="hours-row">
              <span>Sunday</span>
              <span>11:00 AM - 11:00 PM</span>
            </div>
          </div>
          <button className="btn-outline">Update Hours</button>
        </div>
      </div>
    </div>
  );

  // Render Donation Modal
  const renderDonationModal = () => (
    <div className="modal-overlay" onClick={() => setShowDonationModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>List New Food Donation</h2>
          <button className="modal-close" onClick={() => setShowDonationModal(false)}>✕</button>
        </div>
        
        <form onSubmit={handleSubmitDonation} className="donation-form">
          <div className="form-section">
            <h3>Food Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Food Category *</label>
                <select 
                  name="category" 
                  value={donationForm.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="cooked-food">Cooked Food</option>
                  <option value="raw-ingredients">Raw Ingredients</option>
                  <option value="packaged-food">Packaged Food</option>
                  <option value="bakery">Bakery Items</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Food Name *</label>
                <input 
                  type="text" 
                  name="foodType"
                  value={donationForm.foodType}
                  onChange={handleInputChange}
                  placeholder="e.g., Vegetable Biryani"
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
                  <option value="packs">Packs</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea 
                name="description"
                value={donationForm.description}
                onChange={handleInputChange}
                placeholder="Describe the food (ingredients, preparation method, etc.)"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Dietary Information</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" value="vegetarian" onChange={handleDietaryChange} />
                  <span>Vegetarian</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" value="vegan" onChange={handleDietaryChange} />
                  <span>Vegan</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" value="gluten-free" onChange={handleDietaryChange} />
                  <span>Gluten-Free</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" value="dairy-free" onChange={handleDietaryChange} />
                  <span>Dairy-Free</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Spice Level</label>
              <select 
                name="spiceLevel" 
                value={donationForm.spiceLevel}
                onChange={handleInputChange}
              >
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="hot">Hot</option>
                <option value="extra-hot">Extra Hot</option>
              </select>
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
                    <img src={donationForm.imagePreview} alt="Preview" className="image-preview" />
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
            <h3>Timing & Pickup</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Preparation Time</label>
                <input 
                  type="time" 
                  name="preparationTime"
                  value={donationForm.preparationTime}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Best Before Time *</label>
                <input 
                  type="datetime-local" 
                  name="expiryTime"
                  value={donationForm.expiryTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Storage Instructions</label>
              <textarea 
                name="storageInstructions"
                value={donationForm.storageInstructions}
                onChange={handleInputChange}
                placeholder="How should this food be stored? (e.g., Keep refrigerated)"
                rows="2"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Pickup Instructions</label>
              <textarea 
                name="pickupInstructions"
                value={donationForm.pickupInstructions}
                onChange={handleInputChange}
                placeholder="Special instructions for pickup (parking, entry, etc.)"
                rows="2"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact Person *</label>
                <input 
                  type="text" 
                  name="contactPerson"
                  value={donationForm.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Who to contact for pickup"
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
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowDonationModal(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              List Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="vendor-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🌱</span>
            <span className="logo-text">FoodLink</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Overview</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'donations' ? 'active' : ''}`}
            onClick={() => setActiveTab('donations')}
          >
            <span className="nav-icon">🍽️</span>
            <span className="nav-text">Donations</span>
            <span className="nav-badge">{activeDonations.length}</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-text">History</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'partners' ? 'active' : ''}`}
            onClick={() => setActiveTab('partners')}
          >
            <span className="nav-icon">🤝</span>
            <span className="nav-text">Partners</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="nav-icon">📈</span>
            <span className="nav-text">Analytics</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="vendor-profile">
            <div className="vendor-avatar">{vendor.avatar}</div>
            <div className="vendor-info">
              <h4>{vendor.name}</h4>
              <p>{vendor.type}</p>
              {vendor.verified && (
                <span className="verified-badge">✓ Verified</span>
              )}
            </div>
          </div>
          <button className="logout-btn">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h1>Vendor Dashboard</h1>
            <p>Manage your food donations and track your impact</p>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
              <span className="notification-count">3</span>
            </button>
            <div className="header-stats">
              <div className="header-stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">⭐ {vendor.rating}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'donations' && renderDonations()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'partners' && renderPartners()}
          {activeTab === 'analytics' && (
            <div className="coming-soon">
              <h3>📈 Analytics Dashboard</h3>
              <p>Detailed analytics and insights coming soon!</p>
            </div>
          )}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>

      {/* Donation Modal */}
      {showDonationModal && renderDonationModal()}
    </div>
  );
}

export default VendorDashboard;