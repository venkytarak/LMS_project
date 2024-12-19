import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]); // List of courses
  const [open, setOpen] = useState(false); // Dialog state
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [modules, setModules] = useState([{ moduleName: '', videoLink: '' }]);
  const [imageUrl, setImageUrl] = useState(''); // Image URL input

  // Fetch courses from the database
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Open dialog
  const handleOpen = () => setOpen(true);

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setCourseName('');
    setDescription('');
    setPrice('');
    setModules([{ moduleName: '', videoLink: '' }]);
    setImageUrl(''); // Reset image URL
  };

  // Add a new module
  const handleAddModule = () => {
    setModules([...modules, { moduleName: '', videoLink: '' }]);
  };

  // Remove a module
  const handleRemoveModule = (index) => {
    const updatedModules = modules.filter((_, idx) => idx !== index);
    setModules(updatedModules);
  };

  // Handle module field changes
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  // Save course to database
  const handleSaveCourse = async () => {
    // Validation checks
    if (!courseName || !description || !price || modules.length === 0) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', courseName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('modules', JSON.stringify(modules));
      formData.append('imageUrl', imageUrl); // Use image URL here

      // Debugging: Log FormData content
      console.log('FormData Content:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
 
      const response = await axios.post(
        'http://localhost:5000/api/courses/create',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setCourses([...courses, response.data]); // Add the new course to the list
      handleClose();
    } catch (error) {
      console.error('Error saving course:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Course
      </Button>
      <Box mt={3} display="flex" flexWrap="wrap" gap={2}>
      {courses.map((course) => (
  <Card key={course._id} style={{ width: 300 }}>
    <CardContent>
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.name}
          style={{ width: '100%', height: 150, objectFit: 'cover' }}
        />
      )}
      <Typography variant="h6">{course.name}</Typography>
      <Typography variant="subtitle1">{course.description}</Typography>
      <Typography variant="subtitle2">Price: ${course.price}</Typography>
      <Typography variant="subtitle1">Modules:</Typography>
      {course.modules && course.modules.length > 0 ? (
        course.modules.map((module, idx) => (
          <Typography key={idx}>
            {module.moduleName} - <a href={module.videoLink}>Video</a>
          </Typography>
        ))
      ) : (
        <Typography>No modules available</Typography>
      )}
    </CardContent>
  </Card>
))}
      </Box>

      {/* Create Course Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Course</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
          />

          {/* Image URL Input */}
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            margin="normal"
          />

          {/* Modules */}
          {modules.map((module, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
              <TextField
                label="Module Name"
                value={module.moduleName}
                onChange={(e) =>
                  handleModuleChange(index, 'moduleName', e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Video Link"
                value={module.videoLink}
                onChange={(e) =>
                  handleModuleChange(index, 'videoLink', e.target.value)
                }
                fullWidth
              />
              {modules.length > 1 && (
                <IconButton onClick={() => handleRemoveModule(index)}>
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddModule}
          >
            Add Module
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCourse}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursesPage;
