import { useEffect, useState } from 'react';
import env from '../env';
import ProgressLoader from '../progress-loader';
import LoadingButton from '../loading-button';
import { useAlert } from 'react-alert';

const MapMentors = () => {
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [selectedStu, setSelectedStu] = useState(-1);
  const [mentorList, setMentorList] = useState([]);
  const [selectedMent, setSelectedMent] = useState(-1);

  async function loadData() {
    setLoading(true);
    setSelectedMent(-1);
    setSelectedStu(-1);
    const req = await fetch(`${env}students`);
    const res = await req.json();
    setStudentList(res);

    const req2 = await fetch(`${env}mentors`);
    const res2 = await req2.json();
    setMentorList(res2);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function mapMentor() {
    setSubmitLoad(true);
    const mentor = mentorList.find((ele, index) => selectedMent === index);
    const data = { mentor: mentor.name };
    let type = 'success';

    const id = studentList.find((ele, index) => selectedStu === index).id;

    const req = await fetch(`${env}students/assign-mentor/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await req.json();
    setSubmitLoad(false);
    if (res.statusCode != 200) {
      type = 'error';
    }
    alert.show(res.message, {
      type: type,
    });
  }
  return (
    <>
      <div className="card">
        <div className="card-header student-card text-light">Assign Mentor</div>
        <div className="card-body">
          {loading == true ? (
            <ProgressLoader />
          ) : (
            <>
              <div className="col-xs-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="d-flex justify-content-end mb-1">
                  <button type="button" className="btn btn-dark btn-xs" onClick={loadData}>
                    <i className="fas fa-sync"></i> &nbsp;Reload Data
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <b>Select Student</b>
                  <ul className="list-group">
                    {studentList.map((ele, index) => {
                      return (
                        <li key={index} className={`list-group-item list-group-item-action ${selectedStu === index ? 'active' : ''}`} onClick={() => setSelectedStu(index)}>
                          {ele.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <b>Select Mentor</b>
                  <ul className="list-group">
                    {mentorList.map((ele, index) => {
                      return (
                        <li key={index} className={`list-group-item list-group-item-action ${selectedMent === index ? 'active' : ''}`} onClick={() => setSelectedMent(index)}>
                          {ele.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="col-xs-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-2">
                {submitLoad === true ? (
                  <LoadingButton />
                ) : (
                  <button type="button" className="btn btn-primary" onClick={mapMentor}  disabled={(selectedStu === -1 || selectedMent === -1) ? true : false}>
                    Map Mentor
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MapMentors;
