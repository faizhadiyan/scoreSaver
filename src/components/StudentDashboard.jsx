// src/App.jsx
import React, { useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { IoSaveOutline } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';

const StudentDashboard = () => {
  const [students, setStudents] = useState(Array(10).fill({ aspects: { 1: 1, 2: 1, 3: 1, 4: 1 } }));

  const handleInputChange = (studentIndex, aspectIndex, value) => {
    // If the input is empty, remove the aspect score from the student
    const score = value === '' ? undefined : parseInt(value, 10);

    // Check if the score is a valid number and within the range of 1-10
    if (score === undefined || (!isNaN(score) && score >= 1 && score <= 10)) {
      setStudents((prevStudents) =>
        prevStudents.map((student, index) =>
          index === studentIndex
            ? {
                ...student,
                aspects: {
                  ...student.aspects,
                  [aspectIndex]: score,
                },
              }
            : student
        )
      );
    }
  };

  const handleSave = () => {
    const transposedData = Array.from({ length: 4 }, (_, aspectIndex) => {
      const aspects = students.map((student, studentIndex) => ({
        [`mahasiswa_${studentIndex + 1}`]: student.aspects[aspectIndex + 1],
      }));
      return { [`aspek_penilaian_${aspectIndex + 1}`]: aspects };
    });

    const jsonContent = JSON.stringify(transposedData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    saveAs(blob, 'transposed_students_scores.json');
  };

  const renderStudents = () => {
    return students.map((student, index) => (
      <div key={index} style={styles.tableBody}>
        <h4 style={styles.marginX}>
          {' '}
          <AiOutlineUser style={{ marginRight: '8px' }} />
          Mahasiswa {index + 1}
        </h4>
        {Object.keys(student.aspects).map((aspectIndex) => (
          <Form.Group key={aspectIndex} as={Row} style={styles.marginX}>
            <Col sm={10}>
              <Form.Control type="number" style={styles.fontX} value={student.aspects[aspectIndex]} onChange={(e) => handleInputChange(index, aspectIndex, e.target.value)} />
            </Col>
          </Form.Group>
        ))}
      </div>
    ));
  };

  return (
    <div className="StudentDashboard" style={styles.container}>
      <Container>
        <div style={styles.tableHead}>
          <div style={styles.x1}>Aspect 1</div>
          <div style={styles.x1}>Aspect 2</div>
          <div>Aspect 3</div>
          <div>Aspect 4</div>
        </div>
        {renderStudents()}
        <div style={{ margin: '20px 0' }} />
        <Button variant="primary" style={buttonStyle} onClick={handleSave}>
          <IoSaveOutline style={{ marginRight: '4px' }} /> Save
        </Button>
      </Container>
    </div>
  );
};

const styles = {
  tableBody: {
    fontSize: '20px',
    display: 'flex',
    // padding: '20px',
    alignItems: 'center',
    borderBottom: '1px solid #D8D8D8',
    // position: 'relative',
  },
  container: {
    maxWidth: '100%',
  },

  marginX: {
    margin: '20px',
  },

  fontX: {
    fontSize: '20px',
  },

  tableHead: {
    fontSize: '20px',
    display: 'flex',
    margin: '0 0 0 150px',
    justifyContent: 'space-around',
    maxWidth: '40%',
  },

  x1: {
    margin: '0 40px 0 0px',
  },
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 32px',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  fontSize: '20px',
};

export default StudentDashboard;
