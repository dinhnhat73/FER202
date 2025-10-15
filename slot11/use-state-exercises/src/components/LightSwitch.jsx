// src/components/LightSwitch.jsx
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function LightSwitch() {
  // Khởi tạo state: isLightOn là boolean, giá trị ban đầu là false (tắt)
  const [isLightOn, setIsLightOn] = useState(false);

  // Hàm để đảo ngược trạng thái
  const toggleLight = () => {
    setIsLightOn(prevState => !prevState);
  };

  return (
    <Card style={{ width: '18rem', margin: '20px auto', textAlign: 'center' }}>
      <Card.Body>
        <Card.Title>Công tắc đèn</Card.Title>
        <Card.Text style={{ fontSize: '1.5rem', color: isLightOn ? 'orange' : 'grey' }}>
          Trạng thái: {isLightOn ? 'Bật' : 'Tắt'}
        </Card.Text>
        <Button variant={isLightOn ? "secondary" : "primary"} onClick={toggleLight}>
          {isLightOn ? 'Tắt đèn' : 'Bật đèn'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LightSwitch;