import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export default function AddModel({ show, setShow, text, setText, onSave }) {

    const handleClose = () => setShow(false);
    return <>
        <Modal show={show} onHide={handleClose} centered={true} dialogClassName="w-25 p-3" s>
            <Modal.Header closeButton>
                <Modal.Title>Configure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="email"
                            placeholder="enter some text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>

}
