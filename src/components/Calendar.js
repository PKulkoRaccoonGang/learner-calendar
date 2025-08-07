import React, { useState } from 'react';
import styled from 'styled-components';
import { format, endOfWeek, eachWeekOfInterval } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { courses, allActivities, getConflicts } from '../data/mockData';

const CalendarContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px 0;
  width: 100%;
`;

const CalendarHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ExpandButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin: 10px 0;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ConflictsWarning = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0;
  color: #856404;
  font-size: 14px;
`;

const TimelineContainer = styled.div`
  display: flex;
  overflow-x: auto;
  min-height: 400px;
  width: 100%;
`;

const CoursesColumn = styled.div`
  min-width: 350px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  position: sticky;
  left: 0;
  z-index: 20;
  flex-shrink: 0;
`;

const CourseRow = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e9ecef;
  }
`;

const CourseTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
  line-height: 1.3;
`;

const CourseInstructor = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const TimelineGrid = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1200px;
  flex: 1;
`;

const TimelineHeader = styled.div`
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const YearRow = styled.div`
  display: flex;
  background: #e9ecef;
  padding: 8px 0;
  font-weight: 600;
  font-size: 14px;
  color: #495057;
`;

const MonthRow = styled.div`
  display: flex;
  background: #f8f9fa;
  padding: 8px 0;
  font-weight: 600;
  font-size: 12px;
  color: #666;
`;

const WeekRow = styled.div`
  display: flex;
  background: #fff;
  padding: 6px 0;
  font-size: 11px;
  color: #999;
  border-bottom: 1px solid #e9ecef;
`;

const TimelineCell = styled.div`
  min-width: 80px;
  text-align: center;
  padding: 4px 6px;
  border-right: 1px solid #f0f0f0;
  font-size: 11px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimelineRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e9ecef;
  min-height: 60px;
  align-items: center;
`;

const TimelineBar = styled.div`
  height: 8px;
  background: ${props => props.color};
  border-radius: 4px;
  margin: 0 2px;
  position: relative;
  cursor: pointer;
  transition: height 0.3s;

  &:hover {
    height: 12px;
  }
`;

const ActivityBar = styled.div`
  height: 6px;
  background: ${props => {
    if (props.isOverdue) return '#f44336';
    switch (props.type) {
      case 'unit': return '#4caf50';
      case 'assignment': return '#ff9800';
      case 'exam': return '#9c27b0';
      default: return '#2196f3';
    }
  }};
  border-radius: 3px;
  margin: 1px 2px;
  position: relative;
  cursor: pointer;
  transition: height 0.3s;

  &:hover {
    height: 10px;
  }
`;

const Calendar = ({ onCourseClick }) => {
  const [expanded, setExpanded] = useState(false);

  const conflicts = getConflicts();

  // Створюємо тижні для таймлайну
  const startDate = new Date(2024, 0, 1); // 1 січня 2024
  const endDate = new Date(2024, 11, 31); // 31 грудня 2024

  const weeks = eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 1 }
  );

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getWeekInMonth = (date) => {
    const month = date.getMonth();
    const weekInYear = Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    return { month, weekInYear };
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
    <CalendarContainer>
      <CalendarHeader>
        <ExpandButton onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
        </ExpandButton>
      </CalendarHeader>

      {conflicts.length > 0 && (
        <ConflictsWarning>
          {conflicts.map((conflict, index) => (
            <div key={index}>⚠️ {conflict.message}</div>
          ))}
        </ConflictsWarning>
      )}

      <TimelineContainer>
        <CoursesColumn>
          <div style={{ padding: '15px 20px', background: '#e9ecef', borderBottom: '1px solid #dee2e6' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>Courses</h3>
          </div>
          {courses.map(course => (
            <CourseRow key={course.id} onClick={() => onCourseClick(course)}>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseInstructor>{course.instructor}</CourseInstructor>
            </CourseRow>
          ))}
        </CoursesColumn>

        <TimelineGrid>
          <TimelineHeader>
            <YearRow>
              {weeks.map((week, index) => (
                <TimelineCell key={index}>
                  {week.getFullYear()}
                </TimelineCell>
              ))}
            </YearRow>
            <MonthRow>
              {weeks.map((week, index) => {
                const { month } = getWeekInMonth(week);
                return (
                  <TimelineCell key={index}>
                    {months[month]}
                  </TimelineCell>
                );
              })}
            </MonthRow>
            <WeekRow>
              {weeks.map((week, index) => (
                <TimelineCell key={index}>
                  {format(week, 'w', { locale: enUS })}
                </TimelineCell>
              ))}
            </WeekRow>
          </TimelineHeader>

          {courses.map(course => (
            <TimelineRow key={course.id}>
              {weeks.map((week, weekIndex) => {
                const isActive = isCourseActiveInWeek(course, week);
                const weekActivities = getActivitiesForWeek(week, course.id);

                return (
                  <TimelineCell key={weekIndex} style={{ position: 'relative' }}>
                    {!expanded && isActive && (
                      <TimelineBar
                        color={course.color}
                        title={course.title}
                      />
                    )}
                    {expanded && weekActivities.map(activity => (
                      <ActivityBar
                        key={activity.id}
                        type={activity.type}
                        isOverdue={activity.isOverdue}
                        title={activity.title}
                        onClick={() => window.open(activity.link, '_blank')}
                      />
                    ))}
                  </TimelineCell>
                );
              })}
            </TimelineRow>
          ))}
        </TimelineGrid>
      </TimelineContainer>
    </CalendarContainer>
  );
};

export default Calendar;