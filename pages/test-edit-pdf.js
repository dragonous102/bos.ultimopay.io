import { useState } from 'react';
import axios from 'axios';

export default function Form() {
  const [name, setName] = useState('');
  const [signature, setSignature] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('signature', signature);

    try {
      const response = await axios.post('/api/edit-pdf', formData);
      window.open(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Signature:
        <input type="file" onChange={(e) => setSignature(e.target.files[0])} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
