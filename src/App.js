import AddStudent from './students/add-student';
import AddMentor from './mentors/add-mentor';
import MapMentors from './students/map-mentors';
import MapStudents from './mentors/map-students';

function App() {
  return (
    <>
    <h4 className="text-center text-light">Student - Mentor Mapping Application</h4>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-1">
            <AddStudent />
          </div>
          <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-1">
            <AddMentor />
          </div>
          <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
            <MapMentors />
          </div>
          <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <MapStudents />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
