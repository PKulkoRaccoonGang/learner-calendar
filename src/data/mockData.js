const startDate = new Date(2023, 8, 15); // September 15, 2023

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateUnits = (courseStart, courseEnd, courseName) => {
  const units = [];
  const weekDuration = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks = Math.ceil((courseEnd - courseStart) / weekDuration);

  for (let i = 1; i <= totalWeeks; i++) {
    const unitStart = new Date(courseStart.getTime() + (i - 1) * weekDuration);
    const unitEnd = new Date(unitStart.getTime() + weekDuration);

    units.push({
      id: `${courseName}-unit-${i}`,
      title: `Unit ${i}`,
      type: 'unit',
      startDate: unitStart,
      endDate: unitEnd,
      courseName: courseName,
      link: `/course/${courseName}/unit/${i}`,
      isOverdue: unitEnd < new Date()
    });
  }

  return units;
};

const generateAssignments = (courseStart, courseEnd, courseName) => {
  const assignments = [];
  const numAssignments = Math.floor(Math.random() * 5) + 3;

  for (let i = 1; i <= numAssignments; i++) {
    const assignmentDate = generateRandomDate(courseStart, courseEnd);
    const dueDate = new Date(assignmentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    assignments.push({
      id: `${courseName}-assignment-${i}`,
      title: `Homework Assignment ${i}`,
      type: 'assignment',
      startDate: assignmentDate,
      endDate: dueDate,
      courseName: courseName,
      link: `/course/${courseName}/assignment/${i}`,
      isOverdue: dueDate < new Date()
    });
  }

  return assignments;
};

const generateExams = (courseStart, courseEnd, courseName) => {
  const exams = [];
  const numExams = Math.floor(Math.random() * 3) + 1;

  for (let i = 1; i <= numExams; i++) {
    const examDate = generateRandomDate(courseStart, courseEnd);
    const examEndDate = new Date(examDate.getTime() + 2 * 60 * 60 * 1000);

    exams.push({
      id: `${courseName}-exam-${i}`,
      title: `Exam ${i}`,
      type: 'exam',
      startDate: examDate,
      endDate: examEndDate,
      courseName: courseName,
      link: `/course/${courseName}/exam/${i}`,
      isOverdue: examEndDate < new Date()
    });
  }

  return exams;
};

export const courses = [
  {
    id: 'web-development',
    name: 'Web Development Fundamentals',
    title: 'Web Development Fundamentals',
    startDate: startDate,
    endDate: new Date(startDate.getTime() + 16 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#28a745',
    instructor: 'Dr. Sarah Johnson',
    description: 'Introduction to HTML, CSS, and JavaScript for building modern websites'
  },
  {
    id: 'data-science',
    name: 'Data Science and Analytics',
    title: 'Data Science and Analytics',
    startDate: new Date(startDate.getTime() + 4 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(startDate.getTime() + 20 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#17a2b8',
    instructor: 'Prof. Michael Chen',
    description: 'Statistical analysis, machine learning, and data visualization techniques'
  },
  {
    id: 'mobile-apps',
    name: 'Mobile App Development',
    title: 'Mobile App Development',
    startDate: new Date(startDate.getTime() + 8 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(startDate.getTime() + 24 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#20c997',
    instructor: 'Alex Rodriguez',
    description: 'Building iOS and Android applications using React Native and Flutter'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Essentials',
    title: 'Cybersecurity Essentials',
    startDate: new Date(startDate.getTime() + 12 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(startDate.getTime() + 28 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#e83e8c',
    instructor: 'Dr. Emily Watson',
    description: 'Network security, ethical hacking, and digital forensics fundamentals'
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Machine Learning',
    title: 'Artificial Intelligence & Machine Learning',
    startDate: new Date(startDate.getTime() + 16 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(startDate.getTime() + 32 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#fd7e14',
    instructor: 'Prof. David Kim',
    description: 'Deep learning, neural networks, and AI applications in real-world scenarios'
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing & DevOps',
    title: 'Cloud Computing & DevOps',
    startDate: new Date(startDate.getTime() + 20 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(startDate.getTime() + 36 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#6f42c1',
    instructor: 'Lisa Thompson',
    description: 'AWS, Azure, Docker, Kubernetes, and CI/CD pipeline implementation'
  },
  {
    id: 'database-design',
    name: 'Database Design & Management',
    title: 'Database Design & Management',
    startDate: new Date(startDate.getTime() + 24 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(startDate.getTime() + 40 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#6c757d',
    instructor: 'Dr. Robert Martinez',
    description: 'SQL, NoSQL databases, data modeling, and database administration'
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design Principles',
    title: 'UI/UX Design Principles',
    startDate: new Date(startDate.getTime() + 28 * 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(startDate.getTime() + 44 * 7 * 24 * 60 * 60 * 1000), // 16 weeks
    color: '#dc3545',
    instructor: 'Maria Garcia',
    description: 'User interface design, user experience research, and design thinking methodologies'
  }
];

export const allActivities = (() => {
  const activities = [];

  courses.forEach(course => {
    const units = generateUnits(course.startDate, course.endDate, course.id);
    const assignments = generateAssignments(course.startDate, course.endDate, course.id);
    const exams = generateExams(course.startDate, course.endDate, course.id);

    activities.push(...units, ...assignments, ...exams);
  });

  return activities;
})();

export const getCourseActivities = (courseId) => {
  return allActivities.filter(activity => activity.courseName === courseId);
};

export const getConflicts = () => {
  const conflicts = [];
  const today = new Date();
  const todayActivities = allActivities.filter(activity => {
    const activityDate = new Date(activity.startDate);
    return activityDate.toDateString() === today.toDateString();
  });

  const examsToday = todayActivities.filter(activity => activity.type === 'exam');
  const assignmentsToday = todayActivities.filter(activity => activity.type === 'assignment');

  if (examsToday.length > 1) {
    conflicts.push({
      type: 'multiple_exams',
      message: `Warning! You have ${examsToday.length} exams scheduled today`,
      activities: examsToday
    });
  }

  if (assignmentsToday.length > 3) {
    conflicts.push({
      type: 'many_assignments',
      message: `Warning! You have ${assignmentsToday.length} homework assignments today`,
      activities: assignmentsToday
    });
  }

  return conflicts;
};
