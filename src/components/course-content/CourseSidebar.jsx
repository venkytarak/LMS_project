// components/CourseContent/CourseSidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Box } from '@mui/material';

const CourseSidebar = ({ modules, currentModule, completedModules, onModuleSelect }) => {
  return (
    <Box sx={{
      borderRight: '1px solid #ddd',
      padding: 2,
     
      width: { xs: '100%', sm: 240, md: 260 },
    
     
       // Adjust width based on screen size
    }}>
      <Typography variant="h6" gutterBottom      
      >
        Course Modules
      </Typography >
      <List sx={{
        height:'100vh',
          overflowY:'scroll'
      }}>
        {modules.map((module) => (
          <React.Fragment key={module.id}>
            <ListItem
              button
              selected={module.id === currentModule}
              onClick={() => onModuleSelect(module.id)}
              sx={{
                backgroundColor: completedModules.includes(module.id)
                  ? 'lightgreen'
                  : module.id === currentModule
                  ? '#f0f0f0'
                  : 'transparent',
              }}
            >
              <ListItemText
                primary={module.name}
                sx={{
                  fontWeight: module.id === currentModule ? 'bold' : 'normal',
                  color: completedModules.includes(module.id) ? 'green' : 'black',
                }}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CourseSidebar;
