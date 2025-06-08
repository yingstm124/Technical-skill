import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { AssignmentsApi } from '../services/assignments.service';
import type { AssignmentResponseDTO } from '../DTOs';
import { useFetch } from '../hooks/useFetch';
import { Link as RouterLink } from 'react-router-dom';

const assignmentsApi = new AssignmentsApi();

const AssignmentsPage: React.FC = () => {
  const { data: assignments, loading, error, refetch: fetchAssignment } = useFetch<AssignmentResponseDTO[]>(
    async () => {
      const rawAssignments = await assignmentsApi.getAssignments();
      return rawAssignments.map(assignment => ({
        ...assignment,
        multipleChoiceOptions: assignment.multipleChoiceOptions || [],
      }));
    },
    {
      retryOnFailure: true,
      retryDelay: 3000,
    }
  );

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) {
      return;
    }
    try {
      await assignmentsApi.deleteAssignment(id);
      fetchAssignment();
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  useEffect(() => {
    fetchAssignment()
  },[])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading assignments...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error: {error}</Typography>
        <Button onClick={() => fetchAssignment()} sx={{ mt: 2 }}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Button
        variant="contained"
        startIcon={<Add />}
        component={RouterLink}
        to="/assignments/new"
        sx={{ 
          mb: 3, 
          backgroundColor: 'green', 
          color: 'white',
          '&:hover': { backgroundColor: 'darkgreen' },
        }}
      >
        เพิ่มข้อสอบ
      </Button>

      {assignments && assignments.length > 0 ? (
        <List sx={{ width: '100%' }}>
          {assignments.map((assignment, index) => (
            <Paper key={assignment.id} elevation={2} sx={{ mb: 2, p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box flexGrow={1} mr={1}>
                  <Typography variant="h6" component="div">
                    {`${index + 1}. ${assignment.title}`}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ 
                      backgroundColor: 'red',
                      color: 'white',
                      '&:hover': { backgroundColor: 'darkred' }
                    }}
                    startIcon={<Delete />}
                    onClick={() => handleDelete(assignment.id)}
                    size="small"
                  >
                    ลบ
                  </Button>
                </Box>
              </Box>

              {assignment.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                  {assignment.description}
                </Typography>
              )}
              
              {assignment.multipleChoiceOptions && assignment.multipleChoiceOptions.length > 0 && (
                <FormControl component="fieldset" sx={{ mt: 1, width: '100%' }}>
                  <RadioGroup
                    aria-label={`options for ${assignment.title}`}
                    name={`radio-buttons-group-${assignment.id}`}
                    value={assignment.multipleChoiceOptions.find(opt => opt.isCorrect)?.id.toString() || ''}
                  >
                    {assignment.multipleChoiceOptions.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.id.toString()}
                        control={
                          <Radio 
                            size="small" 
                            sx={{
                              '&.Mui-checked': {
                                color: 'success.main',
                              },
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <span>{option.text}</span>
                            {option.isCorrect && (
                              <Typography 
                                variant="caption" 
                                color="success.main"
                                sx={{ ml: 1, fontWeight: 'bold' }}
                              >
                                (Correct Answer)
                              </Typography>
                            )}
                          </Box>
                        }
                        sx={{
                          backgroundColor: option.isCorrect ? 'rgba(0, 200, 0, 0.08)' : 'transparent',
                          borderRadius: 1,
                          pr: 1,
                          mb: 0.5
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </Paper>
          ))}
        </List>
      ) : (
        <Typography sx={{ textAlign: 'center', mt: 3 }}>
          No assignments found. Click "เพิ่มข้อสอบ" to add one.
        </Typography>
      )}
    </Box>
  );
};

export default AssignmentsPage;
