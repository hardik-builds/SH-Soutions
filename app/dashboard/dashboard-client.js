'use client';
import { useState, useEffect } from 'react';
import SimpleDashboardLayout from '@/components/SimpleDashboardLayout';
import { getUser } from '@/lib/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState({ subject: '', content: '' });
  const [showReportModal, setShowReportModal] = useState(false);
  const [report, setReport] = useState({ title: '', content: '' });
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showQuickInput, setShowQuickInput] = useState(false);
  const [quickProject, setQuickProject] = useState({ name: '', description: '' });

  useEffect(() => {
    // Get user data
    const userData = getUser();
    setUser(userData);

    // Fetch user's projects
    fetchProjects();
    // fetchNotifications();
    // fetchActivities();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);

        // Calculate stats
        const total = data.projects.length;
        const completed = data.projects.filter(p => p.status === 'completed').length;
        const ongoing = data.projects.filter(p => p.status === 'in-progress').length;

        setStats({
          totalProjects: total,
          completedProjects: completed,
          ongoingProjects: ongoing,
          pendingTasks: data.projects.filter(p => p.status === 'pending').length
        });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateProject = async () => {
    if (!newProject.name || !newProject.description) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProject)
      });

      const data = await response.json();

      if (data.success) {
        setShowNewProjectModal(false);
        setNewProject({ name: '', description: '' });
        fetchProjects();

        // Add activity
        const newActivity = {
          type: 'project_created',
          description: `Created project: ${newProject.name}`,
          timestamp: new Date()
        };
        setActivities([newActivity, ...activities]);

        // Show success notification
        setNotifications([{
          type: 'success',
          title: 'Project Created',
          message: `Project "${newProject.name}" has been created successfully`,
          timestamp: new Date()
        }, ...notifications]);
      } else {
        setError(data.message || 'Error creating project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Error creating project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  const handleQuickAddProject = async () => {

  if (!quickProject.name || !quickProject.description) {
    setError("Fill all fields");
    return;
  }

  setSubmitting(true);

  try {
    const token = localStorage.getItem('token');

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...quickProject,
        status: 'pending',
        completionPercentage: 0,
        lastUpdated: new Date()
      })
    });

    const data = await response.json();

    if (data.success) {

      const updated = [data.project, ...projects];
      setProjects(updated);

      setShowQuickInput(false);
      setQuickProject({ name: '', description: '' });

    }

  } catch {
    setError("Error creating project");
  } finally {
    setSubmitting(false);
  }
};

  const handleSendMessage = async () => {
    if (!message.subject || !message.content) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message)
      });

      const data = await response.json();

      if (data.success) {
        setShowMessageModal(false);
        setMessage({ subject: '', content: '' });

        // Add activity
        const newActivity = {
          type: 'message_sent',
          description: `Sent message: ${message.subject}`,
          timestamp: new Date()
        };
        setActivities([newActivity, ...activities]);

        // Show success notification
        setNotifications([{
          type: 'success',
          title: 'Message Sent',
          message: `Your message has been sent successfully`,
          timestamp: new Date()
        }, ...notifications]);
      } else {
        setError(data.message || 'Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateReport = async () => {
    if (!report.title || !report.content) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(report)
      });

      const data = await response.json();

      if (data.success) {
        setShowReportModal(false);
        setReport({ title: '', content: '' });

        // Add activity
        const newActivity = {
          type: 'report_created',
          description: `Created report: ${report.title}`,
          timestamp: new Date()
        };
        setActivities([newActivity, ...activities]);

        // Show success notification
        setNotifications([{
          type: 'success',
          title: 'Report Created',
          message: `Report "${report.title}" has been created successfully`,
          timestamp: new Date()
        }, ...notifications]);
      } else {
        setError(data.message || 'Error creating report');
      }
    } catch (error) {
      console.error('Error creating report:', error);
      setError('Error creating report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in-progress':
        return '#3B82F6';
      case 'pending':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return '#10B981';
    if (percentage >= 50) return '#3B82F6';
    if (percentage >= 20) return '#F59E0B';
    return '#EF4444';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_created':
        return '📁';
      case 'message_sent':
        return '📧';
      case 'report_created':
        return '📊';
      default:
        return '📝';
    }
  };

  if (loading) {
    return (
      <SimpleDashboardLayout title="Dashboard">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3B82F6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <div>Loading dashboard data...</div>
          </div>
        </div>
      </SimpleDashboardLayout>
    );
  }

  return (
    <SimpleDashboardLayout title="Dashboard">
      {/* Error Alert */}
      {error && (
        <div style={{
          backgroundColor: '#FEE2E2',
          border: '1px solid #FCA5A5',
          color: '#991B1B',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button
            onClick={() => setError('')}
            style={{ background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer', fontSize: '18px' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Welcome Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Welcome back, {user?.name || user?.email}! 👋
        </h2>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>Here's an overview of your projects and activities.</p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderTop: '4px solid #3B82F6',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Total Projects</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937' }}>{stats.totalProjects}</p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: '#EBF5FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
        </div>


        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderTop: '4px solid #10B981',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Completed</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937' }}>{stats.completedProjects}</p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: '#D1FAE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderTop: '4px solid #F59E0B',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>In Progress</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937' }}>{stats.ongoingProjects}</p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderTop: '4px solid #EF4444',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Pending Tasks</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937' }}>{stats.pendingTasks}</p>
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowQuickInput(!showQuickInput)}
        style={{
          padding: '10px 16px',
          backgroundColor: '#3B82F6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        + Quick Add Project
      </button>
      {showQuickInput && (
  <div style={{
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB'
  }}>

    <h3 style={{
      fontSize: '16px',
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: '12px'
    }}>
      Create New Project
    </h3>

    <input
      type="text"
      placeholder="Project Name"
      value={quickProject.name}
      onChange={(e) => setQuickProject({ ...quickProject, name: e.target.value })}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #D1D5DB',
        marginBottom: '10px',
        outline: 'none',
        fontSize: '14px'
      }}
      onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
      onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
    />

    <textarea
      placeholder="Project Description"
      value={quickProject.description}
      onChange={(e) => setQuickProject({ ...quickProject, description: e.target.value })}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #D1D5DB',
        marginBottom: '12px',
        outline: 'none',
        fontSize: '14px'
      }}
      onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
      onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
    />

    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        onClick={handleQuickAddProject}
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#3B82F6',
          color: 'white',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        Create
      </button>

      <button
        onClick={() => setShowQuickInput(false)}
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid #D1D5DB',
          backgroundColor: '#3B82F6',
          color: '#374151',
          color:'white',
          cursor: 'pointer'
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
      {/* Recent Projects and Activities */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Recent Projects */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>Recent Projects</h3>

          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Project Name</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Progress</th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '14px', fontWeight: '600', color: '#6B7280' }}>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((project) => (
                  <tr key={project._id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '16px 0', fontSize: '14px', color: '#1F2937', fontWeight: '500' }}>{project.name}</td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: `${getStatusColor(project.status)}15`,
                        color: getStatusColor(project.status)
                      }}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '16px 0', width: '150px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '100%',
                          height: '10px',
                          backgroundColor: '#E5E7EB',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          marginRight: '12px'
                        }}>
                          <div style={{
                            width: `${project.completionPercentage}%`,
                            height: '100%',
                            backgroundColor: getProgressBarColor(project.completionPercentage),
                            transition: 'width 0.3s'
                          }}></div>
                        </div>
                        <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>{project.completionPercentage}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 0', fontSize: '14px', color: '#6B7280' }}>
                      {new Date(project.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {projects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                <div style={{ fontSize: '16px', marginBottom: '8px' }}>No projects yet</div>
                <div style={{ fontSize: '14px' }}>Create your first project to get started!</div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px' }}>Recent Activities</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} style={{
                  padding: '12px 0',
                  borderBottom: index < activities.length - 1 ? '1px solid #F3F4F6' : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    fontSize: '20px',
                    minWidth: '24px',
                    textAlign: 'center'
                  }}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', color: '#1F2937', marginBottom: '4px' }}>
                      {activity.description}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📝</div>
                <div style={{ fontSize: '14px' }}>No recent activities</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px' }}>Notifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((notification, index) => (
              <div key={index} style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: notification.type === 'success' ? '#D1FAE5' :
                  notification.type === 'warning' ? '#FEF3C7' :
                    notification.type === 'error' ? '#FEE2E2' : '#EBF8FF',
                borderLeft: `4px solid ${notification.type === 'success' ? '#10B981' :
                  notification.type === 'warning' ? '#F59E0B' :
                    notification.type === 'error' ? '#EF4444' : '#3B82F6'
                  }`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  fontSize: '20px',
                  color: notification.type === 'success' ? '#10B981' :
                    notification.type === 'warning' ? '#F59E0B' :
                      notification.type === 'error' ? '#EF4444' : '#3B82F6'
                }}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                    {notification.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>
                    {notification.message}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* New Project Modal */}
      {showNewProjectModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            animation: 'slideUp 0.3s'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1F2937' }}>Create New Project</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '500' }}>Project Name</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter project name"
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '500' }}>Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  minHeight: '120px',
                  resize: 'vertical',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter project description"
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowNewProjectModal(false);
                  setNewProject({ name: '', description: '' });
                  setError('');
                }}
                style={{
                  padding: '12px 24px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={submitting}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: submitting ? '#9CA3AF' : '#3B82F6',
                  color: 'white',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {submitting ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Creating...
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showMessageModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            animation: 'slideUp 0.3s'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1F2937' }}>Send Message</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '500' }}>Subject</label>
              <input
                type="text"
                value={message.subject}
                onChange={(e) => setMessage({ ...message, subject: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter message subject"
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '500' }}>Message</label>
              <textarea
                value={message.content}
                onChange={(e) => setMessage({ ...message, content: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  minHeight: '150px',
                  resize: 'vertical',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your message"
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessage({ subject: '', content: '' });
                  setError('');
                }}
                style={{
                  padding: '12px 24px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={submitting}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: submitting ? '#9CA3AF' : '#3B82F6',
                  color: 'white',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {submitting ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Report Modal */}
      {showReportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            animation: 'slideUp 0.3s'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1F2937' }}>Create Report</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '500' }}>Report Title</label>
              <input
                type="text"
                value={report.title}
                onChange={(e) => setReport({ ...report, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter report title"
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '500' }}>Report Content</label>
              <textarea
                value={report.content}
                onChange={(e) => setReport({ ...report, content: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  minHeight: '150px',
                  resize: 'vertical',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter report content"
                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReport({ title: '', content: '' });
                  setError('');
                }}
                style={{
                  padding: '12px 24px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReport}
                disabled={submitting}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: submitting ? '#9CA3AF' : '#3B82F6',
                  color: 'white',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {submitting ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Creating...
                  </>
                ) : (
                  'Create Report'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        button:hover div {
          opacity: 0.1;
        }
        
        tr:hover {
          background-color: #F9FAFB;
        }
        
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))"] {
            grid-template-columns: 1fr;
          }
          
          div[style*="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))"] {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </SimpleDashboardLayout>
  );
}