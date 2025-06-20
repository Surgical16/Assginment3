import React, { useState, useEffect } from "react";
import "./dashboard.css"; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [kanbanTasks, setKanbanTasks] = useState({
    todo: [
      { id: 1, title: "Design new landing page", priority: "high" },
      { id: 2, title: "Update user documentation", priority: "medium" },
    ],
    inProgress: [
      { id: 3, title: "Implement payment system", priority: "high" },
      { id: 4, title: "Fix mobile responsive issues", priority: "low" },
    ],
    done: [
      { id: 5, title: "Setup CI/CD pipeline", priority: "medium" },
      { id: 6, title: "Database optimization", priority: "high" },
    ],
  });

  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 30000 },
    { month: "Apr", revenue: 61000, expenses: 38000 },
    { month: "May", revenue: 55000, expenses: 34000 },
    { month: "Jun", revenue: 67000, expenses: 42000 },
  ];

  const pieData = [
    { name: "Product Sales", value: 35, color: "#3b82f6" },    // Jan (Revenue blue)
    { name: "Services", value: 25, color: "#6366f1" },         // Feb (custom purple)
    { name: "Subscriptions", value: 25, color: "#f59e42" },    // Mar (custom orange)
    { name: "Other", value: 15, color: "#ef4444" },            // Apr (Expenses red)
  ];

  const customers = [
    {
      id: 1,
      name: "Devansh Verma",
      email: "Devansh@Celebel.com",
      status: "Active",
      orders: 12,
    },
    {
      id: 2,
      name: "Diksha Shrivastva",
      email: "Diksha@Celebel.com",
      status: "Inactive",
      orders: 12,
    },
    {
      id: 3,
      name: "Kartik Begani",
      email: "Kartik@celebel.com",
      status: "Active",
      orders: 5,
    },
    {
      id: 4,
      name: "Chetanya Arora",
      email: "Chetanya@celebel.com",
      status: "Active",
      orders: 31,
    },
  ];

  function BarWithTooltip({ value, max, colorClass, label }) {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        className={`bar ${colorClass}`}
        style={{ height: `${(value / max) * 100}%`, position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <div className="bar-tooltip">
            {label}: {value.toLocaleString()}
          </div>
        )}
      </div>
    );
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const KanbanCard = ({ task }) => (
    <div className={`kanban-card`} title={`Priority: ${task.priority}`}>
      <div className="kanban-card-header">
        <h4 className="kanban-card-title">{task.title}</h4>
        <span className="kanban-card-more">⋯</span>
      </div>
      <span
        className={`priority-badge ${
          task.priority === "high"
            ? "priority-high"
            : task.priority === "medium"
            ? "priority-medium"
            : "priority-low"
        }`}
      >
        {task.priority}
      </span>
    </div>
  );

  const CalendarView = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""}`}
          title={isToday ? "Today" : undefined}
        >
          {day}
        </div>
      );
    }

    return (
      <div className={`chart-container calendar-container`}>
        <div className="calendar-header">
          <h3>
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <div className="calendar-controls">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1
                  )
                )
              }
              aria-label="Previous Month"
              className="calendar-btn"
            >
              ◀️
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                  )
                )
              }
              aria-label="Next Month"
              className="calendar-btn"
            >
              ▶️
            </button>
          </div>
        </div>
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">{days}</div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="stats-grid">
              {[
                {
                  title: "Total Revenue",
                  value: "$63,448",
                  change: "+12% from last month",
                  changeClass: "text-green",
                  icon: "📈",
                  iconClass: "card-icon text-green",
                },
                {
                  title: "Customers",
                  value: "39,354",
                  change: "-4% from last month",
                  changeClass: "text-red",
                  icon: "👥",
                  iconClass: "card-icon text-blue",
                },
                {
                  title: "Products",
                  value: "4,396",
                  change: "+23% from last month",
                  changeClass: "text-green",
                  icon: "📦",
                  iconClass: "card-icon text-purple",
                },
                {
                  title: "Sales",
                  value: "423,39",
                  change: "+38% from last month",
                  changeClass: "text-green",
                  icon: "📈",
                  iconClass: "card-icon text-orange",
                },
              ].map(
                ({ title, value, change, changeClass, icon, iconClass }) => (
                  <div key={title} className="card">
                    <div className="card-info">
                      <p>{title}</p>
                      <p>{value}</p>
                      <p className={changeClass}>{change}</p>
                    </div>
                    <span className={iconClass} role="img" aria-label={title}>
                      {icon}
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="chart-container">
              <h3>Revenue vs Expenses</h3>
              <div className="bar-chart">
                {revenueData.map((item, index) => (
                  <div key={index} className="bar-group">
                    <BarWithTooltip
                      value={item.revenue}
                      max={70000}
                      colorClass="revenue"
                      label="Revenue"
                    />
                    <BarWithTooltip
                      value={item.expenses}
                      max={70000}
                      colorClass="expenses"
                      label="Expenses"
                    />
                    <span className="bar-label">{item.month}</span>
                  </div>
                ))}
              </div>
              <div className="legend">
                <div className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: "#3b82f6" }}
                  ></div>
                  <span>Revenue</span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: "#ef4444" }}
                  ></div>
                  <span>Expenses</span>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <h3>Revenue Breakdown</h3>
              <div className="donut-chart-block">
                <div className="donut-chart">
                  <svg width="220" height="220" viewBox="0 0 220 220">
                    {(() => {
                      let cumulative = 0;
                      return pieData.map((item, i) => {
                        const radius = 90;
                        const circumference = 2 * Math.PI * radius;
                        const value = item.value / 100;
                        const dash = value * circumference;
                        const gap = circumference - dash;
                        const rotate = (cumulative / 100) * 360;
                        cumulative += item.value;
                        return (
                          <circle
                            key={item.name}
                            r={radius}
                            cx="110"
                            cy="110"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="32"
                            strokeDasharray={`${dash} ${gap}`}
                            strokeDashoffset="0"
                            style={{
                              transform: `rotate(-90deg) rotate(${rotate}deg)`,
                              transformOrigin: "50% 50%",
                              transition: "stroke-dasharray 0.5s",
                            }}
                          />
                        );
                      });
                    })()}
                    <circle r="70" cx="110" cy="110" fill="#fff" />
                    <text
                      x="110"
                      y="110"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="2.5rem"
                      fontWeight="bold"
                      fill="#111827"
                    >
                      100%
                    </text>
                    <text
                      x="110"
                      y="140"
                      textAnchor="middle"
                      fontSize="1.1rem"
                      fill="#6b7280"
                    >
                      Total
                    </text>
                  </svg>
                </div>
                <div className="donut-legend">
                  {pieData.map((item) => (
                    <div className="donut-legend-item" key={item.name}>
                      <span
                        className="donut-legend-color"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span>
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case "customers":
        return (
          <div className="chart-container table-container">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    {["Name", "Email", "Status", "Orders"].map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            customer.status === "Active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td>{customer.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "calendar":
        return <CalendarView />;

      case "kanban":
        return (
          <>
            <div className="kanban-header">
              <h3>Project Board</h3>
              
            </div>
            <div className="kanban">
              {Object.entries(kanbanTasks).map(([column, tasks]) => (
                <div key={column} className="kanban-column">
                  <h4>
                    {column.replace(/([A-Z])/g, " $1").trim()} ({tasks.length})
                  </h4>
                  {tasks.map((task) => (
                    <KanbanCard key={task.id} task={task} />
                  ))}
                </div>
              ))}
            </div>
          </>
        );

      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* Sidebar Toggle Button for mobile */}
      <button
        className="sidebar-toggle-btn"
        aria-label="Open Sidebar"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-header">CeleShop</div>
        <nav className="sidebar-nav">
          {[
            { id: "dashboard", label: "Dashboard", icon: "📈" },
            { id: "customers", label: "Customers", icon: "👥" },
            { id: "calendar", label: "Calendar", icon: "📅" },
            { id: "kanban", label: "Kanban", icon: "📦" },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false); 
              }}
              className={activeTab === id ? "active" : ""}
              aria-current={activeTab === id ? "page" : undefined}
            >
              <span className="icon" aria-hidden="true">
                {icon}
              </span>
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <div className="user-avatar" title="User Avatar">
            CS
          </div>
        </div>
        {/* Close button for mobile */}
        <button
          className="sidebar-close-btn"
          aria-label="Close Sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          ×
        </button>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h2>{activeTab === "dashboard" ? "Dashboard" : activeTab}</h2>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
