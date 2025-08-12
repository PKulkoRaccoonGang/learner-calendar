import React, { useState, useMemo } from 'react';
import '../styles/Calendar.scss';
import { format, endOfWeek, eachWeekOfInterval } from 'date-fns';
import { uk } from 'date-fns/locale';
import { courses, allActivities, getConflicts } from '../data/mockData';
import YearSelector from './YearSelector';



const Calendar = ({ onCourseClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const conflicts = getConflicts();

  // Calculate available years from courses data
  const availableYears = useMemo(() => {
    const years = new Set();
    courses.forEach(course => {
      const startYear = new Date(course.startDate).getFullYear();
      const endYear = new Date(course.endDate).getFullYear();
      for (let year = startYear; year <= endYear; year++) {
        years.add(year);
      }
    });
    return Array.from(years).sort();
  }, []);

  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);

  const weeks = eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 1 }
  );

  const months = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  const getWeekInMonth = (date) => {
    const month = date.getMonth();
    return { month };
  };

  const isCourseActiveInWeek = (course, weekStart) => {
    const courseStart = new Date(course.startDate);
    const courseEnd = new Date(course.endDate);
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    return weekStart <= courseEnd && weekEnd >= courseStart;
  };

  const getActivitiesForWeek = (weekStart, courseId) => {
    if (!expanded) return [];

    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    return allActivities.filter(activity =>
      activity.courseName === courseId &&
      new Date(activity.startDate) >= weekStart &&
      new Date(activity.startDate) <= weekEnd
    );
  };

  return (
    <div className="calendar-container">
      <YearSelector
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        availableYears={availableYears}
      />

      <div className="calendar-header">
        <button className="expand-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Згорнути' : 'Розгорнути'}
        </button>
      </div>

      {conflicts.length > 0 && (
        <div className="conflicts-warning">
          {conflicts.map((conflict, index) => (
            <div key={index}>⚠️ {conflict.message}</div>
          ))}
        </div>
      )}

      <div className="timeline-container">
        <div className="courses-column">
          <div className="courses-header">
            <h3>Курси</h3>
          </div>
          {courses.map(course => (
            <div key={course.id} className="course-row" onClick={() => onCourseClick(course)}>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-instructor">{course.instructor}</p>
            </div>
          ))}
        </div>

        <div className="timeline-grid">
          <div className="timeline-header">
            <div className="month-row">
              {weeks.map((week, index) => {
                const { month } = getWeekInMonth(week);
                return (
                  <div key={index} className="timeline-cell">
                    {months[month]}
                  </div>
                );
              })}
            </div>
            <div className="week-row">
              {weeks.map((week, index) => (
                <div key={index} className="timeline-cell">
                  {format(week, 'w', { locale: uk })}
                </div>
              ))}
            </div>
          </div>

          {courses.map(course => (
            <div key={course.id} className="timeline-row">
              {weeks.map((week, weekIndex) => {
                const isActive = isCourseActiveInWeek(course, week);
                const weekActivities = getActivitiesForWeek(week, course.id);

                return (
                  <div key={weekIndex} className="timeline-cell" style={{ position: 'relative' }}>
                    {!expanded && isActive && (
                      <div
                        className="timeline-bar"
                        style={{ background: course.color }}
                        title={course.title}
                      />
                    )}
                    {expanded && weekActivities.map(activity => {
                      const activityClass = activity.isOverdue ? 'overdue' : activity.type;
                      return (
                        <div
                          key={activity.id}
                          className={`activity-bar ${activityClass}`}
                          title={activity.title}
                          onClick={() => window.open(activity.link, '_blank')}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
