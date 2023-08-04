// src/App.jsx
import React, { useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { saveAs } from 'file-saver';

const StudentDashboard = () => {
  const [students, setStudents] = useState(Array(10).fill({ aspects: { 1: 1, 2: 1, 3: 1, 4: 1 } }));

  const handleInputChange = (studentIndex, aspectIndex, value) => {
    setStudents((prevStudents) => prevStudents.map((student, index) => (index === studentIndex ? { ...student, aspects: { ...student.aspects, [aspectIndex]: value } } : student)));
  };

  const handleSave = () => {
    // Transpose the aspects to convert row-based to column-based and vice versa
    // const transposedStudents = Array.from({ length: 4 }, (_, aspectIndex) => ({
    //   aspects: students.map((student) => student.aspects[aspectIndex + 1]),
    // }));

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
        <h4>Mahasiswa {index + 1}</h4>
        {Object.keys(student.aspects).map((aspectIndex) => (
          <Form.Group key={aspectIndex} as={Row}>
            <Form.Label column sm={2}>
              Aspect {aspectIndex}:
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={student.aspects[aspectIndex]} onChange={(e) => handleInputChange(index, aspectIndex, e.target.value)} />
            </Col>
          </Form.Group>
        ))}
      </div>
    ));
  };

  return (
    <div className="StudentDashboard">
      <Container>
        {renderStudents()}
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Container>
    </div>
  );
};

const styles = {
  tableBody: {
    display: 'flex',
    padding: '16px',
    alignItems: 'center',
    borderBottom: '1px solid #D8D8D8',
    fontSize: '20px',
    position: 'relative',
  },
};

export default StudentDashboard;
