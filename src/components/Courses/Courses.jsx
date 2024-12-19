import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Paper } from '@mui/material';

// Sample data for courses
const courses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn the fundamentals of React, including components, props, and state.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'JavaScript Basics',
    description: 'A comprehensive guide to understanding JavaScript and how to use it effectively.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'CSS and HTML Fundamentals',
    description: 'Master the basics of HTML and CSS to create responsive and styled webpages.',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

// Sample user data
const user = {
  name: 'John Doe',
};

const Courses = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Banner */}
      <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="h6">
          Here's your list of registered courses. Start learning today!
        </Typography>
      </Paper>

      {/* Course Cards */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                alt={course.title}
                height="140"
                image={course.imageUrl}
                title={course.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {course.description}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
