import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';
import CourseCalendar from './components/CourseCalendar';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  width: 100%;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  margin-bottom: 30px;
`;

const HeaderContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeaderTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 10px 0 0 0;
`;

const MainContent = styled.main`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const Breadcrumb = styled.div`
  background: white;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BreadcrumbItem = styled.span`
  color: #666;
  font-size: 14px;
`;

const BreadcrumbSeparator = styled.span`
  color: #ccc;
  font-size: 14px;
`;

const BreadcrumbActive = styled.span`
  color: #333;
  font-weight: 600;
  font-size: 14px;
`;

const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCalendar = () => {
    setSelectedCourse(null);
  };

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <HeaderTitle>Learner Calendar</HeaderTitle>
          <HeaderSubtitle>Student Activity Calendar</HeaderSubtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        {selectedCourse && (
          <Breadcrumb>
            <BreadcrumbItem
              style={{ cursor: 'pointer', color: '#007bff' }}
              onClick={handleBackToCalendar}
            >
              Calendar
            </BreadcrumbItem>
            <BreadcrumbSeparator>›</BreadcrumbSeparator>
            <BreadcrumbActive>{selectedCourse.title}</BreadcrumbActive>
          </Breadcrumb>
        )}

        {selectedCourse ? (
          <CourseCalendar
            course={selectedCourse}
            onBack={handleBackToCalendar}
          />
        ) : (
          <Calendar onCourseClick={handleCourseClick} />
        )}
      </MainContent>
    </AppContainer>
  );
};

export default App;