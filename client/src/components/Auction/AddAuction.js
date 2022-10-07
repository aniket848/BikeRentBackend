import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { userContext } from '../../App';

const AddAuction = () => {

  const {state}  = useContext(userContext);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState({});

  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];


  const upload = (e)=>{
     console.log(e.target.files[0].type);
     setImageFile(e.target.files[0]);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (!imgTypes.includes(imageFile.type)) {
      return setError('Please use a valid image');
    }

    const totalmilliSeconds = (itemDuration.current.value*60*60*1000);
    let currentDate = Date.now()+totalmilliSeconds;

    const formData = new FormData();
    formData.append('myFile',imageFile,imageFile.name);
    formData.append('owner',state.userEmail);
    formData.append('title',itemTitle.current.value);
    formData.append('desc',itemDesc.current.value);
    formData.append('curPrice',startPrice.current.value);
    formData.append('duration',currentDate);
     
    closeForm();

    const res = await fetch('/addAuction',{
       method:"POST",
       body:formData
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className="col d-flex justify-content-center my-3" >
        <div onClick={openForm} className="btn btn-outline-secondary mx-2">
          + Auction
        </div>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control type="text" required ref={itemTitle} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Price</Form.Label>
                  <Form.Control type="number" required ref={startPrice} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Duration in hours</Form.Label>
                  <Form.Control type="number" required ref={itemDuration} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seller</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.userEmail}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Image</Form.Label>
                  <Form.Control
                    label="Select Item Image"
                    type="file"
                    onChange ={(e)=>{upload(e)}}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddAuction;