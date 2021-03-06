import { useState } from 'react';
import env from '../env';
import { useAlert } from 'react-alert';
import LoadingButton from '../loading-button';

const AddStudent = () => {
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  async function addStudent() {
    setLoading(true);
    const data = { name, email };
    let type = 'success';
    const req = await fetch(`${env}students/create-student`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await req.json();
    setLoading(false);

    if (res.statusCode == 200) {
      setName('');
      setEmail('');
    } else {
      type = 'error';
    }
    alert.show(res.message, {
      type: type,
    });
  }

  return (
    <>
      <div className="card">
        <div className="card-header student-card text-light">Add New Student</div>
        <div className="card-body">
          <div className="row">
            <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="form-group">
                <label htmlFor="studentEmail">Student Email ID</label>
                <input type="email" className="form-control" id="studentEmail" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="email" />
                <small id="email" className="form-text text-muted">
                  To check whether the student already exists.
                </small>
              </div>
            </div>
            <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="form-group">
                <label htmlFor="studentName">Student Name</label>
                <input type="text" className="form-control" id="studentName" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="name" />
              </div>
            </div>
          </div>
          {loading === true ? (
            <LoadingButton />
          ) : (
            <button type="button" className="btn btn-primary" onClick={addStudent} disabled={email === '' || name === '' ? true : false}>
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddStudent;
