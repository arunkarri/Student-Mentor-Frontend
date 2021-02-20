import AddStudent from './add-student';
import AddMentor from './add-mentor';
import MapMentors from './map-mentors';
import MapStudents from './map-students';

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 mb-1">
            <AddStudent />
          </div>
          <div className="col-6 mb-1">
            <AddMentor />
          </div>
          <div className="col-6 ">
            <MapMentors />
          </div>
          <div className="col-6">
            <MapStudents />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
