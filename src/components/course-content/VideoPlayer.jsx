// components/CourseContent/VideoPlayer.js
import React, { useRef, useState } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';

const VideoPlayer = ({ module, onComplete }) => {
  const videoRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleVideoEnd = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {module.name}
        </Typography>
        <Box mb={2}>
          <video
            ref={videoRef}
            width="100%"
            controls
            onEnded={handleVideoEnd}
            style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <source src={module.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
        {isCompleted && (
          <Button
            variant="contained"
            color="primary"
            onClick={onComplete}
            sx={{ mt: 2 }}
          >
            Complete Module
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
