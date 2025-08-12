import React, { useState } from 'react';
import './styles/App.scss';
import Calendar from './components/Calendar';
import CourseCalendar from './components/CourseCalendar';



const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCalendar = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Learner Calendar</h1>
          <p className="header-subtitle">Student Activity Calendar</p>
        </div>
      </header>

      <main className="main-content">
        {selectedCourse && (
          <div className="breadcrumb">
            <span
              className="breadcrumb-item clickable"
              onClick={handleBackToCalendar}
            >
              Calendar
            </span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-active">{selectedCourse.title}</span>
          </div>
        )}

        {selectedCourse ? (
          <CourseCalendar
            course={selectedCourse}
            onBack={handleBackToCalendar}
          />
        ) : (
          <Calendar onCourseClick={handleCourseClick} />
        )}
      </main>
    </div>
  );
};

export default App;
