// components/CourseContent/CourseContent.js
import React, { useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import CourseSidebar from './CourseSidebar';
import VideoPlayer from './VideoPlayer';

const CourseContent = () => {
  const modules = [
    { id: 1, name: 'Module 1: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 2, name: 'Module 2: React Components', videoUrl: 'https://example.com/video2' },
    { id: 3, name: 'Module 3: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 4, name: 'Module 4: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 5, name: 'Module 5: React Components', videoUrl: 'https://example.com/video2' },
    { id: 6, name: 'Module 6: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 7, name: 'Module 7: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 8, name: 'Module 8: React Components', videoUrl: 'https://example.com/video2' },
    { id: 9, name: 'Module 9: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 1, name: 'Module 1: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 2, name: 'Module 2: React Components', videoUrl: 'https://example.com/video2' },
    { id: 3, name: 'Module 3: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 4, name: 'Module 4: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 5, name: 'Module 5: React Components', videoUrl: 'https://example.com/video2' },
    { id: 6, name: 'Module 6: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 7, name: 'Module 7: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 8, name: 'Module 8: React Components', videoUrl: 'https://example.com/video2' },
    { id: 9, name: 'Module 9: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 1, name: 'Module 1: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 2, name: 'Module 2: React Components', videoUrl: 'https://example.com/video2' },
    { id: 3, name: 'Module 3: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 4, name: 'Module 4: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 5, name: 'Module 5: React Components', videoUrl: 'https://example.com/video2' },
    { id: 6, name: 'Module 6: React Hooks', videoUrl: 'https://example.com/video3' },
    { id: 7, name: 'Module 7: Introduction to React', videoUrl: 'https://youtu.be/QFaFIcGhPoM?si=iq7Q8tblUzLzzwVc' },
    { id: 8, name: 'Module 8: React Components', videoUrl: 'https://example.com/video2' },
    { id: 9, name: 'Module 9: React Hooks', videoUrl: 'https://example.com/video3' },
  ];

  const [currentModule, setCurrentModule] = useState(1);
  const [completedModules, setCompletedModules] = useState([]);

  const handleModuleCompletion = (moduleId) => {
    setCompletedModules([...completedModules, moduleId]);
    if (moduleId < modules.length) {
      setCurrentModule(moduleId + 1);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box my={4}>
        <Typography variant="h4" gutterBottom align="center">
          Course Content
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <CourseSidebar
              modules={modules}
              currentModule={currentModule}
              completedModules={completedModules}
              onModuleSelect={setCurrentModule}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <VideoPlayer
              module={modules[currentModule - 1]}
              onComplete={() => handleModuleCompletion(currentModule)}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CourseContent;
