import { useEffect, useState } from 'react';
import env from './env';
import ProgressLoader from './progress-loader';
import LoadingButton from './loading-button';
import { useAlert } from 'react-alert';

const MapStudents = () => {
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [mentorList, setMentorList] = useState([]);
  const [selectedMent, setSelectedMent] = useState('');

  function selectStu(i) {
    setStudentList(
      studentList.map((ele, index) => {
        if (index === i) {
          ele.selected = !ele.selected;
        }
        return ele;
      })
    );
  }

  async function loadData() {
    setSelectedMent('');
    setLoading(true);

    const req = await fetch(`${env}mentors`);
    const res = await req.json();
    setMentorList(res);

    const req2 = await fetch(`${env}students`);
    const res2 = await req2.json();
    setStudentList(res2);
    setLoading(false);
  }

  function setActiveStudents(mentorObj) {
    console.log(mentorObj, !!mentorObj.students);
    if (!!mentorObj.students) {
      setStudentList(
        studentList.map((ele) => {
          let count = 0;
          mentorObj.students.forEach((stu) => {
            if (stu.name === ele.name) {
              count++;
              ele.selected = true;
            }
          });
          if (!count) {
            ele.selected = false;
          }
          return ele;
        })
      );
    } else {
      setStudentList(
        studentList.map((ele) => {
          ele.selected = false;
          return ele;
        })
      );
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function mapMentor() {
    setSubmitLoad(true);
    const mentor = mentorList.find((ele) => selectedMent === ele.name);
    const id = mentor.id;
    let type = 'success';
    const data = {
      students: studentList.filter((ele) => {
        return ele.selected === true;
      }),
    };

    const req = await fetch(`${env}mentors/assign-students/${id}`, {
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
        <div className="card-header">Map Students to Mentor</div>
        <div className="card-body">
          {loading == true ? (
            <ProgressLoader />
          ) : (
            <>
              <div className="row">
                <div className="col-6 mb-2"></div>
                <div className="col-6 d-flex justify-content-end mb-1">
                  <button type="button" className="btn btn-dark btn-xs" onClick={loadData}>
                    <i className="fas fa-sync"></i> &nbsp;Reload Data
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="dropdown mt-3 mb-5">
                    <button className="btn btn-secondary btn-xs dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Select a Mentor
                    </button>
                    <ul className="dropdown-menu">
                      {mentorList.map((ele, index) => {
                        return (
                          <li
                            key={index}
                            className={`dropdown-item ${selectedMent === ele.name ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedMent(ele.name);
                              setActiveStudents(ele, index);
                            }}
                          >
                            {ele.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {selectedMent !== '' ? (
                    <h4>
                      <span className="badge badge-light">{selectedMent}</span>
                    </h4>
                  ) : (
                    ''
                  )}
                </div>
                <div className="col-6">
                  <b>Select Students</b>
                  <ul className="list-group">
                    {studentList.map((ele, index) => {
                      return (
                        <li key={index} className={`list-group-item mb-1 list-group-item-action ${ele.selected === true ? 'active' : ''}`} onClick={() => selectStu(index)}>
                          {ele.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="col-6 mt-2">
                {submitLoad === true ? (
                  <LoadingButton />
                ) : (
                  <button type="button" className="btn btn-primary" onClick={mapMentor} disabled={selectedMent === '' ? true : false}>
                    Assign Students
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

export default MapStudents;
