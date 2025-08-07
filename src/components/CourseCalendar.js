import React, { useState } from 'react';
import styled from 'styled-components';
import { format, startOfWeek, endOfWeek, eachWeekOfInterval, addWeeks, isSameWeek, isSameDay } from 'date-fns';
import { uk } from 'date-fns/locale';
import { getCourseActivities } from '../data/mockData';

const CourseCalendarContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px 0;
`;

const CourseHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.color} 0%, ${props => props.color}dd 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseInfo = styled.div`
  flex: 1;
`;

const CourseTitle = styled.h2`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 8px;
`;

const CourseInstructor = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CourseDescription = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const DescriptionText = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const WeeksContainer = styled.div`
  padding: 20px;
`;

const WeekCard = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const WeekHeader = styled.div`
  background: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WeekTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const WeekDate = styled.span`
  color: #666;
  font-size: 14px;
`;

const WeekContent = styled.div`
  padding: 20px;
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const ActivityCard = styled.div`
  background: ${props => {
    if (props.isOverdue) return '#ffebee';
    switch (props.type) {
      case 'unit': return '#e8f5e8';
      case 'assignment': return '#fff3e0';
      case 'exam': return '#f3e5f5';
      default: return '#e3f2fd';
    }
  }};
  border: 1px solid ${props => {
    if (props.isOverdue) return '#f44336';
    switch (props.type) {
      case 'unit': return '#4caf50';
      case 'assignment': return '#ff9800';
      case 'exam': return '#9c27b0';
      default: return '#2196f3';
    }
  }};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ActivityTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
`;

const ActivityType = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${props => {
    if (props.isOverdue) return '#f44336';
    switch (props.type) {
      case 'unit': return '#4caf50';
      case 'assignment': return '#ff9800';
      case 'exam': return '#9c27b0';
      default: return '#2196f3';
    }
  }};
  color: white;
  margin-bottom: 8px;
`;

const ActivityDate = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const OverdueBadge = styled.span`
  background: #f44336;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
`;

const EmptyWeek = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
`;

const CourseCalendar = ({ course, onBack }) => {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const courseActivities = getCourseActivities(course.id);

  // Групуємо активності по тижнях
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

  // Створюємо всі тижні курсу
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
      case 'unit': return 'Юніт';
      case 'assignment': return 'Завдання';
      case 'exam': return 'Іспит';
      default: return 'Активність';
    }
  };

  return (
    <CourseCalendarContainer>
      <CourseHeader color={course.color}>
        <CourseInfo>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseInstructor>Викладач: {course.instructor}</CourseInstructor>
        </CourseInfo>
        <BackButton onClick={onBack}>
          ← Назад до календаря
        </BackButton>
      </CourseHeader>

      <CourseDescription>
        <DescriptionText>{course.description}</DescriptionText>
      </CourseDescription>

      <WeeksContainer>
        {courseWeeks.map((weekStart, index) => {
          const weekKey = weekStart.toISOString();
          const weekActivities = weeksWithActivities[weekKey]?.activities || [];
          const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

          return (
            <WeekCard key={weekKey}>
              <WeekHeader>
                <WeekTitle>Тиждень {index + 1}</WeekTitle>
                <WeekDate>
                  {format(weekStart, 'dd MMM', { locale: uk })} - {format(weekEnd, 'dd MMM yyyy', { locale: uk })}
                </WeekDate>
              </WeekHeader>

              <WeekContent>
                {weekActivities.length > 0 ? (
                  <ActivityGrid>
                    {weekActivities.map(activity => (
                      <ActivityCard
                        key={activity.id}
                        type={activity.type}
                        isOverdue={activity.isOverdue}
                        onClick={() => handleActivityClick(activity)}
                      >
                        <ActivityType type={activity.type} isOverdue={activity.isOverdue}>
                          {getTypeLabel(activity.type)}
                          {activity.isOverdue && <OverdueBadge>Прострочено</OverdueBadge>}
                        </ActivityType>
                        <ActivityTitle>{activity.title}</ActivityTitle>
                        <ActivityDate>
                          {format(new Date(activity.startDate), 'dd MMM yyyy, HH:mm', { locale: uk })}
                          {activity.type === 'assignment' && (
                            <span> - Дедлайн: {format(new Date(activity.endDate), 'dd MMM yyyy', { locale: uk })}</span>
                          )}
                        </ActivityDate>
                      </ActivityCard>
                    ))}
                  </ActivityGrid>
                ) : (
                  <EmptyWeek>
                    Цього тижня немає запланованих активностей
                  </EmptyWeek>
                )}
              </WeekContent>
            </WeekCard>
          );
        })}
      </WeeksContainer>
    </CourseCalendarContainer>
  );
};

export default CourseCalendar;