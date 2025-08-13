import React from 'react';
import '../styles/CourseCalendar.scss';
import { format, startOfWeek, endOfWeek, eachWeekOfInterval } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { getCourseActivities } from '../data/mockData';



const CourseCalendar = ({ course, onBack }) => {
  const courseActivities = getCourseActivities(course.id);

  const weeksWithActivities = courseActivities.reduce((weeks, activity) => {
    const weekStart = startOfWeek(new Date(activity.startDate), { weekStartsOn: 1 });
    const weekKey = weekStart.toISOString();

    if (!weeks[weekKey]) {
      weeks[weekKey] = {
        weekStart,
        activities: []
      };
    }

    weeks[weekKey].activities.push(activity);
    return weeks;
  }, {});

  const courseWeeks = eachWeekOfInterval(
    {
      start: new Date(course.startDate),
      end: new Date(course.endDate)
    },
    { weekStartsOn: 1 }
  );

  const handleActivityClick = (activity) => {
    window.open(activity.link, '_blank');
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'unit': return 'Unit';
      case 'assignment': return 'Assignment';
      case 'exam': return 'Exam';
      default: return 'Activity';
    }
  };

  return (
    <div className="course-calendar-container">
      <div
        className="course-header"
        style={{ background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}dd 100%)` }}
      >
        <div className="course-info">
          <h2 className="course-title">{course.title}</h2>
          <p className="course-instructor">Instructor: {course.instructor}</p>
        </div>
        <button className="back-button" onClick={onBack}>
          ← Back to calendar
        </button>
      </div>

      <div className="course-description">
        <p className="description-text">{course.description}</p>
      </div>

      <div className="weeks-container">
        {courseWeeks.map((weekStart, index) => {
          const weekKey = weekStart.toISOString();
          const weekActivities = weeksWithActivities[weekKey]?.activities || [];
          const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

          return (
            <div key={weekKey} className="week-card">
              <div className="week-header">
                <h3 className="week-title">Week {index + 1}</h3>
                <span className="week-date">
                  {format(weekStart, 'dd MMM', { locale: enUS })} - {format(weekEnd, 'dd MMM yyyy', { locale: enUS })}
                </span>
              </div>

              <div className="week-content">
                {weekActivities.length > 0 ? (
                  <div className="activity-grid">
                    {weekActivities.map(activity => {
                      const activityClass = activity.isOverdue ? 'overdue' : activity.type;
                      return (
                        <div
                          key={activity.id}
                          className={`activity-card ${activityClass}`}
                          onClick={() => handleActivityClick(activity)}
                        >
                          <span className={`activity-type ${activityClass}`}>
                            {getTypeLabel(activity.type)}
                            {activity.isOverdue && <span className="overdue-badge">Overdue</span>}
                          </span>
                          <h4 className="activity-title">{activity.title}</h4>
                          <p className="activity-date">
                            {format(new Date(activity.startDate), 'dd MMM yyyy, HH:mm', { locale: enUS })}
                            {activity.type === 'assignment' && (
                              <span> - Deadline: {format(new Date(activity.endDate), 'dd MMM yyyy', { locale: enUS })}</span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-week">
                    No activities scheduled for this week
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCalendar;
