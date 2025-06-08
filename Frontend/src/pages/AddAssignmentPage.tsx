import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AssignmentsApi } from '../services/assignments.service';
import type { AssignmentCreateDTO, MultipleChoiceOptionDTO } from '../DTOs';

interface FormMultipleChoiceOption extends Omit<MultipleChoiceOptionDTO, 'id' | 'assignmentId'> {
  id: string;
  order: number;
}

type FormData = Omit<AssignmentCreateDTO, 'multipleChoiceOptions' | 'correctAnswer'> & {
  multipleChoiceOptions: FormMultipleChoiceOption[];
};

const AddAssignmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      points: 1,
      description: '',
      multipleChoiceOptions: [
        { id: '1', text: '', isCorrect: false, order: 1 },
        { id: '2', text: '', isCorrect: false, order: 2 },
        { id: '3', text: '', isCorrect: false, order: 3 },
        { id: '4', text: '', isCorrect: false, order: 4 }
      ]
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'multipleChoiceOptions'
  });

  const multipleChoiceOptions = watch('multipleChoiceOptions');
  const assignmentsApi = new AssignmentsApi();

  const hasCorrectAnswer = multipleChoiceOptions.some(opt => opt.isCorrect);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    if (!hasCorrectAnswer) {
      return;
    }
    
    try {
      const submissionData: AssignmentCreateDTO = {
        title: formData.title,
        description: formData.description,
        points: formData.points,
        multipleChoiceOptions: formData.multipleChoiceOptions
          .filter(option => option.text.trim() !== '')
          .map((option, index) => ({
            text: option.text,
            isCorrect: option.isCorrect,
            order: index + 1
          }))
      };
      
      await assignmentsApi.createAssignment(submissionData);
      navigate('/assignments');
    } catch (error: unknown) {
      console.error('Error creating assignment:', error);
    }
  };

  const addOption = () => {
    const newOption = { 
      id: Date.now().toString(), 
      text: '', 
      isCorrect: false, 
      order: fields.length + 1 
    };
    append(newOption);
  };

  const removeOption = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const toggleCorrect = (index: number) => {
    const updatedOptions = multipleChoiceOptions.map((option, i) => ({
      ...option,
      isCorrect: i === index
    }));
    
    setValue('multipleChoiceOptions', updatedOptions);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 3, 
          height: '80vh', 
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Controller
            name="title"
            control={control}
            rules={{ 
              required: 'กรุณากรอกชื่อข้อสอบ',
              minLength: {
                value: 3,
                message: 'ชื่อข้อสอบต้องมีความยาวอย่างน้อย 3 ตัวอักษร'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="ชื่อข้อสอบ"
                margin="normal"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title?.message}
                autoFocus
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name="points"
            control={control}
            rules={{ 
              required: 'กรุณาระบุคะแนน',
              min: { value: 1, message: 'คะแนนต้องมีอย่างน้อย 1 คะแนน' },
              max: { value: 100, message: 'คะแนนต้องไม่เกิน 100 คะแนน' }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="คะแนน"
                margin="normal"
                variant="outlined"
                error={!!errors.points}
                helperText={errors.points?.message}
                disabled={isSubmitting}
                sx={{ width: '120px' }}
                inputProps={{ min: 1, max: 100 }}
              />
            )}
          />
        </Box>

        {/* Options Section */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1">
              ตัวเลือกคำตอบ
            </Typography>
            {!hasCorrectAnswer && multipleChoiceOptions.some(opt => opt.text.trim() !== '') && (
              <Typography color="error" variant="caption">
                กรุณาเลือกคำตอบที่ถูกต้อง
              </Typography>
            )}
          </Box>
          
          {fields.map((field, index) => field && (
            <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
              <Controller
                name={`multipleChoiceOptions.${index}.isCorrect`}
                control={control}
                render={({ field: { value } }) => (
                  <Button
                    variant={value ? 'contained' : 'outlined'}
                    color={value ? 'success' : 'inherit'}
                    onClick={() => toggleCorrect(index)}
                    sx={{ 
                      minWidth: 40,
                      height: 40,
                      borderRadius: '50%',
                      p: 0,
                      '&:hover': {
                        bgcolor: value ? 'success.dark' : 'action.hover'
                      }
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </Button>
                )}
              />
              
              <Controller
                name={`multipleChoiceOptions.${index}.text`}
                control={control}
                rules={{
                  required: 'กรุณากรอกตัวเลือก',
                  validate: (value) => {
                    const otherOptions = multipleChoiceOptions.filter((_, i) => i !== index);
                    return !otherOptions.some(opt => opt?.text === value) || 'ตัวเลือกนี้มีอยู่แล้ว';
                  }
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    placeholder={`ตัวเลือก ${String.fromCharCode(65 + index)}`}
                    error={!!error}
                    helperText={error?.message}
                    disabled={isSubmitting}
                  />
                )}
              />
              
              {fields.length > 1 && (
                <IconButton
                  onClick={() => removeOption(index)}
                  color="error"
                  disabled={isSubmitting}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          
          <Button
            onClick={addOption}
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={fields.length >= 10 || isSubmitting}
            sx={{ mt: 1 }}
          >
            เพิ่มตัวเลือก
          </Button>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2, 
          mt: 'auto',
          pt: 2
        }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ minWidth: 120 }}
          >
            {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="/assignments"
            size="large"
            disabled={isSubmitting}
            sx={{ minWidth: 120 }}
          >
            ยกเลิก
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddAssignmentPage;
