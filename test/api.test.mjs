import { expect } from 'chai';
import axios from 'axios';

describe('API Tests', () => {
  let newNoteId;
  it('should create a new note', async () => {
    const res = await axios.post('http://localhost:4000/api/v1/createNote', {
      title: 'Test Note',
      content: 'This is a test note.',
    });

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
    expect(res.data.data.title).to.equal('Test Note');
    newNoteId = res.data.data._id;
  });

  it('should handle failed note creation', async () => {
    try {
      // Sending invalid data to intentionally cause a failure
      const res = await axios.post('http://localhost:4000/api/v1/createNote', {
        invalidField: 'Invalid Data',
      });
  
      // The following assertions are not expected to pass
      expect(res.status).to.equal(200);
      expect(res.data.success).to.be.true;
    } catch (error) {
      console.error('Error during test:', error.message);

      // Assertions for the error response
      expect(error.response.status).to.equal(400);
      expect(error.response.data.success).to.be.false;
      expect(error.response.data.message).to.equal('Title and content are required fields.');
    }
  });

  it('should get all notes', async () => {
    const res = await axios.get('http://localhost:4000/api/v1/getNotes');

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
  });

  it('should get a note by ID', async () => {
    // Retrieve the note with the retrieved ObjectId
    const res = await axios.get(`http://localhost:4000/api/v1/getNotes/${newNoteId}`);

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
    expect(res.data.data._id).to.equal(newNoteId);
  });

  it('should handle failed note retrieval', async () => {
    try {
      const invalidId = 'invalid_id_format';
      const res = await axios.get(`http://localhost:4000/api/v1/getNotes/${invalidId}`);
      
      // The following assertions are not expected to pass
      expect(res.status).to.equal(200);
      expect(res.data.success).to.be.true;
    } catch (error) {
      console.error('Error during test:', error.message);

      // Assertions for the error response
      expect(error.response.status).to.equal(400);
      expect(error.response.data.success).to.be.false;
      expect(error.response.data.message).to.equal('Invalid ID format');
    }
  });

  it('should update a note', async () => {
    // Assume noteId is a valid ID of an existing note
    const res = await axios.put(`http://localhost:4000/api/v1/updateNote/${newNoteId}`, {
      title: 'Updated Note',
      content: 'This is an updated note.',
    });

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
    expect(res.data.data.title).to.equal('Updated Note');
  });

  it('should fail to update a note with invalid data', async () => {
    try {
      // Attempt to update a note with invalid data
      const res = await axios.put(`http://localhost:4000/api/v1/updateNote/${newNoteId}`, {
        invalidField: 'Invalid Data',
      });

      // The following assertions are not expected to pass
      expect(res.status).to.equal(200);
      expect(res.data.success).to.be.true;
    } catch (error) {
      console.error('Error during test:', error.message);

      // Assertions for the error response
      expect(error.response.status).to.equal(400);
      expect(error.response.data.success).to.be.false;
      expect(error.response.data.message).to.equal('Title and content are required fields.');
    }
  });

  it('should fail to update a note with an invalid ID', async () => {
    try {
      // Attempt to update a note with an invalid ID format
      const invalidId = 'invalid_id_format';
      const res = await axios.put(`http://localhost:4000/api/v1/updateNote/${invalidId}`, {
        title: 'Updated Note',
        content: 'This is an updated note.',
      });
  
      // The following assertions are not expected to pass
      expect(res.status).to.equal(200);
      expect(res.data.success).to.be.true;
    } catch (error) {
      console.error('Error during test:', error.message);
  
      // Assertions for the error response
      expect(error.response.status).to.equal(400);
      expect(error.response.data.success).to.be.false;
      expect(error.response.data.message).to.equal('Invalid ID format');
    }
  });
  

  it('should delete a note', async () => {
    // Assume noteId is a valid ID of an existing note
    const res = await axios.delete(`http://localhost:4000/api/v1/deleteNote/${newNoteId}`);

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
  });

  it('should fail to delete a note with invalid ID', async () => {
    try {
      // Attempt to delete a note with an invalid ID format
      const invalidId = 'invalid_id_format';
      const res = await axios.delete(`http://localhost:4000/api/v1/deleteNote/${invalidId}`);
      
      // The following assertions are not expected to pass
      expect(res.status).to.equal(200);
      expect(res.data.success).to.be.true;
    } catch (error) {
      console.error('Error during test:', error.message);

      // Assertions for the error response
      expect(error.response.status).to.equal(400);
      expect(error.response.data.success).to.be.false;
      expect(error.response.data.message).to.equal('Invalid ID format');
    }
  });
});
